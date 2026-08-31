import {
  BriefcaseBusiness,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Plus,
  UserRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

import { WorkitBrand } from '@/components/brand/workit-brand'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { clearAccessToken, getStoredUser } from '@/features/auth/utils/auth-token'
import { hasUserRole } from '@/features/auth/utils/user-role'
import { cn } from '@/lib/utils'

type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

const workerNavItems: NavItem[] = [
  { to: '/jobs', label: 'Jobs', icon: BriefcaseBusiness },
  { to: '/applications', label: 'Applications', icon: ClipboardList },
  { to: '/worker-profile', label: 'Profile', icon: UserRound },
]

const businessNavItems: NavItem[] = [
  { to: '/business', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/business/openings', label: 'Job openings', icon: BriefcaseBusiness, end: true },
  { to: '/business/openings/new', label: 'New opening', icon: Plus },
]

export function AppLayout() {
  const navigate = useNavigate()
  const [user, setUser] = useState(getStoredUser)
  const navItems = user && hasUserRole(user.role, 'Business')
    ? businessNavItems
    : workerNavItems

  function signOut() {
    clearAccessToken()
    setUser(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <div className="mx-auto flex min-h-[76px] max-w-[1440px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 sm:flex-nowrap sm:py-0 lg:px-8">
          <Link aria-label="Workit home" className="focus-ring shrink-0" to="/">
            <WorkitBrand />
          </Link>

          {user ? (
            <nav aria-label="Main navigation" className="hide-scrollbar order-3 -mx-4 flex w-[calc(100%+2rem)] justify-start overflow-x-auto border-t border-border px-2 sm:order-none sm:mx-0 sm:w-auto sm:gap-1 sm:border-0 sm:px-0">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'focus-ring relative my-1 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground sm:px-4',
                      isActive && 'bg-peach text-primary',
                    )
                  }
                  end={item.end}
                  key={item.to}
                  to={item.to}
                >
                  <item.icon aria-hidden="true" size={16} />
                  {item.label}
                </NavLink>
              ))}
              <span aria-hidden="true" className="w-3 shrink-0 sm:hidden" />
            </nav>
          ) : (
            <nav aria-label="Public navigation" className="hidden items-center gap-8 md:flex">
              <Link className="focus-ring text-sm font-semibold text-muted-foreground hover:text-foreground" to="/#how-it-works">
                How it works
              </Link>
              <Link className="focus-ring text-sm font-semibold text-muted-foreground hover:text-foreground" to="/#for-businesses">
                For businesses
              </Link>
            </nav>
          )}

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            {user ? (
              <Button aria-label="Sign out" onClick={signOut} type="button" variant="secondary">
                <LogOut aria-hidden="true" size={17} />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            ) : (
              <>
                <Button asChild className="hidden sm:inline-flex" variant="ghost">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild className="hidden sm:inline-flex">
                  <Link to="/signup">Create account</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:py-8 lg:px-8 lg:py-10">
        <Outlet />
      </main>
    </div>
  )
}
