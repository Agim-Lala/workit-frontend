import { useQuery } from '@tanstack/react-query'

import { getBusinessJobOpenings } from '../api/get-business-job-openings'

export const businessOpeningsQueryKey = ['business', 'openings'] as const

export function useBusinessOpenings() {
  return useQuery({
    queryKey: businessOpeningsQueryKey,
    queryFn: getBusinessJobOpenings,
  })
}
