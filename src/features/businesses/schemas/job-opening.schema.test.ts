import { expect, test } from 'vitest'

import { jobOpeningFormSchema } from './job-opening.schema'

const validJob = {
  title: 'Event assistant',
  description: 'Help welcome guests and coordinate event check-in.',
  role: 'Event staff',
  location: 'Tirana',
  payAmount: '8',
  payType: '0' as const,
  jobType: '2' as const,
  startDate: '2026-08-12',
  endDate: '2026-08-12',
  shiftType: '2' as const,
  shiftStartTime: '16:00',
  shiftEndTime: '22:00',
  requiredWorkersCount: '3',
}

test('accepts a valid short-term custom-hours job', () => {
  expect(jobOpeningFormSchema.safeParse(validJob).success).toBe(true)
})

test('requires an end date for project and short-term jobs', () => {
  const result = jobOpeningFormSchema.safeParse({ ...validJob, endDate: '' })

  expect(result.success).toBe(false)
})

test('allows a permanent job without an end date', () => {
  const result = jobOpeningFormSchema.safeParse({
    ...validJob,
    jobType: '0',
    endDate: '',
  })

  expect(result.success).toBe(true)
})
