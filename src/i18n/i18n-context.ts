import { createContext, useContext } from 'react'

import type { Language } from './config'
import type { TranslationKey } from './translations'

export type Translate = (
  key: TranslationKey,
  vars?: Record<string, string | number>,
) => string

export type I18nContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: Translate
}

export const I18nContext = createContext<I18nContextValue | null>(null)

export function useI18n() {
  const value = useContext(I18nContext)

  if (!value) {
    throw new Error('useI18n must be used inside I18nProvider')
  }

  return value
}

/** Shorthand for components that only need the translate function. */
export function useT(): Translate {
  return useI18n().t
}
