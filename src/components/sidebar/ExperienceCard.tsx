import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Experience } from '../../types'
import { easeOut, sidebarFloat } from '../../lib/motion'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'
import { cn } from '../../lib/cn'

interface ExperienceCardProps {
  items: Experience[]
}

function ExperienceItem({ item, isLast }: { item: Experience; isLast: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative flex gap-3 pb-5 last:pb-0">
      {!isLast && (
        <span className="absolute left-[11px] top-7 bottom-0 w-px bg-border" aria-hidden />
      )}
      <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-surface-muted">
        <span className="h-2 w-2 rounded-sm bg-accent/80" />
      </div>

      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => item.summary && setOpen((o) => !o)}
          className={cn(
            'flex w-full items-start justify-between gap-2 text-left',
            item.summary && 'cursor-pointer',
          )}
        >
          <div>
            <p className="text-sm font-semibold text-foreground">{item.role}</p>
            <p className="text-sm text-muted">{item.company}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-xs text-muted">{item.year}</span>
            {item.summary && (
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-muted transition-transform',
                  open && 'rotate-180',
                )}
              />
            )}
          </div>
        </button>

        <AnimatePresence>
          {open && item.summary && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="overflow-hidden pt-2 text-xs leading-relaxed text-muted"
            >
              {item.summary}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function ExperienceCard({ items }: ExperienceCardProps) {
  return (
    <motion.div custom={2} initial="hidden" animate="visible" variants={sidebarFloat}>
      <Card>
        <SectionHeader title="Experience" />
        <div className="mt-1">
          {items.map((item, i) => (
            <ExperienceItem key={item.id} item={item} isLast={i === items.length - 1} />
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
