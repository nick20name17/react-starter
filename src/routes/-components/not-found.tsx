import { Link } from '@tanstack/react-router'
import { Ghost, Home } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const NotFound = () => {
  return (
    <>
      <title>Not Found</title>
      <div className='from-background to-muted/30 flex h-[calc(100vh-var(--header-height))] flex-col items-center justify-center bg-gradient-to-b'>
        <div className='container flex max-w-md flex-col items-center justify-center gap-6 px-4 py-16 text-center md:py-24'>
          <div className='bg-muted rounded-full p-6'>
            <Ghost className='text-primary h-12 w-12' />
          </div>

          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Page not found</h1>

          <p className='text-muted-foreground'>
            We couldn't find the page you were looking for. It might have been moved, deleted, or never
            existed in the first place.
          </p>

          <div className='flex flex-col gap-2 sm:flex-row'>
            <Button
              asChild
              variant='default'
              size='lg'
              className='gap-2'
            >
              <Link to='/'>
                <Home className='size-4' />
                Go home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
