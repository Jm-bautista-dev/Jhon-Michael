import { motion } from 'framer-motion'
import type { SkillCategory } from '../../types'
import { staggerContainer } from '../../lib/motion'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'
import { SkillPill } from '../ui/SkillPill'

interface TechStackSectionProps {
  categories: SkillCategory[]
}

export function TechStackSection({ categories }: TechStackSectionProps) {
  return (
    <Card>
      <SectionHeader title="Tech Stack" actionLabel="View all" actionTo="/tech-stack" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-6"
      >
        {categories.map((cat) => (
          <motion.div key={cat.name} variants={staggerContainer}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {cat.name}
            </h3>
            <motion.div className="flex flex-wrap gap-2" variants={staggerContainer}>
              {cat.skills.map((skill, i) => (
                <SkillPill key={skill} label={skill} index={i} />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Card>
  )
}
