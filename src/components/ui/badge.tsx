import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type BadgeProps = HTMLAttributes<HTMLSpanElement>

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-white px-2 py-1 text-xs font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
