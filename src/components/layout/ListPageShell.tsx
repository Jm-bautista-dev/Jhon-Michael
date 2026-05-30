import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeIn } from '../../lib/motion'
import { BackLink } from '../ui/BackLink'
import { ThemeToggle } from './ThemeToggle'
import { ChatFab } from './ChatFab'
import { PageShell } from './PageShell'

interface ListPageShellProps {
  title: string
  children: ReactNode
}

export function ListPageShell({ title, children }: ListPageShellProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-svh bg-surface-muted"
    >
      <PageShell className="md:py-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <BackLink />
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
          </div>
          <ThemeToggle />
        </div>

        {children}
      </PageShell>

      <ChatFab />
    </motion.div>
  )
}
