import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { ThemeProvider } from '@/app/providers/theme-provider'
import { queryClient } from '@/lib/react-query'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
