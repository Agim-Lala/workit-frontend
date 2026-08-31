import { useQuery } from '@tanstack/react-query'

import { getJobs } from '../api/get-jobs'
import type { JobFilters } from '../types/job.types'

export function useJobs(filters: JobFilters) {
  const queryFilters = {
    jobType: filters.jobType,
    shiftType: filters.shiftType,
    onDate: filters.onDate,
  }

  return useQuery({
    queryKey: ['jobs', queryFilters],
    queryFn: () => getJobs(queryFilters),
  })
}
