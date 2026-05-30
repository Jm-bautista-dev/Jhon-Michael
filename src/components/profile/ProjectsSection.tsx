import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../../types'
import { ProjectModal } from '../projects/ProjectModal'
import { ProjectCard } from './ProjectCard'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <Card className="!p-0 overflow-hidden">
        <div className="border-b border-border px-5 py-4 md:px-6">
          <SectionHeader
            title="Recent Projects"
            actionLabel="View all"
            actionTo="/projects"
            className="mb-0"
          />
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
        <div className="border-t border-border px-5 py-4 md:px-6">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Link
              to="/projects"
              className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent/20 transition-colors hover:bg-accent/90 sm:w-auto"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </Card>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
