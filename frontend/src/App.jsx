import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './features/auth/SignIn'
import SignUp from './features/auth/SignUp'
import Dashboard from './pages/Dashboard'
import Navbar from './components/dashboard/Navbar'
import VerifyEmail from './features/auth/VerifyEmail'


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyEmail />} />
      </Routes>
    </>
  )
}

export default App
