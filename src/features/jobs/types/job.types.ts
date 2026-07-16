export type JobStatus = 'Draft' | 'Open' | 'Closed' | 'Cancelled' | number

export type PayType = 'Hourly' | 'Daily' | 'Fixed' | 'Monthly' | number

export type JobScheduleType =
  | 'SpecificDates'
  | 'DateRange'
  | 'RecurringWeekly'
  | 'LongTerm'
  | number

export type Job = {
  id: string
  businessProfileId: string
  title: string
  description: string
  role: string
  location: string
  startsAt: string
  endsAt: string | null
  requiredWorkersCount: number
  payAmount: number
  payType: PayType
  scheduleType: JobScheduleType
  status: JobStatus
  createdAt: string
}

export type JobFilters = {
  search: string
  role: string
  payType: PayType | 'Any'
}

export type JobsResponse = {
  items: Job[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
