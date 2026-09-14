import axios from 'axios'

import { env } from '@/config/env'
import { getAccessToken } from '@/features/auth/utils/auth-token'
import { getLanguage } from '@/i18n'

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
)

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  config.headers['Accept-Language'] = getLanguage()

  // Let the browser set the multipart boundary itself for file uploads — the instance's
  // default application/json header would otherwise stick and the API rejects it (415).
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  return config
})
