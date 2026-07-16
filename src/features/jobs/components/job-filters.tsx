import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { useJobFilters } from '../hooks/use-job-filters'

export function JobFilters() {
  const { search, setSearch } = useJobFilters()

  return (
    <div className="rounded-md border border-border bg-white p-4">
      <label className="text-sm font-medium text-foreground" htmlFor="job-search">
        Search jobs
      </label>
      <div className="relative mt-2">
        <Search
          aria-hidden="true"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          className="pl-10"
          id="job-search"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Title, role, or location"
          value={search}
        />
      </div>
    </div>
  )
}
