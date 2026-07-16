import { CalendarClock, CheckCircle2 } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/feedback/empty-state'

import { useJob } from '../hooks/use-job'
import { formatJobStatus, formatPayType } from '../utils/job-formatters'

export function JobDetailsPage() {
  const { jobId } = useParams()
  const { data: job } = useJob(jobId ?? '')

  if (!job) {
    return (
      <EmptyState
        description="The requested job listing could not be found."
        title="Job unavailable"
      />
    )
  }

  return (
    <section className="space-y-5">
      <div className="rounded-md border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <Badge>{job.role}</Badge>
          <Badge>{formatJobStatus(job.status)}</Badge>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          {job.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          {job.description}
        </p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase text-muted-foreground">
              Location
            </dt>
            <dd className="mt-1 text-sm text-foreground">{job.location}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-muted-foreground">
              Payment
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {job.payAmount} {formatPayType(job.payType).toLowerCase()}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-muted-foreground">
              Workers
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {job.requiredWorkersCount} needed
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarClock aria-hidden="true" size={18} />
            {job.startsAt}
            {job.endsAt ? ` to ${job.endsAt}` : null}
          </p>
          <Button>
            <CheckCircle2 aria-hidden="true" size={18} />
            Apply
          </Button>
        </div>
      </div>
    </section>
  )
}
