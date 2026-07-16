import { z } from 'zod'

export const workerProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  skills: z.array(z.string().min(2)),
  experience: z.array(z.string().min(2)),
})
