from marshmallow import Schema, fields

# ----------------------------------
#  user schema
# ----------------------------------
class UserSchema(Schema):
    """Represents a Canvas user (student, teacher, admin, etc.)."""
    canvas_user_id = fields.Int(required=True, attribute="id")
    name = fields.Str(attribute="name")
    sortable_name = fields.Str(attribute="sortable_name", allow_none=True)
    short_name = fields.Str(attribute="short_name", allow_none=True)
    
    # Login and SIS information
    login_id = fields.Str(attribute="login_id", allow_none=True)
    sis_user_id = fields.Str(attribute="sis_user_id", allow_none=True)
    integration_id = fields.Str(attribute="integration_id", allow_none=True)
    
    # Profile details
    email = fields.Str(attribute="email", allow_none=True)
    avatar_url = fields.Str(attribute="avatar_url", allow_none=True)
    bio = fields.Str(attribute="bio", allow_none=True)
    pronouns = fields.Str(attribute="pronouns", allow_none=True)
    
    # Localization and Activity
    locale = fields.Str(attribute="locale", allow_none=True)
    time_zone = fields.Str(attribute="time_zone", allow_none=True)
    last_login = fields.DateTime(attribute="last_login", allow_none=True)

    # Optional: Permissions list returned by the /users/:id endpoint
    permissions = fields.Dict(allow_none=True)

class CourseSchema(Schema):
    """Represents a Canvas course. Maps Canvas' JSON fields to our schema."""
    # Canvas returns `id` for the course id; map it to `canvas_course_id` here
    canvas_course_id = fields.Int(required=True, attribute="id")
    name = fields.Str(attribute="name")
    course_code = fields.Str(attribute="course_code")
    enrollment_term = fields.Str(attribute="enrollment_term")
    start_at = fields.DateTime(attribute="start_at", allow_none=True)
    end_at = fields.DateTime(attribute="end_at", allow_none=True)

# ----------------------------------
#  query schemas for course query
# ----------------------------------
class CoursesQuerySchema(Schema):
    canvas_user_id = fields.Str(required=False, metadata={"description": "Canvas user id (optional). If omitted, uses /users/self"})

class ModuleSchema(Schema):
    """Represents a Canvas module (section)."""
    canvas_module_id = fields.Int(required=True, attribute="id")
    name = fields.Str(attribute="name")
    position = fields.Int(attribute="position", allow_none=True)
    unlock_at = fields.DateTime(attribute="unlock_at", allow_none=True)



# ----------------------------------
#  query schemas for module query
# ----------------------------------
class ModulesQuerySchema(Schema):
    course_id = fields.Int(required=False, metadata={"description": "Optional Canvas course id. If omitted, returns modules for all user courses."})
    canvas_user_id = fields.Str(required=False, metadata={"description": "Optional Canvas user id for listing courses (fallback uses /users/self)."})



class ModuleItemSchema(Schema):
    """Represents an item inside a Canvas module (page, assignment, file...)."""
    canvas_item_id = fields.Int(required=True, attribute="id")
    title = fields.Str(attribute="title")
    item_type = fields.Str(attribute="type", allow_none=True)
    url = fields.Str(attribute="html_url", allow_none=True)
    content_id = fields.Int(attribute="content_id", allow_none=True)
    position = fields.Int(attribute="position", allow_none=True)
