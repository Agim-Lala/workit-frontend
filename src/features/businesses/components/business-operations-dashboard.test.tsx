import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import type { JobOpening } from '@/types/job-opening.types'

import { BusinessOperationsDashboard } from './business-operations-dashboard'

const activeOpening: JobOpening = {
  id: '3ed59c51-0ea4-4dd6-bfba-a7297916a0f9',
  businessProfileId: '57d06c6b-7bd1-4fd4-9fa7-95b0302835ba',
  title: 'Friday event crew',
  description: 'Support guest arrivals and keep the event floor moving.',
  role: 'Event staff',
  location: 'Tirana',
  payAmount: 7500,
  payType: 1,
  jobType: 2,
  startDate: '2026-08-14',
  endDate: '2026-08-14',
  shiftType: 2,
  shiftStartTime: '16:00:00',
  shiftEndTime: '22:00:00',
  requiredWorkersCount: 4,
  status: 1,
  createdAt: '2026-08-06T12:00:00+02:00',
}

test('shows active openings and leaves employee assignments honest', () => {
  render(<BusinessOperationsDashboard openings={[activeOpening]} />)

  expect(screen.getByRole('heading', { name: 'Friday event crew' })).toBeVisible()
  expect(screen.getByText('7,500 ALL / daily')).toBeVisible()
  expect(screen.getByText('Not connected yet')).toBeVisible()
  expect(screen.getAllByText('04')).toHaveLength(2)
})
