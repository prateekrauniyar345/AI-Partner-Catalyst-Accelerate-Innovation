# File: backend/app/api/auth.py
from flask import Blueprint, jsonify, current_app, make_response, request
from flask_smorest import abort
from flask_smorest import Blueprint as SmorestBlueprint
from ..schemas.auth import (
    SignUpSchema,
    LoginSchema,
    TokenResponseSchema,
    RefreshTokenSchema,
    PasswordResetRequestSchema,
    PasswordResetConfirmSchema,
    VerifyOTPSchema,
)

from ..auth.supabase_client import supabase_client
from functools import wraps
from ..schemas.users import UserSchema


auth_blp = SmorestBlueprint(
    "auth",
    __name__,
    url_prefix="/auth",
    description="Email authentication operations",
)

# -------------------------------------
# Sign‑up
# -------------------------------------
@auth_blp.post("/signup")
@auth_blp.arguments(SignUpSchema)          # validated payload → `data`
@auth_blp.response(200, TokenResponseSchema)  # success schema
def signup(data):
    """
    Register a new user with Supabase.
    Returns a JWT pair and the created user (if the sign-up is
    auto-confirmed; otherwise a confirmation email is sent and the
    client receives a generic message).
    """
    email = data["email"]
    password = data["password"]

    user_metadata = {
        "first_name": data.get("first_name"),
        "last_name": data.get("last_name"),
        "username": data.get("username"),
    }

    supabase = supabase_client
    try:
        # this is where we call Supabase to create the user
        resp = supabase.auth.sign_up(
            {
                "email": email, 
                "password": password, 
                "options": {
                    "data": user_metadata, 
                    "email_redirect_to": f"{current_app.config.get('FRONTEND_REDIRECT_URL')}/signin"
                }
            }
           )
        print("Supabase sign-up response:", resp)
    except Exception as e:
        abort(400, message=str(e))

    user = resp.user
    session = resp.session

    # setting up the cookies (only if a session was returned)
    body = {"user": user.model_dump()} if user else {}
    resp = make_response(jsonify(body), 200)
    secure_flag = not current_app.config.get("DEBUG", False)

    if session:
        # set up the access token
        resp.set_cookie(
            "access_token",
            session.access_token,
            httponly=True,
            secure=secure_flag,
            samesite="Lax",
            max_age=3600,
            path="/",
        )

        # set up the refresh token
        resp.set_cookie(
            "refresh_token",
            session.refresh_token,
            httponly=True,
            secure=secure_flag,
            samesite="Lax",
            max_age=604800,
            path="/",
        )

    return resp


# -------------------------------------
# Sign‑in
# -------------------------------------
@auth_blp.post("/signin")
@auth_blp.arguments(LoginSchema)
@auth_blp.response(200, TokenResponseSchema)
def login(data):
    """
    Authenticate an existing user and return a JWT pair.
    """
    email = data["email"]
    password = data["password"]

    supabase = supabase_client
    try:
        resp = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        session = resp.session
        user = resp.user
    except Exception as e:
        abort(400, message=str(e))

    if not session:
        # No session returned — something went wrong
        abort(500, message="Authentication succeeded but no session returned")

    # return user and set cookies
    body = {"user": user.model_dump()} if user else {}
    out = make_response(jsonify(body), 200)
    secure_flag = not current_app.config.get("DEBUG", False)

    out.set_cookie(
        "access_token",
        session.access_token,
        httponly=True,
        secure=secure_flag,
        samesite="Lax",
        max_age=3600,
        path="/",
    )

    out.set_cookie(
        "refresh_token",
        session.refresh_token,
        httponly=True,
        secure=secure_flag,
        samesite="Lax",
        max_age=604800,
        path="/",
    )

    return out


# -------------------------------------
# Refresh token (optional – you can expose it later)
# -------------------------------------
@auth_blp.post("/refresh")
@auth_blp.arguments(RefreshTokenSchema)
@auth_blp.response(200, TokenResponseSchema)
def refresh_token(data):
    supabase = supabase_client
    # prefer cookie then payload
    refresh_token_value = request.cookies.get("refresh_token") or data.get("refresh_token")
    if not refresh_token_value:
        abort(401, message="Refresh token missing")

    try:
        resp = supabase.auth.refresh_session(refresh_token_value)
        session = resp.session
        user = resp.user
    except Exception as e:
        abort(401, message=str(e))

    if not session:
        abort(500, message="No session returned from refresh")

    out = make_response(jsonify({"user": user.model_dump() if user else {}}), 200)
    secure_flag = not current_app.config.get("DEBUG", False)

    out.set_cookie(
        "access_token",
        session.access_token,
        httponly=True,
        secure=secure_flag,
        samesite="Lax",
        max_age=3600,
        path="/",
    )

    out.set_cookie(
        "refresh_token",
        session.refresh_token,
        httponly=True,
        secure=secure_flag,
        samesite="Lax",
        max_age=604800,
        path="/",
    )

    return out


