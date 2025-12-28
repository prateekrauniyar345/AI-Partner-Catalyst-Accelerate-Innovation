import React, { createContext, useContext, useEffect, useState } from 'react'
import { me as fetchMeService, refreshToken as refreshTokenService, signout as signoutService } from '../services/authServices'
import canvasApi from '../services/canvasApi'
// Use relative API (Vite proxy) by default via `authServices` helpers

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canvasData, setCanvasData] = useState({
    user: null,
    courses: [],
    loading: false,
    error: null,
    lastFetched: null,
  });
 
  

  // On mount, fetch current user from backend using cookies (no localStorage)
  useEffect(() => {
    let mounted = true
    async function fetchMe() {
      try {
        const data = await fetchMeService()
        // service may return {user:...} or direct object
        const userPayload = data && data.user ? data.user : data
        console.debug('/auth/me payload', userPayload)
        if (mounted) {
          setUser(userPayload)
          setLoading(false)
        }
        return
      } catch (err) {
        console.debug('/auth/me failed', err)
        // if the error looks like 401, attempt a refresh + retry
        try {
          const refreshed = await refreshTokenService().catch(() => null)
          console.debug('/auth/refresh result', refreshed)
          if (refreshed) {
            const data2 = await fetchMeService()
            const userPayload2 = data2 && data2.user ? data2.user : data2
            console.debug('/auth/me payload after refresh', userPayload2)
            if (mounted) {
              setUser(userPayload2)
              setLoading(false)
            }
            return
          }
        } catch (err2) {
          console.warn('Refresh + retry failed', err2)
        }
        if (mounted) {
          setUser(null)
          setLoading(false)
        }
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
    console.debug('Signing out user')
    try {
      await signoutService()
      console.debug('signOut request successful')
    } catch (e) {
      console.warn('signOut request failed', e)
    }
    setUser(null)
    setCanvasData({
      user: null,
      courses: [],
      loading: false,
      error: null,
      lastFetched: null,
    })
  }

  // Fetch Canvas data once when user is authenticated
  async function fetchCanvasData() {
    if (!user || canvasData.lastFetched) return; // Skip if already fetched or no user

    setCanvasData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const [canvasUser, courses] = await Promise.all([
        canvasApi.getUserInformation(),
        canvasApi.getCourses(),
      ]);

      setCanvasData({
        user: canvasUser,
        courses: courses || [],
        loading: false,
        error: null,
        lastFetched: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error fetching Canvas data:', error);
      setCanvasData(prev => ({
        ...prev,
        loading: false,
        error: String(error),
      }));
    }
  }

  // Trigger Canvas data fetch when user is authenticated
  useEffect(() => {
    if (user && !canvasData.lastFetched) {
      fetchCanvasData();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, login, signOut, canvasData, fetchCanvasData }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
