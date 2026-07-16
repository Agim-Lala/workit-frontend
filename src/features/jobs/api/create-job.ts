import { apiClient } from '@/lib/api-client'

import type { JobFormValues } from '../schemas/job.schema'
import type { Job } from '../types/job.types'

export async function createJob(values: JobFormValues): Promise<Job> {
  const response = await apiClient.post<Job>('/job-openings', values)

  return response.data
}
