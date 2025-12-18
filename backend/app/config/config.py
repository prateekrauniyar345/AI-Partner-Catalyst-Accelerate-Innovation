from pydantic import Field
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os
import sys

# load the environment variables from a .env file
load_dotenv()


class Config(BaseSettings):
    FLASK_ENV: str = Field(os.getenv("FLASK_ENV"), description="The Flask environment (development, production, etc.)")
    FLASK_DEBUG: bool = Field(os.getenv("FLASK_DEBUG") == "True", description="Enable or disable Flask debug mode")
    FLASK_APP: str = Field(os.getenv("FLASK_APP"), description="The Flask application entry point") 
    FLASK_HOST: str = Field(os.getenv("FLASK_HOST", "0.0.0.0"), description="The Flask host address")
    FLASK_PORT: int = Field(int(os.getenv("FLASK_PORT", 5000)), description="The Flask port number")




    