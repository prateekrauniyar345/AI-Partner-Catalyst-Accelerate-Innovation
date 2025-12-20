from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(required=True)
    first_name = fields.Str(required=False, allow_none=True)
    last_name = fields.Str(required=False, allow_none=True)
    username = fields.Str(required=True)
    email = fields.Email(required=True)

class CreateUserSchema(Schema):
    first_name = fields.Str(required=False, allow_none=True)
    last_name = fields.Str(required=False, allow_none=True)
    username = fields.Str(required=True)
    email = fields.Email(required=True)

class UpdateUserSchema(Schema):
    first_name = fields.Str(required=False, allow_none=True)
    last_name = fields.Str(required=False, allow_none=True)
    username = fields.Str(required=False)
    email = fields.Email(required=False)