import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { App } from './App'

test('renders the jobs page by default', async () => {
  render(<App />)

  expect(await screen.findByRole('heading', { name: /open jobs/i })).toBeVisible()
})
