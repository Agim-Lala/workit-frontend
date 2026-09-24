import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useT, type TranslationKey } from '@/i18n'

const workerStepKeys = [
  ['howItWorks.workers.step1.title', 'howItWorks.workers.step1.body'],
  ['howItWorks.workers.step2.title', 'howItWorks.workers.step2.body'],
  ['howItWorks.workers.step3.title', 'howItWorks.workers.step3.body'],
  ['howItWorks.workers.step4.title', 'howItWorks.workers.step4.body'],
] as const satisfies readonly (readonly [TranslationKey, TranslationKey])[]

const businessStepKeys = [
  ['howItWorks.businesses.step1.title', 'howItWorks.businesses.step1.body'],
  ['howItWorks.businesses.step2.title', 'howItWorks.businesses.step2.body'],
  ['howItWorks.businesses.step3.title', 'howItWorks.businesses.step3.body'],
  ['howItWorks.businesses.step4.title', 'howItWorks.businesses.step4.body'],
] as const satisfies readonly (readonly [TranslationKey, TranslationKey])[]

const clearFactKeys = [
  ['howItWorks.clear.role.term', 'howItWorks.clear.role.detail'],
  ['howItWorks.clear.place.term', 'howItWorks.clear.place.detail'],
  ['howItWorks.clear.schedule.term', 'howItWorks.clear.schedule.detail'],
  ['howItWorks.clear.pay.term', 'howItWorks.clear.pay.detail'],
  ['howItWorks.clear.capacity.term', 'howItWorks.clear.capacity.detail'],
] as const satisfies readonly (readonly [TranslationKey, TranslationKey])[]

export function HowItWorksPage() {
  const t = useT()

  return (
    <div className="space-y-16 pb-10 sm:space-y-24">
      <header className="max-w-3xl">
        <h1 className="display-type text-[clamp(3rem,6vw,4.75rem)] font-bold leading-[0.9] text-foreground">
          {t('howItWorks.title')}
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
          {t('howItWorks.intro')}
        </p>
        <Button asChild className="mt-8 justify-between sm:min-w-56">
          <Link to="/signup">
            {t('common.createAccount')}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </Button>
      </header>

      <section className="grid gap-y-12 border-t border-border pt-12 md:grid-cols-2 md:gap-x-14">
        <StepTrack heading={t('howItWorks.workers.heading')} stepKeys={workerStepKeys} />
        <StepTrack
          className="md:border-l md:border-border md:pl-14"
          heading={t('howItWorks.businesses.heading')}
          stepKeys={businessStepKeys}
        />
      </section>

      <section className="border border-border bg-surface p-7 sm:p-10 lg:p-12">
        <h2 className="display-type text-3xl font-bold leading-none sm:text-4xl">
          {t('howItWorks.clear.title')}
        </h2>
        <p className="mt-4 max-w-[52ch] leading-7 text-muted-foreground">
          {t('howItWorks.clear.body')}
        </p>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {clearFactKeys.map(([termKey, detailKey]) => (
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6" key={termKey}>
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {t(termKey)}
              </dt>
              <dd className="text-sm leading-6 text-foreground">{t(detailKey)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="max-w-2xl">
        <h2 className="display-type text-3xl font-bold leading-none sm:text-4xl">
          {t('howItWorks.access.title')}
        </h2>
        <p className="mt-4 leading-7 text-muted-foreground">{t('howItWorks.access.body')}</p>
      </section>

      <section className="grid gap-6 bg-primary px-6 py-10 text-primary-foreground sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
        <div>
          <h2 className="display-type max-w-2xl text-3xl font-bold leading-none sm:text-4xl">
            {t('howItWorks.cta.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-primary-foreground/70">
            {t('howItWorks.cta.body')}
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

function StepTrack({
  className,
  heading,
  stepKeys,
}: {
  className?: string
  heading: string
  stepKeys: readonly (readonly [TranslationKey, TranslationKey])[]
}) {
  const t = useT()

  return (
    <div className={className}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {heading}
      </h2>
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
