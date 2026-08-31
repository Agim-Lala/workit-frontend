import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

import { BusinessLaunchPage } from './business-launch-page'

vi.mock('../api/get-business-job-openings', () => ({
  getBusinessJobOpenings: vi.fn().mockResolvedValue([]),
}))

test('composes dates and custom hours through the visual schedule controls', async () => {
  const user = userEvent.setup()
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <BusinessLaunchPage />
    </QueryClientProvider>,
  )

  expect(screen.getByRole('radio', { name: /short term/i })).toBeChecked()

  await user.click(screen.getByRole('button', { name: /starts.*pick a date/i }))
  expect(screen.getByRole('button', { name: /previous month/i })).toBeVisible()

  await user.click(screen.getByRole('button', { name: /weekend/i }))
  expect(screen.getByText(/2 days · morning/i)).toBeVisible()

  await user.click(screen.getByRole('radio', { name: /custom hours/i }))
  expect(screen.getByRole('slider', { name: /clock in/i })).toBeVisible()

  await user.click(screen.getByRole('button', { name: /late shift/i }))
  expect(screen.getByText(/4:00 pm → 10:00 pm/i)).toBeVisible()
  expect(screen.getByText(/6h scheduled/i)).toBeVisible()
})
