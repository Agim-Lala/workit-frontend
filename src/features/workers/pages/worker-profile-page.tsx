import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, MapPin, RefreshCcw, UserRound } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { updateWorkerLocation } from '../api/update-worker-location'
import { useWorkerProfile, workerProfileQueryKey } from '../hooks/use-worker-profile'
import {
  workerLocationSchema,
  type WorkerLocationFormValues,
} from '../schemas/worker-location.schema'
import type { WorkerProfile } from '../types/worker.types'

export function WorkerProfilePage() {
  const queryClient = useQueryClient()
  const profileQuery = useWorkerProfile()
  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<WorkerLocationFormValues>({
    resolver: zodResolver(workerLocationSchema),
    defaultValues: { location: '' },
  })
  const locationMutation = useMutation({
    mutationFn: (values: WorkerLocationFormValues) => updateWorkerLocation(values.location),
    onSuccess: (response) => {
      queryClient.setQueryData<WorkerProfile>(workerProfileQueryKey, (current) => (
        current ? { ...current, location: response.location } : current
      ))
      void queryClient.invalidateQueries({ queryKey: ['jobs'] })
      reset({ location: response.location })
    },
  })

  useEffect(() => {
    if (profileQuery.data) {
      reset({ location: profileQuery.data.location })
    }
  }, [profileQuery.data, reset])

  return (
    <section className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
      <header className="courtyard-accent courtyard-surface flex min-h-96 flex-col justify-between p-7 text-accent-foreground sm:p-10">
        <MapPin aria-hidden="true" size={30} />
        <div>
          <h1 className="display-type max-w-[10ch] text-5xl font-bold leading-[0.9] sm:text-6xl">
            Jobs should meet you where you are.
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-7 text-accent-foreground">
            Your saved city or area shapes both the opportunity list and the short-term job calendar.
          </p>
        </div>
      </header>

      <div className="courtyard-surface p-6 sm:p-9">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="display-type text-4xl font-bold">Location preference</h2>
            <p className="mt-3 max-w-[60ch] text-sm leading-6 text-muted-foreground">
              Workit matches this text against each opening’s work location. Use a city or recognizable area such as Tirana or Durrës.
            </p>
          </div>
          {profileQuery.data ? (
            <div className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-foreground">
              <UserRound aria-hidden="true" size={17} />
              {profileQuery.data.firstName} {profileQuery.data.lastName}
            </div>
          ) : null}
        </div>

        {profileQuery.isLoading ? (
          <div aria-live="polite" className="mt-8 rounded-2xl border border-border bg-background px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">Loading your location…</p>
          </div>
        ) : null}

        {profileQuery.isError && !profileQuery.data ? (
          <div className="mt-8 rounded-2xl border border-destructive/45 bg-background p-6" role="alert">
            <h3 className="display-type text-3xl font-bold">Your location could not load.</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Check your connection and try loading the profile again.
            </p>
            <Button className="mt-5" onClick={() => void profileQuery.refetch()} type="button" variant="secondary">
              <RefreshCcw aria-hidden="true" size={17} />
              Try again
            </Button>
          </div>
        ) : null}

        {profileQuery.data ? (
          <form className="mt-8" onSubmit={handleSubmit((values) => locationMutation.mutate(values))}>
            <label className="text-sm font-semibold text-foreground" htmlFor="worker-location">
              City or area
              <span className="relative mt-2 block">
                <MapPin
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  aria-describedby={errors.location ? 'worker-location-hint worker-location-error' : 'worker-location-hint'}
                  aria-invalid={Boolean(errors.location)}
                  className="pl-10"
                  id="worker-location"
                  maxLength={200}
                  placeholder="Tirana"
                  {...register('location')}
                />
              </span>
            </label>
            <p className="mt-2 text-xs leading-5 text-muted-foreground" id="worker-location-hint">
              Changing this refreshes your job list and calendar automatically.
            </p>
            {errors.location ? (
              <p className="mt-2 text-sm text-destructive" id="worker-location-error" role="alert">
                {errors.location.message}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" className="min-h-6 text-sm">
                {locationMutation.isSuccess ? (
                  <span className="inline-flex items-center gap-2 font-semibold text-accent">
                    <CheckCircle2 aria-hidden="true" size={17} />
                    Location saved. Your jobs have been refreshed.
                  </span>
                ) : null}
                {locationMutation.isError ? (
                  <span className="text-destructive" role="alert">
                    Location could not be saved. Try again.
                  </span>
                ) : null}
              </div>
              <Button disabled={!isDirty || locationMutation.isPending} type="submit">
                {locationMutation.isPending ? 'Saving location…' : 'Save location'}
              </Button>
            </div>
          </form>
        ) : null}
      </div>
    </section>
  )
}
