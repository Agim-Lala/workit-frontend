import { apiClient } from '@/lib/api-client'

import type { AuthUser, LoginCredentials } from '../types/auth.types'

export type LoginResponse = {
  user: AuthUser
  accessToken: string
  expiresAt: string
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials)

  return response.data
}
