import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type BadgeProps = HTMLAttributes<HTMLSpanElement>

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border border-foreground/60 bg-secondary px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-foreground',
        className,
      )}
      {...props}
    />
  )
}
