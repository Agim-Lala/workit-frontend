import { z } from 'zod'

export const applicationSchema = z.object({
  jobId: z.string().min(1),
  workerId: z.string().min(1),
})
