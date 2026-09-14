import { apiClient } from '@/lib/api-client'

import type { UploadWorkerPhotoResponse } from '../types/worker.types'

export async function uploadWorkerPhoto(file: File): Promise<UploadWorkerPhotoResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<UploadWorkerPhotoResponse>('/worker-profile/photo', formData)

  return response.data
}

export async function fetchWorkerPhoto(): Promise<Blob> {
  const response = await apiClient.get('/worker-profile/photo', { responseType: 'blob' })

  return response.data
}
