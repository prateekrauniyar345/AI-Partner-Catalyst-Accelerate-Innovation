import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Footer } from '../../components/dashboard/Footer'
import Button from 'react-bootstrap/Button'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function VerifyEmail() {
  const query = useQuery()
  const email = query.get('email') || ''
  const navigate = useNavigate()

  return (
    <>
      <div className="mt-5 mb-5 d-flex align-items-center justify-content-center min-vh-75" style={{ background: '#fff' }}>
        <div className="mt-5 mb-5  card shadow-sm" style={{ width: 600, borderRadius: 12 }}>
          <div className="card-body p-4 text-center">
            <h3>Confirm your email</h3>
            <p className="text-muted">
              We sent a confirmation email to <strong>{email || 'your address'}</strong>.
              Open that email and follow the link (or enter the code) to activate your account.
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