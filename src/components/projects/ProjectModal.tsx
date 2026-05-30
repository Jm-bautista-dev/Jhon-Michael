import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Code2, GitCommit, ListChecks, Star, X } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project, ProjectStatus } from '../../types'
import { easeOut } from '../../lib/motion'
import { modalVariants, overlayVariants } from '../../lib/modal'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/cn'
import { ProjectMediaCarousel } from './ProjectMediaCarousel'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const statusStyles: Record<ProjectStatus, string> = {
  completed: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  'in-progress': 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  archived: 'bg-muted/20 text-muted',
}

const statusLabel: Record<ProjectStatus, string> = {
  completed: 'COMPLETED',
  'in-progress': 'IN PROGRESS',
  archived: 'ARCHIVED',
}

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.05, duration: 0.4, ease: easeOut },
  }),
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const isOpen = project !== null
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

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.button
            type="button"
            aria-label="Close project details"
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
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111111] dark:shadow-none md:max-w-4xl md:rounded-3xl"
            style={{
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.06), 0 25px 60px -12px rgba(0,0,0,0.35)',
            }}
          >
            <div className="relative shrink-0">
              <ProjectMediaCarousel images={project.images} alt={project.name} autoPlay={!project.url} />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 rounded-full border border-white/25 bg-black/40 p-2 text-white backdrop-blur transition-colors hover:bg-black/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <motion.div
                custom={0}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="border-b border-border px-5 py-5 sm:px-8 sm:py-6"
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide',
                      statusStyles[project.status],
                    )}
                  >
                    {statusLabel[project.status]}
                  </span>
                  <span className="text-xs font-medium tracking-wide text-muted">
                    {project.typeLabel} · {project.year}
                  </span>
                  {!project.url && (
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-accent font-sans">
                      Localhost Images
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  {project.category}
                </p>
                <h2
                  id="project-modal-title"
                  className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {project.name}
                </h2>
                <p className="mt-2 font-serif text-base italic text-muted sm:text-lg">
                  &ldquo;{project.tagline}&rdquo;
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-7">
                  {project.longDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-surface transition-opacity hover:opacity-90"
                    >
                      Visit live site
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {!project.url && project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-sm shadow-accent/20"
                    >
                      View live site
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
                    >
                      <Code2 className="h-4 w-4" />
                      View repository
                    </a>
                  )}
                </div>
              </motion.div>

              <motion.div
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 px-5 py-6 sm:px-8 md:grid-cols-2"
              >
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                    <ListChecks className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1.5 h-1 w-3 shrink-0 rounded-sm bg-emerald-500" />
                        <span className="uppercase tracking-wide">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.repoStats && (
                    <div>
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
                        Repository Stats
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <GitCommit className="h-4 w-4" />
                          {project.repoStats.commits} commits
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Star className="h-4 w-4" />
                          {project.repoStats.stars} stars
                        </span>
                      </div>
                      <div className="mt-3 flex h-2 overflow-hidden rounded-full">
                        {project.repoStats.languages.map((lang) => (
                          <div
                            key={lang.name}
                            style={{
                              width: `${lang.percent}%`,
                              backgroundColor: lang.color,
                            }}
                            title={`${lang.name} ${lang.percent}%`}
                          />
                        ))}
                      </div>
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                        {project.repoStats.languages.map((lang) => (
                          <li
                            key={lang.name}
                            className="flex items-center gap-1.5 text-xs text-muted"
                          >
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: lang.color }}
                            />
                            {lang.name} {lang.percent}%
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
