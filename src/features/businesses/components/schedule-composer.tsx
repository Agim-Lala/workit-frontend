import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  nextMonday,
  nextSaturday,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FolderKanban,
  MoonStar,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { useWatch } from 'react-hook-form'

import { cn } from '@/lib/utils'

import type { JobOpeningFormValues } from '../schemas/job-opening.schema'

const jobTypes = [
  {
    value: '0',
    title: 'Permanent',
    description: 'An ongoing role with no finish date.',
    icon: BriefcaseBusiness,
  },
  {
    value: '1',
    title: 'Project',
    description: 'A defined piece of work with a date range.',
    icon: FolderKanban,
  },
  {
    value: '2',
    title: 'Short term',
    description: 'A focused shift or temporary run.',
    icon: Zap,
  },
] as const

const shiftTypes = [
  {
    value: '0',
    title: 'Morning',
    description: 'An early-day shift.',
    icon: Sun,
  },
  {
    value: '1',
    title: 'Evening',
    description: 'A later-day shift.',
    icon: MoonStar,
  },
  {
    value: '2',
    title: 'Custom hours',
    description: 'Build your own time window.',
    icon: SlidersHorizontal,
  },
] as const

const timePresets = [
  { label: 'Early start', start: '06:00', end: '14:00' },
  { label: 'Full day', start: '09:00', end: '17:00' },
  { label: 'Late shift', start: '16:00', end: '22:00' },
  { label: 'Overnight', start: '22:00', end: '06:00' },
]

type ScheduleComposerProps = {
  control: Control<JobOpeningFormValues>
  errors: FieldErrors<JobOpeningFormValues>
  register: UseFormRegister<JobOpeningFormValues>
  setValue: UseFormSetValue<JobOpeningFormValues>
}

