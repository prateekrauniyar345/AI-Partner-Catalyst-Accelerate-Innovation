import './App.css'
import { Routes, Route } from 'react-router-dom'

import SignIn from './features/auth/SignIn'
import SignUp from './features/auth/SignUp'
import Dashboard from './pages/LandingDashboard'
import Navbar from './components/landingDashboard/Navbar'
import VerifyEmail from './features/auth/VerifyEmail'

// import the lllabs chatInterface 
import ChatInterface from './components/lllabsChat/ChatInterface'

// impport the userDashboard 
import UserDashboardPage from './pages/UserDashboard'


import { UserProvider, useUser } from './contexts/userContext'

function MainApp() {
  const { user } = useUser() // optional if you don't use it yet
  console.log(user)

  return (
    <>
      {/* upper navbar - header */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  )
}
