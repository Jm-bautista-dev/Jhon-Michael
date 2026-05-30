import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-9 w-16 items-center rounded-full border border-border bg-surface-muted p-1 transition-colors hover:border-border-strong dark:border-white/15 dark:bg-[#111111]"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-surface shadow-sm dark:bg-[#262626] dark:shadow-none"
        style={{ marginLeft: isDark ? 'auto' : 0 }}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-muted" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        )}
      </motion.div>
    </button>
  )
}
