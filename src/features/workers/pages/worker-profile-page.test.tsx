import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'

import { WorkerProfilePage } from './worker-profile-page'

const { mockGetWorkerProfile, mockUpdateWorkerLocation } = vi.hoisted(() => ({
  mockGetWorkerProfile: vi.fn(),
  mockUpdateWorkerLocation: vi.fn(),
}))

vi.mock('../api/get-worker-profile', () => ({ getWorkerProfile: mockGetWorkerProfile }))
vi.mock('../api/update-worker-location', () => ({ updateWorkerLocation: mockUpdateWorkerLocation }))

beforeEach(() => {
  mockGetWorkerProfile.mockResolvedValue({
    id: 'profile-1',
    userId: 'user-1',
    firstName: 'Test',
    lastName: 'Worker',
    phone: null,
    location: 'Tirana',
  })
  mockUpdateWorkerLocation.mockResolvedValue({ location: 'Durrës' })
})

test('updates the worker location and invalidates location-aware jobs', async () => {
  const user = userEvent.setup()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  queryClient.setQueryData(['jobs'], ['cached-job'])

  render(
    <QueryClientProvider client={queryClient}>
      <WorkerProfilePage />
    </QueryClientProvider>,
  )

  const locationInput = await screen.findByRole('textbox', { name: 'City or area' })
  expect(locationInput).toHaveValue('Tirana')

  await user.clear(locationInput)
  await user.type(locationInput, 'Durrës')
  await user.click(screen.getByRole('button', { name: 'Save location' }))

  expect(mockUpdateWorkerLocation).toHaveBeenCalledWith('Durrës')
  expect(await screen.findByText('Location saved. Your jobs have been refreshed.')).toBeVisible()
  expect(queryClient.getQueryState(['jobs'])?.isInvalidated).toBe(true)
})
