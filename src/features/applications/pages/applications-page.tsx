import { EmptyState } from '@/components/feedback/empty-state'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function ApplicationsPage() {
  return (
    <EmptyState
      action={
        <Button asChild type="button">
          <Link to="/jobs">Browse open shifts</Link>
        </Button>
      }
      description="Applications will track each shift from sent to accepted once that API is available."
      title="Your application lane is clear"
    />
  )
}
