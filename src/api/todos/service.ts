import { api } from '..'

import { type Todo } from './types'
import { type ApiResponse } from '@/api/types'

export const todosService = {
  get: async (params: Record<string, string | undefined | number | null> = {}) => {
    const { data } = await api.get<ApiResponse<Todo>>('/colors/', { params })
    return data
  }
}
