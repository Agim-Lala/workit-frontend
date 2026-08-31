import { z } from 'zod'

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
    phone: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    location: z.string().max(200, 'Keep your location under 200 characters.').optional(),
    businessName: z.string().optional(),
    fullAddress: z.string().optional(),
  })
  .superRefine((values, context) => {
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
    }
  })

export type SignupFormValues = z.infer<typeof signupSchema>
