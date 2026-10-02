import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useFromState } from '@/hooks/use-from-state'

import { BusinessOpeningsBoard } from '../components/business-operations-dashboard'
import { useBusinessOpenings } from '../hooks/use-business-openings'

export function BusinessOpeningsPage() {
  const { data: openings = [], isError, isFetching } = useBusinessOpenings()
  const fromState = useFromState()

  return (
    <section className="space-y-6">
      <header className="courtyard-surface grid overflow-hidden lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="bg-peach p-7 sm:p-10 lg:p-12">
          <h1 className="display-type max-w-[11ch] text-5xl font-bold leading-[0.92] sm:text-6xl">
            Your job openings, all in one calm view.
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-7 text-muted-foreground">
            Review the practical facts workers see without mixing publishing
            controls into the same page.
          </p>
        </div>
        <div className="p-6 sm:p-8">
          <Button asChild className="w-full sm:w-auto">
            <Link state={fromState} to="/business/openings/new">
              <Plus aria-hidden="true" size={18} />
              Create new opening
            </Link>
          </Button>
        </div>
      </header>

      {isError ? (
        <p className="courtyard-surface border border-destructive/45 p-4 text-sm text-destructive" role="alert">
          Openings could not be loaded. Check the Workit API and try again.
        </p>
      ) : null}

      <BusinessOpeningsBoard openings={openings} />

      {isFetching ? (
        <p className="text-sm text-muted-foreground">Refreshing your openings…</p>
      ) : null}
    </section>
  )
}
