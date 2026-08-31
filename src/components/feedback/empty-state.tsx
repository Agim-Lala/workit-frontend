import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="courtyard-surface border border-dashed border-border px-6 py-16 text-center">
      <h2 className="display-type text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  )
}
