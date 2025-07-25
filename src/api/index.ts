import axios from 'axios'
import { type IAuthTokens, type TokenRefreshRequest, applyAuthTokenInterceptor } from 'axios-jwt'

import { API_BASE_URL } from '@/constants/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
  const { data } = await axios.post(`${API_BASE_URL}/auth/refresh/`, { refresh_token: refreshToken })

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token
  }
}

applyAuthTokenInterceptor(api, {
  requestRefresh,
  header: 'Authorization',
  headerPrefix: 'Bearer '
})
