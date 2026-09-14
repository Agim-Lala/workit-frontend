import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Camera,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Plus,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  UserRound,
  X,
} from 'lucide-react'
import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useT, type TranslationKey } from '@/i18n'
import { cn } from '@/lib/utils'
import type { ShiftTypeCode } from '@/types/job-opening.types'

import { startWorkerVerification } from '../api/start-worker-verification'
import { downloadWorkerCv, uploadWorkerCv } from '../api/upload-worker-cv'
import { uploadWorkerPhoto } from '../api/upload-worker-photo'
import { updateWorkerLocation } from '../api/update-worker-location'
import { updateWorkerPreferences } from '../api/update-worker-preferences'
import { useWorkerPhotoUrl } from '../hooks/use-worker-photo'
import { useWorkerProfile, workerProfileQueryKey } from '../hooks/use-worker-profile'
import {
  workerLocationSchema,
  type WorkerLocationFormValues,
} from '../schemas/worker-location.schema'
import type { WorkerProfile, WorkerVerificationStatusCode } from '../types/worker.types'
import { triggerBlobDownload } from '../utils/trigger-blob-download'

const shiftOptions: { code: ShiftTypeCode; labelKey: TranslationKey }[] = [
  { code: 0, labelKey: 'workerProfile.preferences.shift.morning' },
  { code: 1, labelKey: 'workerProfile.preferences.shift.evening' },
  { code: 2, labelKey: 'workerProfile.preferences.shift.customHours' },
]

const verificationStatusCodes: Record<string, WorkerVerificationStatusCode> = {
  NotStarted: 0,
  Pending: 1,
  Verified: 2,
  Rejected: 3,
}

function verificationStatusCode(status: WorkerProfile['verificationStatus']): WorkerVerificationStatusCode {
  return typeof status === 'number' ? status : verificationStatusCodes[status]
}

export function WorkerProfilePage() {
  const t = useT()
  const profileQuery = useWorkerProfile()
  const profile = profileQuery.data

  return (
    <section className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
      <header className="courtyard-accent courtyard-surface flex min-h-96 flex-col justify-between p-7 text-accent-foreground sm:p-10">
        <MapPin aria-hidden="true" size={30} />
        <div>
          <h1 className="display-type max-w-[10ch] text-5xl font-bold leading-[0.9] sm:text-6xl">
            {t('workerProfile.hero.title')}
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-7 text-accent-foreground">
            {t('workerProfile.hero.body')}
          </p>
        </div>
      </header>

      <div className="space-y-5">
        <div className="courtyard-surface p-6 sm:p-9">
          <div className="flex items-center justify-between gap-4 pb-2">
            {profile ? (
              <div className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-foreground">
                <UserRound aria-hidden="true" size={17} />
                {profile.firstName} {profile.lastName}
              </div>
            ) : null}
          </div>

          {profileQuery.isLoading ? (
            <div aria-live="polite" className="mt-8 rounded-2xl border border-border bg-background px-6 py-12 text-center">
              <p className="text-sm text-muted-foreground">{t('workerProfile.loading')}</p>
            </div>
          ) : null}

          {profileQuery.isError && !profile ? (
            <div className="mt-8 rounded-2xl border border-destructive/45 bg-background p-6" role="alert">
              <h3 className="display-type text-3xl font-bold">{t('workerProfile.loadError.title')}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t('workerProfile.loadError.body')}</p>
              <Button className="mt-5" onClick={() => void profileQuery.refetch()} type="button" variant="secondary">
                <RefreshCcw aria-hidden="true" size={17} />
                {t('workerProfile.tryAgain')}
              </Button>
            </div>
          ) : null}
        </div>

        {profile ? <LocationCard profile={profile} /> : null}
        {profile ? <DocumentsCard profile={profile} /> : null}
        {profile ? <PreferencesCard profile={profile} /> : null}
        {profile ? <VerificationCard profile={profile} /> : null}
      </div>
    </section>
  )
}

