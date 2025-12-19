from supabse import create_client, Client
from ..config.config import SupabaseConfig

supabase_config = SupabaseConfig()

url = supabase_config.url
key = supabase_config.api_key

# create the Supabase client
supabase: Client = create_client(url, key)


def sign_up_user( email, password ):
    '''
    When a user signs up via the backend, Supabase automatically sends a 
    confirmation email if "Confirm Email" is enabled in your project dashboard.
    '''
    try:
        #  options allows you to set a redirect URL forf when they cliclk the link in the email
        res = supabase.auth.sign_up({
            "email": email,
            "password": password, 
            "options": {
                "emailRedirectTo": "http://localhost:3000"
            }
        })
        return res
    except Exception as e:
        print("Error signing up user:", e)
        return None


def send_magic_link(email):
    '''
    Magic links use the sign_in_with_otp method. By default, 
    this sends a login link to the user's email.
    '''
    try:
        # should_create_user=True (default) allows new users to sign up via magic link
        res = supabase.auth.sign_in_with_otp({
            "email": email,
            "options": {
                "email_redirect_to": "http://localhost:3000",
                "should_create_user": True 
            }
        })
        return res
    except Exception as e:
        print(f"Error: {e}")