from flask_smorest import Blueprint, abort
from flask.views import MethodView
from marshmallow import Schema, fields

blp = Blueprint("users", __name__, url_prefix="/users", description="User operations")

class UserSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)

class CreateUserSchema(Schema):
    name = fields.Str(required=True)

@blp.route("/")
class UsersResource(MethodView):
    @blp.response(200, UserSchema(many=True))
    def get(self):
        return [{"id": 1, "name": "Alice"}]

    @blp.arguments(CreateUserSchema)
    @blp.response(201, UserSchema)
    def post(self, data):
        # data is validated automatically
        return {"id": 2, "name": data["name"]}
