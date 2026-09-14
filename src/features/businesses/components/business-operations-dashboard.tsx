import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfWeek,
} from 'date-fns'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  Plus,
  UsersRound,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { JobOpening } from '@/types/job-opening.types'
import {
  formatJobDateRange,
  formatJobShift,
  formatJobStatus,
  formatPayType,
} from '@/utils/job-formatters'

type BusinessOperationsDashboardProps = {
  openings: JobOpening[]
}

export function BusinessOperationsDashboard({
  openings,
}: BusinessOperationsDashboardProps) {
  const activeOpenings = openings.filter((opening) =>
    opening.status === 'Open' || opening.status === 1,
  )
  const requestedWorkers = activeOpenings.reduce(
    (total, opening) => total + opening.requiredWorkersCount,
    0,
  )

  return (
    <section aria-labelledby="business-dashboard-title" className="space-y-5">
      <header className="courtyard-reveal grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="courtyard-surface flex flex-col justify-between p-7 sm:p-10 lg:p-12">
          <h1
            className="display-type max-w-[13ch] text-5xl font-bold leading-[0.92] sm:text-7xl"
            id="business-dashboard-title"
          >
            Good morning. Let’s make work happen.
          </h1>
          <div>
            <p className="mt-6 max-w-[52ch] text-base leading-7 text-muted-foreground sm:text-lg">
              See what is active, what is coming up, and where to go next—then
              move into one focused task at a time.
            </p>
            <Button asChild className="mt-8 justify-between sm:min-w-56">
              <a href="/business/openings/new">
                <Plus aria-hidden="true" size={18} />
                Create new opening
                <ArrowRight aria-hidden="true" size={18} />
              </a>
            </Button>
          </div>
        </div>

        <WeeklyPlanner openings={activeOpenings} />
      </header>

      <div className="grid gap-5 lg:grid-cols-[18rem_1fr]">
        <aside className="courtyard-accent courtyard-surface overflow-hidden text-accent-foreground">
          <div className="border-b border-accent-foreground/25 p-6">
            <h2 className="display-type text-3xl font-bold">At a glance</h2>
            <p className="mt-2 text-sm leading-6 text-accent-foreground">
              A compact summary of the work already in motion.
            </p>
          </div>
          <SummaryItem icon={BriefcaseBusiness} label="Live openings" value={String(activeOpenings.length).padStart(2, '0')} />
          <SummaryItem icon={UsersRound} label="Crew requested" value={String(requestedWorkers).padStart(2, '0')} />
          <SummaryItem icon={Clock3} label="Confirmed employees" value="—" />
        </aside>

        <BusinessOpeningsBoard embedded openings={activeOpenings.slice(0, 3)} />
      </div>

      <section className="courtyard-sun courtyard-surface flex flex-col gap-5 p-6 text-sun-foreground sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 className="display-type text-3xl font-bold">Keep the month moving.</h2>
          <p className="mt-2 text-sm leading-6 text-sun-foreground/80">
            Review every published role or start a new opening on its own focused page.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="border-sun-foreground/30 bg-surface text-foreground hover:bg-surface/90" variant="secondary">
            <a href="/business/openings">View all openings</a>
          </Button>
          <Button asChild>
            <a href="/business/openings/new">Create opening</a>
          </Button>
        </div>
      </section>
    </section>
  )
}

