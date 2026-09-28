import { z } from 'zod'

// Albania's business tax registration number: 1 letter + 8 digits + 1 letter (e.g. L12345678A).
const niptPattern = /^[A-Za-z]\d{8}[A-Za-z]$/

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const signupSchema = z
  .object({
    accountType: z.enum(['worker', 'business']),
    email: z.string().email('Enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Confirm your password.'),
    phone: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    location: z.string().max(200, 'Keep your location under 200 characters.').optional(),
    businessName: z.string().optional(),
    fullAddress: z.string().optional(),
    // Set only when the address came from a suggestion or the user's location; cleared on free typing.
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    nipt: z.string().optional(),
  })
  .superRefine((values, context) => {
    if (values.confirmPassword && values.confirmPassword !== values.password) {
      context.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
      })
    }

    if (values.accountType === 'worker') {
      if (!values.firstName?.trim()) {
        context.addIssue({
          code: 'custom',
          message: 'Enter your first name.',
          path: ['firstName'],
        })
      }

      if (!values.lastName?.trim()) {
        context.addIssue({
          code: 'custom',
          message: 'Enter your last name.',
          path: ['lastName'],
        })
      }

      if (!values.location?.trim()) {
        context.addIssue({
          code: 'custom',
          message: 'Enter your city or area.',
          path: ['location'],
        })
      }
    }

    if (values.accountType === 'business') {
      if (!values.businessName?.trim()) {
        context.addIssue({
          code: 'custom',
          message: 'Enter your business name.',
          path: ['businessName'],
        })
      }

      if (!values.fullAddress?.trim()) {
        context.addIssue({
          code: 'custom',
          message: 'Enter your business address.',
          path: ['fullAddress'],
        })
      }

      const nipt = values.nipt?.trim() ?? ''
      if (!nipt) {
        context.addIssue({
          code: 'custom',
          message: 'Enter your business NIPT.',
          path: ['nipt'],
        })
      } else if (!niptPattern.test(nipt)) {
        context.addIssue({
          code: 'custom',
          message: 'Enter a valid NIPT (e.g. L12345678A).',
          path: ['nipt'],
        })
      }
    }
  })

export type SignupFormValues = z.infer<typeof signupSchema>
