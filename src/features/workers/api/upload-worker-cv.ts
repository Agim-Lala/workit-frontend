import { apiClient } from '@/lib/api-client'

import type { UploadWorkerCvResponse } from '../types/worker.types'

export async function uploadWorkerCv(file: File): Promise<UploadWorkerCvResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<UploadWorkerCvResponse>('/worker-profile/cv', formData)

  return response.data
}

export async function downloadWorkerCv(): Promise<Blob> {
  const response = await apiClient.get('/worker-profile/cv', { responseType: 'blob' })

  return response.data
}
