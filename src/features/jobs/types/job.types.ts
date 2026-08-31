import type {
  JobOpening,
  JobOpeningStatus,
  JobType,
  PayType,
  ShiftType,
} from '@/types/job-opening.types'

export type Job = JobOpening
export type JobStatus = JobOpeningStatus
export type { JobType, PayType, ShiftType }

export type JobFilters = {
  search: string
  jobType: JobType | 'Any'
  shiftType: ShiftType | 'Any'
  onDate: string
}

export type JobQueryFilters = Pick<
  JobFilters,
  'jobType' | 'shiftType' | 'onDate'
>

export type JobsResponse = {
  items: Job[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
