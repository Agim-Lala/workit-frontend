import {
  ArrowRight,
  Clock3,
  LockKeyhole,
  MapPin,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useT, type TranslationKey } from '@/i18n'
import { cn } from '@/lib/utils'

const featuredJobs = [
  { titleKey: 'home.job1.title', roleKey: 'home.job1.role', scheduleKey: 'home.job1.schedule', location: 'Tirana', pay: '7,500 ALL / day' },
  { titleKey: 'home.job2.title', roleKey: 'home.job2.role', scheduleKey: 'home.job2.schedule', location: 'Blloku, Tirana', pay: '550 ALL / hour' },
  { titleKey: 'home.job3.title', roleKey: 'home.job3.role', scheduleKey: 'home.job3.schedule', location: 'Durrës', pay: '6,800 ALL / day' },
] as const satisfies readonly {
  titleKey: TranslationKey
  roleKey: TranslationKey
  scheduleKey: TranslationKey
  location: string
  pay: string
}[]

const workerStepKeys = [
  ['home.how.worker1.title', 'home.how.worker1.body'],
  ['home.how.worker2.title', 'home.how.worker2.body'],
  ['home.how.worker3.title', 'home.how.worker3.body'],
] as const satisfies readonly (readonly [TranslationKey, TranslationKey])[]

const businessStepKeys = [
  ['home.how.business1.title', 'home.how.business1.body'],
  ['home.how.business2.title', 'home.how.business2.body'],
  ['home.how.business3.title', 'home.how.business3.body'],
] as const satisfies readonly (readonly [TranslationKey, TranslationKey])[]

const businessFactKeys = [
  ['home.business.workTypes.term', 'home.business.workTypes.detail'],
  ['home.business.pay.term', 'home.business.pay.detail'],
  ['home.business.shifts.term', 'home.business.shifts.detail'],
  ['home.business.crew.term', 'home.business.crew.detail'],
] as const satisfies readonly (readonly [TranslationKey, TranslationKey])[]

