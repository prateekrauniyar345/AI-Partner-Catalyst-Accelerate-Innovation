import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Footer } from '../../components/dashboard/Footer'
import { signup } from '../../services/authServices'

export default function SignUp() {

export default function SignUp() {

  // Passkey/Auth0 removed — fallback to standard signup for now

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  function handlePasskeySignup() {
    // Redirect user to normal signup flow (passkeys disabled)
    navigate('/signup')
  }

  function validate() {
    if (!firstName || !username || !email || !password) return 'Please fill required fields.'
    if (password.length < 6) return 'Password must be at least 6 characters.'
    if (password !== confirm) return "Passwords don't match."
    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    const v = validate()
    if (v) { setError(v); return }

    if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return }

    setLoading(true)
    try {
      const payload = { first_name: firstName, last_name: lastName, username, email, password }
      const data = await signup(payload)
      // signup may require email verification; if session was created cookies are set
      console.log("Signup response data:", data);
      if (data && (data.session || data.access_token || data.user?.confirmed_at || data.user?.email_confirmed_at)) {
        navigate('/')
      } else {
        // likely requires email confirmation
        setSuccess('Signup successful — please check your email to confirm your account.')
        // optionally redirect to signin after brief delay
        navigate(`/verify?email=${encodeURIComponent(email)}`)
      }
    } catch {
      setError('Sign up failed — please check your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleGoogle() {
    window.location.href = '/auth/google'
  }

  return (
    <>
      <div className="mt-4 d-flex align-items-center justify-content-center min-vh-100" style={{ background: '#fff' }}>
        <div className="mt-4 card shadow-sm" style={{ width: 520, borderRadius: 12 }}>
          <div className="card-body p-4">
            
            {/* top nav is provided by App; footer shown below */}

            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && <div className="alert alert-success py-2">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col mb-3">
                  <label className="form-label">First name</label>
                  <input className="form-control" value={firstName} placeholder='John' onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="col mb-3">
                  <label className="form-label">Last name</label>
                  <input className="form-control" value={lastName} placeholder='Doe' onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} placeholder="you@domain.com" onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm password</label>
                <input type="password" className="form-control" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </div>

              <Button type="submit" className="w-100 mb-3" disabled={loading} style={{ background: 'linear-gradient(90deg,#7c3aed,#ec4899)', border: 'none' }}>
                {loading ? 'Creating account…' : 'Create account'}
              </Button>
            </form>

            <div className="text-center mb-2">
              <small className="text-muted">or create account with</small>
            </div>

            <div className="d-grid gap-2">
              <Button variant="outline-secondary" onClick={handleGoogle}>
                <i className="bi bi-google me-2" /> Continue with Google
              </Button>

              <Button variant="outline-secondary" onClick={handlePasskeySignup}>
                Continue with Passkey / Face ID
              </Button>


              <Button variant="outline-secondary" onClick={() => navigate('/signin')}>
                Already have an account? Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}