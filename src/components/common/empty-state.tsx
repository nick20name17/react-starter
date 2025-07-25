import { RefreshCcw, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { useSearchParams } from '@/hooks/use-search-params'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  className?: string
  message?: string
}

export const EmptyState = ({
  className,
  message = "We couldn't find anything matching your search"
}: EmptyStateProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const hasActiveSearchParams = Object.values(searchParams).filter(Boolean).length > 0

  return (
    <Card className={cn(className)}>
      <CardHeader className='flex flex-col items-center gap-4 text-center'>
        <div className='mx-auto flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100'>
          <Search className='size-4 text-gray-500' />
        </div>
        <CardDescription className='max-w-xs text-pretty'>
          <p>{message}</p>
        </CardDescription>
      </CardHeader>
      {hasActiveSearchParams ? (
        <CardFooter className='flex justify-center'>
          <Button
            onClick={() => setSearchParams(null)}
            className='w-full'
            size='sm'
          >
            <RefreshCcw />
            <span>Clear search</span>
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}