export function HomePage() {
  const t = useT()
  const [activeJobIndex, setActiveJobIndex] = useState(0)
  const activeJob = featuredJobs[activeJobIndex]

  return (
    <div className="space-y-16 pb-10 sm:space-y-24">
      <section className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div className="courtyard-reveal">
          <h1 className="display-type max-w-[10ch] text-[clamp(3.5rem,7vw,5.75rem)] font-bold leading-[0.9] text-foreground">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 max-w-[52ch] text-base leading-7 text-muted-foreground sm:text-lg">
            {t('home.hero.body')}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="justify-between sm:min-w-56">
              <Link to="/signup">{t('common.createAccount')}<ArrowRight aria-hidden="true" size={18} /></Link>
            </Button>
            <Button asChild className="justify-between sm:min-w-40" variant="secondary">
              <Link state={{ returnTo: '/jobs' }} to="/login">{t('common.signIn')}<ArrowRight aria-hidden="true" size={18} /></Link>
            </Button>
          </div>
          <p className="mt-5 flex max-w-md items-start gap-2 text-sm leading-6 text-muted-foreground">
            <LockKeyhole aria-hidden="true" className="mt-0.5 shrink-0" size={16} />
            {t('home.hero.signInNote')}
          </p>
        </div>

        <div className="courtyard-lift rounded-3xl border border-border bg-surface p-5 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <p className="text-sm font-semibold text-muted-foreground">{t('home.preview.label')}</p>
            <p className="tabular-nums text-sm font-semibold text-muted-foreground">0{activeJobIndex + 1} / 03</p>
          </div>

          <div className="mt-7">
            <p className="text-sm font-semibold text-primary">{t(activeJob.roleKey)}</p>
            <h2 className="display-type mt-2 max-w-xl text-4xl font-bold leading-[0.95] text-foreground sm:text-5xl">{t(activeJob.titleKey)}</h2>
            <dl className="mt-7 divide-y divide-border border-y border-border">
              <FactRow icon={MapPin} label={t('home.fact.location')} value={activeJob.location} />
              <FactRow icon={Clock3} label={t('home.fact.schedule')} value={t(activeJob.scheduleKey)} />
              <FactRow icon={Wallet} label={t('home.fact.pay')} value={activeJob.pay} />
            </dl>
            <Button asChild className="mt-7 w-full justify-between">
              <Link state={{ returnTo: '/jobs' }} to="/login">{t('home.preview.cta')}<ArrowRight aria-hidden="true" size={18} /></Link>
            </Button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2" aria-label={t('home.preview.chooseJob')}>
            {featuredJobs.map((job, index) => (
              <button
                aria-label={t('home.preview.showJob', { title: t(job.titleKey) })}
                aria-pressed={activeJobIndex === index}
                className={cn(
                  'focus-ring min-h-11 rounded-xl border text-sm font-bold transition-colors',
                  activeJobIndex === index
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-secondary text-muted-foreground hover:text-foreground',
                )}
                key={job.titleKey}
                onClick={() => setActiveJobIndex(index)}
                type="button"
              >
                0{index + 1}
              </button>
            ))}
          </div>
          <p className="mt-4 border-t border-dashed border-border pt-4 text-xs leading-5 text-muted-foreground">
            {t('home.preview.disclaimer')}
          </p>
        </div>
      </section>

      <p className="border-y border-border py-4 text-center text-sm font-medium text-muted-foreground">
        {t('home.band')}
      </p>

      <section className="scroll-mt-24" id="how-it-works">
        <div className="max-w-2xl">
          <h2 className="display-type text-4xl font-bold leading-none sm:text-5xl">{t('home.how.title')}</h2>
          <p className="mt-4 leading-7 text-muted-foreground">{t('home.how.body')}</p>
        </div>
        <div className="mt-10 grid gap-y-10 border-t border-border pt-10 md:grid-cols-2 md:gap-x-14">
          <StepTrack title={t('home.how.forWorkers')} stepKeys={workerStepKeys} />
          <StepTrack className="md:border-l md:border-border md:pl-14" title={t('home.how.forBusinesses')} stepKeys={businessStepKeys} />
        </div>
        <Link className="focus-ring mt-8 inline-flex min-h-11 items-center gap-2 border-b-2 border-primary text-sm font-bold text-primary" to="/how-it-works">
          {t('home.how.link')}<ArrowRight aria-hidden="true" size={17} />
        </Link>
      </section>

      <section
        className="scroll-mt-24 grid gap-10 rounded-3xl border border-border bg-surface p-7 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:p-12"
        id="for-businesses"
      >
        <div>
          <h2 className="display-type text-4xl font-bold leading-none sm:text-5xl">
            {t('home.business.title')}
          </h2>
          <p className="mt-5 max-w-[46ch] leading-7 text-muted-foreground">
            {t('home.business.body')}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="justify-between sm:min-w-64">
              <Link to="/signup?type=business">{t('common.createBusinessAccount')}<ArrowRight aria-hidden="true" size={18} /></Link>
            </Button>
            <Link className="focus-ring inline-flex min-h-11 items-center gap-2 border-b-2 border-primary text-sm font-bold text-primary" to="/for-businesses">
              {t('home.business.link')}<ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
        <dl className="divide-y divide-border border-y border-border">
          {businessFactKeys.map(([termKey, detailKey]) => (
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5" key={termKey}>
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t(termKey)}</dt>
              <dd className="text-sm leading-6 text-foreground">{t(detailKey)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <h2 className="display-type text-4xl font-bold leading-none sm:text-5xl">{t('home.values.title')}</h2>
          <p className="mt-5 max-w-[44ch] leading-7 text-muted-foreground">{t('home.values.body')}</p>
        </div>
        <dl className="divide-y divide-border border-y border-border">
          <Value title={t('home.values.accessible.title')} description={t('home.values.accessible.body')} />
          <Value title={t('home.values.transparent.title')} description={t('home.values.transparent.body')} />
          <Value title={t('home.values.respectful.title')} description={t('home.values.respectful.body')} />
        </dl>
      </section>

      <section className="grid gap-6 rounded-3xl bg-primary px-6 py-10 text-primary-foreground sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
        <div>
          <h2 className="display-type max-w-2xl text-4xl font-bold leading-none sm:text-5xl">
            {t('home.cta.title')}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/70">
            {t('home.cta.body')}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-surface text-foreground hover:bg-surface/90">
            <Link to="/signup">{t('common.createAccountShort')}</Link>
          </Button>
          <Button
            asChild
            className="border border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link to="/login">{t('common.signIn')}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FactRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="grid min-h-16 grid-cols-[7.5rem_1fr] items-center gap-4 py-3 sm:grid-cols-[9rem_1fr]">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"><Icon aria-hidden="true" size={17} />{label}</dt>
      <dd className="tabular-nums text-base font-semibold text-foreground sm:text-lg">{value}</dd>
    </div>
  )
}

function StepTrack({
  className,
  stepKeys,
  title,
}: {
  className?: string
  stepKeys: readonly (readonly [TranslationKey, TranslationKey])[]
  title: string
}) {
  const t = useT()

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">{title}</h3>
      <ol className="mt-6 space-y-6">
        {stepKeys.map(([titleKey, bodyKey], index) => (
          <li className="grid grid-cols-[2.5rem_1fr] gap-3" key={titleKey}>
            <span className="display-type tabular-nums text-3xl font-bold leading-none text-muted-foreground">
              {index + 1}
            </span>
            <div>
              <p className="text-base font-semibold text-foreground">{t(titleKey)}</p>
              <p className="mt-1 leading-6 text-muted-foreground">{t(bodyKey)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Value({ description, title }: { description: string; title: string }) {
  return (
    <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6">
      <dt className="display-type text-3xl font-bold">{title}</dt>
      <dd className="text-sm leading-6 text-muted-foreground">{description}</dd>
    </div>
  )
}
