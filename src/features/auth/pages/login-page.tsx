import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, LogIn } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { WorkitBrand } from '@/components/brand/workit-brand'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme/theme-toggle'

import { login } from '../api/login'
import type { AuthRedirectState } from '../components/protected-route'
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema'
import { setAuthSession } from '../utils/auth-token'
import { getDefaultAuthenticatedPath } from '../utils/user-role'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectState = location.state as AuthRedirectState | null
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function submitLogin(values: LoginFormValues) {
    setSubmitError(null)

    try {
      const response = await login(values)
      setAuthSession(response.accessToken, response.user)
      navigate(
        getSafeReturnTo(redirectState?.returnTo) ??
          getDefaultAuthenticatedPath(response.user),
        { replace: true },
      )
    } catch {
      setSubmitError('Unable to sign in with those credentials.')
    }
  }

  return (
    <main className="grid min-h-screen bg-background text-foreground lg:grid-cols-[0.82fr_1.18fr]">
      <section className="hidden min-h-screen flex-col justify-between bg-accent p-12 text-accent-foreground lg:flex xl:p-16">
        <Link aria-label="Workit home" className="focus-ring w-fit" to="/">
          <WorkitBrand inverse />
        </Link>
        <div>
          <h2 className="display-type max-w-[8ch] text-7xl font-bold leading-[0.88]">
            Pick up where work left off.
          </h2>
          <p className="mt-7 max-w-[44ch] text-lg leading-8 text-accent-foreground">
            One sign-in opens the workspace that matches your role—job discovery for workers and job publishing for businesses.
          </p>
        </div>
        <p className="border-t border-accent-foreground/25 pt-5 text-sm text-accent-foreground">
          Role, place, schedule, and pay stay visible throughout Workit.
        </p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-5 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex items-center justify-between">
          <Link aria-label="Workit home" className="focus-ring lg:hidden" to="/">
            <WorkitBrand />
          </Link>
          <Link className="focus-ring hidden items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground lg:inline-flex" to="/">
            <ArrowLeft aria-hidden="true" size={17} />
            Back to Workit
          </Link>
          <ThemeToggle />
        </div>

        <div className="my-auto w-full max-w-xl py-12">
          <h1 className="display-type text-5xl font-bold leading-none sm:text-6xl">
            Sign in.
          </h1>
          <p className="mt-4 max-w-[54ch] text-base leading-7 text-muted-foreground">
            Enter your details to continue to the worker or business workspace.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            New to Workit?{' '}
            <Link className="font-semibold text-primary underline decoration-2 underline-offset-4" state={redirectState} to="/signup">
              Create an account
            </Link>
          </p>

          <form className="courtyard-surface mt-8 space-y-5 p-6 sm:p-8" onSubmit={handleSubmit(submitLogin)}>
          <label className="block text-sm font-medium text-foreground" htmlFor="login-email">
            Email
            <Input
              aria-describedby={errors.email ? 'login-email-error' : undefined}
              aria-invalid={Boolean(errors.email)}
              className="mt-2"
              id="login-email"
              placeholder="you@example.com"
              type="email"
              {...register('email')}
            />
          </label>
          {errors.email ? (
            <p className="text-sm text-destructive" id="login-email-error" role="alert">{errors.email.message}</p>
          ) : null}

          <label className="block text-sm font-medium text-foreground" htmlFor="login-password">
            Password
            <Input
              aria-describedby={errors.password ? 'login-password-error' : undefined}
              aria-invalid={Boolean(errors.password)}
              className="mt-2"
              id="login-password"
              placeholder="Minimum 8 characters"
              type="password"
              {...register('password')}
            />
          </label>
          {errors.password ? (
            <p className="text-sm text-destructive" id="login-password-error" role="alert">
              {errors.password.message}
            </p>
          ) : null}
          {submitError ? (
            <p aria-live="polite" className="text-sm text-destructive" role="alert">{submitError}</p>
          ) : null}

          <Button className="w-full justify-between" disabled={isSubmitting} type="submit">
            <LogIn aria-hidden="true" size={18} />
            <span className="flex-1 text-left">{isSubmitting ? 'Signing in…' : 'Sign in'}</span>
            <ArrowRight aria-hidden="true" size={18} />
          </Button>
          </form>
        </div>
      </section>
    </main>
  )
}

function getSafeReturnTo(returnTo?: string) {
  return returnTo?.startsWith('/') && !returnTo.startsWith('//')
    ? returnTo
    : undefined
}
