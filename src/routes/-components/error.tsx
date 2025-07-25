import { type ErrorComponentProps } from '@tanstack/react-router'
import { AlertTriangle, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const Error = ({ reset, error }: ErrorComponentProps) => {
  const errorMessage = error.message || 'Unknown error'

  return (
    <>
      <title>Something went wrong</title>
      <div className='from-background to-muted/30 flex h-dvh flex-col items-center justify-center rounded-lg bg-gradient-to-b p-6'>
        <div className='container flex max-w-md flex-col items-center justify-center gap-6 px-4 py-16 text-center'>
          <div className='rounded-full bg-red-100 p-6'>
            <AlertTriangle className='h-12 w-12 text-red-600' />
          </div>

          <h2 className='text-3xl font-bold tracking-tight'>Something went wrong</h2>

          <p className='text-muted-foreground'>
            We encountered an unexpected error. This is likely a temporary issue that we're working to fix.
          </p>

          <div className='bg-muted w-full overflow-auto rounded-md p-4 text-left text-sm'>
            <p className='font-mono text-red-500'>{errorMessage}</p>
          </div>

          <Button
            onClick={reset}
            variant='default'
            size='lg'
            className='gap-2'
          >
            <RefreshCw className='h-4 w-4' />
            Try again
          </Button>
        </div>
      </div>
    </>
  )
}
