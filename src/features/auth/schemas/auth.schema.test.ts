import { describe, expect, test } from 'vitest'

import { signupSchema } from './auth.schema'

const baseSignup = {
  email: 'worker@example.com',
  password: 'password123',
  phone: '',
  firstName: 'Test',
  lastName: 'Worker',
  businessName: '',
  fullAddress: '',
}

describe('worker signup location', () => {
  test('requires a city or area for worker accounts', () => {
    const result = signupSchema.safeParse({
      ...baseSignup,
      accountType: 'worker',
      location: '',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: ['location'] }),
    ]))
  })

  test('accepts a worker with a saved location', () => {
    const result = signupSchema.safeParse({
      ...baseSignup,
      accountType: 'worker',
      location: 'Tirana',
    })

    expect(result.success).toBe(true)
  })
})
