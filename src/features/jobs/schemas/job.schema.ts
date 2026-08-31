import { z } from 'zod'

export const jobSchema = z.object({
  id: z.string().uuid(),
  businessProfileId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(20),
  role: z.string().min(2),
  location: z.string().min(2),
  payAmount: z.number().positive(),
  payType: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.enum(['Hourly', 'Daily', 'Fixed', 'Monthly']),
  ]),
  jobType: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.enum(['Permanent', 'Project', 'ShortTerm']),
  ]),
  startDate: z.string(),
  endDate: z.string().nullable(),
  shiftType: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.enum(['Morning', 'Evening', 'CustomHours']),
  ]),
  shiftStartTime: z.string().nullable(),
  shiftEndTime: z.string().nullable(),
  requiredWorkersCount: z.number().int().positive(),
  status: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.enum(['Draft', 'Open', 'Closed', 'Cancelled']),
  ]),
  createdAt: z.string().datetime({ offset: true }),
})

export type JobResponse = z.infer<typeof jobSchema>
