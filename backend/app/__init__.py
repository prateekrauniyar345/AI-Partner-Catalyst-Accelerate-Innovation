from flask import Flask, request, redirect, url_for, render_template
from flask_cors import CORS
from .config.config import Config
from flask_smorest import Api


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    # OpenAPI / Swagger settings
    app.config.update(
        API_TITLE="My API",
        API_VERSION="v1",
        OPENAPI_VERSION="3.0.3",
        OPENAPI_URL_PREFIX="/",              
        OPENAPI_SWAGGER_UI_PATH="/swagger-ui",
        OPENAPI_SWAGGER_UI_URL="https://cdn.jsdelivr.net/npm/swagger-ui-dist/",
    )
    api = Api(app)

    # register route blueprints
    from app.api.users import blp as users_blp
    api.register_blueprint(users_blp)

    return app