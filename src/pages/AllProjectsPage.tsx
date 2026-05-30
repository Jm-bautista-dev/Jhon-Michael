import { motion } from 'framer-motion'
import { useState } from 'react'
import { allProjects } from '../data/profile'
import { easeOut } from '../lib/motion'
import { ListPageShell } from '../components/layout/ListPageShell'
import { UrlTag } from '../components/ui/UrlTag'
import { ProjectModal } from '../components/projects/ProjectModal'
import type { Project } from '../types'

function chunkRows<T>(items: T[], size: number): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size))
  }
  return rows
}

export function AllProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const rows = chunkRows(allProjects, 2)

  return (
    <ListPageShell title="All Projects">
      <div className="space-y-0">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rowIndex * 0.04, duration: 0.4, ease: easeOut }}
            className="border-b border-border py-8 first:pt-0 last:border-b-0"
          >
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              {row.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group space-y-2 cursor-pointer rounded-xl border border-transparent p-4 -m-4 transition-all duration-300 hover:border-accent/15 hover:bg-surface-muted dark:hover:bg-white/5"
                >
                  <h2 className="text-lg font-bold text-foreground transition-colors group-hover:text-accent">
                    {project.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted line-clamp-2">
                    {project.description}
                  </p>
                  <div onClick={(e) => e.stopPropagation()}>
                    <UrlTag
                      url={project.displayUrl}
                      href={project.url ?? project.github}
                    />
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </ListPageShell>
  )
}
