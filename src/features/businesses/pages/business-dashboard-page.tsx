import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function BusinessDashboardPage() {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Business dashboard
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create listings, review applicants, and close or cancel shifts.
        </p>
      </div>
      <form className="grid gap-4 rounded-md border border-border bg-white p-5 md:grid-cols-2">
        <label className="text-sm font-medium text-foreground">
          Title
          <Input className="mt-2" name="title" />
        </label>
        <label className="text-sm font-medium text-foreground">
          Role
          <Input className="mt-2" name="role" />
        </label>
        <label className="text-sm font-medium text-foreground md:col-span-2">
          Location
          <Input className="mt-2" name="location" />
        </label>
        <Button className="md:col-span-2" type="button">
          <Plus aria-hidden="true" size={18} />
          Draft job listing
        </Button>
      </form>
    </section>
  )
}
