import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, BriefcaseBusiness, Check, MapPin, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { WorkitBrand } from '@/components/brand/workit-brand'
import { LanguageToggle } from '@/components/i18n/language-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useT, type TranslationKey } from '@/i18n'
import { getApiError, isRateLimited, toFieldName } from '@/lib/api-error'
import { cn } from '@/lib/utils'

import { registerBusiness, registerWorker } from '../api/register'
import { AddressAutocomplete } from '../components/address-autocomplete'
import type { AuthRedirectState } from '../components/protected-route'
import { signupSchema, type SignupFormValues } from '../schemas/auth.schema'
import { setAuthSession } from '../utils/auth-token'

const accountTypes = [
  {
    value: 'worker',
    titleKey: 'auth.signup.workerName',
    descriptionKey: 'auth.signup.workerDesc',
    icon: UserRound,
  },
  {
    value: 'business',
    titleKey: 'auth.signup.businessName',
    descriptionKey: 'auth.signup.businessDesc',
    icon: BriefcaseBusiness,
  },
] as const satisfies readonly {
  value: 'worker' | 'business'
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  icon: typeof UserRound
}[]

export function SignupPage() {
  const t = useT()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const redirectState = location.state as AuthRedirectState | null
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    register,
    setError,
    setValue,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      accountType: searchParams.get('type') === 'business' ? 'business' : 'worker',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      firstName: '',
      lastName: '',
      location: '',
      businessName: '',
      fullAddress: '',
      latitude: undefined,
      longitude: undefined,
      nipt: '',
    },
  })
  const accountType = useWatch({ control, name: 'accountType' })
  const fullAddress = useWatch({ control, name: 'fullAddress' }) ?? ''
  const addressCoordinates = useWatch({ control, name: ['latitude', 'longitude'] })
  const hasPickedAddress = addressCoordinates.every((value) => value !== undefined)

  async function submitSignup(values: SignupFormValues) {
    setSubmitError(null)

    try {
      const phone = values.phone?.trim() || undefined
      const response =
        values.accountType === 'worker'
          ? await registerWorker({
              email: values.email,
              password: values.password,
              firstName: values.firstName ?? '',
              lastName: values.lastName ?? '',
              location: values.location ?? '',
              phone,
            })
          : await registerBusiness({
              email: values.email,
              password: values.password,
              businessName: values.businessName ?? '',
              fullAddress: values.fullAddress ?? '',
              // Without a picked location the API geocodes fullAddress itself.
              latitude: values.latitude,
              longitude: values.longitude,
              nipt: values.nipt?.trim() ?? '',
              phone,
            })

      setAuthSession(response.accessToken, response.user)
      navigate(
        getSafeReturnTo(redirectState?.returnTo) ??
          (values.accountType === 'worker' ? '/jobs' : '/business'),
        { replace: true },
      )
    } catch (error) {
      if (isRateLimited(error)) {
        setSubmitError(t('auth.rateLimited'))
        return
      }

      const apiError = getApiError(error)

      if (apiError?.errors) {
        for (const [propertyName, messages] of Object.entries(apiError.errors)) {
          const fieldName = toFieldName(propertyName) as keyof SignupFormValues
          if (messages[0]) {
            setError(fieldName, { message: messages[0], type: 'server' })
          }
        }
      }

      setSubmitError(apiError?.detail ?? apiError?.title ?? t('auth.signup.error'))
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-8 lg:px-12">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 border-b border-border pb-5">
        <Link aria-label={t('nav.workitHome')} className="focus-ring" to="/">
          <WorkitBrand />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </header>
      <section className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center gap-10 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:py-14">
        <div className="space-y-8">
          <div>
            <h1 className="display-type max-w-[10ch] text-5xl font-bold leading-[0.9] text-foreground sm:text-7xl">
              {t('auth.signup.title')}
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              {t('auth.signup.subtitle')}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {accountTypes.map((type) => {
              const Icon = type.icon
              const isSelected = accountType === type.value

              return (
                <button
                  className={cn(
                    'focus-ring flex w-full items-start gap-4 border bg-surface p-5 text-left transition-colors',
                    isSelected
                      ? 'border-primary bg-peach text-foreground'
                      : 'border-border hover:border-foreground/40',
                  )}
                  key={type.value}
                  onClick={() =>
                    setValue('accountType', type.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  type="button"
                >
                  <span
                    className={cn(
                      'grid h-10 w-10 shrink-0 place-items-center border',
                      isSelected
                        ? 'border-primary/30 bg-surface text-primary'
                        : 'border-border bg-secondary text-foreground',
                    )}
                  >
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3 text-base font-semibold text-foreground">
                      {t(type.titleKey)}
                      {isSelected ? (
                        <Check
                          aria-label={t('auth.signup.selected')}
                            className="text-primary"
                          size={18}
                        />
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                      {t(type.descriptionKey)}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <form
          className="courtyard-lift courtyard-surface p-5 sm:p-8"
          onSubmit={handleSubmit(submitSignup)}
        >
          <div className="border-b border-border pb-5">
            <h2 className="display-type text-3xl font-bold text-foreground">
              {accountType === 'worker'
                ? t('auth.signup.workerHeading')
                : t('auth.signup.businessHeading')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('auth.signup.haveAccount')}{' '}
              <Link
                className="font-semibold text-primary underline decoration-2 underline-offset-4"
                state={redirectState}
                to="/login"
              >
                {t('common.signIn')}
              </Link>
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {accountType === 'worker' ? (
              <>
                <FieldError errorId="signup-first-name-error" message={errors.firstName?.message}>
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-first-name">
                    {t('auth.field.firstName')}
                    <Input
                      aria-describedby={errors.firstName ? 'signup-first-name-error' : undefined}
                      aria-invalid={Boolean(errors.firstName)}
                      className="mt-2"
                      id="signup-first-name"
                      placeholder="Ada"
                      {...register('firstName')}
                    />
                  </label>
                </FieldError>
                <FieldError errorId="signup-last-name-error" message={errors.lastName?.message}>
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-last-name">
                    {t('auth.field.lastName')}
                    <Input
                      aria-describedby={errors.lastName ? 'signup-last-name-error' : undefined}
                      aria-invalid={Boolean(errors.lastName)}
                      className="mt-2"
                      id="signup-last-name"
                      placeholder="Lovelace"
                      {...register('lastName')}
                    />
                  </label>
                </FieldError>
                <FieldError
                  className="sm:col-span-2"
                  errorId="signup-location-error"
                  message={errors.location?.message}
                >
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-location">
                    {t('auth.field.cityArea')}
                    <span className="relative mt-2 block">
                      <MapPin
                        aria-hidden="true"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                      />
                      <Input
                        aria-describedby={errors.location ? 'signup-location-hint signup-location-error' : 'signup-location-hint'}
                        aria-invalid={Boolean(errors.location)}
                        className="pl-10"
                        id="signup-location"
                        maxLength={200}
                        placeholder="Tirana"
                        {...register('location')}
                      />
                    </span>
                  </label>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground" id="signup-location-hint">
                    {t('auth.signup.locationHint')}
                  </p>
                </FieldError>
              </>
            ) : (
              <>
                <FieldError
                  className="sm:col-span-2"
                  errorId="signup-business-name-error"
                  message={errors.businessName?.message}
                >
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-business-name">
                    {t('auth.field.businessName')}
                    <Input
                      aria-describedby={errors.businessName ? 'signup-business-name-error' : undefined}
                      aria-invalid={Boolean(errors.businessName)}
                      className="mt-2"
                      id="signup-business-name"
                      placeholder="Northside Cafe"
                      {...register('businessName')}
                    />
                  </label>
                </FieldError>
                <FieldError
                  className="sm:col-span-2"
                  errorId="signup-address-error"
                  message={errors.fullAddress?.message}
                >
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-address">
                    {t('auth.field.businessAddress')}
                  </label>
                  <AddressAutocomplete
                    aria-describedby={errors.fullAddress ? 'signup-address-hint signup-address-error' : 'signup-address-hint'}
                    aria-invalid={Boolean(errors.fullAddress)}
                    id="signup-address"
                    maxLength={500}
                    name="fullAddress"
                    onSelect={(suggestion) => {
                      setValue('fullAddress', suggestion.address, { shouldDirty: true, shouldValidate: true })
                      setValue('latitude', suggestion.latitude)
                      setValue('longitude', suggestion.longitude)
                    }}
                    onValueChange={(value) => {
                      setValue('fullAddress', value, { shouldDirty: true })
                      setValue('latitude', undefined)
                      setValue('longitude', undefined)
                    }}
                    placeholder="Rruga e Kavajës 12, Tiranë"
                    value={fullAddress}
                  />
                  <p className="mt-1 text-xs leading-5 text-muted-foreground" id="signup-address-hint">
                    {hasPickedAddress ? t('auth.signup.addressPicked') : t('auth.signup.addressHint')}
                  </p>
                </FieldError>
                <FieldError
                  className="sm:col-span-2"
                  errorId="signup-nipt-error"
                  message={errors.nipt?.message}
                >
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-nipt">
                    {t('auth.field.nipt')}
                    <Input
                      aria-describedby={errors.nipt ? 'signup-nipt-hint signup-nipt-error' : 'signup-nipt-hint'}
                      aria-invalid={Boolean(errors.nipt)}
                      className="mt-2 uppercase"
                      id="signup-nipt"
                      placeholder="L12345678A"
                      {...register('nipt')}
                    />
                  </label>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground" id="signup-nipt-hint">
                    {t('auth.signup.niptHint')}
                  </p>
                </FieldError>
              </>
            )}

            <FieldError errorId="signup-email-error" message={errors.email?.message}>
              <label className="text-sm font-medium text-foreground" htmlFor="signup-email">
                {t('auth.field.email')}
                <Input
                  aria-describedby={errors.email ? 'signup-email-error' : undefined}
                  aria-invalid={Boolean(errors.email)}
                  className="mt-2"
                  id="signup-email"
                  placeholder="you@example.com"
                  type="email"
                  {...register('email')}
                />
              </label>
            </FieldError>
            <FieldError errorId="signup-phone-error" message={errors.phone?.message}>
              <label className="text-sm font-medium text-foreground" htmlFor="signup-phone">
                {t('auth.field.phone')}
                <Input
                  aria-describedby={errors.phone ? 'signup-phone-error' : undefined}
                  aria-invalid={Boolean(errors.phone)}
                  className="mt-2"
                  id="signup-phone"
                  placeholder="+355 69 000 0000"
                  type="tel"
                  {...register('phone')}
                />
              </label>
            </FieldError>
            <FieldError
              errorId="signup-password-error"
              message={errors.password?.message}
            >
              <label className="text-sm font-medium text-foreground" htmlFor="signup-password">
                {t('auth.field.password')}
                <Input
                  aria-describedby={errors.password ? 'signup-password-error' : undefined}
                  aria-invalid={Boolean(errors.password)}
                  className="mt-2"
                  id="signup-password"
                  placeholder={t('auth.placeholder.password')}
                  type="password"
                  {...register('password')}
                />
              </label>
            </FieldError>
            <FieldError
              errorId="signup-confirm-password-error"
              message={errors.confirmPassword?.message}
            >
              <label className="text-sm font-medium text-foreground" htmlFor="signup-confirm-password">
                {t('auth.field.confirmPassword')}
                <Input
                  aria-describedby={errors.confirmPassword ? 'signup-confirm-password-error' : undefined}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  autoComplete="new-password"
                  className="mt-2"
                  id="signup-confirm-password"
                  placeholder={t('auth.placeholder.confirmPassword')}
                  type="password"
                  {...register('confirmPassword')}
                />
              </label>
            </FieldError>
          </div>

          {submitError ? (
            <p aria-live="polite" className="mt-4 text-sm text-destructive" role="alert">{submitError}</p>
          ) : null}

          <Button className="mt-7 w-full justify-between" disabled={isSubmitting} type="submit">
            {isSubmitting ? t('auth.signup.submitting') : t('auth.signup.submit')}
            <ArrowRight aria-hidden="true" size={18} />
          </Button>
        </form>
      </section>
    </main>
  )
}

function getSafeReturnTo(returnTo?: string) {
  return returnTo?.startsWith('/') && !returnTo.startsWith('//')
    ? returnTo
    : undefined
}

function FieldError({
  children,
  className,
  errorId,
  message,
}: {
  children: ReactNode
  className?: string
  errorId: string
  message?: string
}) {
  return (
    <div className={className}>
      {children}
      {message ? (
        <p className="mt-2 text-sm text-destructive" id={errorId} role="alert">{message}</p>
      ) : null}
    </div>
  )
}
