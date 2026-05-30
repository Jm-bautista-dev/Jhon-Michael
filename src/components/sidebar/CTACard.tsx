import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Download, Handshake } from 'lucide-react'
import type { Profile } from '../../types'
import { sidebarFloat } from '../../lib/motion'
import { cn } from '../../lib/cn'

interface CTACardProps {
  profile: Profile
}

const links = [
  { label: 'Hire Me', href: 'mailto:', icon: Handshake, primary: true },
  { label: 'Schedule a Call', hrefKey: 'calendlyUrl' as const, icon: Calendar },
  { label: 'Download Resume', hrefKey: 'cvUrl' as const, icon: Download },
]

export function CTACard({ profile }: CTACardProps) {
  return (
    <motion.div custom={4} initial="hidden" animate="visible" variants={sidebarFloat}>
      <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent-soft to-surface p-5 shadow-sm">
        <p className="mb-1 text-sm font-semibold text-foreground">Let&apos;s work together</p>
        <p className="mb-4 text-xs text-muted">
          Available for full-time roles, contract sprints, and technical advisory.
        </p>
        <div className="space-y-2">
          {links.map((link) => {
            const href =
              link.href ??
              (link.hrefKey === 'calendlyUrl' ? profile.calendlyUrl : profile.cvUrl)
            const Icon = link.icon
            const isMail = link.primary

            return (
              <motion.a
                key={link.label}
                href={isMail ? `mailto:${profile.email}` : href}
                whileHover={{ x: 2 }}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  link.primary
                    ? 'bg-foreground text-surface hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90'
                    : 'border border-border bg-surface text-foreground hover:border-accent/30 hover:bg-surface-muted',
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {link.label}
                </span>
                <ArrowRight className="h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
