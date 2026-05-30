import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
  icon?: ReactNode
  href?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-foreground text-surface hover:bg-foreground/90 shadow-sm dark:bg-white dark:text-black dark:hover:bg-white/90',
  secondary:
    'bg-accent text-white hover:bg-accent/90 shadow-sm shadow-accent/20',
  ghost:
    'bg-transparent text-foreground hover:bg-surface-muted dark:hover:bg-white/5',
  outline:
    'border border-border-strong bg-transparent text-foreground hover:bg-surface-muted dark:border-white/20 dark:bg-transparent dark:hover:bg-white/5',
}

export function Button({
  variant = 'outline',
  children,
  icon,
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
    variants[variant],
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {icon}
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {icon}
      {children}
    </button>
  )
}