export function BusinessOpeningsBoard({ openings, embedded = false }: BusinessOperationsDashboardProps & { embedded?: boolean }) {
  const activeOpenings = openings.filter((opening) =>
    opening.status === 'Open' || opening.status === 1,
  )

  return (
      <section className={`courtyard-surface overflow-hidden ${embedded ? 'min-w-0' : ''}`} aria-labelledby="active-openings-title">
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div>
            <h2 className="display-type text-4xl font-bold" id="active-openings-title">
              Active job openings
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            New and existing listings stay synchronized with your business account.
            Employee assignments will appear when team tracking is connected.
          </p>
        </div>

        {activeOpenings.length > 0 ? (
          <div className="divide-y divide-border">
            {activeOpenings.map((opening, index) => (
              <OpeningDispatchRow index={index} key={opening.id} opening={opening} />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_20rem] lg:items-center lg:p-10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center bg-secondary text-primary">
                <BriefcaseBusiness aria-hidden="true" size={24} />
              </div>
              <h3 className="display-type mt-5 text-3xl font-bold">
                No active job openings yet.
              </h3>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                Publish an opening and it will appear here with its dates,
                shift, requested crew, and staffing state.
              </p>
            </div>
            <div className="rounded-xl bg-secondary/70 p-5">
              <p className="text-sm font-bold text-foreground">Team tracking</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Employee names and confirmation counts are intentionally left blank
                until the assignment data is available.
              </p>
            </div>
          </div>
        )}
      </section>
  )
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 border-b border-accent-foreground/25 p-5 last:border-b-0">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-foreground/12">
        <Icon aria-hidden="true" size={19} />
      </span>
      <p className="text-sm font-semibold text-accent-foreground">{label}</p>
      <p className="display-type tabular-nums text-3xl font-bold leading-none text-accent-foreground">{value}</p>
    </div>
  )
}

function WeeklyPlanner({ openings }: BusinessOperationsDashboardProps) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const days = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 1 }),
  })

  return (
    <section className="courtyard-lift courtyard-peach courtyard-surface flex flex-col justify-between overflow-hidden p-6 sm:p-8 lg:p-10" aria-labelledby="weekly-planner-title">
      <div className="flex items-start justify-between gap-5">
        <div>
          <h2 className="display-type text-4xl font-bold" id="weekly-planner-title">This week</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Published openings placed against the current week.
          </p>
        </div>
        <CalendarDays aria-hidden="true" className="text-primary" size={26} />
      </div>
      <div className="mt-10 grid grid-cols-7 overflow-hidden rounded-2xl border border-primary/20 bg-surface/65">
        {days.map((day) => {
          const count = openings.filter((opening) => openingOccursOnDate(opening, day)).length

          return (
            <div className="min-w-0 border-r border-primary/20 p-2 text-center last:border-r-0 sm:p-3" key={day.toISOString()}>
              <p className="text-xs font-bold uppercase text-muted-foreground">{format(day, 'EEE')}</p>
              <p className="display-type mt-2 text-2xl font-bold">{format(day, 'd')}</p>
              <span aria-label={`${count} openings`} className={count > 0 ? 'mx-auto mt-3 block h-2.5 w-2.5 rounded-full bg-primary' : 'mx-auto mt-3 block h-2.5 w-2.5 rounded-full bg-border'} />
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-xs font-semibold text-muted-foreground">
        Terracotta marks a day with at least one active opening.
      </p>
    </section>
  )
}

function openingOccursOnDate(opening: JobOpening, date: Date) {
  const start = startOfDay(parseISO(opening.startDate))
  const end = startOfDay(parseISO(opening.endDate ?? opening.startDate))

  if (end < start) return false

  return isWithinInterval(startOfDay(date), { start, end })
}

function OpeningDispatchRow({
  index,
  opening,
}: {
  index: number
  opening: JobOpening
}) {
  const payLabel = `${opening.payAmount.toLocaleString()} ALL / ${formatPayType(opening.payType).toLowerCase()}`

  return (
    <article className="grid transition-colors hover:bg-secondary/25 lg:grid-cols-[5rem_1fr_20rem]">
      <div className="hidden border-r border-border p-6 text-center lg:block">
        <p className="tabular-nums text-sm font-bold text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </p>
      </div>
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-primary/30 bg-primary/10 text-primary">
            {formatJobStatus(opening.status)}
          </Badge>
          <Badge>{opening.role}</Badge>
        </div>
        <h3 className="display-type mt-4 text-3xl font-bold leading-none sm:text-4xl">
          {opening.title}
        </h3>
        <dl className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 xl:grid-cols-4">
          <OpeningFact icon={MapPin} label="Location" value={opening.location} />
          <OpeningFact icon={CalendarDays} label="Dates" value={formatJobDateRange(opening.startDate, opening.endDate)} />
          <OpeningFact icon={Clock3} label="Shift" value={formatJobShift(opening)} />
          <OpeningFact icon={Wallet} label="Pay" value={payLabel} />
        </dl>
      </div>
      <div className="grid border-t border-border bg-secondary/45 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-t-0">
        <div className="p-5 sm:p-6">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            <UsersRound aria-hidden="true" size={16} />
            Crew requested
          </p>
          <p className="display-type tabular-nums mt-3 text-4xl font-bold leading-none text-foreground">
            {String(opening.requiredWorkersCount).padStart(2, '0')}
          </p>
        </div>
        <div className="border-t border-border p-5 sm:border-l sm:border-t-0 sm:p-6 lg:border-l-0 lg:border-t">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Confirmed employees
          </p>
          <p className="mt-3 text-sm font-semibold text-foreground">Not connected yet</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Names will appear here once assignments are available.
          </p>
        </div>
      </div>
    </article>
  )
}

function OpeningFact({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={16} />
      <dt className="sr-only">{label}</dt>
      <dd className="min-w-0 font-medium text-foreground">{value}</dd>
    </div>
  )
}
