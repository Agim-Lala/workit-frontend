import { z } from 'zod'

export const workerLocationSchema = z.object({
  location: z
    .string()
    .trim()
    .min(2, 'Enter your city or area.')
    .max(200, 'Keep your location under 200 characters.'),
})

export type WorkerLocationFormValues = z.infer<typeof workerLocationSchema>
