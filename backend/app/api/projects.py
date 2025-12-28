# backend/app/api/projects.py
from flask_smorest import Blueprint, abort
from ..schemas.projects import ProjectCreateSchema, ProjectUpdateSchema, ProjectOutSchema
from ..services.projects_service import (
    list_projects, create_project, update_project, delete_project
)
from .auth import require_auth, get_current_user_id  # <-- import from your auth api module

projects_blp = Blueprint("projects", __name__, url_prefix="/projects", description="Project CRUD")

@projects_blp.route("/", methods=["GET"])
@require_auth
@projects_blp.response(200, ProjectOutSchema(many=True))
def get_projects():
    user_id = get_current_user_id()
    try:
        return list_projects(user_id)
    except Exception as e:
        abort(502, message=str(e))

@projects_blp.route("/", methods=["POST"])
@require_auth
@projects_blp.arguments(ProjectCreateSchema)
@projects_blp.response(201, ProjectOutSchema)
def post_project(payload):
    user_id = get_current_user_id()
    try:
        return create_project(user_id, payload)
    except Exception as e:
        abort(502, message=str(e))

@projects_blp.route("/<string:project_id>", methods=["PATCH"])
@require_auth
@projects_blp.arguments(ProjectUpdateSchema)
@projects_blp.response(200, ProjectOutSchema)
def patch_project(payload, project_id):
    user_id = get_current_user_id()
    try:
        return update_project(user_id, project_id, payload)
    except Exception as e:
        abort(502, message=str(e))

@projects_blp.route("/<string:project_id>", methods=["DELETE"])
@require_auth
@projects_blp.response(204)
def remove_project(project_id):
    user_id = get_current_user_id()
    try:
        delete_project(user_id, project_id)
        return ""
    except Exception as e:
        abort(502, message=str(e))
