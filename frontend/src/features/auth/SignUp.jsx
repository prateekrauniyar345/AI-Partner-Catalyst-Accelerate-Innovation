import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: call backend signup endpoint
    console.log('sign up', { name, email, password });
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-3 text-center">Create account</h3>
              <p className="text-center text-muted">Join VoiceEd Ally — learn hands-free</p>

              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                  <label className="form-label">Full name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person-fill" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope-fill" />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock-fill" />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-success" type="submit">
                    <i className="bi bi-person-plus me-2" /> Create account
                  </button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <small className="text-muted">Already have an account? </small>
                <Link to="/signin" className="ms-1">Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
