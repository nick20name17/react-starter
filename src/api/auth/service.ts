import { api } from '..'
import { setAuthTokens } from 'axios-jwt'

import { type LoginPayload, type LoginResponse } from './types'

export const authService = {
  login: async (params: LoginPayload) => {
    const { data } = await api.post<LoginResponse>('/auth/', params)

    setAuthTokens({
      accessToken: data.access_token,
      refreshToken: data.refresh_token
    })

    return data
  }
}
