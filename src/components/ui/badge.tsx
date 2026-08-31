import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type BadgeProps = HTMLAttributes<HTMLSpanElement>

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/75 px-2.5 py-1 text-xs font-semibold text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
