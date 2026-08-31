import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { ThemeContext, type Theme, type ThemeContextValue } from './theme-context'

const themeStorageKey = 'workit.theme'

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark',
        ),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey)

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return 'light'
}
