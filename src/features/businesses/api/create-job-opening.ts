import { apiClient } from '@/lib/api-client'
import type {
  CreateJobOpeningRequest,
  JobOpening,
  JobTypeCode,
  PayTypeCode,
  ShiftTypeCode,
} from '@/types/job-opening.types'

import type { JobOpeningFormValues } from '../schemas/job-opening.schema'

export async function createJobOpening(
  values: JobOpeningFormValues,
): Promise<JobOpening> {
  const request: CreateJobOpeningRequest = {
    title: values.title.trim(),
    description: values.description.trim(),
    role: values.role.trim(),
    location: values.location.trim(),
    payAmount: Number(values.payAmount),
    payType: Number(values.payType) as PayTypeCode,
    jobType: Number(values.jobType) as JobTypeCode,
    startDate: values.startDate,
    endDate: values.jobType === '0' ? null : values.endDate,
    shiftType: Number(values.shiftType) as ShiftTypeCode,
    shiftStartTime:
      values.shiftType === '2' ? normalizeTime(values.shiftStartTime) : null,
    shiftEndTime:
      values.shiftType === '2' ? normalizeTime(values.shiftEndTime) : null,
    requiredWorkersCount: Number(values.requiredWorkersCount),
  }
  const response = await apiClient.post<JobOpening>('/job-openings', request)

  return response.data
}

function normalizeTime(value: string) {
  return value.length === 5 ? `${value}:00` : value
}
