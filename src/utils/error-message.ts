import { AxiosError } from 'axios'

interface ErrorResponseData {
  detail?: string
}

export type CustomAxiosError = AxiosError<ErrorResponseData>

const ERROR_MESSAGE_FALLBACK = 'An unexpected error occurred'

export const isAxiosError = (error: unknown): error is CustomAxiosError => {
  return (
    error instanceof AxiosError &&
    error.response !== undefined &&
    typeof error.response === 'object' &&
    'data' in error.response &&
    typeof error.response.data === 'object'
  )
}

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const responseData = error.response?.data

    return responseData?.detail || error.message || ERROR_MESSAGE_FALLBACK
  }

  if (error instanceof Error) {
    return error.message
  }

  return ERROR_MESSAGE_FALLBACK
}
