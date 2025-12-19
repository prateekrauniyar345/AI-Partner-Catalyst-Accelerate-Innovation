from supabase import create_client, Client
from ..config.config import SupabaseConfig

supabase_config = SupabaseConfig()


def get_supabase() -> Client:
    url = supabase_config.SUPABASE_URL
    key = supabase_config.SUPABASE_API_KEY
    if not url or not key:
        raise RuntimeError("Supabase URL or Service Role key not set")
    return create_client(url, key)

supabase_client = get_supabase()