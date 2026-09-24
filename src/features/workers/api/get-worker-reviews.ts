import { apiClient } from '@/lib/api-client'

import type { WorkerReviewsResponse } from '../types/worker.types'

export async function getWorkerReviews(
  workerProfileId: string,
  page: number,
): Promise<WorkerReviewsResponse> {
  const response = await apiClient.get<WorkerReviewsResponse>(
    `/workers/${workerProfileId}/reviews`,
    { params: { page, pageSize: 10 } },
  )

  return response.data
}
