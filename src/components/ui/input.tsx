import type { InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'focus-ring h-12 w-full rounded-xl border border-input bg-surface px-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}
