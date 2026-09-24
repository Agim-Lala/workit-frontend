import { CalendarDays, Rows3 } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

export function JobViewNavigation({ calendarTo = '/jobs/calendar' }: { calendarTo?: string }) {
  const views = [
    { to: '/jobs', label: 'List view', icon: Rows3, end: true },
    { to: calendarTo, label: 'Calendar view', icon: CalendarDays, end: false },
  ]

  return (
    <nav aria-label="Choose how to view jobs" className="inline-flex bg-secondary/70 p-1.5">
      {views.map((view) => (
        <NavLink
          className={({ isActive }) => cn(
            'focus-ring inline-flex min-h-11 items-center gap-2 px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground',
            isActive && 'bg-surface text-primary',
          )}
          end={view.end}
          key={view.to}
          to={view.to}
        >
          <view.icon aria-hidden="true" size={17} />
          {view.label}
        </NavLink>
      ))}
    </nav>
  )
}
