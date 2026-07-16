import { apiClient } from '@/lib/api-client'

import type { Job, JobsResponse } from '../types/job.types'

export async function getJobs(): Promise<Job[]> {
  const response = await apiClient.get<JobsResponse>('/job-openings', {
    params: {
      page: 1,
      pageSize: 50,
      status: 'Open',
    },
  })

  return response.data.items
}
