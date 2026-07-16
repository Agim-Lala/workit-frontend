import { useQuery } from '@tanstack/react-query'

import { getJobs } from '../api/get-jobs'
import type { JobFilters } from '../types/job.types'

export function useJobs(filters: JobFilters) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: getJobs,
  })
}
