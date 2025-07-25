import { RefreshCcw, Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '../ui/button'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface OfflineStateProps {
  className?: string
  onReload?: () => void
}

export const OfflineState = ({ className, onReload }: OfflineStateProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleReload = () => {
    if (onReload) {
      onReload()
    } else {
      window.location.reload()
    }
  }

  if (isOnline) return null

  return (
    <Card className={cn(className)}>
      <CardHeader className='flex flex-col items-center gap-4 text-center'>
        <div className='mx-auto flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100'>
          <Wifi className='size-4 text-blue-500' />
        </div>
        <CardTitle className='max-w-xs text-pretty'>Connection Problem</CardTitle>
        <CardDescription>
          <div className='bg-muted w-full rounded-md p-3'>
            <p className='text-muted-foreground font-mono text-xs break-all'>
              It looks like you're offline. Please check your internet connection and try again.
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className='flex justify-center'>
        <Button
          className='w-full'
          size='sm'
          onClick={handleReload}
        >
          <RefreshCcw />
          <span>Reload Page</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
