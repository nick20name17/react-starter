import { NuqsAdapter } from 'nuqs/adapters/react'
import { PropsWithChildren } from 'react'

import { ReactQueryProvider } from './react-query'
import { ThemeProvider } from './theme'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <NuqsAdapter>
        <ThemeProvider>{children}</ThemeProvider>
      </NuqsAdapter>
    </ReactQueryProvider>
  )
}
