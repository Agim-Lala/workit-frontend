import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useT } from '@/i18n'

import { resendConfirmation } from '../api/resend-confirmation'
import type { AuthUser } from '../types/auth.types'

export function EmailConfirmationBanner({ user }: { user: AuthUser }) {
  const t = useT()
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleResend() {
    setState('sending')

    try {
      await resendConfirmation(user.email)
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="border-b border-border bg-peach px-4 py-2.5 text-sm text-foreground lg:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2">
        <p>
          {state === 'sent' ? t('auth.emailBanner.resendSuccess') : t('auth.emailBanner.message')}
          {state === 'error' ? (
            <span className="ml-2 text-destructive">{t('auth.emailBanner.resendError')}</span>
          ) : null}
        </p>
        {state === 'sent' ? null : (
          <Button
            disabled={state === 'sending'}
            onClick={handleResend}
            size="sm"
            type="button"
            variant="secondary"
          >
            {t('auth.emailBanner.resend')}
          </Button>
        )}
      </div>
    </div>
  )
}
