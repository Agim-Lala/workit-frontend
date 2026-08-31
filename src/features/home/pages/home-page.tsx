import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  LockKeyhole,
  MapPin,
  UserRound,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const featuredJobs = [
  { title: 'Weekend event crew', role: 'Event staff', location: 'Tirana', schedule: 'Fri–Sun evenings', pay: '7,500 ALL / day', color: 'bg-primary text-primary-foreground' },
  { title: 'Morning barista', role: 'Hospitality', location: 'Blloku, Tirana', schedule: '07:00–13:00', pay: '550 ALL / hour', color: 'bg-accent text-accent-foreground' },
  { title: 'Retail launch assistant', role: 'Retail', location: 'Durrës', schedule: 'Aug 12–16', pay: '6,800 ALL / day', color: 'bg-sun text-sun-foreground' },
] as const

export function HomePage() {
  const [activeJobIndex, setActiveJobIndex] = useState(0)
  const activeJob = featuredJobs[activeJobIndex]

  return (
    <div className="space-y-8 pb-8 sm:space-y-12">
      <section className="grid min-h-[680px] gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="courtyard-reveal flex flex-col justify-center rounded-3xl bg-peach px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-14">
          <h1 className="display-type max-w-[9ch] text-[clamp(4rem,7vw,6rem)] font-bold leading-[0.88] text-foreground">
            Work that fits your life.
          </h1>
          <p className="mt-7 max-w-[58ch] text-base leading-7 text-muted-foreground sm:text-lg">
            Workit connects workers and businesses around flexible opportunities with the role, schedule, location, and pay made clear from the start.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="justify-between sm:min-w-60">
              <Link to="/signup">Create an account<ArrowRight aria-hidden="true" size={19} /></Link>
            </Button>
            <Button asChild className="justify-between sm:min-w-44" variant="secondary">
              <Link state={{ returnTo: '/jobs' }} to="/login">Sign in<ArrowRight aria-hidden="true" size={18} /></Link>
            </Button>
          </div>
          <p className="mt-5 flex max-w-md items-start gap-2 text-sm leading-6 text-muted-foreground">
            <LockKeyhole aria-hidden="true" className="mt-0.5 shrink-0" size={16} />
            Sign in to access current listings, full job details, and applications.
          </p>
        </div>

        <div className="relative flex items-center rounded-3xl bg-accent px-3 py-10 sm:px-8 lg:px-10 lg:py-14">
          <div className="relative z-10 w-full lg:mr-12">
            <div className="courtyard-lift courtyard-surface paper-texture min-h-[560px] p-5 sm:p-8 lg:p-10">
              <div className="h-2 w-20 rounded-full bg-sun" />
              <div className="mt-5 flex items-center justify-between gap-4 border-b border-border pb-4">
                <p className="text-sm font-semibold text-muted-foreground">Illustrative opportunity</p>
                <p className="tabular-nums text-sm font-semibold text-muted-foreground">0{activeJobIndex + 1} / 03</p>
              </div>

              <div className="mt-7">
                <p className="text-sm font-semibold text-primary">{activeJob.role}</p>
                <h2 className="display-type mt-2 max-w-xl text-4xl font-bold leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">{activeJob.title}</h2>
                <dl className="mt-8 divide-y divide-border border-y border-border">
                  <FactRow icon={MapPin} label="Location" value={activeJob.location} />
                  <FactRow icon={Clock3} label="Schedule" value={activeJob.schedule} />
                  <FactRow icon={Wallet} label="Pay" value={activeJob.pay} />
                </dl>
                <Button asChild className="mt-7 w-full justify-between">
                  <Link state={{ returnTo: '/jobs' }} to="/login">Sign in to view details<ArrowRight aria-hidden="true" size={19} /></Link>
                </Button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 lg:hidden" aria-label="Choose preview job">
                {featuredJobs.map((job, index) => (
                  <button
                    aria-label={`Show ${job.title}`}
                    aria-pressed={activeJobIndex === index}
                    className={cn(
                      'focus-ring min-h-11 border border-border px-3 text-sm font-bold',
                      'rounded-xl',
                      activeJobIndex === index ? job.color : 'bg-secondary text-foreground',
                    )}
                    key={job.title}
                    onClick={() => setActiveJobIndex(index)}
                    type="button"
                  >
                    0{index + 1}
                  </button>
                ))}
              </div>
              <p className="mt-5 border-t border-dashed border-border pt-4 text-xs leading-5 text-muted-foreground">
                Preview listings are illustrative. Sign in to see current openings.
              </p>
            </div>

            <div className="absolute -right-8 top-24 hidden flex-col gap-2 lg:flex" aria-label="Choose preview job">
              {featuredJobs.map((job, index) => (
                <button
                  aria-label={`Show ${job.title}`}
                  aria-pressed={activeJobIndex === index}
                  className={cn(
                    'focus-ring flex h-36 w-12 items-center justify-center rounded-xl border border-foreground/15 font-bold transition-[width] [writing-mode:vertical-rl]',
                    job.color,
                    activeJobIndex === index && 'w-14',
                  )}
                  key={job.title}
                  onClick={() => setActiveJobIndex(index)}
                  type="button"
                >
                  0{index + 1} · {job.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="flex min-h-14 items-center justify-center rounded-2xl bg-sun px-8 text-center">
        <p className="text-sm font-semibold text-sun-foreground">
          Role · Place · Schedule · Pay — clear before you commit
        </p>
      </div>

      <section className="courtyard-surface overflow-hidden" id="how-it-works">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex items-center bg-accent px-6 py-10 text-accent-foreground sm:px-10 lg:px-12">
            <h2 className="display-type max-w-[8ch] text-5xl font-bold leading-[0.92] sm:text-6xl">Clear on both sides.</h2>
          </div>
          <div className="grid bg-surface md:grid-cols-2">
            <AudienceLane action="Find opportunities" description="Browse current openings, compare the practical details, and keep applications in one place." icon={UserRound} title="For workers" to="/login" />
            <AudienceLane action="Create a business account" className="border-t md:border-l md:border-t-0" description="Publish permanent roles, projects, and short-term shifts with clear expectations." icon={BriefcaseBusiness} title="For businesses" to="/signup?type=business" />
          </div>
        </div>
      </section>

      <section className="courtyard-surface grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-surface p-7 sm:p-10">
          <h2 className="display-type text-4xl font-bold leading-none sm:text-5xl">What Workit stands for.</h2>
          <p className="mt-5 max-w-[44ch] leading-7 text-muted-foreground">Opportunity without unnecessary barriers, transparency before commitment, and respect for the time on both sides of every job.</p>
        </div>
        <dl className="divide-y divide-border border-t border-border lg:border-l lg:border-t-0">
          <Value title="Accessible" description="A clear path from interest to work." />
          <Value title="Transparent" description="Role, place, schedule, and pay before commitment." />
          <Value title="Respectful" description="People’s time and contribution stay visible." />
        </dl>
      </section>

      <section className="grid gap-6 rounded-3xl bg-primary px-6 py-10 text-primary-foreground sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
        <div>
          <h2 className="display-type max-w-2xl text-4xl font-bold leading-none sm:text-5xl">Ready to move from preview to opportunity?</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white">Create the account that matches how you work, then enter the full Workit workspace.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-surface text-foreground hover:bg-surface/90"><Link to="/signup">Create account</Link></Button>
          <Button asChild className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" variant="secondary"><Link to="/login">Sign in</Link></Button>
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

function AudienceLane({ action, className, description, icon: Icon, title, to }: { action: string; className?: string; description: string; icon: LucideIcon; title: string; to: string }) {
  return (
    <article className={cn('border-border p-7 transition-colors hover:bg-secondary/30 sm:p-10', className)} id={title === 'For businesses' ? 'for-businesses' : undefined}>
      <Icon aria-hidden="true" className="text-primary" size={28} />
      <h3 className="display-type mt-6 text-3xl font-bold">{title}</h3>
      <p className="mt-3 min-h-20 max-w-[38ch] leading-7 text-muted-foreground">{description}</p>
      <Link className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 border-b-2 border-primary text-sm font-bold text-primary" to={to}>{action}<ArrowRight aria-hidden="true" size={17} /></Link>
    </article>
  )
}

function Value({ description, title }: { description: string; title: string }) {
  return (
    <div className="grid gap-2 p-6 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6 sm:p-8">
      <dt className="display-type text-3xl font-bold">{title}</dt>
      <dd className="text-sm leading-6 text-muted-foreground">{description}</dd>
    </div>
  )
}
