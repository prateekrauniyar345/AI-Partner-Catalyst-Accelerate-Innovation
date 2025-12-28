from flask_smorest import Blueprint, abort
from flask import request

from ..services.canvas_service import (
    get_user_information,
    get_user_courses,
    get_course_modules,
    # get_module_items,
)
from ..schemas.canvas import (
    UserSchema, 
    CourseSchema, 
    CoursesQuerySchema, 
    ModuleSchema, 
    ModuleItemSchema,
    ModulesQuerySchema
)


canvas_blp = Blueprint("canvas", __name__, url_prefix="/canvas", description="Canvas proxy endpoints")


@canvas_blp.route("/user/information", methods=["GET"])
@canvas_blp.response(200, UserSchema(many=False))
def user_information():
    """GET /canvas/user/information

    Returns information about the current user.
    """
    try:
        data = get_user_information()
    except Exception as e:
        abort(502, message=str(e))
    return data


@canvas_blp.route("/courses", methods=["GET"])
@canvas_blp.arguments(CoursesQuerySchema, location="query")
@canvas_blp.response(200, CourseSchema(many=True))
def list_courses(args):
    canvas_user_id = args.get("canvas_user_id")

    if not canvas_user_id:
        try:
            user_info = get_user_information()
            canvas_user_id = str(user_info.get("id")) if user_info else None
        except Exception as e:
            abort(502, message=f"failed to fetch canvas user info: {e}")

    if not canvas_user_id:
        abort(400, message="canvas_user_id query parameter required")

    try:
        return get_user_courses(canvas_user_id)
    except Exception as e:
        abort(502, message=str(e))


# ----------------------------------
#  modules endpoint with flexible course_id
# ----------------------------------
@canvas_blp.route("/courses/modules", methods=["GET"])
@canvas_blp.arguments(ModulesQuerySchema, location="query")
@canvas_blp.response(200, ModuleSchema(many=True))
def list_modules_flexible(args):
    """
    GET /canvas/courses/modules?course_id=<id>

    If course_id is provided, returns modules for that course.
    If omitted, fetches all courses for the current user, then returns modules for all those courses.
    """
    course_id = args.get("course_id")

    # Case A: user provided a single course_id
    if course_id:
        try:
            return get_course_modules(course_id)
        except Exception as e:
            abort(502, message=str(e))

    # Case B: fallback -> modules for ALL courses
    canvas_user_id = args.get("canvas_user_id")

    # resolve user id if needed
    if not canvas_user_id:
        try:
            user_info = get_user_information()
            canvas_user_id = str(user_info.get("id")) if user_info else None
        except Exception as e:
            abort(502, message=f"failed to fetch canvas user info: {e}")

    if not canvas_user_id:
        abort(400, message="Unable to resolve canvas_user_id")

    # fetch courses
    try:
        courses = get_user_courses(canvas_user_id) or []
    except Exception as e:
        abort(502, message=f"failed to fetch courses: {e}")

    # fetch modules for each course
    all_modules = []
    errors = []

    for c in courses:
        cid = c.get("id") or c.get("canvas_course_id")
        if not cid:
            continue
        try:
            modules = get_course_modules(int(cid)) or []
            all_modules.extend(modules)
        except Exception as e:
            # keep going; report partial failures
            errors.append({"course_id": cid, "error": str(e)})

    # Optional: if you want to hard-fail when any course fails, replace the above with abort.
    if errors and not all_modules:
        abort(502, message="failed to fetch modules for all courses", errors=errors)

    return all_modules




@canvas_blp.route("/courses/<int:course_id>/modules", methods=["GET"])
@canvas_blp.response(200, ModuleSchema(many=True))
def list_modules(course_id):
    """GET /canvas/courses/<course_id>/modules

    Returns modules for a given course id.
    """
    try:
        return get_course_modules(course_id)
    except Exception as e:
        abort(502, message=str(e))



