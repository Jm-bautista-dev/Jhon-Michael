import { ArrowLeft } from 'lucide-react'
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
        'group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground',
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      Back to Home
    </Link>
  )
}
