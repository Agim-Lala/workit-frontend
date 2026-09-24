import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'

import { I18nProvider } from '@/i18n'

import { WorkerProfilePage } from './worker-profile-page'

const {
  mockGetWorkerProfile,
  mockUpdateWorkerLocation,
  mockUpdateWorkerPreferences,
  mockStartWorkerVerification,
} = vi.hoisted(() => ({
  mockGetWorkerProfile: vi.fn(),
  mockUpdateWorkerLocation: vi.fn(),
  mockUpdateWorkerPreferences: vi.fn(),
  mockStartWorkerVerification: vi.fn(),
}))

vi.mock('../api/get-worker-profile', () => ({ getWorkerProfile: mockGetWorkerProfile }))
vi.mock('../api/update-worker-location', () => ({ updateWorkerLocation: mockUpdateWorkerLocation }))
vi.mock('../api/update-worker-preferences', () => ({ updateWorkerPreferences: mockUpdateWorkerPreferences }))
vi.mock('../api/start-worker-verification', () => ({ startWorkerVerification: mockStartWorkerVerification }))
vi.mock('../api/get-worker-reviews', () => ({
  getWorkerReviews: vi.fn().mockResolvedValue({
    items: [],
    averageRating: null,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  }),
}))

beforeEach(() => {
  mockGetWorkerProfile.mockResolvedValue({
    id: 'profile-1',
    userId: 'user-1',
    firstName: 'Test',
    lastName: 'Worker',
    phone: null,
    location: 'Tirana',
    isLocationVerified: true,
    country: 'Albania',
    hasCv: false,
    cvFileName: null,
    cvUploadedAt: null,
    hasPhoto: false,
    photoUploadedAt: null,
    interestedFields: [],
    preferredShiftTypes: [],
    preferredShiftTypeLabels: [],
    verificationStatus: 'NotStarted',
    verificationStatusLabel: 'Not started',
  })
  mockUpdateWorkerLocation.mockResolvedValue({ location: 'Durrës', isLocationVerified: true, country: 'Albania' })
  mockUpdateWorkerPreferences.mockResolvedValue({ interestedFields: ['Bartending'], preferredShiftTypes: [0] })
  mockStartWorkerVerification.mockResolvedValue({ hostedUrl: 'https://verify.example/inquiry-1', status: 'Pending' })
})

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  render(
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <WorkerProfilePage />
      </QueryClientProvider>
    </I18nProvider>,
  )

  return queryClient
}

test('updates the worker location and invalidates location-aware jobs', async () => {
  const user = userEvent.setup()
  const queryClient = renderPage()
  queryClient.setQueryData(['jobs'], ['cached-job'])

  const locationInput = await screen.findByRole('textbox', { name: 'City or area' })
  expect(locationInput).toHaveValue('Tirana')

  await user.clear(locationInput)
  await user.type(locationInput, 'Durrës')
  await user.click(screen.getByRole('button', { name: 'Save location' }))

  expect(mockUpdateWorkerLocation).toHaveBeenCalledWith('Durrës')
  expect(await screen.findByText('Location saved and verified.')).toBeVisible()
  expect(queryClient.getQueryState(['jobs'])?.isInvalidated).toBe(true)
})

test('adds an interested field and saves preferences', async () => {
  const user = userEvent.setup()
  renderPage()

  const fieldInput = await screen.findByRole('textbox', { name: 'Interested fields' })
  await user.type(fieldInput, 'Bartending')
  await user.click(screen.getByRole('button', { name: 'Add' }))
  expect(screen.getByText('Bartending')).toBeVisible()

  await user.click(screen.getByRole('button', { name: 'Morning' }))
  await user.click(screen.getByRole('button', { name: 'Save preferences' }))

  expect(mockUpdateWorkerPreferences).toHaveBeenCalledWith(['Bartending'], [0])
  expect(await screen.findByText('Preferences saved.')).toBeVisible()
})

test('starts identity verification and opens the hosted link', async () => {
  const user = userEvent.setup()
  const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
  renderPage()

  await user.click(await screen.findByRole('button', { name: 'Verify with ID' }))

  expect(mockStartWorkerVerification).toHaveBeenCalled()
  await screen.findByText('Complete verification in the new tab. This page will update once it’s reviewed.')
  expect(openSpy).toHaveBeenCalledWith('https://verify.example/inquiry-1', '_blank', 'noopener,noreferrer')

  openSpy.mockRestore()
})
