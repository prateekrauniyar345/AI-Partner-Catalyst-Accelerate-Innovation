from flask import Blueprint, request, jsonify
from flask.views import MethodView
from marshmallow import Schema, fields
from .auth.supabase_client import sign_up_user, send_magic_link


auth_blp = Blueprint(
    "auth", 
    __name__, 
    url_prefix="/auth",
    description="Authentication operations",
)


# @auth_blp.route("/signup", methods=["POST"])
# def