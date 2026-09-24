import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getWorkerReviews } from '../api/get-worker-reviews'

export function useWorkerReviews(workerProfileId: string, page: number) {
  return useQuery({
    queryKey: ['worker-reviews', workerProfileId, page],
    queryFn: () => getWorkerReviews(workerProfileId, page),
    placeholderData: keepPreviousData,
  })
}
