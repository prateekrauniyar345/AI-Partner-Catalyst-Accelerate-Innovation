from datetime import datetime
from flask_smorest import Blueprint, abort


default_blp = Blueprint("default", __name__, url_prefix="/", description="Default operations")

@default_blp.route("/", methods=["GET"])
def index():
    return {
        "message": "Welcome to the VoiceEd Ally API!",
        "status": "running",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }