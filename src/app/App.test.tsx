import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

import { App } from './App'

test('renders the public home page by default', async () => {
  const user = userEvent.setup()
  render(<App />)

  expect(
    await screen.findByRole('heading', { name: /work that fits your life/i }),
  ).toBeVisible()
  expect(screen.getByRole('heading', { name: /weekend event crew/i })).toBeVisible()
  expect(screen.getByRole('link', { name: /sign in to view details/i })).toBeVisible()

  await user.click(screen.getAllByRole('button', { name: /show morning barista/i })[0])
  expect(screen.getByRole('heading', { name: /morning barista/i })).toBeVisible()
})
