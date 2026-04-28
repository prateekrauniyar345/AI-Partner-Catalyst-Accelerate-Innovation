// projectsApi.js
// Same-origin requests through the Vite proxy. The backend identifies
// the user from the access_token cookie set at signin (require_auth +
// get_current_user_id), so we never need to pass user_id from the client.
const API_PREFIX = '/projects';

async function request(path, opts = {}) {
  const res = await fetch(path, { credentials: 'include', ...opts });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    console.error(`projectsApi ${opts.method || 'GET'} ${path} failed:`, res.status, data);
    const err = new Error(data?.message || res.statusText);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

export async function fetchProjects(queryParams = {}) {
  const qs = new URLSearchParams(queryParams).toString();
  const path = qs ? `${API_PREFIX}/?${qs}` : `${API_PREFIX}/`;
  return request(path);
}

export async function createProject(payload) {
  return request(`${API_PREFIX}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function updateProject(id, payload) {
  return request(`${API_PREFIX}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function deleteProject(id) {
  return request(`${API_PREFIX}/${id}`, { method: 'DELETE' });
}