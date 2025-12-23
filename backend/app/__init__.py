from flask import Flask, request, redirect, url_for, render_template
from flask_cors import CORS
from .config.config import Config
from flask_smorest import Api
import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env file


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    allowed_origins = os.getenv("ALLOWED_ORIGINS", "")
    origins = [o.strip() for o in allowed_origins.split(",") if o.strip()] or "*"

    CORS(
        app,
        resources={r"/*": {"origins": origins}},
        supports_credentials=True,
    )

    # OpenAPI / Swagger settings
    app.config.update(
        # app title eg : VoiceEd Ally API
        API_TITLE="VoiceEd Ally API",
        # base path for the API endpoints eg: / v1
        API_VERSION="/v1",
        OPENAPI_VERSION="3.0.3",
        OPENAPI_URL_PREFIX="/v1",              
        OPENAPI_SWAGGER_UI_PATH="/swagger-ui",
        OPENAPI_SWAGGER_UI_URL="https://cdn.jsdelivr.net/npm/swagger-ui-dist/",
    )
    api = Api(app)

    # register route blueprints
    from app.api.users import users_blp
    from app.api.auth import auth_blp
    from app.api.default import default_blp
    api.register_blueprint(users_blp)
    api.register_blueprint(auth_blp)
    api.register_blueprint(default_blp)

    return app