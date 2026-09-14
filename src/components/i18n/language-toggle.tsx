import { languageLabels, languageNames, languages, useI18n, useT } from '@/i18n'
import { cn } from '@/lib/utils'

export function LanguageToggle() {
  const t = useT()
  const { language, setLanguage } = useI18n()

  return (
    <div
      aria-label={t('nav.selectLanguage')}
      className="inline-flex overflow-hidden rounded-xl border border-border"
      role="group"
    >
      {languages.map((code) => {
        const isActive = language === code

        return (
          <button
            aria-label={languageNames[code]}
            aria-pressed={isActive}
            className={cn(
              'focus-ring min-h-11 min-w-11 px-2 text-xs font-bold transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
            key={code}
            onClick={() => setLanguage(code)}
            type="button"
          >
            {languageLabels[code]}
          </button>
        )
      })}
    </div>
  )
}
