import { ArrowRight, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { JobCard } from '../components/job-card'
import { JobFilters } from '../components/job-filters'
import { JobViewNavigation } from '../components/job-view-navigation'
import { useJobFilters } from '../hooks/use-job-filters'
import { useJobs } from '../hooks/use-jobs'
import { jobMatchesSearch } from '../utils/job-formatters'

export function JobsPage() {
  const filters = useJobFilters()
  const { data: jobs = [], isError, isFetching } = useJobs(filters)
  const visibleJobs = jobs.filter((job) => jobMatchesSearch(job, filters.search))

  return (
    <section className="space-y-8">
      <header className="courtyard-surface grid overflow-hidden lg:grid-cols-[1fr_22rem]">
        <div className="bg-peach px-6 py-10 sm:px-9 sm:py-12">
          <h1 className="display-type max-w-[12ch] text-5xl font-bold leading-[0.9] sm:text-7xl">
            Find work that fits your week.
          </h1>
          <p className="mt-6 max-w-[66ch] text-base leading-7 text-muted-foreground sm:text-lg">
            Compare open roles by place, schedule, job type, and pay. Every result follows the same brief so the differences are easy to see.
          </p>
        </div>
        <div className="flex flex-col justify-between border-t border-accent-foreground/20 bg-accent p-6 text-accent-foreground lg:border-l lg:border-t-0 lg:p-8">
          <UserRound aria-hidden="true" size={28} />
          <div className="mt-12">
            <p className="text-sm leading-6 text-accent-foreground">
              Keep skills and experience ready for future applications.
            </p>
            <Button asChild className="mt-5 w-full justify-between border-accent-foreground/45 bg-transparent text-accent-foreground hover:bg-accent-foreground/10" variant="secondary">
              <Link to="/worker-profile">
                Open your profile
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex justify-start">
        <JobViewNavigation />
      </div>

      <JobFilters />

      <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="display-type text-3xl font-bold sm:text-4xl">Open opportunities</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isFetching ? 'Refreshing the opportunity board…' : `${visibleJobs.length} ${visibleJobs.length === 1 ? 'opening' : 'openings'} ready to compare.`}
          </p>
        </div>
      </div>

      {isError ? (
        <div role="alert" className="courtyard-surface border border-destructive/45 p-5 text-sm leading-6 text-foreground">
          <strong className="block text-destructive">The opportunity board could not load.</strong>
          Confirm you are signed in with a worker account and that the Workit API is running, then try again.
        </div>
      ) : null}

      <div className="grid gap-3">
        {visibleJobs.map((job) => <JobCard job={job} key={job.id} />)}
      </div>

      {!isFetching && !isError && visibleJobs.length === 0 ? (
        <div className="courtyard-surface border border-dashed border-border px-6 py-12 text-center">
          <h3 className="display-type text-3xl font-bold">No matching openings.</h3>
          <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-6 text-muted-foreground">
            Clear or broaden the filters to return to the full opportunity board.
          </p>
        </div>
      ) : null}
    </section>
  )
}
