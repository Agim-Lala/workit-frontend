import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/app/providers/theme-context'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-xl"
      onClick={toggleTheme}
      size="icon"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
      variant="secondary"
    >
      {isDark ? (
        <Sun aria-hidden="true" size={18} />
      ) : (
        <Moon aria-hidden="true" size={18} />
      )}
    </Button>
  )
}
