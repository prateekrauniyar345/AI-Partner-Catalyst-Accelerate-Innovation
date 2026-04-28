from marshmallow import Schema, fields, validate

class ProjectCreateSchema(Schema):
    title = fields.Str(required=True)
    description = fields.Str(load_default="")
    subject = fields.Str(load_default="General")
    priority = fields.Str(load_default="medium")
    status = fields.Str(load_default="active")
    due_date = fields.Date(allow_none=True, load_default=None)

class ProjectUpdateSchema(Schema):
    title = fields.Str()
    description = fields.Str()
    subject = fields.Str()
    priority = fields.Str()
    due_date = fields.Date(allow_none=True)
    status = fields.Str()

class ProjectQuerySchema(Schema):
    id = fields.Str(required=False)
    title = fields.Str(required=False)
    description = fields.Str(required=False)
    subject = fields.Str(required=False)
    priority = fields.Str(required=False)
    due_date = fields.Date(required=False)
    status = fields.Str(required=False)

class ProjectOutSchema(Schema):
    id = fields.Str()
    title = fields.Str(attribute="name", allow_none=True, dump_default="New Project")
    description = fields.Str(allow_none=True, dump_default="")
    subject = fields.Str(allow_none=True, dump_default="General")
    priority = fields.Str(allow_none=True, dump_default="medium")
    due_date = fields.Str(allow_none=True, dump_default=None)
    status = fields.Str(allow_none=True, dump_default="active")
    created_at = fields.Str()
    updated_at = fields.Str()
