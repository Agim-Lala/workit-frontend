import { apiClient } from '@/lib/api-client'

import type {
  AuthUser,
  RegisterBusinessRequest,
  RegisterWorkerRequest,
} from '../types/auth.types'

export type RegisterResponse = {
  user: AuthUser
  accessToken: string
  expiresAt: string
}

export async function registerWorker(
  values: RegisterWorkerRequest,
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    '/auth/register/worker',
    values,
  )

  return response.data
}

export async function registerBusiness(
  values: RegisterBusinessRequest,
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    '/auth/register/business',
    values,
  )

  return response.data
}
