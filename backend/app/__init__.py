from flask import Flask, request, redirect, url_for, render_template
from flask_cors import CORS
from .config.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    return app