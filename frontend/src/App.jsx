import './App.css'
import { Routes, Route } from 'react-router-dom'

import SignIn from './features/auth/SignIn'
import SignUp from './features/auth/SignUp'
import LandingDashboardPage from './pages/LandingDashboardPage'
import Navbar from './components/landingDashboard/Navbar'
import VerifyEmail from './features/auth/VerifyEmail'
import NotFoundPage from './pages/NotFoundPage'

// import the lllabs chatInterface 
import ChatInterface from './components/lllabsChat/ChatInterface'

// impport the userDashboard 
import UserDashboardPage from './pages/UserDashboardPage'

// Protected Route wrapper
import ProtectedRoute from './components/ProtectedRoute'

import { UserProvider, useUser } from './contexts/userContext'

function MainApp() {
  const { user } = useUser()

  return (
    <>
      {/* upper navbar - header (hidden when user is signed in) */}
      { !user && <Navbar /> }

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingDashboardPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyEmail />} />
        
        {/* Protected routes - require authentication */}
        <Route path="/chat" element={
          <ProtectedRoute>
            <ChatInterface />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboardPage />
          </ProtectedRoute>
        } />
        
        {/* 404 - catch all unmatched routes */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
