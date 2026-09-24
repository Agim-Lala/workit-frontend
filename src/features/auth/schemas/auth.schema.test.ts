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

describe('business signup nipt', () => {
  const baseBusinessSignup = {
    ...baseSignup,
    accountType: 'business' as const,
    businessName: 'Test Business',
    fullAddress: 'Rruga Test, Tirane',
  }

  test('requires a nipt for business accounts', () => {
    const result = signupSchema.safeParse({ ...baseBusinessSignup, nipt: '' })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: ['nipt'] }),
    ]))
  })

  test('rejects a malformed nipt', () => {
    const result = signupSchema.safeParse({ ...baseBusinessSignup, nipt: 'not-a-nipt' })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: ['nipt'] }),
    ]))
  })

  test('accepts a well-formed nipt', () => {
    const result = signupSchema.safeParse({ ...baseBusinessSignup, nipt: 'L12345678A' })

    expect(result.success).toBe(true)
  })
})
