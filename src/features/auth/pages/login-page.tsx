import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { login } from '../api/login'
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema'
import { setAccessToken } from '../utils/auth-token'

export function LoginPage() {
  const navigate = useNavigate()
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
      setAccessToken(response.accessToken)
      navigate('/jobs')
    } catch {
      setSubmitError('Unable to sign in with those credentials.')
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <section className="w-full max-w-md rounded-md border border-border bg-white p-6 shadow-sm">
        <Link className="text-sm font-medium text-primary" to="/jobs">
          Workit
        </Link>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use one account for worker and business workflows.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(submitLogin)}>
          <label className="block text-sm font-medium text-foreground">
            Email
            <Input
              className="mt-2"
              placeholder="you@example.com"
              type="email"
              {...register('email')}
            />
          </label>
          {errors.email ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}

          <label className="block text-sm font-medium text-foreground">
            Password
            <Input
              className="mt-2"
              placeholder="Minimum 8 characters"
              type="password"
              {...register('password')}
            />
          </label>
          {errors.password ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : null}
          {submitError ? (
            <p className="text-sm text-destructive">{submitError}</p>
          ) : null}

          <Button className="w-full" disabled={isSubmitting} type="submit">
            <LogIn aria-hidden="true" size={18} />
            Sign in
          </Button>
        </form>
      </section>
    </main>
  )
}
