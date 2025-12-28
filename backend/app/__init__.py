from flask import Flask, request, redirect, url_for, render_template
from flask_cors import CORS
from .config.config import Config
from flask_smorest import Api
import os
from dotenv import load_dotenv
import logging
from logging.handlers import RotatingFileHandler

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

    def configure_logging(app):
        # ensure a logs directory inside the app package
        logs_dir = os.path.join(app.root_path, "logs")
        os.makedirs(logs_dir, exist_ok=True)

        # common formatter
        formatter = logging.Formatter("%(asctime)s %(name)s %(levelname)s %(message)s")

        # --- Backend file handler ---
        backend_log_path = os.path.join(logs_dir, "backend_logs.txt")
        backend_handler = RotatingFileHandler(
            backend_log_path, maxBytes=2_000_000, backupCount=5, encoding="utf-8"
        )
        backend_handler.setLevel(logging.INFO)
        backend_handler.setFormatter(formatter)

        # --- Root (console) handler ---
        console_handler_present = False
        root = logging.getLogger()
        # avoid duplicate stream handlers when reloading
        for h in getattr(root, "handlers", []):
            if isinstance(h, logging.StreamHandler):
                console_handler_present = True
                break

        if not console_handler_present:
            stream_handler = logging.StreamHandler()
            stream_handler.setLevel(logging.INFO)
            stream_handler.setFormatter(formatter)
            root.addHandler(stream_handler)

        # set root level and add backend file handler if not already added
        root.setLevel(logging.INFO)
        if not any(getattr(h, "baseFilename", None) == backend_log_path for h in getattr(root, "handlers", [])):
            root.addHandler(backend_handler)

        # --- Frontend file handler (incoming browser logs) ---
        frontend_log_path = os.path.join(logs_dir, "frontend_logs.txt")
        frontend_handler = RotatingFileHandler(
            frontend_log_path, maxBytes=2_000_000, backupCount=5, encoding="utf-8"
        )
        frontend_handler.setLevel(logging.INFO)
        frontend_handler.setFormatter(formatter)

        frontend_logger = logging.getLogger("frontend")
        frontend_logger.setLevel(logging.INFO)
        if not any(getattr(h, "baseFilename", None) == frontend_log_path for h in getattr(frontend_logger, "handlers", [])):
            frontend_logger.addHandler(frontend_handler)
        # allow frontend logger messages to propagate to root (console)
        frontend_logger.propagate = True


    api = Api(app)
    # set up file-based logging handlers (backend + frontend logs)
    configure_logging(app)

    # register route blueprints
    from app.api.users import users_blp
    from app.api.auth import auth_blp
    from app.api.default import default_blp
    from .api.logs import logs_blp
    from app.api.canvas import canvas_blp
    api.register_blueprint(users_blp)
    api.register_blueprint(auth_blp)
    api.register_blueprint(default_blp)
    api.register_blueprint(logs_blp)
    api.register_blueprint(canvas_blp)

    return app