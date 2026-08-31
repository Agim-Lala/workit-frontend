import { useQuery } from '@tanstack/react-query'

import { getWorkerProfile } from '../api/get-worker-profile'

export const workerProfileQueryKey = ['worker-profile'] as const

export function useWorkerProfile() {
  return useQuery({
    queryKey: workerProfileQueryKey,
    queryFn: getWorkerProfile,
  })
}