export function ScheduleComposer({
  control,
  errors,
  register,
  setValue,
}: ScheduleComposerProps) {
  const [openCalendar, setOpenCalendar] = useState<'start' | 'end' | null>(null)
  const jobType = useWatch({ control, name: 'jobType' })
  const shiftType = useWatch({ control, name: 'shiftType' })
  const startDate = useWatch({ control, name: 'startDate' })
  const endDate = useWatch({ control, name: 'endDate' })
  const shiftStartTime = useWatch({ control, name: 'shiftStartTime' })
  const shiftEndTime = useWatch({ control, name: 'shiftEndTime' })

  useEffect(() => {
    if (shiftType !== '2') {
      return
    }

    if (!shiftStartTime) {
      setValue('shiftStartTime', '09:00', { shouldDirty: true })
    }

    if (!shiftEndTime) {
      setValue('shiftEndTime', '17:00', { shouldDirty: true })
    }
  }, [setValue, shiftEndTime, shiftStartTime, shiftType])

  function selectJobType(value: JobOpeningFormValues['jobType']) {
    setOpenCalendar(null)
    setValue('jobType', value, { shouldDirty: true, shouldValidate: true })

    if (value === '0') {
      setValue('endDate', '', { shouldDirty: true, shouldValidate: true })
    } else if (startDate && !endDate) {
      setValue('endDate', startDate, {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  function selectShiftType(value: JobOpeningFormValues['shiftType']) {
    setValue('shiftType', value, { shouldDirty: true, shouldValidate: true })
  }

  function selectStartDate(value: string) {
    setValue('startDate', value, { shouldDirty: true, shouldValidate: true })

    if (jobType !== '0' && (!endDate || endDate < value)) {
      setValue('endDate', value, { shouldDirty: true, shouldValidate: true })
    }
  }

  function applyDatePreset(start: Date, end: Date) {
    setOpenCalendar(null)
    const nextStartDate = format(start, 'yyyy-MM-dd')
    setValue('startDate', nextStartDate, {
      shouldDirty: true,
      shouldValidate: true,
    })
    setValue('endDate', jobType === '0' ? '' : format(end, 'yyyy-MM-dd'), {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  function applyTimePreset(start: string, end: string) {
    setValue('shiftStartTime', start, {
      shouldDirty: true,
      shouldValidate: true,
    })
    setValue('shiftEndTime', end, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const today = startOfDay(new Date())
  const saturday = nextSaturday(today)
  const monday = nextMonday(today)
  const datePresets = [
    { label: 'Tomorrow', start: addDays(today, 1), end: addDays(today, 1) },
    { label: 'Weekend', start: saturday, end: addDays(saturday, 1) },
    { label: 'Next week', start: monday, end: addDays(monday, 4) },
  ]
  const scheduleSummary = getScheduleSummary(
    jobType,
    startDate,
    endDate,
    shiftType,
    shiftStartTime,
    shiftEndTime,
  )

  return (
    <section className="mt-8 rounded-2xl bg-background/75 px-4 py-7 sm:px-6">
      <input type="hidden" {...register('jobType')} />
      <input type="hidden" {...register('startDate')} />
      <input type="hidden" {...register('endDate')} />
      <input type="hidden" {...register('shiftType')} />
      <input type="hidden" {...register('shiftStartTime')} />
      <input type="hidden" {...register('shiftEndTime')} />

      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="display-type flex items-center gap-2 text-3xl font-bold text-foreground">
            <Sparkles aria-hidden="true" className="text-primary" size={20} />
            Build the rhythm of this job
          </h2>
        </div>
        <div className="max-w-sm rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-muted-foreground">
          {scheduleSummary}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-foreground">
          How long will this opportunity run?
        </legend>
        <div
          aria-describedby={errors.jobType ? 'job-type-error' : undefined}
          aria-invalid={Boolean(errors.jobType)}
          className="mt-3 grid gap-3 md:grid-cols-3"
          role="radiogroup"
        >
          {jobTypes.map((option) => (
            <ChoiceCard
              checked={jobType === option.value}
              description={option.description}
              icon={option.icon}
              key={option.value}
              name="job-type"
              onChange={() => selectJobType(option.value)}
              title={option.title}
              value={option.value}
            />
          ))}
        </div>
        {errors.jobType ? <FieldError id="job-type-error" message={errors.jobType.message} /> : null}
      </fieldset>

      <div className="mt-7 border-t border-border pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Choose the dates</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Start with a shortcut or open the calendar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {datePresets.map((preset) => (
              <button
                className="focus-ring min-h-11 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary"
                key={preset.label}
                onClick={() => applyDatePreset(preset.start, preset.end)}
                type="button"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <CalendarPicker
            error={errors.startDate?.message}
            id="job-start-date"
            isOpen={openCalendar === 'start'}
            label="Starts"
            onChange={selectStartDate}
            onOpenChange={(isOpen) =>
              setOpenCalendar(isOpen ? 'start' : null)
            }
            value={startDate}
          />
          {jobType === '0' ? (
            <div className="grid min-h-32 place-items-center border border-dashed border-primary/35 bg-primary/5 p-5 text-center">
              <div>
                <BriefcaseBusiness
                  aria-hidden="true"
                  className="mx-auto text-primary"
                  size={24}
                />
                <p className="mt-3 text-sm font-semibold text-foreground">
                  Open-ended opportunity
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Permanent jobs only need a start date.
                </p>
              </div>
            </div>
          ) : (
            <CalendarPicker
              error={errors.endDate?.message}
              id="job-end-date"
              isOpen={openCalendar === 'end'}
              label="Ends"
              minDate={startDate}
              onChange={(value) =>
                setValue('endDate', value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              onOpenChange={(isOpen) => setOpenCalendar(isOpen ? 'end' : null)}
              value={endDate}
            />
          )}
        </div>
      </div>

      <fieldset className="mt-7 border-t border-border pt-6">
        <legend className="text-sm font-semibold text-foreground">
          What part of the day?
        </legend>
        <div
          aria-describedby={errors.shiftType ? 'shift-type-error' : undefined}
          aria-invalid={Boolean(errors.shiftType)}
          className="mt-3 grid gap-3 md:grid-cols-3"
          role="radiogroup"
        >
          {shiftTypes.map((option) => (
            <ChoiceCard
              checked={shiftType === option.value}
              description={option.description}
              icon={option.icon}
              key={option.value}
              name="shift-type"
              onChange={() => selectShiftType(option.value)}
              title={option.title}
              value={option.value}
            />
          ))}
        </div>
        {errors.shiftType ? <FieldError id="shift-type-error" message={errors.shiftType.message} /> : null}
      </fieldset>

      {shiftType === '2' ? (
        <div className="mt-4 rounded-2xl bg-surface p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Shape the hours</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Drag each rail in 15-minute steps.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {timePresets.map((preset) => {
                const isActive =
                  shiftStartTime === preset.start && shiftEndTime === preset.end

                return (
                  <button
                    aria-pressed={isActive}
                    className={cn(
                      'focus-ring min-h-11 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors',
                      isActive
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-secondary text-foreground hover:border-primary',
                    )}
                    key={preset.label}
                    onClick={() => applyTimePreset(preset.start, preset.end)}
                    type="button"
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <TimeRail
              error={errors.shiftStartTime?.message}
              id="job-shift-start"
              label="Clock in"
              onChange={(value) =>
                setValue('shiftStartTime', value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              value={shiftStartTime || '09:00'}
            />
            <TimeRail
              error={errors.shiftEndTime?.message}
              id="job-shift-end"
              label="Clock out"
              onChange={(value) =>
                setValue('shiftEndTime', value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              value={shiftEndTime || '17:00'}
            />
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-accent px-4 py-3 text-accent-foreground">
            <Clock3 aria-hidden="true" size={18} />
            <p className="text-sm font-medium">
              {formatTime(shiftStartTime || '09:00')} →{' '}
              {formatTime(shiftEndTime || '17:00')}
              <span className="ml-2 text-accent-foreground">
                {getShiftDuration(
                  shiftStartTime || '09:00',
                  shiftEndTime || '17:00',
                )}
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function ChoiceCard({
  checked,
  description,
  icon: Icon,
  name,
  onChange,
  title,
  value,
}: {
  checked: boolean
  description: string
  icon: LucideIcon
  name: string
  onChange: () => void
  title: string
  value: string
}) {
  return (
    <label className="group cursor-pointer">
      <input
        checked={checked}
        className="peer sr-only"
        name={name}
        onChange={onChange}
        type="radio"
        value={value}
      />
      <span className="flex min-h-28 items-start gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors group-hover:border-primary/60 peer-checked:border-primary peer-checked:bg-primary/8 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
        <span className="grid h-10 w-10 shrink-0 place-items-center border border-border bg-secondary text-primary">
          <Icon aria-hidden="true" size={20} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2 text-sm font-semibold text-foreground">
            {title}
            <span
              className={cn(
                'grid h-5 w-5 place-items-center rounded-full border transition',
                checked
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-transparent',
              )}
            >
              <Check aria-hidden="true" size={13} />
            </span>
          </span>
          <span className="mt-1.5 block text-xs leading-5 text-muted-foreground">
            {description}
          </span>
        </span>
      </span>
    </label>
  )
}

function CalendarPicker({
  error,
  id,
  isOpen,
  label,
  minDate,
  onChange,
  onOpenChange,
  value,
}: {
  error?: string
  id: string
  isOpen: boolean
  label: string
  minDate?: string
  onChange: (value: string) => void
  onOpenChange: (isOpen: boolean) => void
  value: string
}) {
  const selectedDate = parseDate(value)
  const minimumDate = parseDate(minDate ?? '')
  const [visibleMonth, setVisibleMonth] = useState(
    selectedDate ?? minimumDate ?? new Date(),
  )
  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(visibleMonth), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(visibleMonth), { weekStartsOn: 1 }),
      }),
    [visibleMonth],
  )

  return (
    <div className="relative">
      <button
        aria-describedby={error ? `${id}-error` : undefined}
        aria-expanded={isOpen}
        aria-invalid={Boolean(error)}
        className={cn(
          'focus-ring flex min-h-32 w-full items-center gap-4 rounded-2xl border bg-surface p-5 text-left transition-colors hover:border-primary/60',
          isOpen && 'border-primary ring-1 ring-primary',
          error && 'border-destructive',
        )}
        id={id}
        onClick={() => {
          if (!isOpen && selectedDate) {
            setVisibleMonth(selectedDate)
          }
          onOpenChange(!isOpen)
        }}
        type="button"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center border border-primary/30 bg-primary/10 text-primary">
          <CalendarDays aria-hidden="true" size={23} />
        </span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </span>
          {selectedDate ? (
            <>
              <span className="mt-1 block text-2xl font-semibold text-foreground">
                {format(selectedDate, 'MMM d')}
              </span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                {format(selectedDate, 'EEEE, yyyy')}
              </span>
            </>
          ) : (
            <>
              <span className="mt-1 block text-lg font-semibold text-foreground">
                Pick a date
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                Open the calendar
              </span>
            </>
          )}
        </span>
      </button>
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}

      {isOpen ? (
        <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-72 rounded-md border border-border bg-surface p-4 shadow-xl sm:w-80">
          <div className="flex items-center justify-between">
            <button
              aria-label="Previous month"
              className="focus-ring grid h-11 w-11 place-items-center rounded-full text-foreground hover:bg-secondary"
              onClick={() => setVisibleMonth((month) => subMonths(month, 1))}
              type="button"
            >
              <ChevronLeft aria-hidden="true" size={18} />
            </button>
            <p className="text-sm font-semibold text-foreground">
              {format(visibleMonth, 'MMMM yyyy')}
            </p>
            <button
              aria-label="Next month"
              className="focus-ring grid h-11 w-11 place-items-center rounded-full text-foreground hover:bg-secondary"
              onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
              type="button"
            >
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase text-muted-foreground">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {days.map((day) => {
              const isDisabled = Boolean(
                minimumDate && isBefore(day, startOfDay(minimumDate)),
              )
              const isSelected = Boolean(selectedDate && isSameDay(day, selectedDate))
              const isToday = isSameDay(day, new Date())

              return (
                <button
                  aria-label={format(day, 'EEEE, MMMM d, yyyy')}
                  className={cn(
                    'focus-ring grid aspect-square place-items-center rounded-full text-xs font-medium transition',
                    isSameMonth(day, visibleMonth)
                      ? 'text-foreground hover:bg-secondary'
                      : 'text-muted-foreground/45',
                    isToday && 'ring-1 ring-primary/45',
                    isSelected &&
                      'bg-primary text-primary-foreground hover:bg-primary',
                    isDisabled && 'cursor-not-allowed opacity-25 hover:bg-transparent',
                  )}
                  disabled={isDisabled}
                  key={day.toISOString()}
                  onClick={() => {
                    onChange(format(day, 'yyyy-MM-dd'))
                    onOpenChange(false)
                  }}
                  type="button"
                >
                  {format(day, 'd')}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function TimeRail({
  error,
  id,
  label,
  onChange,
  value,
}: {
  error?: string
  id: string
  label: string
  onChange: (value: string) => void
  value: string
}) {
  return (
    <label className="border border-border bg-secondary/60 p-4">
      <span className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <span className="text-xl font-semibold text-foreground">
          {formatTime(value)}
        </span>
      </span>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        aria-label={label}
        className="schedule-range mt-5"
        id={id}
        max="95"
        min="0"
        onChange={(event) => onChange(slotToTime(Number(event.target.value)))}
        step="1"
        type="range"
        value={timeToSlot(value)}
      />
      <span className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
        <span>12am</span>
        <span>6am</span>
        <span>12pm</span>
        <span>6pm</span>
        <span>12am</span>
      </span>
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p className="mt-2 text-sm text-destructive" id={id} role="alert">{message}</p>
  ) : null
}

function parseDate(value: string) {
  if (!value) {
    return null
  }

  const date = parseISO(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  const suffix = hours >= 12 ? 'pm' : 'am'
  const twelveHour = hours % 12 || 12
  return `${twelveHour}:${String(minutes).padStart(2, '0')} ${suffix}`
}

function timeToSlot(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  return Math.round((hours * 60 + minutes) / 15)
}

function slotToTime(slot: number) {
  const totalMinutes = slot * 15
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function getShiftDuration(start: string, end: string) {
  const startMinutes = toMinutes(start)
  let endMinutes = toMinutes(end)

  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60
  }

  const duration = endMinutes - startMinutes
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return minutes ? `${hours}h ${minutes}m scheduled` : `${hours}h scheduled`
}

function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

function getScheduleSummary(
  jobType: JobOpeningFormValues['jobType'],
  startDate: string,
  endDate: string,
  shiftType: JobOpeningFormValues['shiftType'],
  shiftStartTime: string,
  shiftEndTime: string,
) {
  if (!startDate) {
    return 'Your schedule will appear here'
  }

  const start = parseDate(startDate)
  if (!start) {
    return 'Choose a valid start date'
  }

  let dateLabel = `Starts ${format(start, 'MMM d')}`
  const end = parseDate(endDate)
  if (jobType !== '0' && end) {
    const days = differenceInCalendarDays(end, start) + 1
    dateLabel = days === 1 ? format(start, 'MMM d') : `${days} days`
  }

  const shiftLabel =
    shiftType === '0'
      ? 'morning'
      : shiftType === '1'
        ? 'evening'
        : `${formatTime(shiftStartTime || '09:00')}–${formatTime(
            shiftEndTime || '17:00',
          )}`

  return `${dateLabel} · ${shiftLabel}`
}
