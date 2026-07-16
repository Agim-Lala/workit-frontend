import { Button } from '@/components/ui/button'

export function WorkerProfilePage() {
  return (
    <section className="rounded-md border border-border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Worker profile
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep skills, experience, and availability ready for job applications.
          </p>
        </div>
        <Button variant="secondary" type="button">
          Edit profile
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-foreground">Skills</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Worker profile data is not exposed by the API yet.
        </p>
      </div>
    </section>
  )
}
