# backend/app/api/users.py
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from marshmallow import Schema, fields
from ..schemas.users import UserSchema, CreateUserSchema

users_blp = Blueprint("users", __name__, url_prefix="/users", description="User operations")


@users_blp.route("/", methods=["GET"])
@users_blp.response(200, UserSchema(many=True))
def list_users():
    return [{"id": 1, "name": "Alice"}]

@users_blp.route("/", methods=["POST"])
@users_blp.arguments(CreateUserSchema)
@users_blp.response(201, UserSchema)
def create_user(data):
    return {"id": 2, "name": data["name"]}
