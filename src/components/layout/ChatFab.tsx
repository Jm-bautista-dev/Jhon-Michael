import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { profile } from '../../data/profile'

export function ChatFab() {
  return (
    <motion.a
      href={`mailto:${profile.email}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.45 }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-surface shadow-lg shadow-black/10 dark:bg-white dark:text-black dark:shadow-white/10"
    >
      <MessageCircle className="h-4 w-4" />
      <span className="hidden sm:inline">Get in touch</span>
    </motion.a>
  )
}
