import { apiClient } from '@/lib/api-client'

import type { TopWorker, TopWorkersResponse } from '../types/top-workers.types'

export async function getTopWorkers(
  jobOpeningId: string,
  limit = 20,
): Promise<TopWorker[]> {
  const response = await apiClient.get<TopWorkersResponse>(
    `/job-openings/${jobOpeningId}/top-workers`,
    { params: { limit } },
  )

  return response.data.items
}
