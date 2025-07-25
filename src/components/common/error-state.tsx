import { AlertCircle, RefreshCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  className?: string
  description?: string
  message?: string
  tryAgain?: () => void
}

export const ErrorState = ({
  className,
  message = 'Something went wrong',
  description,
  tryAgain
}: ErrorStateProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className='flex flex-col items-center gap-4 text-center'>
        <div className='mx-auto flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100'>
          <AlertCircle className='text-destructive size-4' />
        </div>
        <CardTitle className='max-w-xs text-pretty'>
          <p>{message}</p>
        </CardTitle>
        {description ? (
          <CardDescription>
            <div className='bg-muted w-full rounded-md p-3'>
              <p className='text-muted-foreground font-mono text-xs break-all'>{description}</p>
            </div>
          </CardDescription>
        ) : null}
      </CardHeader>

      {tryAgain ? (
        <CardFooter className='flex justify-center'>
          <Button
            onClick={tryAgain}
            className='w-full'
            size='sm'
          >
            <RefreshCcw />
            <span>Try again</span>
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}
