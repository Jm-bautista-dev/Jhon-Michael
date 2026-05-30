import { cn } from '../../lib/cn'

interface StackBadgeProps {
  label: string
  className?: string
}

export function StackBadge({ label, className }: StackBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-surface px-3 py-1',
        'text-sm font-normal text-foreground transition-colors hover:border-border-strong hover:bg-surface-muted',
        'dark:border-white/10 dark:bg-[#141414] dark:hover:border-white/20 dark:hover:bg-white/5',
        className,
      )}
    >
      {label}
    </span>
  )
}
