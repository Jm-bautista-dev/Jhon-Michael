import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { Certification, Recommendation } from '../../types'
import { easeOut } from '../../lib/motion'
import { CertificationModal } from '../certifications/CertificationModal'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'
import { UrlTag } from '../ui/UrlTag'
import { cn } from '../../lib/cn'

interface CertificationsRecommendationsProps {
  certifications: Certification[]
  recommendations: Recommendation[]
}

export function CertificationsRecommendations({
  certifications,
  recommendations,
}: CertificationsRecommendationsProps) {
  const [activeRec, setActiveRec] = useState(0)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const recentCerts = certifications.slice(0, 4)
  const current = recommendations[activeRec]

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col">
          <SectionHeader
            title="Recent Certifications"
            actionLabel="View all"
            actionTo="/certifications"
          />
          <ul className="divide-y divide-border flex-1">
            {recentCerts.map((cert, i) => (
              <motion.li
                key={cert.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35, ease: easeOut }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className={cn(
                    'group flex w-full items-center justify-between gap-3 py-3 text-left transition-colors',
                    'first:pt-0 last:pb-0',
                    'rounded-lg hover:bg-surface-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
                  )}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground transition-colors group-hover:text-accent">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      {cert.issuer} · {cert.date}
                    </p>
                    {cert.credentialId && (
                      <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                        <UrlTag url={cert.credentialId} />
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </button>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card className="flex flex-col">
          <SectionHeader title="Recommendations" />
          <div className="flex flex-1 flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="flex-1"
              >
                <p className="font-sans text-[18px] md:text-[21px] leading-relaxed text-foreground italic">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="mt-4 border-t border-border pt-3">
                  <p className="font-semibold text-foreground">{current.author}</p>
                  <p className="text-sm text-muted">
                    {current.role} at {current.company}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-4 flex items-center justify-center gap-2">
              {recommendations.map((rec, i) => (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => setActiveRec(i)}
                  aria-label={`Show recommendation from ${rec.author}`}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === activeRec ? 'w-6 bg-foreground' : 'w-2 bg-border-strong hover:bg-muted',
                  )}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>

      <CertificationModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  )
}
