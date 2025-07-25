import { api } from '..'

import { User } from './types'

export const userService = {
  getById: async (id: number) => {
    const { data } = await api.get<User>(`/users/${id}/`)
    return data
  }
}
