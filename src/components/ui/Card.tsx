import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export function Card({ children, className, hover = false, glass = false }: CardProps) {
  const Comp = hover ? motion.div : 'div'
  const hoverProps = hover
    ? {
        whileHover: { y: -2 },
        transition: { duration: 0.2 },
      }
    : {}

  return (
    <Comp
      className={cn(
        'rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm md:p-5',
        'dark:shadow-none dark:ring-1 dark:ring-white/5',
        glass && 'glass',
        hover && 'cursor-default transition-shadow hover:shadow-md',
        className,
      )}
      {...hoverProps}
    >
      {children}
    </Comp>
  )
}
