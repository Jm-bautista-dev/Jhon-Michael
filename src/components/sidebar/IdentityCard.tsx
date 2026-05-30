import { motion } from 'framer-motion'
import { QrCode, Terminal } from 'lucide-react'
import type { Profile } from '../../types'
import { sidebarFloat } from '../../lib/motion'

interface IdentityCardProps {
  profile: Profile
}

export function IdentityCard({ profile }: IdentityCardProps) {
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <motion.div
      custom={0}
      initial="hidden"
      animate="visible"
      variants={sidebarFloat}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-[#111111] to-[#0a0a0a] p-5 text-white shadow-xl dark:shadow-none"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative space-y-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-400">
          <Terminal className="h-4 w-4" />
          <span>Developer ID</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Access Card
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{initials}</p>
            <p className="text-sm text-slate-300">{profile.name}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <QrCode className="h-8 w-8 text-slate-400" />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <p className="text-xs text-slate-400">Role</p>
          <p className="text-sm font-medium">{profile.title.split('·')[0].trim()}</p>
        </div>
      </div>
    </motion.div>
  )
}
