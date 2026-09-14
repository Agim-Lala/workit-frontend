import { apiClient } from '@/lib/api-client'

import type { StartWorkerVerificationResponse } from '../types/worker.types'

export async function startWorkerVerification(): Promise<StartWorkerVerificationResponse> {
  const response = await apiClient.post<StartWorkerVerificationResponse>('/worker-profile/verification/start')

  return response.data
}
