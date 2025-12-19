import React, { useEffect, useState } from 'react'

export default function SignUpModal({ open, onClose, onSuccess }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  if (!open) return null

  function validate() {
    if (!firstName || !email || !password) return 'Please fill required fields.'
    if (password.length < 6) return 'Password must be at least 6 characters.'
    if (password !== confirm) return "Passwords don't match."
    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const v = validate()
    if (v) { setError(v); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      })
      const data = await res.json()
      if (!res.ok) { setError(data?.message || 'Sign up failed'); setLoading(false); return }
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
      <div className="card shadow" role="dialog" aria-modal="true" style={{ width: 520, zIndex: 1060, borderRadius: 12 }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 className="mb-0">Create your VoiceEd account</h5>
              <small className="text-muted">Get started with voice-first learning</small>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>Close</button>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col mb-3">
                <label className="form-label">First name</label>
                <input className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="col mb-3">
                <label className="form-label">Last name</label>
                <input className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm password</label>
              <input type="password" className="form-control" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn text-white" style={{ background: 'linear-gradient(90deg,#7c3aed,#ec4899)', border: 'none' }} disabled={loading}>
                {loading ? 'Creating account…' : 'Create account'}
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
