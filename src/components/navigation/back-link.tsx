import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type FromState = { from?: string } | null

/**
 * Steps back through history when the user arrived via an in-app link that set `useFromState` state
 * (keeping filters and scroll). Opened directly or from the main nav, it goes to `fallback`.
 */
export function BackLink({ children, fallback }: { children: ReactNode; fallback: string }) {
  const navigate = useNavigate()
  const from = (useLocation().state as FromState)?.from

  return (
    <Link
      className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
      onClick={(event) => {
        if (!from || event.metaKey || event.ctrlKey || event.shiftKey) return
        event.preventDefault()
        navigate(-1)
      }}
      to={from ?? fallback}
    >
      <ArrowLeft aria-hidden="true" size={17} />
      {children}
    </Link>
  )
}
