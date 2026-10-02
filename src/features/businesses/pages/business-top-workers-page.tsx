import { BriefcaseBusiness, FileText, Languages, MapPin, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { BackLink } from '@/components/navigation/back-link'
import { Badge } from '@/components/ui/badge'
import { useT } from '@/i18n'

import { useBusinessOpenings } from '../hooks/use-business-openings'
import { useTopWorkers } from '../hooks/use-top-workers'
import type { TopWorker } from '../types/top-workers.types'

export function BusinessTopWorkersPage() {
  const t = useT()
  const { jobOpeningId = '' } = useParams()
  const { data: openings = [] } = useBusinessOpenings()
  const opening = openings.find((item) => item.id === jobOpeningId)
  const { data: workers = [], isError, isLoading } = useTopWorkers(jobOpeningId)

  return (
    <section className="space-y-6">
      <header className="courtyard-surface bg-peach p-7 sm:p-10 lg:p-12">
        <BackLink fallback="/business/openings">{t('business.topWorkers.back')}</BackLink>
        {opening ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>{opening.role}</Badge>
          </div>
        ) : null}
        <h1 className="display-type mt-4 text-5xl font-bold leading-[0.92] sm:text-6xl">
          {t('business.topWorkers.title')}
        </h1>
        {opening ? (
          <p className="mt-3 text-lg font-semibold text-foreground">{opening.title}</p>
        ) : null}
        <p className="mt-4 max-w-[62ch] text-base leading-7 text-muted-foreground">
          {t('business.topWorkers.body')}
        </p>
      </header>

      <div aria-live="polite">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">{t('business.topWorkers.loading')}</p>
        ) : isError ? (
          <p className="courtyard-surface border border-destructive/45 p-4 text-sm text-destructive" role="alert">
            {t('business.topWorkers.error')}
          </p>
        ) : workers.length === 0 ? (
          <p className="courtyard-surface p-6 text-sm text-muted-foreground">
            {t('business.topWorkers.empty')}
          </p>
        ) : (
          <ol className="courtyard-surface divide-y divide-border overflow-hidden">
            {workers.map((worker, index) => (
              <TopWorkerRow key={worker.workerProfileId} rank={index + 1} worker={worker} />
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}

function TopWorkerRow({ rank, worker }: { rank: number; worker: TopWorker }) {
  const t = useT()
  const matches = [
    worker.matchesInterestedFields && t('business.topWorkers.match.interests'),
    worker.matchesPreferredShiftType && t('business.topWorkers.match.shift'),
    worker.cvMatchesRole && t('business.topWorkers.match.cvRole'),
  ].filter(Boolean) as string[]

  return (
    <li className="grid lg:grid-cols-[5rem_1fr_10rem]">
      <div className="hidden border-r border-border p-6 text-center lg:block">
        <p className="tabular-nums text-sm font-bold text-muted-foreground">
          {String(rank).padStart(2, '0')}
        </p>
      </div>
      <div className="min-w-0 p-5 sm:p-7">
        <h2 className="display-type text-3xl font-bold leading-none">
          <span className="mr-2 text-muted-foreground lg:hidden">{rank}.</span>
          {worker.firstName} {worker.lastName}
        </h2>
        {worker.location ? (
          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin aria-hidden="true" className="text-primary" size={16} />
            {worker.location}
          </p>
        ) : null}
        {matches.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {matches.map((label) => (
              <Badge className="border-primary/30 bg-primary/10 text-primary" key={label}>
                {label}
              </Badge>
            ))}
          </div>
        ) : null}
        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
          <WorkerFact
            icon={Star}
            label={t('business.topWorkers.rating')}
            value={
              worker.averageRating === null
                ? t('business.topWorkers.noReviews')
                : t('business.topWorkers.ratingValue', {
                    rating: worker.averageRating.toFixed(1),
                    count: worker.reviewsCount,
                  })
            }
          />
          <WorkerFact
            icon={BriefcaseBusiness}
            label={t('business.topWorkers.jobs')}
            value={t('business.topWorkers.jobsValue', {
              count: worker.completedJobsCount,
              sameRole: worker.completedSameRoleJobsCount,
            })}
          />
          <WorkerFact
            icon={FileText}
            label={t('business.topWorkers.cv')}
            value={
              !worker.hasCv
                ? t('business.topWorkers.noCv')
                : worker.cvYearsOfExperience === null
                  ? t('business.topWorkers.cvUploaded')
                  : t('business.topWorkers.cvYears', { years: worker.cvYearsOfExperience })
            }
          />
          {worker.cvLanguagesCount > 0 ? (
            <WorkerFact
              icon={Languages}
              label={t('business.topWorkers.languages')}
              value={t('business.topWorkers.languagesValue', { count: worker.cvLanguagesCount })}
            />
          ) : null}
        </dl>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border bg-secondary/45 p-5 lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
          {t('business.topWorkers.score')}
        </p>
        <p className="display-type tabular-nums text-4xl font-bold leading-none">
          {worker.score.toFixed(1)}
        </p>
      </div>
    </li>
  )
}

function WorkerFact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={16} />
      <dt className="sr-only">{label}</dt>
      <dd className="min-w-0 font-medium text-foreground">{value}</dd>
    </div>
  )
}
