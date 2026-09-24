import { ChevronDown, RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { useJobFilters } from '../hooks/use-job-filters'

export function JobFilters({
  collapsibleOnMobile = false,
  showDate = true,
  shortTermOnly = false,
  title = 'Filter the board',
}: {
  collapsibleOnMobile?: boolean
  showDate?: boolean
  shortTermOnly?: boolean
  title?: string
}) {
  const {
    clearFilters,
    jobType,
    onDate,
    search,
    setJobType,
    setOnDate,
    setSearch,
    setShiftType,
    shiftType,
  } = useJobFilters()

  useEffect(() => {
    if (shortTermOnly && jobType !== 'Any') {
      setJobType('Any')
    }
  }, [jobType, setJobType, shortTermOnly])

  const columnCount = showDate
    ? shortTermOnly ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
    : shortTermOnly ? 'lg:grid-cols-2' : 'lg:grid-cols-3'

  const renderControls = (idPrefix: string) => (
    <div className={cn('grid gap-3 sm:grid-cols-2', columnCount)}>
      <label className="relative sm:col-span-2 lg:col-span-1" htmlFor={`${idPrefix}-job-search`}>
        <span className="sr-only">Search jobs</span>
        <Search
          aria-hidden="true"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          className="pl-10"
          id={`${idPrefix}-job-search`}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Title, role, or location"
          value={search}
        />
      </label>
      {!shortTermOnly ? <label>
        <span className="sr-only">Job type</span>
        <select
          className="focus-ring h-12 w-full border border-input bg-surface px-3.5 text-sm text-foreground focus:border-primary"
          onChange={(event) => setJobType(event.target.value as typeof jobType)}
          value={jobType}
        >
          <option value="Any">Any job type</option>
          <option value="Permanent">Permanent</option>
          <option value="Project">Project</option>
          <option value="ShortTerm">Short term</option>
        </select>
      </label> : null}
      <label>
        <span className="sr-only">Shift type</span>
        <select
          className="focus-ring h-12 w-full border border-input bg-surface px-3.5 text-sm text-foreground focus:border-primary"
          onChange={(event) => setShiftType(event.target.value as typeof shiftType)}
          value={shiftType}
        >
          <option value="Any">Any shift</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="CustomHours">Custom hours</option>
        </select>
      </label>
      {showDate ? (
        <label>
          <span className="sr-only">Available on date</span>
          <Input
            aria-label="Available on date"
            onChange={(event) => setOnDate(event.target.value)}
            type="date"
            value={onDate}
          />
        </label>
      ) : null}
    </div>
  )

  return (
    <>
      {collapsibleOnMobile ? (
        <details className="courtyard-surface group p-3 sm:hidden">
          <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-2 [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal aria-hidden="true" size={17} />
              {title}
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              Optional
              <ChevronDown aria-hidden="true" className="transition-transform group-open:rotate-180" size={16} />
            </span>
          </summary>
          <div className="mt-3 border-t border-border pt-4">
            {renderControls('mobile')}
            <Button className="mt-3" onClick={clearFilters} size="sm" type="button" variant="ghost">
              <RotateCcw aria-hidden="true" size={15} />
              Clear filters
            </Button>
          </div>
        </details>
      ) : null}

      <div className={cn('courtyard-surface p-4 sm:p-5', collapsibleOnMobile && 'hidden sm:block')}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="display-type text-2xl font-bold text-foreground">{title}</h2>
          <Button onClick={clearFilters} size="sm" type="button" variant="ghost">
            <RotateCcw aria-hidden="true" size={15} />
            Clear
          </Button>
        </div>
        <div className="mt-3">
          {renderControls('desktop')}
        </div>
      </div>
    </>
  )
}
