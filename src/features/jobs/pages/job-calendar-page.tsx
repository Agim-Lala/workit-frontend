import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isValid,
  isSameDay,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Wallet,
} from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { JobFilters } from '../components/job-filters'
import { JobViewNavigation } from '../components/job-view-navigation'
import { useJobFilters } from '../hooks/use-job-filters'
import { useJobs } from '../hooks/use-jobs'
import type { Job } from '../types/job.types'
import { getJobsForDate, isCalendarEligibleJob } from '../utils/job-calendar'
import { formatJobShift, formatPayType, jobMatchesSearch } from '../utils/job-formatters'

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function JobCalendarPage() {
  const filters = useJobFilters()
  const setOnDate = filters.setOnDate
  const [searchParams, setSearchParams] = useSearchParams()
  const monthParam = searchParams.get('month') ?? ''
  const parsedMonth = parse(monthParam, 'yyyy-MM', new Date())
  const visibleMonth = isValid(parsedMonth) && format(parsedMonth, 'yyyy-MM') === monthParam
    ? startOfMonth(parsedMonth)
    : startOfMonth(new Date())

  const setVisibleMonth = (month: Date) => {
    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.set('month', format(month, 'yyyy-MM'))
    setSearchParams(nextSearchParams)
  }

  useEffect(() => {
    setOnDate('')
  }, [setOnDate])

  const calendarFilters = {
    ...filters,
    onDate: '',
  }
  const { data: jobs = [], isError, isFetching } = useJobs(calendarFilters)
  const visibleJobs = jobs
    .filter(isCalendarEligibleJob)
    .filter((job) => jobMatchesSearch(job, filters.search))
  const calendarDays = useMemo(
    () => eachDayOfInterval({
      start: startOfWeek(startOfMonth(visibleMonth), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(visibleMonth), { weekStartsOn: 1 }),
    }),
    [visibleMonth],
  )

  return (
    <section className="space-y-6">
      <header className="courtyard-surface grid overflow-hidden lg:grid-cols-[1fr_22rem]">
        <div className="bg-peach p-7 sm:p-10 lg:p-12">
          <h1 className="display-type max-w-[12ch] text-5xl font-bold leading-[0.92] sm:text-7xl">
            See your month before you choose your next job.
          </h1>
          <p className="mt-5 max-w-[64ch] text-base leading-7 text-muted-foreground sm:text-lg">
            Openings appear on every day they cover, so you can compare work
            against the shape of your month.
          </p>
        </div>
        <div className="flex flex-col justify-between bg-accent p-6 text-accent-foreground lg:p-8">
          <CalendarDays aria-hidden="true" size={30} />
          <div className="mt-12">
            <p className="display-type text-4xl font-bold leading-none">
              {format(visibleMonth, 'MMMM yyyy')}
            </p>
            <p className="mt-3 text-sm leading-6 text-accent-foreground">
              {visibleJobs.length} {visibleJobs.length === 1 ? 'opening' : 'openings'} available to place on your calendar.
            </p>
          </div>
        </div>
      </header>

      <div className="flex justify-start">
        <JobViewNavigation />
      </div>

      <JobFilters shortTermOnly showDate={false} title="Filter the calendar" />

      {isError ? (
        <div className="courtyard-surface border border-destructive/45 p-5 text-sm leading-6" role="alert">
          <strong className="block text-destructive">The calendar could not load.</strong>
          Confirm you are signed in with a worker account and that the Workit API is running, then try again.
        </div>
      ) : null}

      <section aria-labelledby="job-calendar-title" className="courtyard-surface overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <h2 className="display-type text-4xl font-bold" id="job-calendar-title">
              {format(visibleMonth, 'MMMM yyyy')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isFetching ? 'Refreshing the month…' : 'Select any opening to view its full details.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button aria-label="Previous month" onClick={() => setVisibleMonth(subMonths(visibleMonth, 1))} size="icon" type="button" variant="secondary">
              <ChevronLeft aria-hidden="true" size={18} />
            </Button>
            <Button onClick={() => setVisibleMonth(startOfMonth(new Date()))} type="button" variant="ghost">
              Today
            </Button>
            <Button aria-label="Next month" onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))} size="icon" type="button" variant="secondary">
              <ChevronRight aria-hidden="true" size={18} />
            </Button>
          </div>
        </div>

        <p className="border-b border-border bg-secondary/45 px-5 py-3 text-xs font-semibold text-muted-foreground lg:hidden">
          Swipe sideways to explore the full month.
        </p>

        <div className="hide-scrollbar overflow-x-auto" tabIndex={0}>
          <div className="min-w-[980px]">
            <div aria-hidden="true" className="grid grid-cols-7 border-b border-border bg-secondary/35">
              {weekDays.map((day) => (
                <div className="border-r border-border px-3 py-3 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground last:border-r-0" key={day}>
                  {day}
                </div>
              ))}
            </div>
            <div aria-label={`${format(visibleMonth, 'MMMM yyyy')} job calendar`} className="grid grid-cols-7" role="region">
              {calendarDays.map((day) => (
                <CalendarDay
                  day={day}
                  jobs={isSameMonth(day, visibleMonth) ? getJobsForDate(visibleJobs, day) : []}
                  key={day.toISOString()}
                  muted={!isSameMonth(day, visibleMonth)}
                  returnMonth={format(visibleMonth, 'yyyy-MM')}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

function CalendarDay({
  day,
  jobs,
  muted,
  returnMonth,
}: {
  day: Date
  jobs: Job[]
  muted: boolean
  returnMonth: string
}) {
  const shownJobs = jobs.slice(0, 3)
  const dayPath = `/jobs/calendar/${format(day, 'yyyy-MM-dd')}?month=${returnMonth}`
  const countLabel = jobs.length > 3 ? '3+' : String(jobs.length)

  return (
    <div
      aria-label={`${format(day, 'EEEE, MMMM d')}: ${jobs.length} ${jobs.length === 1 ? 'opening' : 'openings'}`}
      className={cn(
        'min-h-44 border-b border-r border-border p-2.5 last:border-r-0',
        muted && 'bg-secondary/20 text-muted-foreground',
      )}
      role="group"
    >
      {jobs.length > 1 ? (
        <Link
          aria-label={`View all ${jobs.length} openings for ${format(day, 'MMMM d')}`}
          className="focus-ring -m-1 flex min-h-11 items-center justify-between gap-2 p-1 hover:bg-secondary/60"
          to={dayPath}
        >
          <DayNumber day={day} muted={muted} />
          <span className="text-xs font-bold text-primary">{countLabel} open</span>
        </Link>
      ) : (
        <div className="flex min-h-11 items-center justify-between gap-2">
          <DayNumber day={day} muted={muted} />
          {jobs.length === 1 ? <span className="text-xs font-semibold text-muted-foreground">1 open</span> : null}
        </div>
      )}

      <div className="mt-2.5 space-y-2">
        {shownJobs.map((job) => (
          <Link
            className="focus-ring block bg-peach px-2.5 py-2 transition-colors hover:bg-secondary"
            key={job.id}
            to={`/jobs/${job.id}`}
          >
            <span className="block truncate text-sm font-bold text-foreground">{job.title}</span>
            <span className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
              <Clock3 aria-hidden="true" className="shrink-0" size={13} />
              {formatJobShift(job)}
            </span>
            <span className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
              <MapPin aria-hidden="true" className="shrink-0" size={13} />
              {job.location}
            </span>
            <span className="mt-1 flex items-center gap-1.5 truncate text-xs font-semibold text-foreground">
              <Wallet aria-hidden="true" className="shrink-0 text-primary" size={13} />
              {job.payAmount.toLocaleString()} ALL · {formatPayType(job.payType)}
            </span>
          </Link>
        ))}
        {jobs.length > shownJobs.length ? (
          <Link className="focus-ring flex min-h-11 items-center px-2 text-xs font-semibold text-primary hover:bg-secondary/60" to={dayPath}>
            View all {jobs.length} openings
          </Link>
        ) : null}
      </div>
    </div>
  )
}

function DayNumber({ day, muted }: { day: Date; muted: boolean }) {
  return (
    <time
      className={cn(
        'grid h-8 w-8 place-items-center text-sm font-bold',
        isSameDay(day, new Date()) ? 'bg-primary text-primary-foreground' : 'text-foreground',
        muted && 'text-muted-foreground',
      )}
      dateTime={format(day, 'yyyy-MM-dd')}
    >
      {format(day, 'd')}
    </time>
  )
}
