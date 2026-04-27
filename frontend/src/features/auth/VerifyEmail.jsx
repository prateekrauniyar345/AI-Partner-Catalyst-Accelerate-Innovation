import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Footer } from '../../components/landingDashboard/Footer'
import Button from 'react-bootstrap/Button'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function parseHashParams(hash) {
  const params = new URLSearchParams(hash.replace('#', ''))
  return {
    access_token: params.get('access_token'),
    refresh_token: params.get('refresh_token'),
    type: params.get('type'),
    expires_at: params.get('expires_at'),
  }
}

export default function VerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // Check for tokens in URL hash (from Supabase email confirmation link)
    const hashParams = parseHashParams(location.hash)
    const queryParams = new URLSearchParams(location.search)
    
    const email = queryParams.get('email') || ''
    const code = queryParams.get('code') || ''
    const type = queryParams.get('type') || 'signup'
    const accessToken = hashParams.access_token
    const refreshToken = hashParams.refresh_token

    // Case 1: Tokens in URL hash (Supabase just confirmed email)
    if (accessToken && refreshToken) {
      setSuccess('Email confirmed! Logging you in...')
      handleTokensFromHash(accessToken, refreshToken)
    }
    // Case 2: Manual code verification (fallback)
    else if (code) {
      verifyToken(email, code, type)
    }
    // Case 3: Just showing the verify page
    else {
      setLoading(false)
    }
  }, [location.hash, location.search])

  async function handleTokensFromHash(accessToken, refreshToken) {
    try {
      // Store tokens as cookies via backend
      const response = await fetch('http://localhost:5000/auth/set-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
      })

      if (!response.ok) {
        throw new Error('Failed to set session tokens')
      }

      setSuccess('Email confirmed! Redirecting to sign in...')
      setTimeout(() => {
        navigate('/signin')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to complete email verification')
      setLoading(false)
    }
  }

  async function verifyToken(email, code, type) {
    try {
      const response = await fetch('http://localhost:5000/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          token: code,
          type: type
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Verification failed')
      }

      setSuccess('Email confirmed! Redirecting to sign in...')
      setTimeout(() => {
        navigate('/signin')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to verify email')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <div className="mt-5 mb-5 d-flex align-items-center justify-content-center min-vh-75" style={{ background: '#fff' }}>
          <div className="mt-5 mb-5 card shadow-sm" style={{ width: 600, borderRadius: 12 }}>
            <div className="card-body p-4 text-center">
              <h3>Verifying your email...</h3>
              <p className="text-muted">Please wait while we confirm your email.</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (success) {
    return (
      <>
        <div className="mt-5 mb-5 d-flex align-items-center justify-content-center min-vh-75" style={{ background: '#fff' }}>
          <div className="mt-5 mb-5 card shadow-sm" style={{ width: 600, borderRadius: 12 }}>
            <div className="card-body p-4 text-center">
              <h3 style={{ color: 'green' }}>✓ Email Confirmed!</h3>
              <p className="text-muted">{success}</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <div className="mt-5 mb-5 d-flex align-items-center justify-content-center min-vh-75" style={{ background: '#fff' }}>
          <div className="mt-5 mb-5 card shadow-sm" style={{ width: 600, borderRadius: 12 }}>
            <div className="card-body p-4 text-center">
              <h3 style={{ color: 'red' }}>Verification Failed</h3>
              <p className="text-muted">{error}</p>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button variant="outline-primary" onClick={() => navigate('/signin')}>Back to Sign in</Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="mt-5 mb-5 d-flex align-items-center justify-content-center min-vh-75" style={{ background: '#fff' }}>
        <div className="mt-5 mb-5  card shadow-sm" style={{ width: 600, borderRadius: 12 }}>
          <div className="card-body p-4 text-center">
            <h3>Confirm your email</h3>
            <p className="text-muted">
              We sent a confirmation email to your address.
              Open that email and follow the link to activate your account.
            </p>

            <p className="small text-muted">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button variant="outline-primary" onClick={() => navigate('/signin')}>Back to Sign in</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}