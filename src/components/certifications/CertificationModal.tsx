import { AnimatePresence, motion } from 'framer-motion'
import {
  Award,
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  Sparkles,
  X,
} from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Certification } from '../../types'
import { easeOut } from '../../lib/motion'
import { modalVariants, overlayVariants } from '../../lib/modal'
import { useScrollLock } from '../../hooks/useScrollLock'
import { UrlTag } from '../ui/UrlTag'
import { CertificatePreview } from './CertificatePreview'

interface CertificationModalProps {
  certification: Certification | null
  onClose: () => void
}

const panelVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.06, duration: 0.4, ease: easeOut },
  }),
}

export function CertificationModal({ certification, onClose }: CertificationModalProps) {
  const isOpen = certification !== null
  useScrollLock(isOpen)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  const handleDownload = () => {
    if (!certification?.pdf) return
    const link = document.createElement('a')
    link.href = certification.pdf
    link.download = `${certification.title.replace(/\s+/g, '-').toLowerCase()}.pdf`
    link.target = '_blank'
    link.rel = 'noreferrer'
    link.click()
  }

  return createPortal(
    <AnimatePresence>
      {certification && (
        <motion.div
          key={certification.id}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <motion.button
            type="button"
            aria-label="Close certificate viewer"
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111111] dark:shadow-none md:rounded-3xl"
            style={{
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.08), 0 25px 50px -12px rgba(0,0,0,0.25), 0 0 80px -20px var(--color-accent-glow)',
            }}
          >
            <header className="flex shrink-0 flex-wrap items-start justify-between gap-3 border-b border-border/80 px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {certification.category}
                </p>
                <h2
                  id="cert-modal-title"
                  className="mt-1 text-lg font-bold leading-snug text-foreground sm:text-xl"
                >
                  {certification.title}
                </h2>
                <p className="mt-0.5 text-sm text-muted">
                  {certification.issuer} · Completed {certification.date}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-xl border border-border bg-surface p-2 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </header>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
              <motion.aside
                custom={0}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                className="order-1 flex w-full shrink-0 flex-col gap-5 overflow-y-auto border-b border-border/80 p-4 sm:p-6 lg:order-none lg:w-[300px] lg:max-h-full lg:border-b-0 lg:border-r xl:w-[340px]"
              >
                <div className="space-y-5">
                  <div className="rounded-xl border border-border bg-accent-soft/50 p-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                      <Award className="h-3.5 w-3.5" />
                      About this certificate
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">
                      {certification.summary}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                      <BookOpen className="h-3.5 w-3.5" />
                      Issuing organization
                    </p>
                    <p className="text-sm font-medium text-foreground">{certification.issuer}</p>
                  </div>

                  <div>
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                      <Calendar className="h-3.5 w-3.5" />
                      Year completed
                    </p>
                    <p className="text-sm text-foreground">{certification.year}</p>
                  </div>

                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                      <Sparkles className="h-3.5 w-3.5" />
                      Skills & topics covered
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {certification.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-border bg-surface px-2 py-0.5 text-xs font-medium text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {certification.credentialId && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                        Credential ID
                      </p>
                      <UrlTag url={certification.credentialId} />
                    </div>
                  )}

                  <a
                    href={certification.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-surface-muted"
                  >
                    Open full PDF in new tab
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.aside>

              <motion.div
                custom={1}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                className="order-2 min-h-0 flex-1 overflow-auto p-4 sm:p-6 lg:order-none"
              >
                <CertificatePreview certification={certification} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
