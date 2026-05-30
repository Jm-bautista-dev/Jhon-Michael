import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface PageShellProps {
  children: ReactNode
  className?: string
}

/** Centered, slightly narrow content column (~60–65% feel on desktop). */
export function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[58rem] px-5 py-7 md:px-8 md:py-9',
        className,
      )}
    >
      {children}
    </div>
  )
}
