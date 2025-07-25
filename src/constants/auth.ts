import { FileRoutesByPath } from '@tanstack/react-router'

export const STORAGE_KEYS = {
  USER_ID: 'starter_user_id'
} as const

export type RouteNames = keyof FileRoutesByPath

export const AUTH_REDIRECTS = {
  LOGIN: '/about',
  LOGOUT: '/login'
} as const satisfies Record<string, RouteNames>

export const PUBLIC_ROUTES: RouteNames[] = ['/', '/login']
