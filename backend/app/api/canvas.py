from flask_smorest import Blueprint, abort
from ..services.canvas_service import (
    get_user_information,
    get_user_courses,
    get_course,
    get_course_modules,
    get_module_items,
    get_course_assignments,
    get_course_quizzes,
    get_course_files,
    get_course_pages,
)
from ..schemas.canvas import (
    UserSchema,
    CourseSchema,
    ModuleSchema,
    ModuleItemSchema,
    AssignmentSchema,
    QuizSchema,
    FileSchema,
)

canvas_blp = Blueprint(
    "canvas",
    __name__,
    url_prefix="/canvas",
    description="Canvas proxy endpoints"
)

# ---------------------------
# User Information
# ---------------------------
@canvas_blp.route("/user/information", methods=["GET"])
@canvas_blp.response(200, UserSchema)
def user_information():
    """GET /canvas/user/information
    
    Returns information about the current user.
    """
    try:
        return get_user_information()
    except Exception as e:
        abort(502, message=str(e))


# ---------------------------
# Courses
# ---------------------------
@canvas_blp.route("/courses", methods=["GET"])
@canvas_blp.response(200, CourseSchema(many=True))
def list_courses():
    """GET /canvas/courses
    
    Returns all courses for the current user.
    """
    try:
        user = get_user_information()
        return get_user_courses(user["id"])
    except Exception as e:
        abort(502, message=str(e))


@canvas_blp.route("/courses/<int:course_id>", methods=["GET"])
@canvas_blp.response(200, CourseSchema)
def get_single_course(course_id):
    """GET /canvas/courses/<course_id>
    
    Returns a single course with syllabus information.
    """
    try:
        return get_course(course_id, include_syllabus=True)
    except Exception as e:
        abort(502, message=str(e))


# ---------------------------
# Modules
# ---------------------------
@canvas_blp.route("/courses/<int:course_id>/modules", methods=["GET"])
@canvas_blp.response(200, ModuleSchema(many=True))
def list_modules(course_id):
    """GET /canvas/courses/<course_id>/modules
    
    Returns all modules for a given course.
    """
    try:
        return get_course_modules(course_id)
    except Exception as e:
        abort(502, message=str(e))


@canvas_blp.route("/modules/<int:module_id>/items", methods=["GET"])
@canvas_blp.response(200, ModuleItemSchema(many=True))
def list_module_items(module_id):
    """GET /canvas/modules/<module_id>/items
    
    Returns all items within a module.
    """
    try:
        return get_module_items(module_id)
    except Exception as e:
        abort(502, message=str(e))


# ---------------------------
# Assignments
# ---------------------------
@canvas_blp.route("/courses/<int:course_id>/assignments", methods=["GET"])
@canvas_blp.response(200, AssignmentSchema(many=True))
def list_assignments(course_id):
    """GET /canvas/courses/<course_id>/assignments
    
    Returns all assignments for a course.
    """
    try:
        return get_course_assignments(course_id)
    except Exception as e:
        abort(502, message=str(e))


@canvas_blp.route("/courses/<int:course_id>/assignments/<int:assignment_id>", methods=["GET"])
@canvas_blp.response(200, AssignmentSchema)
def get_assignment(course_id, assignment_id):
    """GET /canvas/courses/<course_id>/assignments/<assignment_id>
    
    Returns a single assignment.
    """
    try:
        return get_course_assignments(course_id, assignment_id)
    except Exception as e:
        abort(502, message=str(e))


# ---------------------------
# Quizzes
# ---------------------------
@canvas_blp.route("/courses/<int:course_id>/quizzes", methods=["GET"])
@canvas_blp.response(200, QuizSchema(many=True))
def list_quizzes(course_id):
    """GET /canvas/courses/<course_id>/quizzes
    
    Returns all quizzes for a course.
    """
    try:
        return get_course_quizzes(course_id)
    except Exception as e:
        abort(502, message=str(e))


@canvas_blp.route("/courses/<int:course_id>/quizzes/<int:quiz_id>", methods=["GET"])
@canvas_blp.response(200, QuizSchema)
def get_quiz(course_id, quiz_id):
    """GET /canvas/courses/<course_id>/quizzes/<quiz_id>
    
    Returns a single quiz.
    """
    try:
        return get_course_quizzes(course_id, quiz_id)
    except Exception as e:
        abort(502, message=str(e))


# ---------------------------
# Files (Lecture notes, PDFs)
# ---------------------------
@canvas_blp.route("/courses/<int:course_id>/files", methods=["GET"])
@canvas_blp.response(200, FileSchema(many=True))
def list_files(course_id):
    """GET /canvas/courses/<course_id>/files
    
    Returns all files in a course.
    """
    try:
        return get_course_files(course_id)
    except Exception as e:
        abort(502, message=str(e))


# ---------------------------
# Pages (Canvas wiki / lecture notes)
# ---------------------------
@canvas_blp.route("/courses/<int:course_id>/pages", methods=["GET"])
def list_pages(course_id):
    """GET /canvas/courses/<course_id>/pages
    
    Returns all pages (wiki, notes) in a course.
    """
    try:
        return get_course_pages(course_id)
    except Exception as e:
        abort(502, message=str(e))
