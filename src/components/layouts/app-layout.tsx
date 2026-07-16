import { BriefcaseBusiness, ClipboardList, Store, UserRound } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/jobs', label: 'Jobs', icon: BriefcaseBusiness },
  { to: '/applications', label: 'Applications', icon: ClipboardList },
  { to: '/business', label: 'Business', icon: Store },
  { to: '/worker-profile', label: 'Profile', icon: UserRound },
]

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Workit Marketplace
            </p>
            <h1 className="text-2xl font-semibold text-foreground">
              Temporary work operations
            </h1>
          </div>
          <Button asChild variant="secondary">
            <NavLink to="/login">Sign in</NavLink>
          </Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr] lg:px-6">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                cn(
                  'focus-ring inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground',
                  isActive && 'bg-white text-foreground shadow-sm',
                )
              }
              key={item.to}
              to={item.to}
            >
              <item.icon aria-hidden="true" size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
