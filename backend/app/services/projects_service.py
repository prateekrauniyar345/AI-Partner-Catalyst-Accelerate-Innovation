# services/projects_service.py
import os
from ..auth.supabase_client import supabase_client


supabase = supabase_client

def list_projects(user_id: str, query_params: dict = None):
    query = supabase.table("projects").select("*").eq("user_id", user_id)
    
    if query_params:
        if "id" in query_params:
            query = query.eq("id", query_params["id"])
        if "title" in query_params:
            # Map 'title' from API to 'name' in DB, using ilike for fuzzy match
            query = query.ilike("name", f"%{query_params['title']}%")
        if "description" in query_params:
            query = query.ilike("description", f"%{query_params['description']}%")
        if "subject" in query_params:
            query = query.ilike("subject", f"%{query_params['subject']}%")
        if "priority" in query_params:
            query = query.eq("priority", query_params["priority"])
        if "status" in query_params:
            query = query.eq("status", query_params["status"])
        if "due_date" in query_params:
            query = query.eq("due_date", query_params["due_date"].isoformat() if hasattr(query_params["due_date"], "isoformat") else query_params["due_date"])
            
    res = query.order("created_at", desc=True).execute()
    return res.data or []

def create_project(user_id: str, payload: dict):
    # Map title to name and include all other fields
    db_payload = {
        "user_id": user_id,
        "name": payload.get("title", "New Project"),
        "description": payload.get("description", ""),
        "subject": payload.get("subject", "General"),
        "priority": payload.get("priority", "medium"),
        "status": payload.get("status", "active")
    }
    if "due_date" in payload and payload["due_date"]:
        db_payload["due_date"] = payload["due_date"].isoformat() if hasattr(payload["due_date"], "isoformat") else payload["due_date"]

    res = supabase.table("projects").insert(db_payload).execute()
    return res.data[0] if res.data else None

def update_project(user_id: str, project_id: str, payload: dict):
    db_payload = {}
    if "title" in payload:
        db_payload["name"] = payload["title"]
    if "description" in payload:
        db_payload["description"] = payload["description"]
    if "subject" in payload:
        db_payload["subject"] = payload["subject"]
    if "priority" in payload:
        db_payload["priority"] = payload["priority"]
    if "status" in payload:
        db_payload["status"] = payload["status"]
    if "due_date" in payload:
        db_payload["due_date"] = payload["due_date"].isoformat() if hasattr(payload["due_date"], "isoformat") else payload["due_date"]
        
    res = (
        supabase.table("projects")
        .update(db_payload)
        .eq("id", project_id)
        .eq("user_id", user_id)
        .execute()
    )
    if not res.data:
        raise ValueError("Project not found or not owned by user")
    return res.data[0]

def delete_project(user_id: str, project_id: str):
    res = supabase.table("projects").delete().eq("id", project_id).eq("user_id", user_id).execute()
    return True
