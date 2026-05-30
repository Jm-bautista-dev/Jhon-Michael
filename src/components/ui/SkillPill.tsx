import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface SkillPillProps {
  label: string
  index?: number
}

export function SkillPill({ label, index = 0 }: SkillPillProps) {
  return (
    <motion.span
      custom={index}
      variants={{
        hidden: { opacity: 0, scale: 0.92 },
        visible: (i: number) => ({
          opacity: 1,
          scale: 1,
          transition: { delay: i * 0.02, duration: 0.35 },
        }),
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: '0 0 20px -4px var(--color-accent-glow)',
      }}
      className={cn(
        'inline-flex cursor-default items-center rounded-full border border-border bg-surface px-3 py-1.5',
        'text-sm font-medium text-foreground transition-colors duration-200',
        'hover:border-accent/40 hover:bg-accent-soft hover:text-accent',
        'dark:border-white/10 dark:bg-[#141414] dark:hover:border-white/25 dark:hover:bg-white/5 dark:hover:text-white',
      )}
    >
      {label}
    </motion.span>
  )
}
