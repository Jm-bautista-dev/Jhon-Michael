import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface BackLinkProps {
  className?: string
}

export function BackLink({ className }: BackLinkProps) {
  return (
    <Link
      to="/"
      className={cn(
        'group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors',
        className,
      )}
    >
      <span>←</span>
      <span>back to profile</span>
    </Link>
  )
}
