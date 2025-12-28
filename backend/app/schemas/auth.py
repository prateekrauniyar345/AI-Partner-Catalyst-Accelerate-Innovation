# backend/app/schemas/auth.py
from marshmallow import Schema, fields, validate


class SignUpSchema(Schema):
    """Payload for POST /auth/signup."""
    first_name = fields.Str(required=False, allow_none=True)
    last_name  = fields.Str(required=False, allow_none=True)
    username   = fields.Str(required=True, validate=validate.Length(min=3))
    email      = fields.Email(required=True)
    password   = fields.Str(
        required=True,
        validate=validate.Length(min=8),
        load_only=True,               # never serialised back to the client
    )


class LoginSchema(Schema):
    """Payload for POST /auth/login."""
    email    = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)


class TokenResponseSchema(Schema):
    """Response returned after a successful login / token refresh."""
    access_token  = fields.Str(required=True)
    refresh_token = fields.Str(required=True)
    token_type = fields.Str(load_default="bearer", dump_default="bearer")
    expires_in    = fields.Int(dump_default=3600)   # seconds until access token expires
    from ..schemas.users import UserSchema
    user = fields.Nested(UserSchema)


class RefreshTokenSchema(Schema):
    """Payload for POST /auth/refresh."""
    refresh_token = fields.Str(required=False, allow_none=True)


class PasswordResetRequestSchema(Schema):
    """Payload for POST /auth/password-reset/request (send reset email)."""
    email = fields.Email(required=True)


class PasswordResetConfirmSchema(Schema):
    """Payload for POST /auth/password-reset/confirm (set new password)."""
    reset_token = fields.Str(required=True)   # token you sent in the email
    new_password = fields.Str(
        required=True,
        validate=validate.Length(min=8),
        load_only=True,
    )


class VerifyOTPSchema(Schema):
    """Payload to verify the email code."""
    email = fields.Email(required=True)
    token = fields.Str(required=True) # The 6-digit code from email
    type = fields.Str(load_default="signup")