# -------------------------------------
# Password-reset request (send email)
# -------------------------------------
@auth_blp.post("/password-reset/request")
@auth_blp.arguments(PasswordResetRequestSchema)
def password_reset_request(data):
    supabase = supabase_client
    try:
        supabase.auth.reset_password_for_email(data["email"])
    except Exception as e:
        abort(400, message=str(e))

    return jsonify({"message": "Password-reset email sent"}), 200


# -------------------------------------
# Password-reset confirm (set new password)
# -------------------------------------
@auth_blp.post("/password-reset/confirm")
@auth_blp.arguments(PasswordResetConfirmSchema)
def password_reset_confirm(data):
    supabase = supabase_client
    try:
        supabase.auth.update_user({"password": data["new_password"]})
    except Exception as e:
        abort(400, message=str(e))

    return jsonify({"message": "Password updated successfully"}), 200


# -------------------------------------
# Sign-out
# -------------------------------------
@auth_blp.post("/signout")
def signout():
    # Attempt to revoke session on Supabase (best-effort)
    token = request.cookies.get("access_token")
    try:
        if token:
            try:
                supabase_client.auth.sign_out(token)
            except Exception:
                # older/newer SDKs may expose admin API differently
                try:
                    supabase_client.auth.api.sign_out(token)
                except Exception:
                    current_app.logger.debug("Supabase sign_out not available or failed")
    except Exception as e:
        current_app.logger.warning(f"Error revoking supabase session: {e}")

    out = make_response(jsonify({"message": "signed out"}), 200)
    secure_flag = not current_app.config.get("DEBUG", False)
    # Clear cookies by setting empty value and immediate expiry
    out.set_cookie(
        "access_token", 
        "", 
        expires=0,
        max_age=0, 
        httponly=True, 
        secure=secure_flag, 
        samesite="Lax", 
        path="/"
        )
    out.set_cookie(
        "refresh_token", 
        "",
        expires=0,
        max_age=0,
        httponly=True,
        secure=secure_flag,
        samesite="Lax",
        path="/"
    )
    return out





# -------------------------------------
# Auth decorator
# -------------------------------------
def require_auth(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        token = request.cookies.get("access_token")
        if not token:
            auth = request.headers.get("Authorization", "")
            if auth.startswith("Bearer "):
                token = auth.split(" ", 1)[1]
        if not token:
            abort(401, message="Authentication required")
        try:
            user_resp = supabase_client.auth.get_user(token)
            print("Authenticated user:", user_resp)
            request.current_user = user_resp.user
        except Exception:
            abort(401, message="Invalid or expired token")
        return f(*args, **kwargs)
    return wrapped


# -------------------------------------
# Verify OTP (email code)
# -------------------------------------
@auth_blp.post("/verify")
@auth_blp.arguments(VerifyOTPSchema)
@auth_blp.response(200, TokenResponseSchema)
def verify_email(data):
    """
    Verify the 6-digit OTP sent to the user's email.
    If successful, the user is confirmed and logged in.
    """
    email = data["email"]
    token = data["token"]
    otp_type = data["type"]

    supabase = supabase_client
    
    try:
        resp = supabase.auth.verify_otp(
            {"email": email, "token": token, "type": otp_type}
        )
        session = resp.session
        user = resp.user
    except Exception as e:
        abort(400, message=str(e))

    if not session:
        return jsonify({"message": "Verification successful; no session created"}), 200

    out = make_response(jsonify({"user": user.model_dump() if user else {}}), 200)
    secure_flag = not current_app.config.get("DEBUG", False)
    out.set_cookie("access_token", session.access_token, httponly=True, secure=secure_flag, samesite="Lax", max_age=3600, path="/")
    out.set_cookie("refresh_token", session.refresh_token, httponly=True, secure=secure_flag, samesite="Lax", max_age=604800, path="/auth/refresh")
    return out


# -------------------------------------
# Current user
# -------------------------------------
@auth_blp.get("/me")
@auth_blp.response(200, UserSchema)
@require_auth
def me():
    """Return the current authenticated user with explicit schema fields."""
    user = getattr(request, "current_user", None)
    if not user:
        abort(401, message="Authentication required")

    # Normalize user to a dict (works with pydantic-like or plain dict)
    if hasattr(user, "model_dump"):
        u = user.model_dump()
    elif isinstance(user, dict):
        u = user
    else:
        # fallback: read common attributes
        u = {
            "id": getattr(user, "id", None),
            "email": getattr(user, "email", None),
            "user_metadata": getattr(user, "user_metadata", None),
        }

    meta = u.get("user_metadata") or {}
    # Some SDKs nest metadata under "user_metadata" or "raw_user_meta_data"
    if not meta:
        meta = u.get("raw_user_meta_data") or {}

    return {
        "id": u.get("id"),
        "email": u.get("email"),
        "first_name": meta.get("first_name"),
        "last_name": meta.get("last_name"),
        "username": meta.get("username"),
    }