import { ArrowLeft, CalendarClock, CheckCircle2, Clock3, MapPin, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { EmptyState } from '@/components/feedback/empty-state'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { useJob } from '../hooks/use-job'
import {
  formatJobDateRange,
  formatJobShift,
  formatJobStatus,
  formatJobType,
  formatPayType,
} from '../utils/job-formatters'

export function JobDetailsPage() {
  const { jobId } = useParams()
  const { data: job, isError, isLoading } = useJob(jobId ?? '')

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading job details…</p>
  if (isError || !job) return <EmptyState description="The requested job listing could not be found." title="Job unavailable" />

  return (
    <section className="space-y-5">
      <Link className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground" to="/jobs">
        <ArrowLeft aria-hidden="true" size={17} />
        Back to opportunities
      </Link>

      <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <article className="courtyard-surface p-6 sm:p-9">
          <div className="h-2 w-20 rounded-full bg-sun" />
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge className="border-primary/35 bg-primary/10 text-primary">{job.role}</Badge>
            <Badge>{formatJobStatus(job.status)}</Badge>
            <Badge>{formatJobType(job.jobType)}</Badge>
          </div>
          <h1 className="display-type mt-5 max-w-[13ch] text-5xl font-bold leading-[0.92] sm:text-7xl">{job.title}</h1>
          <p className="mt-7 max-w-[70ch] text-base leading-8 text-muted-foreground">{job.description}</p>

          <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <CalendarClock aria-hidden="true" size={18} />
              {formatJobDateRange(job.startDate, job.endDate)} · {formatJobShift(job)}
            </p>
            <Button className="justify-between sm:min-w-48">
              <CheckCircle2 aria-hidden="true" size={18} />
              Apply
            </Button>
          </div>
        </article>

        <aside className="courtyard-accent courtyard-surface overflow-hidden text-accent-foreground">
          <h2 className="display-type border-b border-accent-foreground/25 p-5 text-3xl font-bold">Job brief</h2>
          <dl className="divide-y divide-accent-foreground/20">
            <Brief icon={MapPin} label="Location" value={job.location} />
            <Brief icon={Wallet} label="Payment" value={`${job.payAmount.toLocaleString()} ${formatPayType(job.payType).toLowerCase()}`} />
            <Brief icon={Clock3} label="Schedule" value={`${formatJobType(job.jobType)} · ${formatJobShift(job)}`} />
          </dl>
        </aside>
      </div>
    </section>
  )
}

function Brief({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="p-5">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-accent-foreground">
        <Icon aria-hidden="true" size={17} />
        {label}
      </dt>
      <dd className="tabular-nums mt-2 text-lg font-semibold text-accent-foreground">{value}</dd>
    </div>
  )
}
