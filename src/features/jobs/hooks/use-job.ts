import { useQuery } from '@tanstack/react-query'

import { getJob } from '../api/get-job'

export function useJob(jobId: string) {
  return useQuery({
    queryKey: ['jobs', jobId],
    queryFn: () => getJob(jobId),
    enabled: Boolean(jobId),
  })
}
