import workitMark from '@/assets/workit-mark.png'
import { cn } from '@/lib/utils'

type WorkitBrandProps = {
  className?: string
  inverse?: boolean
}

export function WorkitBrand({ className, inverse = false }: WorkitBrandProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <img alt="" className="h-auto w-11 sm:w-14" src={workitMark} />
      <span
        className={cn(
          'display-type text-[1.8rem] font-bold leading-none tracking-[-0.025em]',
          inverse ? 'text-background' : 'text-foreground',
        )}
      >
        Workit
      </span>
    </span>
  )
}
