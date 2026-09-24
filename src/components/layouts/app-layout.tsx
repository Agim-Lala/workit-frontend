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
import { LanguageToggle } from '@/components/i18n/language-toggle'
import { Button } from '@/components/ui/button'
import { EmailConfirmationBanner } from '@/features/auth/components/email-confirmation-banner'
import { clearAccessToken, getStoredUser } from '@/features/auth/utils/auth-token'
import { hasUserRole, isEmailConfirmed } from '@/features/auth/utils/user-role'
import { useT, type TranslationKey } from '@/i18n'
import { cn } from '@/lib/utils'

type NavItem = {
  to: string
  label: TranslationKey
  icon: LucideIcon
  end?: boolean
}

const workerNavItems: NavItem[] = [
  { to: '/jobs', label: 'nav.jobs', icon: BriefcaseBusiness },
  { to: '/applications', label: 'nav.applications', icon: ClipboardList },
  { to: '/worker-profile', label: 'nav.profile', icon: UserRound },
]

const businessNavItems: NavItem[] = [
  { to: '/business', label: 'nav.overview', icon: LayoutDashboard, end: true },
  { to: '/business/openings', label: 'nav.jobOpenings', icon: BriefcaseBusiness, end: true },
  { to: '/business/openings/new', label: 'nav.newOpening', icon: Plus },
]

export function AppLayout() {
  const navigate = useNavigate()
  const t = useT()
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
          <Link aria-label={t('nav.workitHome')} className="focus-ring shrink-0" to="/">
            <WorkitBrand />
          </Link>

          {user ? (
            <nav aria-label={t('nav.main')} className="hide-scrollbar order-3 -mx-4 flex w-[calc(100%+2rem)] justify-start overflow-x-auto border-t border-border px-2 sm:order-none sm:mx-0 sm:w-auto sm:gap-1 sm:border-0 sm:px-0">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'focus-ring relative my-1 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground sm:px-4',
                      isActive && 'bg-peach text-primary',
                    )
                  }
                  end={item.end}
                  key={item.to}
                  to={item.to}
                >
                  <item.icon aria-hidden="true" size={16} />
                  {t(item.label)}
                </NavLink>
              ))}
              <span aria-hidden="true" className="w-3 shrink-0 sm:hidden" />
            </nav>
          ) : (
            <nav aria-label={t('nav.public')} className="hidden items-center gap-8 md:flex">
              <Link className="focus-ring text-sm font-semibold text-muted-foreground hover:text-foreground" to="/how-it-works">
                {t('nav.howItWorks')}
              </Link>
              <Link className="focus-ring text-sm font-semibold text-muted-foreground hover:text-foreground" to="/for-businesses">
                {t('nav.forBusinesses')}
              </Link>
            </nav>
          )}

          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle />
            {user ? (
              <Button aria-label={t('common.signOut')} onClick={signOut} type="button" variant="secondary">
                <LogOut aria-hidden="true" size={17} />
                <span className="hidden sm:inline">{t('common.signOut')}</span>
              </Button>
            ) : (
              <>
                <Button asChild className="hidden sm:inline-flex" variant="ghost">
                  <Link to="/login">{t('common.signIn')}</Link>
                </Button>
                <Button asChild className="hidden sm:inline-flex">
                  <Link to="/signup">{t('common.createAccountShort')}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {user && !isEmailConfirmed(user) ? <EmailConfirmationBanner user={user} /> : null}

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:py-8 lg:px-8 lg:py-10">
        <Outlet />
      </main>
    </div>
  )
}
