import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-[background-color,color,border-color,transform] disabled:pointer-events-none disabled:opacity-45 active:translate-y-px',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'border border-border bg-surface text-foreground hover:border-primary/45 hover:bg-secondary/65',
        ghost: 'text-foreground hover:bg-secondary/75',
      },
      size: {
        default: 'min-h-11 px-5',
        sm: 'min-h-11 px-3',
        icon: 'h-11 w-11 min-h-11 px-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
