from marshmallow import Schema, fields, validate

class ProjectCreateSchema(Schema):
    title = fields.Str(required=True)
    description = fields.Str(load_default="")
    subject = fields.Str(load_default="General")
    priority = fields.Str(load_default="medium", validate=validate.OneOf(["low","medium","high"]))
    due_date = fields.Date(allow_none=True, load_default=None)

class ProjectUpdateSchema(Schema):
    title = fields.Str()
    description = fields.Str()
    subject = fields.Str()
    priority = fields.Str(validate=validate.OneOf(["low","medium","high"]))
    due_date = fields.Date(allow_none=True)
    status = fields.Str(validate=validate.OneOf(["active","archived"]))

class ProjectOutSchema(Schema):
    id = fields.Str()
    title = fields.Str()
    description = fields.Str()
    subject = fields.Str()
    priority = fields.Str()
    due_date = fields.Date(allow_none=True)
    status = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
