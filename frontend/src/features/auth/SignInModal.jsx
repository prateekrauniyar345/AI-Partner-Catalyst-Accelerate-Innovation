import React, { useEffect, useState } from 'react'

export default function SignInModal({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please enter email and password.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) { setError(data?.message || 'Sign in failed'); setLoading(false); return }
      if (data.token) localStorage.setItem('token', data.token)
      onSuccess && onSuccess(data)
      onClose && onClose()
    } catch (err) {
      setError('Network error — try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ position: 'fixed', inset: 0, zIndex: 1050 }}>
      <div className="position-absolute" style={{ inset: 0, background: 'rgba(0,0,0,0.7)' }} onClick={onClose} />
      <div className="card shadow" role="dialog" aria-modal="true" style={{ width: 480, zIndex: 1060, borderRadius: 12 }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 className="mb-0">Sign in to VoiceEd Ally</h5>
              <small className="text-muted">Voice-first learning — continue with your account</small>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>Close</button>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn text-white" style={{ background: 'linear-gradient(90deg,#7c3aed,#ec4899)', border: 'none' }} disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => { window.location.href = '/auth/google' }}>
                <i className="bi bi-google me-2" /> Continue with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
