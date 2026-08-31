import { apiClient } from '@/lib/api-client'

import type { WorkerProfile } from '../types/worker.types'

export async function getWorkerProfile(): Promise<WorkerProfile> {
  const response = await apiClient.get<WorkerProfile>('/worker-profile')

  return response.data
}
