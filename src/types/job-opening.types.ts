export type JobOpeningStatusCode = 0 | 1 | 2 | 3
export type JobOpeningStatusName = 'Draft' | 'Open' | 'Closed' | 'Cancelled'
export type JobOpeningStatus = JobOpeningStatusName | JobOpeningStatusCode

export type PayTypeCode = 0 | 1 | 2 | 3
export type PayTypeName = 'Hourly' | 'Daily' | 'Fixed' | 'Monthly'
export type PayType = PayTypeName | PayTypeCode

export type JobTypeCode = 0 | 1 | 2
export type JobTypeName = 'Permanent' | 'Project' | 'ShortTerm'
export type JobType = JobTypeName | JobTypeCode

export type ShiftTypeCode = 0 | 1 | 2
export type ShiftTypeName = 'Morning' | 'Evening' | 'CustomHours'
export type ShiftType = ShiftTypeName | ShiftTypeCode

export type JobOpening = {
  id: string
  businessProfileId: string
  title: string
  description: string
  role: string
  location: string
  payAmount: number
  payType: PayType
  jobType: JobType
  startDate: string
  endDate: string | null
  shiftType: ShiftType
  shiftStartTime: string | null
  shiftEndTime: string | null
  requiredWorkersCount: number
  status: JobOpeningStatus
  createdAt: string
}

export type CreateJobOpeningRequest = {
  title: string
  description: string
  role: string
  location: string
  payAmount: number
  payType: PayTypeCode
  jobType: JobTypeCode
  startDate: string
  endDate: string | null
  shiftType: ShiftTypeCode
  shiftStartTime: string | null
  shiftEndTime: string | null
  requiredWorkersCount: number
}

export type JobOpeningsResponse = {
  items: JobOpening[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
