import { CheckCircle2, XCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { WorkitBrand } from '@/components/brand/workit-brand'
import { LanguageToggle } from '@/components/i18n/language-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useT } from '@/i18n'
import { getApiError } from '@/lib/api-error'

import { confirmEmail } from '../api/confirm-email'
import { resendConfirmation } from '../api/resend-confirmation'
import { getStoredUser } from '../utils/auth-token'
import { getDefaultAuthenticatedPath } from '../utils/user-role'

type Status = 'confirming' | 'success' | 'error'

export function ConfirmEmailPage() {
  const t = useT()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<Status>(token ? 'confirming' : 'error')
  const [errorMessage, setErrorMessage] = useState<string | null>(
    token ? null : t('auth.confirmEmail.missingToken'),
  )
  const hasRequested = useRef(false)

  useEffect(() => {
    if (!token || hasRequested.current) {
      return
    }

    hasRequested.current = true

    confirmEmail(token)
      .then(() => setStatus('success'))
      .catch((error: unknown) => {
        const apiError = getApiError(error)
        setErrorMessage(apiError?.detail ?? t('auth.confirmEmail.genericError'))
        setStatus('error')
      })
  }, [t, token])

  const storedUser = getStoredUser()
  const continuePath = storedUser ? getDefaultAuthenticatedPath(storedUser) : '/login'

  return (
    <main className="flex min-h-screen flex-col bg-background px-4 py-5 text-foreground sm:px-8 lg:px-12">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 border-b border-border pb-5">
        <Link aria-label={t('nav.workitHome')} className="focus-ring" to="/">
          <WorkitBrand />
        </Link>
        <LanguageToggle />
      </header>

      <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
        <div className="courtyard-lift courtyard-surface p-6 text-center sm:p-8">
          <h1 className="display-type text-3xl font-bold text-foreground">
            {t('auth.confirmEmail.title')}
          </h1>

          {status === 'confirming' ? (
            <p className="mt-4 text-sm text-muted-foreground" role="status">
              {t('auth.confirmEmail.confirming')}
            </p>
          ) : null}

          {status === 'success' ? (
            <div className="mt-4" role="status">
              <CheckCircle2 aria-hidden="true" className="mx-auto text-primary" size={32} />
              <p className="mt-3 text-sm text-foreground">{t('auth.confirmEmail.success')}</p>
              <Button asChild className="mt-6 w-full justify-center">
                <Link to={continuePath}>{t('auth.confirmEmail.successCta')}</Link>
              </Button>
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="mt-4">
              <XCircle aria-hidden="true" className="mx-auto text-destructive" size={32} />
              <p className="mt-3 text-sm text-destructive" role="alert">
                {errorMessage}
              </p>
              <ResendConfirmationForm />
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}

function ResendConfirmationForm() {
  const t = useT()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await resendConfirmation(email)
      setSent(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (sent) {
    return (
      <p className="mt-6 text-sm text-foreground" role="status">
        {t('auth.confirmEmail.resendSuccess')}
      </p>
    )
  }

  return (
    <form className="mt-6 space-y-3 text-left" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-foreground" htmlFor="resend-email">
        {t('auth.confirmEmail.resendLabel')}
        <Input
          className="mt-2"
          id="resend-email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </label>
      <Button className="w-full justify-center" disabled={isSubmitting} type="submit">
        {isSubmitting ? t('auth.confirmEmail.resendSubmitting') : t('auth.confirmEmail.resendSubmit')}
      </Button>
    </form>
  )
}
