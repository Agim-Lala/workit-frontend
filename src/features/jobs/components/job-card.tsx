import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFromState } from '@/hooks/use-from-state'

import type { Job } from '../types/job.types'
import {
  formatJobDateRange,
  formatJobShift,
  formatJobStatus,
  formatJobType,
  formatPayType,
} from '../utils/job-formatters'

type JobCardProps = { job: Job }

export function JobCard({ job }: JobCardProps) {
  const fromState = useFromState()

  return (
    <article className="courtyard-surface group relative overflow-hidden border border-transparent transition-[border-color,transform] hover:-translate-y-0.5 hover:border-primary/35">
      <div className="grid lg:grid-cols-[1.2fr_1fr_auto]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-primary/35 bg-primary/10 text-primary">{job.role}</Badge>
            <Badge>{formatJobStatus(job.status)}</Badge>
            <Badge>{formatJobType(job.jobType)}</Badge>
          </div>
          <h2 className="display-type mt-4 text-3xl font-bold leading-none sm:text-4xl">{job.title}</h2>
          <p className="mt-3 max-w-[68ch] text-sm leading-6 text-muted-foreground">{job.description}</p>
        </div>

        <dl className="grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y lg:border-l lg:border-t-0">
          <JobFact icon={MapPin} label="Location" value={job.location} />
          <JobFact icon={CalendarDays} label="Dates" value={formatJobDateRange(job.startDate, job.endDate)} />
          <JobFact icon={Clock3} label="Shift" value={formatJobShift(job)} />
        </dl>

        <div className="flex min-w-48 flex-col justify-between border-t border-border bg-secondary/55 p-5 lg:border-l lg:border-t-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Pay</p>
            <p className="tabular-nums display-type mt-1 text-4xl font-bold leading-none">{job.payAmount.toLocaleString()}</p>
            <p className="mt-1 text-sm text-muted-foreground">{formatPayType(job.payType)}</p>
          </div>
          <Button asChild className="mt-6 justify-between" size="sm">
            <Link state={fromState} to={`/jobs/${job.id}`}>
              View details
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

function JobFact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="p-4">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        <Icon aria-hidden="true" size={15} />
        {label}
      </dt>
      <dd className="tabular-nums mt-2 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  )
}
