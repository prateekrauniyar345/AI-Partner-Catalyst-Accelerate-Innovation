# backend/app/schemas/canvas.py
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
    last_login = fields.Str(attribute="last_login", allow_none=True)

    # Optional: Permissions list returned by the /users/:id endpoint
    permissions = fields.Dict(allow_none=True)



# ----------------------------------
#  query schemas for course query
# ----------------------------------
class CoursesQuerySchema(Schema):
    canvas_user_id = fields.Str(required=False, metadata={"description": "Canvas user id (optional). If omitted, uses /users/self"})



# ----------------------------------
#  module schema
# ----------------------------------
class ModuleSchema(Schema):
    """Represents a Canvas module (section)."""
    canvas_module_id = fields.Int(required=True, attribute="id")
    name = fields.Str(attribute="name")
    position = fields.Int(attribute="position", allow_none=True)
    unlock_at = fields.Str(attribute="unlock_at", allow_none=True)

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



# ----------------------------------
# File schmea, assignment schema, quiz schema
# ----------------------------------
class FileSchema(Schema):
    """Represents course materials/files."""
    canvas_file_id = fields.Int(attribute="id")
    display_name = fields.Str()
    url = fields.Str()
    content_type = fields.Str(attribute="content-type")
    size = fields.Int()
    updated_at = fields.Str(allow_none=True)

class AssignmentSchema(Schema):
    """Represents course assignments."""
    canvas_assignment_id = fields.Int(attribute="id")
    name = fields.Str()
    description = fields.Str(allow_none=True) # This is the "Content"
    due_at = fields.Str(allow_none=True)
    points_possible = fields.Float(allow_none=True)
    submission_types = fields.List(fields.Str())
    has_submitted_submissions = fields.Bool()

class QuizSchema(Schema):
    """Represents course quizzes."""
    canvas_quiz_id = fields.Int(attribute="id")
    title = fields.Str()
    html_url = fields.Str()
    quiz_type = fields.Str()
    time_limit = fields.Int(allow_none=True)
    allowed_attempts = fields.Int(allow_none=True)
    question_count = fields.Int()



# ----------------------------------
#  course schema
# ----------------------------------
class CourseSchema(Schema):
    """The complete 'Full Course' schema."""
    canvas_course_id = fields.Int(required=True, attribute="id")
    name = fields.Str()
    course_code = fields.Str()
    syllabus_body = fields.Str(allow_none=True) # Course Content/Syllabus
    
    # Nested data
    modules = fields.List(fields.Nested(ModuleSchema), dump_only=True)
    assignments = fields.List(fields.Nested(AssignmentSchema), dump_only=True)
    quizzes = fields.List(fields.Nested(QuizSchema), dump_only=True)
    files = fields.List(fields.Nested(FileSchema), dump_only=True)
    
    # Grade information (returns for the current user)
    enrollments = fields.List(fields.Dict(), dump_only=True)

