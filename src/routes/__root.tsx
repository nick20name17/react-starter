import { Outlet, createRootRoute, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { isLoggedIn } from 'axios-jwt'

import { Breadcrumbs } from './-components/breadcrumb'
import { Error } from './-components/error'
import { Header } from './-components/header'
import { NotFound } from './-components/not-found'
import { Toaster } from '@/components/ui/sonner'
import { AUTH_REDIRECTS, PUBLIC_ROUTES, RouteNames } from '@/constants/auth'
import { AuthProvider } from '@/providers/auth'

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Header />
      <Breadcrumbs className='container my-4' />
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster duration={5000} />
    </AuthProvider>
  ),
  beforeLoad: async (ctx) => {
    const isAuth = await isLoggedIn()

    if (!isAuth && !PUBLIC_ROUTES.includes(ctx.location.href as RouteNames)) {
      throw redirect({
        to: AUTH_REDIRECTS.LOGOUT,
        replace: true
      })
    }
  },
  notFoundComponent: NotFound,
  errorComponent: Error
})
