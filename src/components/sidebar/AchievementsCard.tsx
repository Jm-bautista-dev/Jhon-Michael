import { motion } from 'framer-motion'
import { Award, Medal, Trophy } from 'lucide-react'
import type { Achievement } from '../../types'
import { sidebarFloat } from '../../lib/motion'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'

interface AchievementsCardProps {
  items: Achievement[]
}

const icons = {
  certification: Medal,
  award: Award,
  hackathon: Trophy,
}

export function AchievementsCard({ items }: AchievementsCardProps) {
  return (
    <motion.div custom={3} initial="hidden" animate="visible" variants={sidebarFloat}>
      <Card>
        <SectionHeader title="Highlights" actionLabel="View all" />
        <ul className="space-y-3">
          {items.map((item, i) => {
            const Icon = icons[item.type]
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                className="flex gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-surface-muted"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted">
                    {item.issuer} · {item.year}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </Card>
    </motion.div>
  )
}
