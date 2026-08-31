import { AlertCircle } from 'lucide-react'

import { BusinessOperationsDashboard } from '../components/business-operations-dashboard'
import { useBusinessOpenings } from '../hooks/use-business-openings'

export function BusinessDashboardPage() {
  const {
    data: businessOpenings = [],
    isError,
  } = useBusinessOpenings()

  return (
    <section className="space-y-6">
      {isError ? (
        <div
          className="courtyard-surface flex items-start gap-3 border border-destructive/45 p-4 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
          <p>
            Your openings could not be loaded. Check that the Workit API is
            running, then refresh this page.
          </p>
        </div>
      ) : null}
      <BusinessOperationsDashboard openings={businessOpenings} />
    </section>
  )
}
