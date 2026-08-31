import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import type { Job } from '../types/job.types'
import { JobDetailsPage } from './job-details-page'

const job: Job = {
  id: 'job-1',
  businessProfileId: 'business-1',
  title: 'Hotel evening host',
  description: 'Help guests during an evening event.',
  role: 'Hospitality',
  location: 'Tirana Lake',
  payAmount: 7500,
  payType: 1,
  jobType: 2,
  startDate: '2026-08-14T16:00:00+02:00',
  endDate: '2026-08-14T22:00:00+02:00',
  shiftType: 2,
  shiftStartTime: '16:00:00',
  shiftEndTime: '22:00:00',
  requiredWorkersCount: 2,
  status: 1,
  createdAt: '2026-08-01T12:00:00+02:00',
}

vi.mock('../hooks/use-job', () => ({
  useJob: () => ({ data: job, isError: false, isLoading: false }),
}))

test('keeps crew headcount out of the worker-facing job description', () => {
  render(
    <MemoryRouter initialEntries={['/jobs/job-1']}>
      <Routes>
        <Route element={<JobDetailsPage />} path="/jobs/:jobId" />
      </Routes>
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'Hotel evening host' })).toBeVisible()
  expect(screen.getByText('Help guests during an evening event.')).toBeVisible()
  expect(screen.queryByText('Crew')).not.toBeInTheDocument()
  expect(screen.queryByText('2 needed')).not.toBeInTheDocument()
})
