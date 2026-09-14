export const languages = ['en', 'sq'] as const

export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'en'

const languageStorageKey = 'workit.lang'

/** Short label for the switcher. */
export const languageLabels: Record<Language, string> = {
  en: 'EN',
  sq: 'SQ',
}

/** Endonym, for accessible names. */
export const languageNames: Record<Language, string> = {
  en: 'English',
  sq: 'Shqip',
}

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (languages as readonly string[]).includes(value)
}

// Kept in a module variable so non-React code (the axios interceptor) can read
// the active language without the context. The provider is the only writer.
let currentLanguage: Language = readInitialLanguage()

export function getLanguage(): Language {
  return currentLanguage
}

export function persistLanguage(language: Language): void {
  currentLanguage = language

  try {
    window.localStorage.setItem(languageStorageKey, language)
  } catch {
    // Ignore storage failures (private mode, disabled cookies).
  }
}

function readInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return defaultLanguage
  }

  try {
    const stored = window.localStorage.getItem(languageStorageKey)

    if (isLanguage(stored)) {
      return stored
    }
  } catch {
    // Ignore and fall back to the browser preference.
  }

  const browserLanguage =
    typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : ''

  return browserLanguage.startsWith('sq') ? 'sq' : defaultLanguage
}
