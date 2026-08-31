import { format, parseISO } from 'date-fns'

import type {
  JobOpening,
  JobOpeningStatus,
  JobType,
  PayType,
  ShiftType,
} from '@/types/job-opening.types'

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

const jobTypeLabels: Record<number, string> = {
  0: 'Permanent',
  1: 'Project',
  2: 'Short term',
}

const shiftTypeLabels: Record<number, string> = {
  0: 'Morning',
  1: 'Evening',
  2: 'Custom hours',
}

export function formatPayType(payType: PayType) {
  return typeof payType === 'number' ? payTypeLabels[payType] ?? 'Unknown' : payType
}

export function formatJobStatus(status: JobOpeningStatus) {
  return typeof status === 'number' ? statusLabels[status] ?? 'Unknown' : status
}

export function formatJobType(jobType: JobType) {
  if (typeof jobType === 'number') {
    return jobTypeLabels[jobType] ?? 'Unknown'
  }

  return jobType === 'ShortTerm' ? 'Short term' : jobType
}

export function formatShiftType(shiftType: ShiftType) {
  if (typeof shiftType === 'number') {
    return shiftTypeLabels[shiftType] ?? 'Unknown'
  }

  return shiftType === 'CustomHours' ? 'Custom hours' : shiftType
}

export function formatJobDateRange(startDate: string, endDate: string | null) {
  const start = format(parseISO(startDate), 'MMM d, yyyy')

  if (!endDate || endDate === startDate) {
    return start
  }

  return `${start} – ${format(parseISO(endDate), 'MMM d, yyyy')}`
}

export function formatJobShift(
  job: Pick<JobOpening, 'shiftType' | 'shiftStartTime' | 'shiftEndTime'>,
) {
  const label = formatShiftType(job.shiftType)

  if (label !== 'Custom hours') {
    return `${label} shift`
  }

  if (!job.shiftStartTime || !job.shiftEndTime) {
    return label
  }

  return `${formatApiTime(job.shiftStartTime)}–${formatApiTime(job.shiftEndTime)}`
}

export function jobMatchesSearch(job: JobOpening, search: string) {
  const query = search.trim().toLowerCase()

  if (!query) {
    return true
  }

  return [job.title, job.role, job.location]
    .join(' ')
    .toLowerCase()
    .includes(query)
}

function formatApiTime(value: string) {
  return value.slice(0, 5)
}
