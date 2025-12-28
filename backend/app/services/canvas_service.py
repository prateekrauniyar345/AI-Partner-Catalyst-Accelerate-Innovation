import os
from urllib.parse import urljoin
import requests

CANVAS_API_URL = os.getenv("CANVAS_API_URL", "https://canvas.instructure.com/api/v1")
CANVAS_API_TOKEN = os.getenv("CANVAS_API_TOKEN")
HEADERS = {"Authorization": f"Bearer {CANVAS_API_TOKEN}"} if CANVAS_API_TOKEN else {}

def _get(path: str, params: dict | None = None):
    url = urljoin(CANVAS_API_URL.rstrip("/") + "/", path.lstrip("/"))
    # Hint: To get "all" results, add per_page=100 to params
    resp = requests.get(url, headers=HEADERS, params=params)
    resp.raise_for_status()
    return resp.json()

def get_user_information():
    path = "/users/self"
    return _get(path)   

def get_user_courses(canvas_user_id: str, params: dict | None = None):
    path = f"/users/{canvas_user_id}/courses"
    return _get(path, params=params)

def get_course_modules(course_id: int, params: dict | None = None):
    path = f"/courses/{course_id}/modules"
    return _get(path, params=params)

def get_course_assignments(course_id: int, params: dict | None = None):
    """Fetch all assignments for a course."""
    path = f"/courses/{course_id}/assignments"
    return _get(path, params=params)

def get_course_quizzes(course_id: int, params: dict | None = None):
    """Fetch all quizzes for a course."""
    path = f"/courses/{course_id}/quizzes"
    return _get(path, params=params)