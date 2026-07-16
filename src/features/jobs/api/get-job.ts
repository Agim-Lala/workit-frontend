import { apiClient } from '@/lib/api-client'

import type { Job } from '../types/job.types'

export async function getJob(jobId: string): Promise<Job> {
  const response = await apiClient.get<Job>(`/job-openings/${jobId}`)

  return response.data
}
