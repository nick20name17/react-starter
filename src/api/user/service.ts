import { api } from '..'

import type { User } from './types'

export const userService = {
  getById: async (id: number) => {
    const { data } = await api.get<User>(`/users/${id}/`)
    return data
  }
}
