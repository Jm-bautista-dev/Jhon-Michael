import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'
import { fadeUp, staggerContainer } from '../../lib/motion'

interface AboutSectionProps {
  paragraphs: string[]
}

export function AboutSection({ paragraphs }: AboutSectionProps) {
  return (
    <Card>
      <SectionHeader title="About" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-4"
      >
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={fadeUp}
            className="text-left text-sm leading-relaxed text-muted md:text-[15px] md:leading-7"
          >
            {p}
          </motion.p>
        ))}
      </motion.div>
    </Card>
  )
}
