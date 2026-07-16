import { JobCard } from '../components/job-card'
import { JobFilters } from '../components/job-filters'
import { useJobFilters } from '../hooks/use-job-filters'
import { useJobs } from '../hooks/use-jobs'
import { jobMatchesSearch } from '../utils/job-formatters'

export function JobsPage() {
  const filters = useJobFilters()
  const { data: jobs = [], isError, isFetching } = useJobs({
    search: filters.search,
    role: filters.role,
    payType: filters.payType,
  })

  const visibleJobs = jobs.filter((job) => jobMatchesSearch(job, filters.search))

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-foreground">Open jobs</h2>
        <p className="text-sm text-muted-foreground">
          Browse temporary roles by date, location, role, and payment.
        </p>
      </div>

      <JobFilters />

      {isError ? (
        <p className="rounded-md border border-border bg-white p-3 text-sm text-muted-foreground">
          Unable to load jobs from the API. Sign in and confirm the backend is running.
        </p>
      ) : null}
      {isFetching ? (
        <p className="text-sm text-muted-foreground">Refreshing jobs...</p>
      ) : null}

      <div className="grid gap-4">
        {visibleJobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
      {!isFetching && !isError && visibleJobs.length === 0 ? (
        <p className="rounded-md border border-border bg-white p-3 text-sm text-muted-foreground">
          No open jobs were returned by the API.
        </p>
      ) : null}
    </section>
  )
}
