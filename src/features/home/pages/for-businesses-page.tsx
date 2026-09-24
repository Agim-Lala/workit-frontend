import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useT, type TranslationKey } from '@/i18n'

const workTypeKeys = [
  ['forBusinesses.workTypes.permanent.term', 'forBusinesses.workTypes.permanent.detail'],
  ['forBusinesses.workTypes.project.term', 'forBusinesses.workTypes.project.detail'],
  ['forBusinesses.workTypes.shortTerm.term', 'forBusinesses.workTypes.shortTerm.detail'],
] as const satisfies readonly (readonly [TranslationKey, TranslationKey])[]

const payKeys = [
  'forBusinesses.pay.hourly',
  'forBusinesses.pay.daily',
  'forBusinesses.pay.fixed',
  'forBusinesses.pay.monthly',
] as const satisfies readonly TranslationKey[]

const scheduleKeys = [
  ['forBusinesses.schedule.shifts.term', 'forBusinesses.schedule.shifts.detail'],
  ['forBusinesses.schedule.dates.term', 'forBusinesses.schedule.dates.detail'],
  ['forBusinesses.schedule.crew.term', 'forBusinesses.schedule.crew.detail'],
] as const satisfies readonly (readonly [TranslationKey, TranslationKey])[]

const stepKeys = [
  'forBusinesses.steps.step1',
  'forBusinesses.steps.step2',
  'forBusinesses.steps.step3',
  'forBusinesses.steps.step4',
] as const satisfies readonly TranslationKey[]

export function ForBusinessesPage() {
  const t = useT()

  return (
    <div className="space-y-16 pb-10 sm:space-y-24">
      <header className="max-w-3xl">
        <h1 className="display-type text-[clamp(3rem,6vw,4.75rem)] font-bold leading-[0.9] text-foreground">
          {t('forBusinesses.title')}
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
          {t('forBusinesses.intro')}
        </p>
        <Button asChild className="mt-8 justify-between sm:min-w-64">
          <Link to="/signup?type=business">
            {t('common.createBusinessAccount')}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </Button>
      </header>

      <section className="border-t border-border pt-12">
        <h2 className="display-type text-3xl font-bold leading-none sm:text-4xl">
          {t('forBusinesses.workTypes.title')}
        </h2>
        <dl className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {workTypeKeys.map(([termKey, detailKey]) => (
            <div className="bg-surface p-6 sm:p-8" key={termKey}>
              <dt className="text-base font-semibold text-foreground">{t(termKey)}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">{t(detailKey)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="display-type text-3xl font-bold leading-none sm:text-4xl">
          {t('forBusinesses.pay.title')}
        </h2>
        <p className="mt-4 max-w-[52ch] leading-7 text-muted-foreground">
          {t('forBusinesses.pay.body')}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {payKeys.map((key) => (
            <li
              className="border border-border px-4 py-1.5 text-sm font-semibold text-foreground"
              key={key}
            >
              {t(key)}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="display-type text-3xl font-bold leading-none sm:text-4xl">
          {t('forBusinesses.schedule.title')}
        </h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {scheduleKeys.map(([termKey, detailKey]) => (
            <div className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6" key={termKey}>
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {t(termKey)}
              </dt>
              <dd className="text-sm leading-6 text-foreground">{t(detailKey)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border border-border bg-surface p-7 sm:p-10 lg:p-12">
        <h2 className="display-type text-3xl font-bold leading-none sm:text-4xl">
          {t('forBusinesses.steps.title')}
        </h2>
        <ol className="mt-8 space-y-6">
          {stepKeys.map((key, index) => (
            <li className="grid grid-cols-[2.5rem_1fr] gap-3" key={key}>
              <span className="display-type tabular-nums text-3xl font-bold leading-none text-muted-foreground">
                {index + 1}
              </span>
              <p className="self-center text-base leading-6 text-foreground">{t(key)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-6 bg-primary px-6 py-10 text-primary-foreground sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
        <div>
          <h2 className="display-type max-w-2xl text-3xl font-bold leading-none sm:text-4xl">
            {t('forBusinesses.cta.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-primary-foreground/70">
            {t('forBusinesses.cta.body')}
          </p>
        </div>
        <Button asChild className="bg-surface text-foreground hover:bg-surface/90">
          <Link to="/signup?type=business">{t('common.createBusinessAccount')}</Link>
        </Button>
      </section>
    </div>
  )
}
