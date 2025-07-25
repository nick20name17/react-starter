import { api } from '..'

import { ApiResponse } from './../types'
import { Todo } from './types'

export const todosService = {
  get: async (params: Record<string, string | undefined | number | null> = {}) => {
    const { data } = await api.get<ApiResponse<Todo>>('/colors/', { params })
    return data
  }
}
