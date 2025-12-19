from flask_smorest import Blueprint, abort
from flask.views import MethodView
from marshmallow import Schema, fields
from ..schemas.users import UserSchema, CreateUserSchema

blp = Blueprint("users", __name__, url_prefix="/users", description="User operations")


@blp.route("/", methods=["GET"])
@blp.response(200, UserSchema(many=True))
def list_users():
    return [{"id": 1, "name": "Alice"}]

@blp.route("/", methods=["POST"])
@blp.arguments(CreateUserSchema)
@blp.response(201, UserSchema)
def create_user(data):
    return {"id": 2, "name": data["name"]}
