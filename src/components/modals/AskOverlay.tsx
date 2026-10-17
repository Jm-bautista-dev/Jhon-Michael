import { useEffect, useRef, useState } from 'react'
import { soundManager } from '../../lib/sounds'

interface AskOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function AskOverlay({ isOpen, onClose }: AskOverlayProps) {
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    soundManager.play('pop')
    const timer = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.altKey) && e.code === 'KeyK') {
        e.preventDefault()
        if (isOpen) onClose()
      } else if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim().toLowerCase()
    if (!q) return

    soundManager.play('click')

    if (q.includes('stack') || q.includes('tech') || q.includes('skills')) {
      setAnswer('JM specializes in TypeScript, React, Next.js, Python, Flask, PHP, Laravel, MySQL, and Tailwind CSS with a strong focus on full-stack architecture.')
    } else if (q.includes('project') || q.includes('maki') || q.includes('work')) {
      setAnswer('Featured projects include Maki Desu (POS & Inventory with Analytics), Attendo (Full-stack Attendance System), and DANCRISM&S.')
    } else if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
      setAnswer('You can reach JM directly at jmbautistaa0428@gmail.com or via LinkedIn at linkedin.com/in/jm-bautista-842787329/')
    } else if (q.includes('experience') || q.includes('background') || q.includes('school')) {
      setAnswer('JM is an IT student at Laguna University majoring in Business Analytics, actively shipping full-stack systems and competing in cybersecurity.')
    } else if (q.includes('hackathon') || q.includes('award') || q.includes('win')) {
      setAnswer('2nd Place Winner at Cybersecurity CCSLYMPICS 2026, and DICT OpenGov Hackathon Champion 2025.')
    } else {
      setAnswer(`I heard "${query}". JM builds modern web apps, full-stack systems, and explores AI. Explore the page or email jmbautistaa0428@gmail.com!`)
    }
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-start p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-white/85 backdrop-blur-xl dark:bg-[#0c0c0f]/85"
        onClick={onClose}
      />

      <div
        className="relative z-10 flex flex-col items-start gap-6 w-full max-w-2xl pl-4 sm:pl-16 md:pl-24"
        onClick={() => inputRef.current?.focus()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer font-mono text-xs flex items-center gap-1"
        >
          [esc to close]
        </button>

        {answer && (
          <div className="relative max-w-lg rounded-2xl rounded-tl-sm bg-gray-200/90 dark:bg-white/10 p-3.5 text-black dark:text-white font-mono text-[13px] leading-relaxed animate-fade-in shadow-sm">
            {answer}
          </div>
        )}

        <div className="flex items-center gap-3">
          <h2 className="font-pixel text-2xl sm:text-4xl text-black dark:text-white tracking-tight">
            what do you want to ask?
          </h2>
        </div>

        <form onSubmit={handleSearch} className="w-full flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ask about stack, projects, contact, experience…"
            className="w-full bg-transparent border-b border-gray-300 dark:border-white/20 pb-2 font-mono text-base sm:text-lg text-black dark:text-white outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="shrink-0 font-mono text-xs text-gray-500 hover:text-black dark:hover:text-white px-2 py-1"
          >
            ask ↵
          </button>
        </form>

        <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-400">
          <span>Suggestions:</span>
          {['stack', 'projects', 'experience', 'awards', 'email'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setQuery(suggestion)
                soundManager.play('click')
              }}
              className="underline hover:text-black dark:hover:text-white cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
