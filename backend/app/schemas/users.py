# backend/app/schemas/users.py
from marshmallow import Schema, fields


class UserSchema(Schema):
    """Full user representation (used for GET /users)."""
    id = fields.Str(required=True)  # Supabase uses UUID strings, not integers
    first_name = fields.Str(required=False, allow_none=True)
    last_name = fields.Str(required=False, allow_none=True)
    username = fields.Str(required=False, allow_none=True)  # username may not always be set
    email = fields.Email(required=True)


class CreateUserSchema(Schema):
    """Payload for POST /users (create a new user)."""
    first_name = fields.Str(required=False, allow_none=True)
    last_name = fields.Str(required=False, allow_none=True)
    username = fields.Str(required=True)
    email = fields.Email(required=True)


class UpdateUserSchema(Schema):
    """Payload for PATCH /users/<id> (partial update)."""
    first_name = fields.Str(required=False, allow_none=True)
    last_name = fields.Str(required=False, allow_none=True)
    username = fields.Str(required=False)
    email = fields.Email(required=False)


class UserResponseSchema(UserSchema):
    """Alias for the response schema - identical to ``UserSchema``."""
    pass