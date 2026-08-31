import { expect, test } from 'vitest'

import type { Job } from '../types/job.types'
import {
  formatJobDateRange,
  formatJobShift,
  formatJobType,
} from './job-formatters'

test('formats the new date-only job schedule contract', () => {
  expect(formatJobDateRange('2026-08-12', '2026-08-16')).toBe(
    'Aug 12, 2026 – Aug 16, 2026',
  )
  expect(formatJobDateRange('2026-08-12', '2026-08-12')).toBe('Aug 12, 2026')
})

test('formats numeric job and shift enums returned by the API', () => {
  expect(formatJobType(2)).toBe('Short term')
  expect(
    formatJobShift({
      shiftType: 2,
      shiftStartTime: '16:00:00',
      shiftEndTime: '22:30:00',
    }),
  ).toBe('16:00–22:30')
})

test('formats predefined shifts without custom times', () => {
  const schedule: Pick<Job, 'shiftType' | 'shiftStartTime' | 'shiftEndTime'> = {
    shiftType: 'Morning',
    shiftStartTime: null,
    shiftEndTime: null,
  }

  expect(formatJobShift(schedule)).toBe('Morning shift')
})
