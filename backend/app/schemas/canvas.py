from marshmallow import Schema, fields


class CourseSchema(Schema):
    """Represents a Canvas course. Maps Canvas' JSON fields to our schema."""
    # Canvas returns `id` for the course id; map it to `canvas_course_id` here
    canvas_course_id = fields.Int(required=True, attribute="id")
    name = fields.Str(attribute="name")
    course_code = fields.Str(attribute="course_code")
    enrollment_term = fields.Str(attribute="enrollment_term")
    start_at = fields.DateTime(attribute="start_at", allow_none=True)
    end_at = fields.DateTime(attribute="end_at", allow_none=True)


class ModuleSchema(Schema):
    """Represents a Canvas module (section)."""
    canvas_module_id = fields.Int(required=True, attribute="id")
    name = fields.Str(attribute="name")
    position = fields.Int(attribute="position", allow_none=True)
    unlock_at = fields.DateTime(attribute="unlock_at", allow_none=True)


class ModuleItemSchema(Schema):
    """Represents an item inside a Canvas module (page, assignment, file...)."""
    canvas_item_id = fields.Int(required=True, attribute="id")
    title = fields.Str(attribute="title")
    item_type = fields.Str(attribute="type", allow_none=True)
    url = fields.Str(attribute="html_url", allow_none=True)
    content_id = fields.Int(attribute="content_id", allow_none=True)
    position = fields.Int(attribute="position", allow_none=True)
