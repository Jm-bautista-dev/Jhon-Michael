import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface SectionHeaderProps {
  title: string
  actionLabel?: string
  actionTo?: string
  onAction?: () => void
  className?: string
}

export function SectionHeader({
  title,
  actionLabel,
  actionTo,
  onAction,
  className,
}: SectionHeaderProps) {
  const actionClass =
    'group inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent'

  return (
    <div className={cn('mb-4 flex items-center justify-between gap-3', className)}>
      <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
      {actionLabel &&
        (actionTo ? (
          <Link to={actionTo} className={actionClass}>
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <button type="button" onClick={onAction} className={actionClass}>
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
    </div>
  )
}
