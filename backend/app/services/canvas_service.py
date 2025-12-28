import os
from urllib.parse import urljoin
import requests
from typing import Optional, Dict, Any

# -------------------------------------------------------------------
# Canvas configuration
# -------------------------------------------------------------------
CANVAS_API_URL = os.getenv("CANVAS_API_URL", "https://canvas.instructure.com/api/v1")
CANVAS_API_TOKEN = os.getenv("CANVAS_API_TOKEN")

if not CANVAS_API_TOKEN:
    raise RuntimeError("CANVAS_API_TOKEN is not set")

HEADERS = {
    "Authorization": f"Bearer {CANVAS_API_TOKEN}"
}


# -------------------------------------------------------------------
# Internal helper
# -------------------------------------------------------------------
def _get(path: str, params: Optional[Dict[str, Any]] = None):
    """
    Perform a GET request to Canvas API.
    """
    url = urljoin(CANVAS_API_URL.rstrip("/") + "/", path.lstrip("/"))
    resp = requests.get(url, headers=HEADERS, params=params)
    resp.raise_for_status()
    return resp.json()


# -------------------------------------------------------------------
# User
# -------------------------------------------------------------------
def get_user_information():
    """
    GET /users/self
    """
    return _get("/users/self")


# -------------------------------------------------------------------
# Courses
# -------------------------------------------------------------------
def get_user_courses(canvas_user_id: int, params: Optional[Dict[str, Any]] = None):
    """
    GET /users/:id/courses
    """
    params = params or {"per_page": 100}
    return _get(f"/users/{canvas_user_id}/courses", params=params)


def get_course(course_id: int, include_syllabus: bool = False):
    """
    GET /courses/:id
    Optionally include syllabus_body
    """
    params = {}
    if include_syllabus:
        params["include[]"] = "syllabus_body"

    return _get(f"/courses/{course_id}", params=params)


# -------------------------------------------------------------------
# Modules
# -------------------------------------------------------------------
def get_course_modules(course_id: int, params: Optional[Dict[str, Any]] = None):
    """
    GET /courses/:course_id/modules
    """
    params = params or {"per_page": 100}
    return _get(f"/courses/{course_id}/modules", params=params)


def get_module_items(course_id: int, module_id: int, params: Optional[Dict[str, Any]] = None):
    """
    GET /courses/:course_id/modules/:module_id/items
    """
    params = params or {"per_page": 100}
    return _get(
        f"/courses/{course_id}/modules/{module_id}/items",
        params=params,
    )


# -------------------------------------------------------------------
# Assignments
# -------------------------------------------------------------------
def get_course_assignments(course_id: int, assignment_id: Optional[int] = None):
    """
    GET /courses/:course_id/assignments
    GET /courses/:course_id/assignments/:id
    """
    if assignment_id:
        return _get(f"/courses/{course_id}/assignments/{assignment_id}")

    return _get(
        f"/courses/{course_id}/assignments",
        params={"per_page": 100},
    )


# -------------------------------------------------------------------
# Quizzes
# -------------------------------------------------------------------
def get_course_quizzes(course_id: int, quiz_id: Optional[int] = None):
    """
    GET /courses/:course_id/quizzes
    GET /courses/:course_id/quizzes/:id
    """
    if quiz_id:
        return _get(f"/courses/{course_id}/quizzes/{quiz_id}")

    return _get(
        f"/courses/{course_id}/quizzes",
        params={"per_page": 100},
    )


# -------------------------------------------------------------------
# Files (PDFs, slides, lecture notes)
# -------------------------------------------------------------------
def get_course_files(course_id: int):
    """
    GET /courses/:course_id/files
    """
    return _get(
        f"/courses/{course_id}/files",
        params={"per_page": 100},
    )


# -------------------------------------------------------------------
# Pages (Canvas wiki / lecture content)
# -------------------------------------------------------------------
def get_course_pages(course_id: int):
    """
    GET /courses/:course_id/pages
    """
    return _get(
        f"/courses/{course_id}/pages",
        params={"per_page": 100},
    )
