import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeIn } from '../../lib/motion'
import { BackLink } from '../ui/BackLink'
import { HalftoneBackdrop } from './HalftoneBackdrop'

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
      className="relative min-h-screen bg-white text-black dark:bg-[#0c0c0f] dark:text-white"
    >
      <HalftoneBackdrop />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10 flex items-start justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
          <div className="space-y-3">
            <BackLink />
            <h1 className="font-pixel text-2xl tracking-tight text-black dark:text-white md:text-3xl">
              {title}
            </h1>
          </div>
        </div>

        {children}
      </div>
    </motion.div>
  )
}
