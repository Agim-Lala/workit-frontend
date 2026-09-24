import { apiClient } from '@/lib/api-client'
import type { ShiftTypeCode } from '@/types/job-opening.types'

import type { UpdateWorkerPreferencesResponse } from '../types/worker.types'

export async function updateWorkerPreferences(
  interestedFields: string[],
  preferredShiftTypes: ShiftTypeCode[],
): Promise<UpdateWorkerPreferencesResponse> {
  const response = await apiClient.put<UpdateWorkerPreferencesResponse>('/worker-profile/preferences', {
    interestedFields,
    preferredShiftTypes,
  })

  return response.data
}
