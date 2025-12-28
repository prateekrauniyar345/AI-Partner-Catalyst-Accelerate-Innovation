# from flask_smorest import Blueprint, abort
# from flask import request

# from ..services.canvas_service import (
#     get_user_information,
#     get_user_courses,
#     get_course_modules,
#     # get_module_items,
# )
# from ..schemas.canvas import (
#     UserSchema,
#     CoursesQuerySchema,
#     ModuleSchema,
#     ModulesQuerySchema,
#     ModuleItemSchema,
#     FileSchema,
#     AssignmentSchema,
#     QuizSchema,
#     CourseSchema,
# )

# canvas_blp = Blueprint("canvas", __name__, url_prefix="/canvas", description="Canvas proxy endpoints")


# @canvas_blp.route("/user/information", methods=["GET"])
# @canvas_blp.response(200, UserSchema(many=False))
# def user_information():
#     """GET /canvas/user/information

#     Returns information about the current user.
#     """
#     try:
#         data = get_user_information()
#     except Exception as e:
#         abort(502, message=str(e))
#     return data


# @canvas_blp.route("/courses", methods=["GET"])
# @canvas_blp.arguments(CoursesQuerySchema, location="query")
# @canvas_blp.response(200, CourseSchema(many=True))
# def list_courses(args):
#     canvas_user_id = args.get("canvas_user_id")

#     if not canvas_user_id:
#         try:
#             user_info = get_user_information()
#             canvas_user_id = str(user_info.get("id")) if user_info else None
#         except Exception as e:
#             abort(502, message=f"failed to fetch canvas user info: {e}")

#     if not canvas_user_id:
#         abort(400, message="canvas_user_id query parameter required")

#     try:
#         return get_user_courses(canvas_user_id)
#     except Exception as e:
#         abort(502, message=str(e))


# # ----------------------------------
# #  modules endpoint with flexible course_id
# # ----------------------------------
# @canvas_blp.route("/courses/modules", methods=["GET"])
# @canvas_blp.arguments(ModulesQuerySchema, location="query")
# @canvas_blp.response(200, ModuleSchema(many=True))
# def list_modules_flexible(args):
#     """
#     GET /canvas/courses/modules?course_id=<id>

#     If course_id is provided, returns modules for that course.
#     If omitted, fetches all courses for the current user, then returns modules for all those courses.
#     """
#     course_id = args.get("course_id")

#     # Case A: user provided a single course_id
#     if course_id:
#         try:
#             return get_course_modules(course_id)
#         except Exception as e:
#             abort(502, message=str(e))

#     # Case B: fallback -> modules for ALL courses
#     canvas_user_id = args.get("canvas_user_id")

#     # resolve user id if needed
#     if not canvas_user_id:
#         try:
#             user_info = get_user_information()
#             canvas_user_id = str(user_info.get("id")) if user_info else None
#         except Exception as e:
#             abort(502, message=f"failed to fetch canvas user info: {e}")

#     if not canvas_user_id:
#         abort(400, message="Unable to resolve canvas_user_id")

#     # fetch courses
#     try:
#         courses = get_user_courses(canvas_user_id) or []
#     except Exception as e:
#         abort(502, message=f"failed to fetch courses: {e}")

#     # fetch modules for each course
#     all_modules = []
#     errors = []

#     for c in courses:
#         cid = c.get("id") or c.get("canvas_course_id")
#         if not cid:
#             continue
#         try:
#             modules = get_course_modules(int(cid)) or []
#             all_modules.extend(modules)
#         except Exception as e:
#             # keep going; report partial failures
#             errors.append({"course_id": cid, "error": str(e)})

#     # Optional: if you want to hard-fail when any course fails, replace the above with abort.
#     if errors and not all_modules:
#         abort(502, message="failed to fetch modules for all courses", errors=errors)

#     return all_modules




# @canvas_blp.route("/courses/<int:course_id>/modules", methods=["GET"])
# @canvas_blp.response(200, ModuleSchema(many=True))
# def list_modules(course_id):
#     """GET /canvas/courses/<course_id>/modules

#     Returns modules for a given course id.
#     """
#     try:
#         return get_course_modules(course_id)
#     except Exception as e:
#         abort(502, message=str(e))



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
# User
# ---------------------------
@canvas_blp.route("/user", methods=["GET"])
@canvas_blp.response(200, UserSchema)
def get_user():
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
    try:
        user = get_user_information()
        return get_user_courses(user["id"])
    except Exception as e:
        abort(502, message=str(e))


@canvas_blp.route("/courses/<int:course_id>", methods=["GET"])
@canvas_blp.response(200, CourseSchema)
def get_single_course(course_id):
    """Includes syllabus_body"""
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
    try:
        return get_course_modules(course_id)
    except Exception as e:
        abort(502, message=str(e))


@canvas_blp.route("/courses/<int:course_id>/modules/<int:module_id>/items", methods=["GET"])
@canvas_blp.response(200, ModuleItemSchema(many=True))
def list_module_items(course_id, module_id):
    try:
        return get_module_items(course_id, module_id)
    except Exception as e:
        abort(502, message=str(e))


# ---------------------------
# Assignments
# ---------------------------
@canvas_blp.route("/courses/<int:course_id>/assignments", methods=["GET"])
@canvas_blp.response(200, AssignmentSchema(many=True))
def list_assignments(course_id):
    try:
        return get_course_assignments(course_id)
    except Exception as e:
        abort(502, message=str(e))


@canvas_blp.route("/courses/<int:course_id>/assignments/<int:assignment_id>", methods=["GET"])
@canvas_blp.response(200, AssignmentSchema)
def get_assignment(course_id, assignment_id):
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
    try:
        return get_course_quizzes(course_id)
    except Exception as e:
        abort(502, message=str(e))


@canvas_blp.route("/courses/<int:course_id>/quizzes/<int:quiz_id>", methods=["GET"])
@canvas_blp.response(200, QuizSchema)
def get_quiz(course_id, quiz_id):
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
    try:
        return get_course_files(course_id)
    except Exception as e:
        abort(502, message=str(e))


# ---------------------------
# Pages (Canvas wiki / lecture notes)
# ---------------------------
@canvas_blp.route("/courses/<int:course_id>/pages", methods=["GET"])
def list_pages(course_id):
    try:
        return get_course_pages(course_id)
    except Exception as e:
        abort(502, message=str(e))
