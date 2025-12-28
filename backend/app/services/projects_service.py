# services/projects_service.py
import os
from ..auth.supabase_client import supabase_client


supabase = supabase_client

def list_projects(user_id: str):
    res = supabase.table("projects").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return res.data or []

def create_project(user_id: str, payload: dict):
    payload = {**payload, "user_id": user_id}
    res = supabase.table("projects").insert(payload).select("*").single().execute()
    return res.data

def update_project(user_id: str, project_id: str, payload: dict):
    res = (
        supabase.table("projects")
        .update(payload)
        .eq("id", project_id)
        .eq("user_id", user_id)
        .select("*")
        .single()
        .execute()
    )
    if not res.data:
        raise ValueError("Project not found or not owned by user")
    return res.data

def delete_project(user_id: str, project_id: str):
    res = supabase.table("projects").delete().eq("id", project_id).eq("user_id", user_id).execute()
    return True
