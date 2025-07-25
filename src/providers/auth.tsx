import { type UseMutationResult, useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { clearAuthTokens, getAccessToken } from 'axios-jwt'
import { type PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

import { authService } from '@/api/auth/service'
import type { LoginPayload, LoginResponse } from '@/api/auth/types'
import { userService } from '@/api/user/service'
import type { User } from '@/api/user/types'
import { AUTH_REDIRECTS, STORAGE_KEYS } from '@/constants/auth'

interface AuthContextProps {
  user: User | null
  isUserLoading: boolean
  isAuth: boolean
  loginMutation: UseMutationResult<LoginResponse, Error, LoginPayload, unknown>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  const navigate = useNavigate()
  const router = useRouter()

  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) ?? ''

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = await getAccessToken()
        setIsAuth(!!accessToken)
      } catch {
        setIsAuth(false)
      } finally {
        setIsInitializing(false)
      }
    }

    initializeAuth()
  }, [])

  const logout = async () => {
    await clearAuthTokens()
    setIsAuth(false)
    localStorage.removeItem(STORAGE_KEYS.USER_ID)
    await navigate({ to: AUTH_REDIRECTS.LOGOUT, replace: true })
    router.invalidate()
  }

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getById(+userId),
    enabled: isAuth && !!userId && !isInitializing
  })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      await navigate({ to: AUTH_REDIRECTS.LOGIN, replace: true })
      setIsAuth(true)
      localStorage.setItem(STORAGE_KEYS.USER_ID, data.user.id?.toString())
      router.invalidate()
    }
  })

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user: user || null,
        loginMutation,
        logout,
        isUserLoading: isUserLoading || isInitializing
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
