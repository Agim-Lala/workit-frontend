import type { InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'focus-ring h-10 w-full rounded-md border border-input bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
