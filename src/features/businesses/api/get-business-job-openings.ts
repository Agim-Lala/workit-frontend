import { apiClient } from '@/lib/api-client'
import type {
  JobOpening,
  JobOpeningsResponse,
} from '@/types/job-opening.types'

export async function getBusinessJobOpenings(): Promise<JobOpening[]> {
  const response = await apiClient.get<JobOpeningsResponse>(
    '/business/job-openings',
    {
      params: {
        page: 1,
        pageSize: 50,
      },
    },
  )

  return response.data.items
}
