import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Footer } from '../../components/landingDashboard/Footer'
import { signin } from '../../services/authServices'
import { useUser } from '../../contexts/userContext'

// signiin with auth0
// Auth0 removed — passkey/login handled by our app later

export default function SignIn() {

  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  function handlePasskeyLogin() {
    // Passkey/Auth0 removed — redirect user to signup page for now
    navigate('/signup')
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    try {
      const payload = { email, password }
      const data = await signin(payload)
      console.log("Signin response data:", data);
      // Persist user in context (tokens stored as HttpOnly cookies)
      const user = data?.user || data
      if (user) login(user)
      navigate('/dashboard')
    } catch (err) {
      // err may be a thrown response body from authServices
      const msg = (err && (err.message || err.error || err.detail)) || 'Sign in failed — try again.'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  function handleGoogle() {
    // Opens backend OAuth endpoint; backend should redirect back on success.
    window.location.href = '/auth/google'
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: '#fff' }}>
        <div className="card shadow-sm" style={{ width: 480, borderRadius: 12 }}>
          <div className="card-body p-4" >

            {/* top nav is provided by App; footer shown below */}

            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && <div className="alert alert-success py-2">{success}</div>}

            <form onSubmit={handleSubmit} className="mb-3">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <input id="remember" type="checkbox" className="form-check-input" />
                  <label htmlFor="remember" className="form-check-label ms-2">Remember me</label>
                </div>
                <a href="#" className="small">Forgot?</a>
              </div>

              <Button type="submit" 
                className="w-100 mb-2" 
                disabled={loading} 
                style={{ background: 'linear-gradient(90deg,#7c3aed,#ec4899)', border: 'none' }}>
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>

            <div className="text-center mb-2">
              <small className="text-muted">or continue with</small>
            </div>

            <div className="d-grid gap-2">
              <Button variant="outline-secondary" onClick={handleGoogle}>
                <i className="bi bi-google me-2" /> Continue with Google
              </Button>

              <Button variant="outline-secondary" onClick={handlePasskeyLogin}>
                Continue with Passkey / Face ID
              </Button>

              <Button variant="outline-secondary" onClick={() => navigate('/signup')}>
                Create an account
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}