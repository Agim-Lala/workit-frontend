import { EmptyState } from '@/components/feedback/empty-state'
import { Button } from '@/components/ui/button'

export function ApplicationsPage() {
  return (
    <EmptyState
      action={<Button type="button">Browse open jobs</Button>}
      description="Applications will track Pending, Accepted, Rejected, Withdrawn, and Cancelled states."
      title="No applications yet"
    />
  )
}
