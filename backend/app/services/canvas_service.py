import os
from urllib.parse import urljoin
import requests

CANVAS_API_URL = os.getenv("CANVAS_API_URL", "https://canvas.instructure.com/api/v1")
CANVAS_API_TOKEN = os.getenv("CANVAS_API_TOKEN")
HEADERS = {"Authorization": f"Bearer {CANVAS_API_TOKEN}"} if CANVAS_API_TOKEN else {}


def _get(path: str, params: dict | None = None):
    url = urljoin(CANVAS_API_URL.rstrip("/") + "/", path.lstrip("/"))
    resp = requests.get(url, headers=HEADERS, params=params)
    resp.raise_for_status()
    return resp.json()


def get_user_courses(canvas_user_id: str, params: dict | None = None):
    """Fetch courses for a given Canvas user id.

    canvas_user_id: typically the Canvas user's ID (string or int).
    """
    path = f"/users/{canvas_user_id}/courses"
    return _get(path, params=params)


def get_course_modules(course_id: int, params: dict | None = None):
    path = f"/courses/{course_id}/modules"
    return _get(path, params=params)


def get_module_items(course_id: int, module_id: int, params: dict | None = None):
    path = f"/courses/{course_id}/modules/{module_id}/items"
    return _get(path, params=params)
