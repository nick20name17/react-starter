import { useQuery } from '@tanstack/react-query'

import { todosService } from './service'

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => todosService.get
  })
}
