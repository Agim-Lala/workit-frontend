import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function JobForm() {
  return (
    <form className="grid gap-4 border border-border bg-surface p-5 shadow-sm md:grid-cols-2">
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
  )
}
