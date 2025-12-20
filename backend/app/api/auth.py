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
    resp = supabase.auth.sign_up(email=email, password=password, options={"data": user_metadata})
    if resp.get("error"):
        abort(400, message=resp["error"]["message"])

    # Supabase may or may not return a session immediately.
    # If a session is present, return the tokens; otherwise just inform the user.
    session = resp.get("session")
    user = resp.get("user")

    # setting up the cookies (only if a session was returned)
    body = {"user": user}
    resp = make_response(jsonify(body), 200)
    secure_flag = not current_app.config.get("DEBUG", False)

    if session:
        # set up the access token
        resp.set_cookie(
            "access_token",
            session.get("access_token"),
            httponly=True,
            secure=secure_flag,
            samesite="Lax",
            max_age=3600,
            path="/",
        )

        # set up the refresh token
        resp.set_cookie(
            "refresh_token",
            session.get("refresh_token"),
            httponly=True,
            secure=secure_flag,
            samesite="Lax",
            max_age=604800,
            path="/auth/refresh",
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
    resp = supabase.auth.sign_in_with_password(email=email, password=password)

    if resp.get("error"):
        abort(401, message=resp["error"]["message"])

    session = resp.get("session")
    user = resp.get("user")

    if not session:
        # No session returned — something went wrong
        abort(500, message="Authentication succeeded but no session returned")

    # return user and set cookies
    body = {"user": user}
    out = make_response(jsonify(body), 200)
    secure_flag = not current_app.config.get("DEBUG", False)

    out.set_cookie(
        "access_token",
        session.get("access_token"),
        httponly=True,
        secure=secure_flag,
        samesite="Lax",
        max_age=3600,
        path="/",
    )

    out.set_cookie(
        "refresh_token",
        session.get("refresh_token"),
        httponly=True,
        secure=secure_flag,
        samesite="Lax",
        max_age=604800,
        path="/auth/refresh",
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

    resp = supabase.auth.refresh_session(refresh_token_value)

    if resp.get("error"):
        abort(401, message=resp["error"]["message"])

    session = resp.get("session")
    user = resp.get("user")

    if not session:
        abort(500, message="No session returned from refresh")

    out = make_response(jsonify({"user": user}), 200)
    secure_flag = not current_app.config.get("DEBUG", False)

    out.set_cookie(
        "access_token",
        session.get("access_token"),
        httponly=True,
        secure=secure_flag,
        samesite="Lax",
        max_age=3600,
        path="/",
    )

    out.set_cookie(
        "refresh_token",
        session.get("refresh_token"),
        httponly=True,
        secure=secure_flag,
        samesite="Lax",
        max_age=604800,
        path="/auth/refresh",
    )

    return out


# -------------------------------------
# Password-reset request (send email)
# -------------------------------------
@auth_blp.post("/password-reset/request")
@auth_blp.arguments(PasswordResetRequestSchema)
def password_reset_request(data):
    supabase = supabase_client
    resp = supabase.auth.reset_password_for_email(data["email"])

    if resp.get("error"):
        abort(400, message=resp["error"]["message"])

    return jsonify({"message": "Password-reset email sent"}), 200


# -------------------------------------
# Password-reset confirm (set new password)
# -------------------------------------
@auth_blp.post("/password-reset/confirm")
@auth_blp.arguments(PasswordResetConfirmSchema)
def password_reset_confirm(data):
    supabase = supabase_client
    resp = supabase.auth.update_user(
        access_token=data["reset_token"],
        password=data["new_password"],
    )

    if resp.get("error"):
        abort(400, message=resp["error"]["message"])

    return jsonify({"message": "Password updated successfully"}), 200


# -------------------------------------
# Sign-out
# -------------------------------------
@auth_blp.post("/signout")
def signout():
    out = make_response(jsonify({"message": "signed out"}), 200)
    secure_flag = not current_app.config.get("DEBUG", False)
    out.set_cookie("access_token", "", expires=0, httponly=True, secure=secure_flag, samesite="Lax", path="/")
    out.set_cookie("refresh_token", "", expires=0, httponly=True, secure=secure_flag, samesite="Lax", path="/auth/refresh")
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
        user_resp = supabase_client.auth.get_user(token)
        if user_resp.get("error") or not user_resp.get("user"):
            abort(401, message="Invalid or expired token")
        # attach current user to request
        request.current_user = user_resp.get("user")
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
    
    # Verify the code against Supabase Auth
    resp = supabase.auth.verify_otp({
        "email": email,
        "token": token,
        "type": otp_type
    })

    if resp.get("error"):
        abort(400, message=resp["error"]["message"])

    session = resp.get("session")
    user = resp.get("user")

    if not session:
        return jsonify({"message": "Verification successful; no session created"}), 200

    out = make_response(jsonify({"user": user}), 200)
    secure_flag = not current_app.config.get("DEBUG", False)
    out.set_cookie("access_token", session.get("access_token"), httponly=True, secure=secure_flag, samesite="Lax", max_age=3600, path="/")
    out.set_cookie("refresh_token", session.get("refresh_token"), httponly=True, secure=secure_flag, samesite="Lax", max_age=604800, path="/auth/refresh")
    return out