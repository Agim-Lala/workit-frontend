import { isValid, isWithinInterval, parseISO, startOfDay } from 'date-fns'

import type { Job } from '../types/job.types'

export function jobOccursOnDate(job: Job, date: Date) {
  const start = startOfDay(parseISO(job.startDate))
  const end = startOfDay(parseISO(job.endDate ?? job.startDate))
  const target = startOfDay(date)

  if (!isValid(start) || !isValid(end) || end < start) {
    return false
  }

  return isWithinInterval(target, { start, end })
}

export function isCalendarEligibleJob(job: Job) {
  return job.jobType === 2 || job.jobType === 'ShortTerm'
}

export function getJobsForDate(jobs: Job[], date: Date) {
  return jobs
    .filter((job) => isCalendarEligibleJob(job) && jobOccursOnDate(job, date))
    .sort((first, second) => {
      const firstTime = first.shiftStartTime ?? '24:00'
      const secondTime = second.shiftStartTime ?? '24:00'

      return firstTime.localeCompare(secondTime) || first.title.localeCompare(second.title)
    })
}
