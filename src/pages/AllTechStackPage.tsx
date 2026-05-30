import { motion } from 'framer-motion'
import { allSkillCategories } from '../data/profile'
import { easeOut } from '../lib/motion'
import { ListPageShell } from '../components/layout/ListPageShell'
import { StackBadge } from '../components/ui/StackBadge'

export function AllTechStackPage() {
  return (
    <ListPageShell title="Tech Stack">
      <div className="space-y-10">
        {allSkillCategories.map((category, i) => (
          <motion.section
            key={category.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: easeOut }}
          >
            <h2 className="mb-4 text-lg font-bold text-foreground">{category.name}</h2>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <StackBadge key={skill} label={skill} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </ListPageShell>
  )
}
