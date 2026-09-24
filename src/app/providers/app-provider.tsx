import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { I18nProvider } from '@/i18n'
import { queryClient } from '@/lib/react-query'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nProvider>
  )
}
