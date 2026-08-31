import { apiClient } from '@/lib/api-client'

import type { UpdateWorkerLocationResponse } from '../types/worker.types'

export async function updateWorkerLocation(location: string): Promise<UpdateWorkerLocationResponse> {
  const response = await apiClient.put<UpdateWorkerLocationResponse>('/worker-profile/location', {
    location: location.trim(),
  })

  return response.data
}
