from flask import Blueprint, jsonify
from flask_smorest import abort
from flask_smorest import Blueprint as SmorestBlueprint
from ..schemas.auth import (
    SignUpSchema,
    LoginSchema,
    TokenResponseSchema,
    RefreshTokenSchema,
    PasswordResetRequestSchema,
    PasswordResetConfirmSchema,
)
from ..auth.supabase_client import supabase_client


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

    supabase = supabase_client()
    resp = supabase.auth.sign_up(email=email, password=password)

    if resp.get("error"):
        abort(400, message=resp["error"]["message"])

    # Supabase may or may not return a session immediately.
    # If a session is present, return the tokens; otherwise just inform the user.
    session = resp.get("session")
    user = resp.get("user")

    if session:
        return {
            "access_token": session["access_token"],
            "refresh_token": session["refresh_token"],
            "token_type": "bearer",
            "expires_in": 3600,
            "user": user,
        }
    else:
        # No session yet – email confirmation required.
        return jsonify({"message": "Signup email sent - please confirm your address"}), 201


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

    supabase = supabase_client()
    resp = supabase.auth.sign_in_with_password(email=email, password=password)

    if resp.get("error"):
        abort(401, message=resp["error"]["message"])

    session = resp["session"]
    user = resp["user"]

    return {
        "access_token": session["access_token"],
        "refresh_token": session["refresh_token"],
        "token_type": "bearer",
        "expires_in": 3600,
        "user": user,
    }


# -------------------------------------
# Refresh token (optional – you can expose it later)
# -------------------------------------
@auth_blp.post("/refresh")
@auth_blp.arguments(RefreshTokenSchema)
@auth_blp.response(200, TokenResponseSchema)
def refresh_token(data):
    supabase = supabase_client()
    resp = supabase.auth.refresh_session(data["refresh_token"])

    if resp.get("error"):
        abort(401, message=resp["error"]["message"])

    session = resp["session"]
    user = resp["user"]
    return {
        "access_token": session["access_token"],
        "refresh_token": session["refresh_token"],
        "token_type": "bearer",
        "expires_in": 3600,
        "user": user,
    }


# -------------------------------------
# Password-reset request (send email)
# -------------------------------------
@auth_blp.post("/password-reset/request")
@auth_blp.arguments(PasswordResetRequestSchema)
def password_reset_request(data):
    supabase = supabase_client()
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
    supabase = supabase_client()
    resp = supabase.auth.update_user(
        access_token=data["reset_token"],
        password=data["new_password"],
    )

    if resp.get("error"):
        abort(400, message=resp["error"]["message"])

    return jsonify({"message": "Password updated successfully"}), 200
