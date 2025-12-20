import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './features/auth/SignIn'
import SignUp from './features/auth/SignUp'
import Dashboard from './pages/Dashboard'
import Navbar from './components/dashboard/Navbar'


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
