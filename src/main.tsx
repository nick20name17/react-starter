import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'
import { scan } from 'react-scan'

import { routeTree } from './routeTree.gen'
import '@/index.css'
import { Providers } from '@/providers'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

scan({
  enabled: true
})

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}
