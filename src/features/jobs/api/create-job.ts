import { apiClient } from '@/lib/api-client'
import type {
  CreateJobOpeningRequest,
  JobOpening,
} from '@/types/job-opening.types'

export async function createJob(
  values: CreateJobOpeningRequest,
): Promise<JobOpening> {
  const response = await apiClient.post<JobOpening>('/job-openings', values)

  return response.data
}
