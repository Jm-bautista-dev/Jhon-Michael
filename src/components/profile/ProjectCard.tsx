import { motion } from 'framer-motion'
import { ArrowUpRight, Code2 } from 'lucide-react'
import type { Project } from '../../types'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'

interface ProjectCardProps {
  project: Project
  index: number
  onSelect: (project: Project) => void
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: easeOut }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => onSelect(project)}
      className={cn(
        'group relative flex w-full flex-col rounded-2xl border border-border bg-surface p-5 text-left',
        'transition-shadow duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5',
        'dark:shadow-none dark:hover:shadow-none dark:hover:border-white/20 dark:ring-1 dark:ring-white/5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-foreground transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <div className="flex shrink-0 gap-1">
          {project.github && (
            <span
              role="link"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.github, '_blank', 'noreferrer')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation()
                  window.open(project.github, '_blank', 'noreferrer')
                }
              }}
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              aria-label="GitHub repository"
            >
              <Code2 className="h-4 w-4" />
            </span>
          )}
          {project.url && (
            <span
              role="link"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.url, '_blank', 'noreferrer')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation()
                  window.open(project.url, '_blank', 'noreferrer')
                }
              }}
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              aria-label="Live demo"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-surface-muted px-2 py-0.5 text-xs font-medium text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  )
}
