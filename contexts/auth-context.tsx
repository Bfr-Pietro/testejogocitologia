'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar usuario ao iniciar
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('currentUser')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Erro ao carregar usuario:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  // Login
  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500))

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find(
        (u: { email: string; password: string }) => u.email === email && u.password === password
      )

      if (!foundUser) {
        return { success: false, error: 'Email ou senha incorretos' }
      }

      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        createdAt: foundUser.createdAt
      }

      localStorage.setItem('currentUser', JSON.stringify(userData))
      setUser(userData)

      return { success: true }
    } catch {
      return { success: false, error: 'Erro ao fazer login. Tente novamente.' }
    }
  }, [])

  // Register
  const register = useCallback(async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500))

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Verificar se email ja existe
      const existingUser = users.find((u: { email: string }) => u.email === email)
      if (existingUser) {
        return { success: false, error: 'Este email ja esta cadastrado' }
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      }

      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      const userData: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }

      localStorage.setItem('currentUser', JSON.stringify(userData))
      setUser(userData)

      return { success: true }
    } catch {
      return { success: false, error: 'Erro ao criar conta. Tente novamente.' }
    }
  }, [])

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }, [])

  // Update user
  const updateUser = useCallback((updates: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...updates }
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    setUser(updatedUser)

    // Atualizar na lista de usuarios tambem
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex((u: { id: string }) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [user])

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
