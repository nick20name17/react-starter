import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

import { todosService } from '@/api/todos/service'
import { EmptyState } from '@/components/common/empty-state'
import { PaginationControls } from '@/components/common/pagination-controls'
import { SearchBar } from '@/components/common/search-bar'
import { NumberParamSchema, SearchSchema } from '@/hooks/use-search-params'

const About = () => {
  const { data: todos } = Route.useLoaderData()

  if (todos?.count === 0) {
    return <EmptyState className='mx-auto mt-12 w-80' />
  }

  return (
    <>
      <title>About</title>
      <div className='container mt-4 space-y-6'>
        <SearchBar />
        <div className='p-2'>
          {todos?.results?.map((todo) => {
            return <div key={todo.id}>{todo.color}</div>
          })}
        </div>
        <PaginationControls count={todos?.count} />
      </div>
    </>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
  validateSearch: z.object({
    offset: NumberParamSchema,
    limit: NumberParamSchema,
    search: SearchSchema,
    from: z.string().optional()
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps: { search } }) => {
    const data = await todosService.get({ search })
    return {
      data,
      crumb: 'About'
    }
  }
})
