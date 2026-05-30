import { motion } from 'framer-motion'
import type { Profile } from '../../types'
import { sidebarFloat } from '../../lib/motion'
import { Card } from '../ui/Card'
import { cn } from '../../lib/cn'

interface StatsCardProps {
  profile: Profile
}

export function StatsCard({ profile }: StatsCardProps) {
  const statusColors = {
    available: 'bg-success',
    busy: 'bg-amber-500',
    open: 'bg-accent',
  }

  return (
    <motion.div custom={1} initial="hidden" animate="visible" variants={sidebarFloat}>
      <Card className="space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar}
            alt=""
            className="h-12 w-12 rounded-xl border border-border object-cover"
          />
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">{profile.name}</p>
            <p className="truncate text-xs text-muted">{profile.title}</p>
          </div>
        </div>

        <div
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium',
            'border border-success/20 bg-success-soft text-success',
          )}
        >
          <span className={cn('h-2 w-2 rounded-full', statusColors[profile.status])} />
          {profile.statusLabel}
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] leading-tight text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
