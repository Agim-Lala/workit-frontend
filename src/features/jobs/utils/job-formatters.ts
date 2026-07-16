import type { Job, JobStatus, PayType } from '../types/job.types'

const payTypeLabels: Record<number, string> = {
  0: 'Hourly',
  1: 'Daily',
  2: 'Fixed',
  3: 'Monthly',
}

const statusLabels: Record<number, string> = {
  0: 'Draft',
  1: 'Open',
  2: 'Closed',
  3: 'Cancelled',
}

export function formatPayType(payType: PayType) {
  return typeof payType === 'number' ? payTypeLabels[payType] ?? 'Unknown' : payType
}

export function formatJobStatus(status: JobStatus) {
  return typeof status === 'number' ? statusLabels[status] ?? 'Unknown' : status
}

export function jobMatchesSearch(job: Job, search: string) {
  const query = search.trim().toLowerCase()

  if (!query) {
    return true
  }

  return [job.title, job.role, job.location]
    .join(' ')
    .toLowerCase()
    .includes(query)
}
