import { format, isValid, parseISO } from 'date-fns'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { EmptyState } from '@/components/feedback/empty-state'
import { Button } from '@/components/ui/button'

import { JobCard } from '../components/job-card'
import { JobFilters } from '../components/job-filters'
import { JobViewNavigation } from '../components/job-view-navigation'
import { useJobFilters } from '../hooks/use-job-filters'
import { useJobs } from '../hooks/use-jobs'
import { getJobsForDate } from '../utils/job-calendar'
import { jobMatchesSearch } from '../utils/job-formatters'

export function JobDayPage() {
  const { date = '' } = useParams()
  const [searchParams] = useSearchParams()
  const parsedDate = parseISO(date)
  const isValidDate = isValid(parsedDate) && format(parsedDate, 'yyyy-MM-dd') === date
  const monthParam = searchParams.get('month') ?? ''
  const parsedMonth = parseISO(`${monthParam}-01`)
  const returnMonth = isValid(parsedMonth) && format(parsedMonth, 'yyyy-MM') === monthParam
    ? monthParam
    : date.slice(0, 7)
  const calendarPath = `/jobs/calendar?month=${returnMonth}`
  const filters = useJobFilters()
  const { data: jobs = [], isError, isFetching } = useJobs({
    ...filters,
    onDate: isValidDate ? date : '',
  })

  if (!isValidDate) {
    return (
      <EmptyState
        action={<Button asChild><Link to="/jobs/calendar">Back to calendar</Link></Button>}
        description="Choose a valid day from the monthly job calendar."
        title="That date is not available"
      />
    )
  }

  const visibleJobs = getJobsForDate(jobs, parsedDate)
    .filter((job) => jobMatchesSearch(job, filters.search))
  const hasBlockingError = isError && jobs.length === 0

  return (
    <section className="space-y-6">
      <header className="courtyard-surface grid overflow-hidden lg:grid-cols-[1fr_22rem]" id="job-day-title">
        <div className="bg-peach p-7 sm:p-10 lg:p-12">
          <Link className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground" to={calendarPath}>
            <ArrowLeft aria-hidden="true" size={17} />
            Back to month
          </Link>
          <h1 className="display-type mt-5 max-w-[13ch] text-5xl font-bold leading-[0.92] sm:text-7xl">
            Jobs for {format(parsedDate, 'EEEE, MMMM d')}.
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-7 text-muted-foreground sm:text-lg">
            Every opening scheduled for this date, gathered into one focused view.
          </p>
          <p className="mt-5 inline-flex items-baseline gap-2 bg-accent px-4 py-2 text-accent-foreground lg:hidden">
            <strong className="display-type text-3xl leading-none">{visibleJobs.length}</strong>
            <span className="text-sm">{visibleJobs.length === 1 ? 'opening this day' : 'openings this day'}</span>
          </p>
        </div>
        <div className="courtyard-accent hidden flex-col justify-between p-6 text-accent-foreground lg:flex lg:p-8">
          <CalendarDays aria-hidden="true" size={30} />
          <div className="mt-12">
            <p className="display-type tabular-nums text-6xl font-bold leading-none">{visibleJobs.length}</p>
            <p className="mt-3 text-sm leading-6">
              {visibleJobs.length === 1 ? 'opening matches this day' : 'openings match this day'}
            </p>
          </div>
        </div>
      </header>

      <div className="flex justify-start">
        <JobViewNavigation calendarTo={calendarPath} />
      </div>

      <JobFilters collapsibleOnMobile shortTermOnly showDate={false} title="Filter this day" />

      {hasBlockingError ? (
        <div className="courtyard-surface border border-destructive/45 p-5 text-sm leading-6" role="alert">
          <strong className="block text-destructive">Jobs for this day could not load.</strong>
          Check your connection and try again.
        </div>
      ) : null}

      <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="display-type text-4xl font-bold">Openings on this date</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isFetching ? 'Refreshing this day…' : `${visibleJobs.length} ${visibleJobs.length === 1 ? 'opening' : 'openings'} ready to compare.`}
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {visibleJobs.map((job) => <JobCard job={job} key={job.id} />)}
      </div>

      {!isFetching && !hasBlockingError && visibleJobs.length === 0 ? (
        <EmptyState
          action={<Button asChild><Link to={calendarPath}>Choose another date</Link></Button>}
          description="Try another day or broaden the job-type and shift filters."
          title="No matching openings for this day"
        />
      ) : null}
    </section>
  )
}
