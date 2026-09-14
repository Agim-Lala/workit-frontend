import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  CalendarPlus,
  CheckCircle2,
  ClipboardCheck,
  Plus,
  TimerReset,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { JobOpening } from '@/types/job-opening.types'

import { createJobOpening } from '../api/create-job-opening'
import { ScheduleComposer } from '../components/schedule-composer'
import {
  businessOpeningsQueryKey,
} from '../hooks/use-business-openings'
import {
  jobOpeningFormSchema,
  type JobOpeningFormValues,
} from '../schemas/job-opening.schema'

const fieldClassName =
  'focus-ring mt-2 min-h-12 w-full rounded-xl border border-input bg-surface px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary aria-invalid:border-destructive'

export function BusinessLaunchPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<JobOpeningFormValues>({
    resolver: zodResolver(jobOpeningFormSchema),
    defaultValues: {
      title: '',
      description: '',
      role: '',
      location: '',
      payAmount: '',
      payType: '0',
      jobType: '2',
      startDate: '',
      endDate: '',
      shiftType: '0',
      shiftStartTime: '',
      shiftEndTime: '',
      requiredWorkersCount: '1',
    },
  })
  const createMutation = useMutation({
    mutationFn: createJobOpening,
    onSuccess: (createdJob) => {
      queryClient.setQueryData<JobOpening[]>(
        businessOpeningsQueryKey,
        (currentOpenings = []) => [createdJob, ...currentOpenings],
      )
    },
  })

  async function submitJobOpening(values: JobOpeningFormValues) {
    setSuccessMessage(null)

    try {
      const createdJob = await createMutation.mutateAsync(values)
      setSuccessMessage(`“${createdJob.title}” is now open to workers.`)
      reset()
    } catch {
      // The mutation error state renders an actionable message below the form.
    }
  }

  return (
    <section className="space-y-6">
      <header className="courtyard-surface grid overflow-hidden lg:grid-cols-[1fr_22rem]">
        <div className="bg-peach p-7 sm:p-10 lg:p-12">
          <a className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground" href="/business">
            <ArrowLeft aria-hidden="true" size={17} />
            Back to overview
          </a>
          <h1 className="display-type mt-6 max-w-[12ch] text-5xl font-bold leading-[0.92] sm:text-7xl">
            Create one clear opportunity.
          </h1>
          <p className="mt-5 max-w-[64ch] text-base leading-7 text-muted-foreground sm:text-lg">
            This page is only for publishing. Add the essentials, shape the
            schedule, then finish with pay and crew size.
          </p>
        </div>
        <div className="hidden flex-col justify-between bg-accent p-8 text-accent-foreground lg:flex">
          <p className="display-type max-w-[8ch] text-4xl font-bold leading-[0.95]">
            One page. One task. A clear result.
          </p>
          <p className="text-sm leading-6 text-accent-foreground">
            Your overview stays untouched while you focus on the opening in
            front of you.
          </p>
        </div>
        <ol aria-label="Opening creation steps" className="grid border-t border-border bg-surface sm:grid-cols-3 lg:col-span-2">
          <ProgressStep label="The essentials" />
          <ProgressStep className="border-t sm:border-l sm:border-t-0" label="Schedule and dates" />
          <ProgressStep className="border-t sm:border-l sm:border-t-0" label="Pay and crew" />
        </ol>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <form
          className="courtyard-surface p-5 sm:p-8 lg:p-10"
          id="new-job-opening"
          onSubmit={handleSubmit(submitJobOpening)}
        >
          <section className="scroll-mt-28">
            <div className="border-b border-border pb-4">
              <h2 className="display-type text-3xl font-bold text-foreground">
                Give workers the essentials
              </h2>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <FormField controlId="job-title" error={errors.title?.message} errorId="job-title-error" label="Job title">
                <Input
                  aria-describedby={errors.title ? 'job-title-error' : undefined}
                  aria-invalid={Boolean(errors.title)}
                  className="mt-2"
                  id="job-title"
                  placeholder="Friday event crew"
                  {...register('title')}
                />
              </FormField>
              <FormField controlId="job-role" error={errors.role?.message} errorId="job-role-error" label="Role">
                <Input
                  aria-describedby={errors.role ? 'job-role-error' : undefined}
                  aria-invalid={Boolean(errors.role)}
                  className="mt-2"
                  id="job-role"
                  placeholder="Server, runner, host"
                  {...register('role')}
                />
              </FormField>
              <FormField
                className="md:col-span-2"
                controlId="job-description"
                error={errors.description?.message}
                errorId="job-description-error"
                label="Description"
              >
                <textarea
                  aria-describedby={errors.description ? 'job-description-error' : undefined}
                  aria-invalid={Boolean(errors.description)}
                  className={fieldClassName}
                  id="job-description"
                  placeholder="Describe the work, responsibilities, and what a worker should expect."
                  rows={5}
                  {...register('description')}
                />
              </FormField>
              <FormField
                className="md:col-span-2"
                controlId="job-location"
                error={errors.location?.message}
                errorId="job-location-error"
                label="Location"
              >
                <Input
                  aria-describedby={errors.location ? 'job-location-error' : undefined}
                  aria-invalid={Boolean(errors.location)}
                  className="mt-2"
                  id="job-location"
                  placeholder="Venue or neighborhood"
                  {...register('location')}
                />
              </FormField>
            </div>
          </section>

          <ScheduleComposer
            control={control}
            errors={errors}
            register={register}
            setValue={setValue}
          />

          <section className="mt-8 border-t border-border pt-7">
            <div className="border-b border-border pb-4">
              <h2 className="display-type text-3xl font-bold text-foreground">
                Set the pay and crew
              </h2>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <FormField controlId="job-pay-amount" error={errors.payAmount?.message} errorId="job-pay-amount-error" label="Pay amount">
                <Input
                  aria-describedby={errors.payAmount ? 'job-pay-amount-error' : undefined}
                  aria-invalid={Boolean(errors.payAmount)}
                  className="mt-2"
                  id="job-pay-amount"
                  min="0.01"
                  step="0.01"
                  type="number"
                  {...register('payAmount')}
                />
              </FormField>
              <FormField controlId="job-pay-type" error={errors.payType?.message} errorId="job-pay-type-error" label="Pay period">
                <select aria-describedby={errors.payType ? 'job-pay-type-error' : undefined} aria-invalid={Boolean(errors.payType)} className={fieldClassName} id="job-pay-type" {...register('payType')}>
                  <option value="0">Hourly</option>
                  <option value="1">Daily</option>
                  <option value="2">Fixed</option>
                  <option value="3">Monthly</option>
                </select>
              </FormField>
              <FormField
                controlId="job-crew-size"
                error={errors.requiredWorkersCount?.message}
                errorId="job-crew-size-error"
                label="Crew size"
              >
                <Input
                  aria-describedby={errors.requiredWorkersCount ? 'job-crew-size-error' : undefined}
                  aria-invalid={Boolean(errors.requiredWorkersCount)}
                  className="mt-2"
                  id="job-crew-size"
                  max="1000"
                  min="1"
                  type="number"
                  {...register('requiredWorkersCount')}
                />
              </FormField>
            </div>
          </section>

          {createMutation.isError ? (
            <p aria-live="polite" className="text-sm text-destructive" role="alert">
              The listing could not be created. Check the fields and try again.
            </p>
          ) : null}
          {successMessage ? (
            <p aria-live="polite" className="flex items-center gap-2 text-sm font-medium text-primary" role="status">
              <CheckCircle2 aria-hidden="true" size={17} />
              {successMessage}
            </p>
          ) : null}

          <Button className="mt-7 w-full justify-between" disabled={createMutation.isPending} type="submit">
            <Plus aria-hidden="true" size={18} />
            {createMutation.isPending ? 'Publishing...' : 'Publish job opening'}
          </Button>
        </form>

        <aside className="courtyard-accent courtyard-surface content-start overflow-hidden text-accent-foreground lg:sticky lg:top-28 lg:self-start">
          <h2 className="display-type border-b border-accent-foreground/20 p-5 text-3xl font-bold">From need to active opening</h2>
          <StudioStep index="1" icon={<CalendarPlus aria-hidden="true" size={18} />} title="Shape the opportunity" description="Choose the job type, dates, shift, place, pay, and crew count." />
          <StudioStep index="2" icon={<TimerReset aria-hidden="true" size={18} />} title="Send it live" description="Publish the opening to the worker marketplace." />
          <StudioStep index="3" icon={<ClipboardCheck aria-hidden="true" size={18} />} title="Keep it clear" description="Give workers the practical facts they need before committing." />
        </aside>
      </div>
    </section>
  )
}

function ProgressStep({ className, label }: { className?: string; label: string }) {
  return (
    <li className={`flex min-h-16 items-center gap-3 border-border px-5 py-4 ${className ?? ''}`}>
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-primary" />
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </li>
  )
}

function FormField({
  children,
  className,
  controlId,
  error,
  errorId,
  label,
}: {
  children: ReactNode
  className?: string
  controlId: string
  error?: string
  errorId: string
  label: string
}) {
  return (
    <label className={`text-sm font-medium text-foreground ${className ?? ''}`} htmlFor={controlId}>
      {label}
      {children}
      {error ? <span className="mt-2 block text-sm text-destructive" id={errorId} role="alert">{error}</span> : null}
    </label>
  )
}

function StudioStep({
  description,
  icon,
  index,
  title,
}: {
  description: string
  icon: ReactNode
  index: string
  title: string
}) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-accent-foreground/20 p-5 last:border-b-0">
      <div className="tabular-nums text-sm font-bold text-accent-foreground">{index}</div>
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-accent-foreground">{icon}{title}</p>
        <p className="mt-2 text-sm leading-6 text-accent-foreground">{description}</p>
      </div>
    </div>
  )
}
