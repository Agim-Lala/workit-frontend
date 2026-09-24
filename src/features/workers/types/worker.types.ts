import type { ShiftTypeCode } from '@/types/job-opening.types'

export type WorkerVerificationStatusCode = 0 | 1 | 2 | 3
export type WorkerVerificationStatusName = 'NotStarted' | 'Pending' | 'Verified' | 'Rejected'
export type WorkerVerificationStatus = WorkerVerificationStatusName | WorkerVerificationStatusCode

export type WorkerProfile = {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone: string | null
  location: string
  isLocationVerified: boolean
  country: string | null
  hasCv: boolean
  cvFileName: string | null
  cvUploadedAt: string | null
  hasPhoto: boolean
  photoUploadedAt: string | null
  interestedFields: string[]
  preferredShiftTypes: ShiftTypeCode[]
  preferredShiftTypeLabels: string[]
  verificationStatus: WorkerVerificationStatus
  verificationStatusLabel: string
}

export type UpdateWorkerLocationResponse = {
  location: string
  isLocationVerified: boolean
  country: string | null
}

export type UpdateWorkerPreferencesResponse = {
  interestedFields: string[]
  preferredShiftTypes: ShiftTypeCode[]
}

export type UploadWorkerCvResponse = {
  fileName: string
  uploadedAt: string
}

export type UploadWorkerPhotoResponse = {
  uploadedAt: string
}

export type StartWorkerVerificationResponse = {
  hostedUrl: string
  status: WorkerVerificationStatus
}

export type WorkerReview = {
  id: string
  jobAssignmentId: string
  rating: number
  comment: string | null
  createdAt: string
}

export type WorkerReviewsResponse = {
  items: WorkerReview[]
  averageRating: number | null
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
