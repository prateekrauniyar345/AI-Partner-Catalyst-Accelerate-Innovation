import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import SignIn from './features/auth/SignIn'
import SignUp from './features/auth/SignUp'
import Dashboard from './pages/Dashboard'


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
