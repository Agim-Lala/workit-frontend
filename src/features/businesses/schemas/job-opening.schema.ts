import { z } from 'zod'

const datePattern = /^\d{4}-\d{2}-\d{2}$/

export const jobOpeningFormSchema = z
  .object({
    title: z.string().trim().min(3, 'Enter a title with at least 3 characters.'),
    description: z
      .string()
      .trim()
      .min(20, 'Describe the opportunity in at least 20 characters.'),
    role: z.string().trim().min(2, 'Enter the role you need.'),
    location: z.string().trim().min(2, 'Enter the work location.'),
    payAmount: z.string().refine((value) => Number(value) > 0, {
      message: 'Enter a pay amount greater than zero.',
    }),
    payType: z.enum(['0', '1', '2', '3']),
    jobType: z.enum(['0', '1', '2']),
    startDate: z.string().regex(datePattern, 'Choose a start date.'),
    endDate: z.string(),
    shiftType: z.enum(['0', '1', '2']),
    shiftStartTime: z.string(),
    shiftEndTime: z.string(),
    requiredWorkersCount: z.string().refine(
      (value) => {
        const count = Number(value)
        return Number.isInteger(count) && count > 0 && count <= 1000
      },
      { message: 'Crew size must be between 1 and 1,000.' },
    ),
  })
  .superRefine((values, context) => {
    const isPermanent = values.jobType === '0'

    if (!isPermanent && !datePattern.test(values.endDate)) {
      context.addIssue({
        code: 'custom',
        message: 'Project and short-term jobs require an end date.',
        path: ['endDate'],
      })
    }

    if (
      !isPermanent &&
      datePattern.test(values.endDate) &&
      values.endDate < values.startDate
    ) {
      context.addIssue({
        code: 'custom',
        message: 'End date cannot be before the start date.',
        path: ['endDate'],
      })
    }

    if (values.shiftType === '2') {
      if (!values.shiftStartTime) {
        context.addIssue({
          code: 'custom',
          message: 'Choose a shift start time.',
          path: ['shiftStartTime'],
        })
      }

      if (!values.shiftEndTime) {
        context.addIssue({
          code: 'custom',
          message: 'Choose a shift end time.',
          path: ['shiftEndTime'],
        })
      }

      if (
        values.shiftStartTime &&
        values.shiftEndTime &&
        values.shiftStartTime === values.shiftEndTime
      ) {
        context.addIssue({
          code: 'custom',
          message: 'Start and end times must be different.',
          path: ['shiftEndTime'],
        })
      }
    }
  })

export type JobOpeningFormValues = z.infer<typeof jobOpeningFormSchema>
