import { apiClient } from '@/lib/api-client'

import type { Job, JobQueryFilters, JobsResponse } from '../types/job.types'

export async function getJobs(filters: JobQueryFilters): Promise<Job[]> {
  const jobs: Job[] = []
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const response = await apiClient.get<JobsResponse>('/job-openings', {
      params: {
        page,
        pageSize: 50,
        status: 'Open',
        jobType: filters.jobType === 'Any' ? undefined : filters.jobType,
        shiftType: filters.shiftType === 'Any' ? undefined : filters.shiftType,
        onDate: filters.onDate || undefined,
      },
    })

    jobs.push(...response.data.items)
    hasNextPage = response.data.hasNextPage && page < response.data.totalPages
    page += 1
  }

  return jobs
}
