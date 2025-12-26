# backend/app/api/logs.py
import json
import logging
import os
from datetime import datetime
from flask import request, current_app
from flask_smorest import Blueprint, abort

logs_blp = Blueprint("logs", __name__, url_prefix="/logs", description="Log operations")

# Optional: dedicated logger name for frontend logs
frontend_logger = logging.getLogger("frontend")


def _get_client_ip():
    return (
        request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
        or request.headers.get("X-Real-IP")
        or request.remote_addr
        or "unknown"
    )


@logs_blp.route("/health", methods=["GET"])
def health():
    return {"status": "ok", "ts": datetime.utcnow().isoformat() + "Z"}, 200


@logs_blp.route("", methods=["POST"])
@logs_blp.route("/", methods=["POST"])
def ingest_log():
    """
    Accept logs from the frontend and write them to server logs (and to logs.txt if configured).

    Expected JSON:
    {
      "level": "info" | "warn" | "error" | "debug",
      "message": "string",
      "meta": { ... },
      "timestamp": "ISO string (optional)",
      "env": "development|production|..."
    }
    """
    if not request.is_json:
        abort(415, message="Content-Type must be application/json")

    data = request.get_json(silent=True) or {}
    level = (data.get("level") or "info").lower()
    message = data.get("message")
    meta = data.get("meta") or {}
    client_ts = data.get("timestamp")
    env = data.get("env")

    if not isinstance(message, str) or not message.strip():
        abort(400, message="`message` must be a non-empty string")

    if level not in {"debug", "info", "warn", "error"}:
        abort(400, message="`level` must be one of: debug, info, warn, error")

    # Safety: avoid huge payloads (someone could spam you)
    try:
        raw_size = len(json.dumps(data))
    except Exception:
        raw_size = 0

    max_size = int(current_app.config.get("FRONTEND_LOG_MAX_BYTES", 10_000))
    if raw_size and raw_size > max_size:
        abort(413, message=f"Log payload too large (max {max_size} bytes)")

    # Build a structured record (JSON line)
    record = {
        "ts_server": datetime.utcnow().isoformat() + "Z",
        "ts_client": client_ts,
        "env": env,
        "level": level,
        "message": message.strip(),
        "meta": meta,
        "path": request.path,
        "ip": _get_client_ip(),
        "user_agent": request.headers.get("User-Agent"),
        "referer": request.headers.get("Referer"),
        "origin": request.headers.get("Origin"),
    }

    # Write through Python logging (recommended).
    # Your logging config should route this to logs.txt.
    line = json.dumps(record, ensure_ascii=False)

    if level == "error":
        frontend_logger.error(line)
    elif level == "warn":
        frontend_logger.warning(line)
    elif level == "debug":
        frontend_logger.debug(line)
    else:
        frontend_logger.info(line)

    # Also append to a JSONL file under the app logs directory as a durable copy
    try:
        logs_dir = os.path.join(current_app.root_path, "logs")
        os.makedirs(logs_dir, exist_ok=True)
        frontend_file = os.path.join(logs_dir, "frontend_logs.txt")
        with open(frontend_file, "a", encoding="utf-8") as fh:
            fh.write(line + "\n")
    except Exception:
        # swallow file IO errors to avoid breaking ingestion
        pass

    return {"status": "ok"}, 200
