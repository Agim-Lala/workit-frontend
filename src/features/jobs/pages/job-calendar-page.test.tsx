import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import type { Job } from '../types/job.types'
import { JobCalendarPage } from './job-calendar-page'
import { JobDayPage } from './job-day-page'

const { mockUseJobs } = vi.hoisted(() => ({ mockUseJobs: vi.fn() }))

vi.mock('../hooks/use-jobs', () => ({ useJobs: mockUseJobs }))

const sharedJob: Job = {
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

const jobs = [
  sharedJob,
  { ...sharedJob, id: 'job-2', title: 'Catering runner' },
  { ...sharedJob, id: 'job-3', title: 'Ticket check team' },
  { ...sharedJob, id: 'job-4', title: 'Weekend event crew' },
  { ...sharedJob, id: 'job-5', jobType: 0, title: 'Permanent office coordinator' },
  { ...sharedJob, id: 'job-6', jobType: 1, title: 'Project launch coordinator' },
]

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-08-18T12:00:00+02:00'))
  mockUseJobs.mockReturnValue({ data: jobs, isError: false, isFetching: false })
})

afterEach(() => {
  vi.useRealTimers()
  mockUseJobs.mockReset()
})

describe('job calendar crowded days', () => {
  test('caps the month count at 3+ and links the date to its focused page', () => {
    render(
      <MemoryRouter>
        <JobCalendarPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'August 2026' })).toBeVisible()
    expect(screen.getByText('3+ open')).toBeVisible()
    expect(screen.getByRole('link', { name: 'View all 4 openings for August 14' })).toHaveAttribute(
      'href',
      '/jobs/calendar/2026-08-14?month=2026-08',
    )
    expect(screen.getByRole('link', { name: 'View all 4 openings' })).toHaveAttribute(
      'href',
      '/jobs/calendar/2026-08-14?month=2026-08',
    )
    expect(screen.getByRole('region', { name: 'August 2026 job calendar' })).toBeVisible()
    expect(screen.queryByText('Permanent office coordinator')).not.toBeInTheDocument()
    expect(screen.queryByText('Project launch coordinator')).not.toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Permanent' })).not.toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Project' })).not.toBeInTheDocument()
  })

  test('shows every matching opening on the selected date page', () => {
    render(
      <MemoryRouter initialEntries={['/jobs/calendar/2026-08-14?month=2026-08']}>
        <Routes>
          <Route element={<JobDayPage />} path="/jobs/calendar/:date" />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Jobs for Friday, August 14.' })).toBeVisible()
    expect(screen.getByText('4 openings ready to compare.')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Hotel evening host' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Catering runner' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Ticket check team' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Weekend event crew' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Permanent office coordinator' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Project launch coordinator' })).not.toBeInTheDocument()
    expect(screen.queryByText('Crew')).not.toBeInTheDocument()
    expect(screen.queryByText('2 needed')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to month' })).toHaveAttribute(
      'href',
      '/jobs/calendar?month=2026-08',
    )
    expect(mockUseJobs).toHaveBeenCalledWith(expect.objectContaining({ onDate: '2026-08-14' }))
  })

  test('restores the month supplied in the calendar URL', () => {
    render(
      <MemoryRouter initialEntries={['/jobs/calendar?month=2026-10']}>
        <JobCalendarPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'October 2026' })).toBeVisible()
  })
})
