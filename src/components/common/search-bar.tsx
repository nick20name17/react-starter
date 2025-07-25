import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/components/ui/input'
import { DEBOUNCE_TIMEOUT_MS } from '@/constants/api'
import { useSearchParams } from '@/hooks/use-search-params'

export const SearchBar = (props: React.ComponentProps<'input'>) => {
  const [{ search }, setSearchParams] = useSearchParams()

  const debouncedSetSearch = useDebouncedCallback((search: string | null) => {
    setSearchParams({ search })
  }, DEBOUNCE_TIMEOUT_MS)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    debouncedSetSearch(search ? search : null)
  }

  return (
    <Input
      {...props}
      defaultValue={search}
      onChange={handleSearch}
      placeholder='Search...'
    />
  )
}
