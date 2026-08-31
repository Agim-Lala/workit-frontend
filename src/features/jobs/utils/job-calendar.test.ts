import { describe, expect, test } from 'vitest'

import type { Job } from '../types/job.types'
import { getJobsForDate, jobOccursOnDate } from './job-calendar'

const job: Job = {
  id: 'job-1',
  businessProfileId: 'business-1',
  title: 'Weekend crew',
  description: 'Support a weekend event.',
  role: 'Event staff',
  location: 'Tirana',
  payAmount: 7500,
  payType: 1,
  jobType: 2,
  startDate: '2026-08-14T00:00:00+02:00',
  endDate: '2026-08-16T23:59:59+02:00',
  shiftType: 2,
  shiftStartTime: '16:00:00',
  shiftEndTime: '22:00:00',
  requiredWorkersCount: 4,
  status: 1,
  createdAt: '2026-08-06T12:00:00+02:00',
}

describe('job calendar placement', () => {
  test('shows an opening on every day in its inclusive date range', () => {
    expect(jobOccursOnDate(job, new Date('2026-08-14T12:00:00+02:00'))).toBe(true)
    expect(jobOccursOnDate(job, new Date('2026-08-15T12:00:00+02:00'))).toBe(true)
    expect(jobOccursOnDate(job, new Date('2026-08-16T12:00:00+02:00'))).toBe(true)
    expect(jobOccursOnDate(job, new Date('2026-08-17T12:00:00+02:00'))).toBe(false)
  })

  test('treats an opening without an end date as a single calendar day', () => {
    const permanentJob = { ...job, endDate: null }

    expect(getJobsForDate([permanentJob], new Date('2026-08-14T12:00:00+02:00'))).toEqual([permanentJob])
    expect(getJobsForDate([permanentJob], new Date('2026-08-15T12:00:00+02:00'))).toEqual([])
  })

  test('keeps permanent and project positions out of calendar dates', () => {
    const permanentPosition: Job = {
      ...job,
      id: 'job-permanent',
      jobType: 0,
      title: 'Permanent office coordinator',
    }
    const projectPosition: Job = {
      ...job,
      id: 'job-project',
      jobType: 1,
      title: 'Project launch coordinator',
    }

    expect(getJobsForDate([job, permanentPosition, projectPosition], new Date('2026-08-14T12:00:00+02:00'))).toEqual([job])
  })
})
