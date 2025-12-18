import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import SignIn from './features/auth/SignIn'
import SignUp from './features/auth/SignUp'
import Dashboard from './pages/Dashboard'

function Home() {
  return (
    <div className="container py-5">
      <div className="text-center">
        <h1 className="display-5">VoiceEd Ally</h1>
        <p className="lead text-muted">An inclusive, voice-driven educational companion</p>
        <div className="mt-4">
          <Link to="/signin" className="btn btn-primary me-2">Sign in</Link>
          <Link to="/signup" className="btn btn-success">Create account</Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">VoiceEd Ally</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
