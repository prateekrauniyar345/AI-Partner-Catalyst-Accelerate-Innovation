import React, { createContext, useContext, useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  // On mount, fetch current user from backend using cookies (no localStorage)
  useEffect(() => {
    let mounted = true
    async function fetchMe() {
      try {
        const res = await fetch(`${API}/auth/me`, { method: 'GET', credentials: 'include' })
        if (!mounted) return
        if (!res.ok) {
          setUser(null)
          return
        }
        const data = await res.json()
        setUser(data)
      } catch (err) {
        console.warn('Failed to fetch /auth/me', err)
        setUser(null)
      }
    }
    fetchMe()
    return () => { mounted = false }
  }, [])

  function login(userObj) {
    // store user in React state only; tokens are HttpOnly cookies set by backend
    setUser(userObj)
  }

  async function signOut() {
    try {
      await fetch(`${API}/auth/signout`, { method: 'POST', credentials: 'include' })
    } catch (e) {
      console.warn('signOut request failed', e)
    }
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
