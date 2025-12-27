from flask_smorest import Blueprint, abort
from flask import request

from ..services.canvas_service import (
    get_user_courses,
    get_course_modules,
    get_module_items,
)
from ..schemas.canvas import CourseSchema, ModuleSchema, ModuleItemSchema


canvas_blp = Blueprint("canvas", __name__, url_prefix="/canvas", description="Canvas proxy endpoints")


@canvas_blp.route("/courses", methods=["GET"])
@canvas_blp.response(200, CourseSchema(many=True))
def list_courses():
    """GET /canvas/courses?canvas_user_id=<id>

    Returns the list of courses for the provided Canvas user id. `canvas_user_id` is required.
    """
    canvas_user_id = request.args.get("canvas_user_id")
    if not canvas_user_id:
        abort(400, message="canvas_user_id query parameter required")
    try:
        data = get_user_courses(canvas_user_id)
    except Exception as e:
        abort(502, message=str(e))
    return data


@canvas_blp.route("/courses/<int:course_id>/modules", methods=["GET"])
@canvas_blp.response(200, ModuleSchema(many=True))
def list_modules(course_id):
    """GET /canvas/courses/<course_id>/modules

    Returns modules for a given course id.
    """
    try:
        data = get_course_modules(course_id)
    except Exception as e:
        abort(502, message=str(e))
    return data


@canvas_blp.route("/courses/<int:course_id>/modules/<int:module_id>/items", methods=["GET"])
@canvas_blp.response(200, ModuleItemSchema(many=True))
def list_module_items(course_id, module_id):
    """GET /canvas/courses/<course_id>/modules/<module_id>/items

    Returns module items for a given course/module.
    """
    try:
        data = get_module_items(course_id, module_id)
    except Exception as e:
        abort(502, message=str(e))
    return data
