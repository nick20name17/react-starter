import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LIMIT_OPTIONS } from '@/constants/api'
import { useSearchParams } from '@/hooks/use-search-params'
import { cn } from '@/lib/utils'

interface PaginationControlsProps {
  count: number
  className?: string
}
const MAX_PAGES_TO_SHOW = 5

export const PaginationControls = ({ count, className }: PaginationControlsProps) => {
  const [{ offset, limit }, setSearchParams] = useSearchParams()

  const totalPages = Math.ceil(count / limit)
  const currentPage = Math.floor(offset / limit) + 1

  const handlePageChange = (page: number) => {
    setSearchParams({ offset: (page - 1) * limit })
  }

  const renderPaginationItems = () => {
    const items = []

    if (totalPages <= MAX_PAGES_TO_SHOW) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={1 === currentPage}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (currentPage > 2 + Math.floor(MAX_PAGES_TO_SHOW / 2) && currentPage < totalPages - 1) {
        items.push(
          <PaginationItem key='ellipsis-start'>
            <PaginationEllipsis />
          </PaginationItem>
        )

        const startPage = currentPage - Math.floor((MAX_PAGES_TO_SHOW - 3) / 2)
        const endPage = currentPage + Math.ceil((MAX_PAGES_TO_SHOW - 3) / 2)

        for (let i = startPage; i <= endPage; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i === currentPage}
                onClick={() => handlePageChange(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          )
        }

        items.push(
          <PaginationItem key='ellipsis-end'>
            <PaginationEllipsis />
          </PaginationItem>
        )
      } else if (currentPage <= 2 + Math.floor(MAX_PAGES_TO_SHOW / 2)) {
        for (let i = 2; i <= MAX_PAGES_TO_SHOW - 1; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i === currentPage}
                onClick={() => handlePageChange(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          )
        }
        items.push(
          <PaginationItem key='ellipsis-end'>
            <PaginationEllipsis />
          </PaginationItem>
        )
      } else {
        items.push(
          <PaginationItem key='ellipsis-start'>
            <PaginationEllipsis />
          </PaginationItem>
        )
        for (let i = totalPages - (MAX_PAGES_TO_SHOW - 2); i < totalPages; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i === currentPage}
                onClick={() => handlePageChange(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          )
        }
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }
    return items
  }

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <Select
        value={limit?.toString()}
        onValueChange={(value) => {
          setSearchParams({ limit: +value, offset: 0 })
        }}
      >
        <SelectTrigger className='w-32'>
          <SelectValue placeholder='Limit' />
        </SelectTrigger>
        <SelectContent>
          {LIMIT_OPTIONS.map((optionLimit) => {
            return (
              <SelectItem
                value={optionLimit.toString()}
                key={optionLimit}
              >
                {optionLimit}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={cn(currentPage === 1 && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>

          {renderPaginationItems()}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              className={cn(currentPage === totalPages && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
