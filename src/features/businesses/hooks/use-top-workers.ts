import { useQuery } from '@tanstack/react-query'

import { getTopWorkers } from '../api/get-top-workers'

export function useTopWorkers(jobOpeningId: string) {
  return useQuery({
    queryKey: ['business', 'openings', jobOpeningId, 'top-workers'],
    queryFn: () => getTopWorkers(jobOpeningId),
    enabled: Boolean(jobOpeningId),
  })
}
