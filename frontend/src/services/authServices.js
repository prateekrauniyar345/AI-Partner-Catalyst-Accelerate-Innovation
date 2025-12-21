const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'
console.log("API URL:", API);


// ------------------------------- 
// signup function works as :
// - takes payload with email and password
// - makes POST request to /auth/signup
// -------------------------------
export async function signup(payload) {
  if (!payload || !payload.email || !payload.password) {
    throw new Error("Email and password are required for signup");
  }
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" 
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}


// ------------------------------- 
// signIn function works as :
// - takes email and password
// - makes POST request to /auth/signin
// -------------------------------
export async function signin(payload) {
  if (!payload || !payload.email || !payload.password) {
    throw new Error("Email and password are required for SignIn");
  }
  const res = await fetch(`${API}/auth/signin`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" 
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}


// ------------------------------- 
// refreshToken function works as :
// - takes no arguments
// - makes POST request to /auth/refresh relying on HttpOnly refresh cookie (no localStorage)
// -------------------------------
export async function refreshToken(refresh_token = null) {
  // If using HttpOnly refresh cookie, call without body and include credentials.
  const body = refresh_token ? JSON.stringify({ refresh_token }) : null;
  const res = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" 
    },
    credentials: "include",
    body,
  });
  const data = await res.json();
  if (!res.ok) throw data;
  // Do not store HttpOnly tokens in JS; return server response for UI handling.
  return data;
}




// ------------------------------- 
// verifyOTP function works as :
// - takes payload with email and token
// - makes POST request to /auth/verify
// -------------------------------
export async function verifyOTP(payload) {
  if (!payload || !payload.email || !payload.token || !payload.type) {
    throw new Error("email, token and type are required for OTP verification");
  }
  const res = await fetch(`${API}/auth/verify`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" 
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}




// ------------------------------- 
// Password Reset Functions
// -------------------------------
export async function requestPasswordReset(email) {
  if (!email) throw new Error("email is required to request password reset");
  const res = await fetch(`${API}/auth/password-reset/request`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" 
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}



// ------------------------------- 
// confirmPasswordReset function works as :
// - takes payload with reset_token and new_password
// - makes POST request to /auth/password-reset/confirm
// -------------------------------
export async function confirmPasswordReset(payload) {
  if (!payload || !payload.reset_token || !payload.new_password) {
    throw new Error("reset_token and new_password are required to confirm password reset");
  }
  const res = await fetch(`${API}/auth/password-reset/confirm`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" 
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

