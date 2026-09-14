import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import {
  defaultLanguage,
  getLanguage,
  persistLanguage,
  type Language,
} from './config'
import { I18nContext, type I18nContextValue, type Translate } from './i18n-context'
import { dictionaries } from './translations'

type I18nProviderProps = {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(getLanguage)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    persistLanguage(next)
    setLanguageState(next)
  }, [])

  const t = useMemo<Translate>(() => {
    const table = dictionaries[language] ?? dictionaries[defaultLanguage]

    return (key, vars) => {
      let text = table[key] ?? dictionaries[defaultLanguage][key] ?? key

      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          text = text.split(`{${name}}`).join(String(value))
        }
      }

      return text
    }
  }, [language])

  const value = useMemo<I18nContextValue>(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
