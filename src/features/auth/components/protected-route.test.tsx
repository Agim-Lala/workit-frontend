import { render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import { setAuthSession } from '../utils/auth-token'
import { ProtectedRoute, type AuthRedirectState } from './protected-route'

afterEach(() => {
  window.localStorage.clear()
})

test('redirects signed-out visitors and remembers the protected destination', async () => {
  renderProtectedRoute()

  expect(await screen.findByRole('heading', { name: 'Sign in' })).toBeVisible()
  expect(screen.getByText('Return to: /jobs/job-42?source=home')).toBeVisible()
})

test('renders protected content when an access token exists', async () => {
  setAuthSession('test-access-token', {
    id: 'worker-42',
    email: 'worker@example.com',
    role: 0,
  })
  renderProtectedRoute()

  expect(await screen.findByRole('heading', { name: 'Job details' })).toBeVisible()
})

test('redirects an authenticated business away from worker-only routes', async () => {
  setAuthSession('test-access-token', {
    id: 'business-42',
    email: 'business@example.com',
    role: 1,
  })
  renderProtectedRoute()

  expect(
    await screen.findByRole('heading', { name: 'Business launch' }),
  ).toBeVisible()
})

function renderProtectedRoute() {
  return render(
    <MemoryRouter initialEntries={['/jobs/job-42?source=home']}>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={['Worker']} />}>
          <Route path="/jobs/:jobId" element={<h1>Job details</h1>} />
        </Route>
        <Route path="/business" element={<h1>Business launch</h1>} />
        <Route path="/login" element={<LoginDestination />} />
      </Routes>
    </MemoryRouter>,
  )
}

function LoginDestination() {
  const location = useLocation()
  const state = location.state as AuthRedirectState | null

  return (
    <>
      <h1>Sign in</h1>
      <p>Return to: {state?.returnTo}</p>
    </>
  )
}
