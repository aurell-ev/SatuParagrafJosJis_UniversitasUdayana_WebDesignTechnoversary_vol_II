import { useState } from 'react'
import { AuthContext } from './contexts'

const DEMO_ACCOUNTS = {
  FIELD_TEAM: {
    id: 'user-tim-bali',
    name: 'Wayan Konservasi',
    role: 'team_member', // team_member | manager
    region: 'Bali',
    email: 'tim.bali@pulihkarang.id'
  },
  MANAGER: {
    id: 'user-manager-bali',
    name: 'Dr. Made Suartana',
    role: 'manager',
    region: 'Bali',
    email: 'pengelola.bali@pulihkarang.id'
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pulihkarang_auth_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const loginAs = (type) => {
    const selected = DEMO_ACCOUNTS[type] || DEMO_ACCOUNTS.FIELD_TEAM
    setUser(selected)
    try {
      localStorage.setItem('pulihkarang_auth_user', JSON.stringify(selected))
    } catch {
      // ignore
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('pulihkarang_auth_user')
    } catch {
      // ignore
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
