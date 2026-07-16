import { z } from 'zod'

export const jobSchema = z.object({
  businessProfileId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(20),
  role: z.string().min(2),
  location: z.string().min(2),
  startsAt: z.string().datetime({ offset: true }),
  endsAt: z.string().datetime({ offset: true }).nullable(),
  requiredWorkersCount: z.number().int().positive(),
  payAmount: z.number().positive(),
  payType: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.enum(['Hourly', 'Daily', 'Fixed', 'Monthly']),
  ]),
  scheduleType: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.enum(['SpecificDates', 'DateRange', 'RecurringWeekly', 'LongTerm']),
  ]),
})

export type JobFormValues = z.infer<typeof jobSchema>