function LocationCard({ profile }: { profile: WorkerProfile }) {
  const t = useT()
  const queryClient = useQueryClient()
  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<WorkerLocationFormValues>({
    resolver: zodResolver(workerLocationSchema),
    defaultValues: { location: profile.location },
  })
  const locationMutation = useMutation({
    mutationFn: (values: WorkerLocationFormValues) => updateWorkerLocation(values.location),
    onSuccess: (response) => {
      queryClient.setQueryData<WorkerProfile>(workerProfileQueryKey, (current) => (
        current
          ? { ...current, location: response.location, isLocationVerified: response.isLocationVerified, country: response.country }
          : current
      ))
      void queryClient.invalidateQueries({ queryKey: ['jobs'] })
      reset({ location: response.location })
    },
  })

  useEffect(() => {
    reset({ location: profile.location })
  }, [profile.location, reset])

  return (
    <div className="courtyard-surface p-6 sm:p-9">
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="display-type text-3xl font-bold">{t('workerProfile.location.title')}</h2>
            {profile.isLocationVerified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                <ShieldCheck aria-hidden="true" size={13} />
                {t('workerProfile.location.verifiedBadge')}
              </span>
            ) : null}
          </div>
          <p className="mt-3 max-w-[60ch] text-sm leading-6 text-muted-foreground">
            {t('workerProfile.location.body')}
          </p>
        </div>
      </div>

      <form className="mt-6" onSubmit={handleSubmit((values) => locationMutation.mutate(values))}>
        <label className="text-sm font-semibold text-foreground" htmlFor="worker-location">
          {t('workerProfile.location.fieldLabel')}
          <span className="relative mt-2 block">
            <MapPin
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              aria-describedby={errors.location ? 'worker-location-hint worker-location-error' : 'worker-location-hint'}
              aria-invalid={Boolean(errors.location)}
              className="pl-10"
              id="worker-location"
              maxLength={200}
              placeholder="Tirana"
              {...register('location')}
            />
          </span>
        </label>
        <p className="mt-2 text-xs leading-5 text-muted-foreground" id="worker-location-hint">
          {t('workerProfile.location.hint')}
        </p>
        {errors.location ? (
          <p className="mt-2 text-sm text-destructive" id="worker-location-error" role="alert">
            {errors.location.message}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div aria-live="polite" className="min-h-6 text-sm">
            {locationMutation.isSuccess ? (
              <span className="inline-flex items-center gap-2 font-semibold text-primary">
                <CheckCircle2 aria-hidden="true" size={17} />
                {locationMutation.data?.isLocationVerified
                  ? t('workerProfile.location.savedVerified')
                  : t('workerProfile.location.savedUnverified')}
              </span>
            ) : null}
            {locationMutation.isError ? (
              <span className="text-destructive" role="alert">
                {t('workerProfile.location.error')}
              </span>
            ) : null}
          </div>
          <Button disabled={!isDirty || locationMutation.isPending} type="submit">
            {locationMutation.isPending ? t('workerProfile.location.submitting') : t('workerProfile.location.submit')}
          </Button>
        </div>
      </form>
    </div>
  )
}

function DocumentsCard({ profile }: { profile: WorkerProfile }) {
  const t = useT()
  const queryClient = useQueryClient()
  const photoUrl = useWorkerPhotoUrl(profile.hasPhoto, profile.photoUploadedAt)

  const cvMutation = useMutation({
    mutationFn: uploadWorkerCv,
    onSuccess: (response) => {
      queryClient.setQueryData<WorkerProfile>(workerProfileQueryKey, (current) => (
        current ? { ...current, hasCv: true, cvFileName: response.fileName, cvUploadedAt: response.uploadedAt } : current
      ))
    },
  })
  const downloadCvMutation = useMutation({
    mutationFn: async () => {
      const blob = await downloadWorkerCv()
      triggerBlobDownload(blob, profile.cvFileName ?? 'cv.pdf')
    },
  })
  const photoMutation = useMutation({
    mutationFn: uploadWorkerPhoto,
    onSuccess: (response) => {
      queryClient.setQueryData<WorkerProfile>(workerProfileQueryKey, (current) => (
        current ? { ...current, hasPhoto: true, photoUploadedAt: response.uploadedAt } : current
      ))
    },
  })

  function handleCvChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) {
      cvMutation.mutate(file)
    }
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) {
      photoMutation.mutate(file)
    }
  }

  return (
    <div className="courtyard-surface p-6 sm:p-9">
      <div className="border-b border-border pb-6">
        <h2 className="display-type text-3xl font-bold">{t('workerProfile.documents.title')}</h2>
        <p className="mt-3 max-w-[60ch] text-sm leading-6 text-muted-foreground">{t('workerProfile.documents.body')}</p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText aria-hidden="true" size={17} />
            {t('workerProfile.documents.cv.label')}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {profile.hasCv
              ? `${profile.cvFileName} · ${t('workerProfile.documents.cv.uploadedOn', { date: formatDate(profile.cvUploadedAt) })}`
              : t('workerProfile.documents.cv.empty')}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <FileUploadButton
              accept="application/pdf"
              label={profile.hasCv ? t('workerProfile.documents.cv.replace') : t('workerProfile.documents.cv.upload')}
              onChange={handleCvChange}
              pendingLabel={t('workerProfile.documents.cv.uploading')}
              pending={cvMutation.isPending}
            />
            {profile.hasCv ? (
              <Button
                disabled={downloadCvMutation.isPending}
                onClick={() => downloadCvMutation.mutate()}
                type="button"
                variant="secondary"
              >
                {t('workerProfile.documents.cv.download')}
              </Button>
            ) : null}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t('workerProfile.documents.cv.hint')}</p>
          {cvMutation.isError ? (
            <p className="mt-2 text-sm text-destructive" role="alert">{t('workerProfile.documents.cv.error')}</p>
          ) : null}
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Camera aria-hidden="true" size={17} />
            {t('workerProfile.documents.photo.label')}
          </p>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary">
              {photoUrl ? (
                <img alt="" className="h-full w-full object-cover" src={photoUrl} />
              ) : (
                <UserRound aria-hidden="true" className="text-muted-foreground" size={26} />
              )}
            </div>
            <FileUploadButton
              accept="image/jpeg,image/png,image/webp"
              label={profile.hasPhoto ? t('workerProfile.documents.photo.replace') : t('workerProfile.documents.photo.upload')}
              onChange={handlePhotoChange}
              pendingLabel={t('workerProfile.documents.photo.uploading')}
              pending={photoMutation.isPending}
            />
          </div>
          {!profile.hasPhoto ? (
            <p className="mt-2 text-sm text-muted-foreground">{t('workerProfile.documents.photo.empty')}</p>
          ) : null}
          <p className="mt-2 text-xs text-muted-foreground">{t('workerProfile.documents.photo.hint')}</p>
          {photoMutation.isError ? (
            <p className="mt-2 text-sm text-destructive" role="alert">{t('workerProfile.documents.photo.error')}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function FileUploadButton({
  accept,
  label,
  onChange,
  pending,
  pendingLabel,
}: {
  accept: string
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  pending: boolean
  pendingLabel: string
}) {
  return (
    <label className={cn(
      'focus-ring inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/45 hover:bg-secondary/65',
      pending && 'pointer-events-none opacity-60',
    )}
    >
      {pending ? pendingLabel : label}
      <input accept={accept} className="sr-only" disabled={pending} onChange={onChange} type="file" />
    </label>
  )
}

function PreferencesCard({ profile }: { profile: WorkerProfile }) {
  const t = useT()
  const queryClient = useQueryClient()
  // Tracks the server values last synced into the two drafts below, so a fresh save (a new
  // array reference from the server) resets the drafts without needing an effect for it.
  const [syncedFields, setSyncedFields] = useState(profile.interestedFields)
  const [syncedShiftTypes, setSyncedShiftTypes] = useState(profile.preferredShiftTypes)
  const [interestedFields, setInterestedFields] = useState<string[]>(profile.interestedFields)
  const [preferredShiftTypes, setPreferredShiftTypes] = useState<ShiftTypeCode[]>(profile.preferredShiftTypes)
  const [newField, setNewField] = useState('')

  if (profile.interestedFields !== syncedFields) {
    setSyncedFields(profile.interestedFields)
    setInterestedFields(profile.interestedFields)
  }
  if (profile.preferredShiftTypes !== syncedShiftTypes) {
    setSyncedShiftTypes(profile.preferredShiftTypes)
    setPreferredShiftTypes(profile.preferredShiftTypes)
  }

  const preferencesMutation = useMutation({
    mutationFn: () => updateWorkerPreferences(interestedFields, preferredShiftTypes),
    onSuccess: (response) => {
      queryClient.setQueryData<WorkerProfile>(workerProfileQueryKey, (current) => (
        current ? { ...current, interestedFields: response.interestedFields, preferredShiftTypes: response.preferredShiftTypes } : current
      ))
    },
  })

  function addField(event: FormEvent) {
    event.preventDefault()
    const trimmed = newField.trim()
    if (!trimmed || interestedFields.length >= 15) {
      return
    }
    if (!interestedFields.some((field) => field.toLowerCase() === trimmed.toLowerCase())) {
      setInterestedFields([...interestedFields, trimmed])
    }
    setNewField('')
  }

  function removeField(field: string) {
    setInterestedFields(interestedFields.filter((item) => item !== field))
  }

  function toggleShift(code: ShiftTypeCode) {
    setPreferredShiftTypes((current) =>
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code],
    )
  }

  return (
    <div className="courtyard-surface p-6 sm:p-9">
      <div className="border-b border-border pb-6">
        <h2 className="display-type text-3xl font-bold">{t('workerProfile.preferences.title')}</h2>
        <p className="mt-3 max-w-[60ch] text-sm leading-6 text-muted-foreground">{t('workerProfile.preferences.body')}</p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-foreground">{t('workerProfile.preferences.fieldsLabel')}</p>
        <form className="mt-2 flex gap-2" onSubmit={addField}>
          <Input
            aria-label={t('workerProfile.preferences.fieldsLabel')}
            maxLength={40}
            onChange={(event) => setNewField(event.target.value)}
            placeholder={t('workerProfile.preferences.fieldsPlaceholder')}
            value={newField}
          />
          <Button disabled={interestedFields.length >= 15} type="submit" variant="secondary">
            <Plus aria-hidden="true" size={17} />
            {t('workerProfile.preferences.fieldsAdd')}
          </Button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">{t('workerProfile.preferences.fieldsHint')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {interestedFields.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('workerProfile.preferences.fieldsEmpty')}</p>
          ) : null}
          {interestedFields.map((field) => (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-peach px-3 py-1.5 text-sm font-medium text-foreground"
              key={field}
            >
              {field}
              <button
                aria-label={t('workerProfile.preferences.removeField', { field })}
                className="focus-ring rounded-full text-muted-foreground hover:text-foreground"
                onClick={() => removeField(field)}
                type="button"
              >
                <X aria-hidden="true" size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <p className="text-sm font-semibold text-foreground">{t('workerProfile.preferences.shiftsLabel')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {shiftOptions.map((option) => {
            const isSelected = preferredShiftTypes.includes(option.code)
            return (
              <button
                aria-pressed={isSelected}
                className={cn(
                  'focus-ring min-h-11 rounded-xl border px-4 text-sm font-semibold transition-colors',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface text-foreground hover:border-primary/45',
                )}
                key={option.code}
                onClick={() => toggleShift(option.code)}
                type="button"
              >
                {t(option.labelKey)}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="min-h-6 text-sm">
          {preferencesMutation.isSuccess ? (
            <span className="inline-flex items-center gap-2 font-semibold text-primary">
              <CheckCircle2 aria-hidden="true" size={17} />
              {t('workerProfile.preferences.saved')}
            </span>
          ) : null}
          {preferencesMutation.isError ? (
            <span className="text-destructive" role="alert">{t('workerProfile.preferences.error')}</span>
          ) : null}
        </div>
        <Button
          disabled={preferencesMutation.isPending}
          onClick={() => preferencesMutation.mutate()}
          type="button"
        >
          {preferencesMutation.isPending ? t('workerProfile.preferences.submitting') : t('workerProfile.preferences.submit')}
        </Button>
      </div>
    </div>
  )
}

function VerificationCard({ profile }: { profile: WorkerProfile }) {
  const t = useT()
  const queryClient = useQueryClient()
  const status = verificationStatusCode(profile.verificationStatus)

  const verificationMutation = useMutation({
    mutationFn: startWorkerVerification,
    onSuccess: (response) => {
      queryClient.setQueryData<WorkerProfile>(workerProfileQueryKey, (current) => (
        current ? { ...current, verificationStatus: response.status } : current
      ))
      window.open(response.hostedUrl, '_blank', 'noopener,noreferrer')
    },
  })

  const icon = status === 2
    ? <ShieldCheck aria-hidden="true" className="text-primary" size={22} />
    : status === 3
      ? <ShieldAlert aria-hidden="true" className="text-destructive" size={22} />
      : status === 1
        ? <Clock3 aria-hidden="true" className="text-muted-foreground" size={22} />
        : <ShieldQuestion aria-hidden="true" className="text-muted-foreground" size={22} />

  return (
    <div className="courtyard-surface p-6 sm:p-9">
      <div className="flex items-start gap-3 border-b border-border pb-6">
        {icon}
        <div>
          <h2 className="display-type text-3xl font-bold">{t('workerProfile.verification.title')}</h2>
          <p className="mt-2 text-sm font-semibold text-foreground">{profile.verificationStatusLabel}</p>
          <p className="mt-1 max-w-[60ch] text-sm leading-6 text-muted-foreground">
            {status === 2
              ? t('workerProfile.verification.verifiedHint')
              : status === 1
                ? t('workerProfile.verification.pendingHint')
                : status === 3
                  ? t('workerProfile.verification.rejectedHint')
                  : t('workerProfile.verification.body')}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="min-h-6 text-sm">
          {verificationMutation.isError ? (
            <span className="text-destructive" role="alert">{t('workerProfile.verification.error')}</span>
          ) : null}
        </div>
        {status === 1 ? (
          <Button
            onClick={() => void queryClient.invalidateQueries({ queryKey: workerProfileQueryKey })}
            type="button"
            variant="secondary"
          >
            <RefreshCcw aria-hidden="true" size={17} />
            {t('workerProfile.verification.refresh')}
          </Button>
        ) : status !== 2 ? (
          <Button disabled={verificationMutation.isPending} onClick={() => verificationMutation.mutate()} type="button">
            {verificationMutation.isPending ? t('workerProfile.verification.starting') : t('workerProfile.verification.start')}
          </Button>
        ) : null}
      </div>
    </div>
  )
}

function formatDate(value: string | null) {
  if (!value) {
    return ''
  }

  return new Date(value).toLocaleDateString()
}
