import { format } from 'date-fns'
import { ArrowRight, MapPin, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import type { Job } from '../types/job.types'
import { formatJobStatus, formatPayType } from '../utils/job-formatters'

type JobCardProps = {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const startsAt = format(new Date(job.startsAt), 'MMM d, HH:mm')

  return (
    <article className="rounded-md border border-border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{job.role}</Badge>
            <Badge>{formatJobStatus(job.status)}</Badge>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-foreground">
            {job.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {job.description}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-lg font-semibold text-foreground">
            {job.payAmount}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatPayType(job.payType)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin aria-hidden="true" size={16} />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <UsersRound aria-hidden="true" size={16} />
            {job.requiredWorkersCount} needed
          </span>
          <span>{startsAt}</span>
        </div>
        <Button asChild size="sm" variant="secondary">
          <Link to={`/jobs/${job.id}`}>
            View
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </Button>
      </div>
    </article>
  )
}
