import { useState } from 'react'
import { soundManager } from '../../lib/sounds'

interface SidebarProps {
  onOpenAsk: () => void
  onOpenTyping: () => void
  onOpenChat: () => void
  onOpenEmail: () => void
  onOpenGear: () => void
  onOpenCollabs?: () => void
  onOpenConsulting?: () => void
  onOpenResources?: () => void
  email: string
}

export function Sidebar({
  onOpenAsk,
  onOpenTyping,
  onOpenChat,
  onOpenEmail,
  onOpenGear,
  onOpenCollabs,
  onOpenConsulting,
  onOpenResources,
  email,
}: SidebarProps) {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('theme') as 'system' | 'light' | 'dark') || 'system'
    } catch (e) {
      void e
      return 'system'
    }
  })
  const [soundEnabled, setSoundEnabled] = useState(() => soundManager.isEnabled())

  const handleSetTheme = (newTheme: 'system' | 'light' | 'dark') => {
    soundManager.play('toggle')
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (e) {
      void e
    }

    const root = document.documentElement
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const isDark = newTheme === 'dark' || (newTheme === 'system' && mq.matches)
    root.classList.toggle('dark', isDark)
  }

  const handleToggleSound = () => {
    const next = soundManager.toggle()
    setSoundEnabled(next)
  }

  const scrollTo = (id: string) => {
    soundManager.play('click')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      data-guide="sidebar"
      className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r border-gray-200 bg-white px-7 py-8 lg:flex dark:border-white/10 dark:bg-[#0c0c0f]"
    >
      {/* Brand logo */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className="shrink-0 font-pixel text-[15px] leading-none text-black hover:opacity-60 dark:text-white"
      >
        Jhon Michael
      </a>

      {/* Nav Menu */}
      <div className="mt-9 flex flex-1 flex-col gap-4 overflow-y-auto font-mono text-[13px]">
        {/* Group 1 */}
        <div className="flex flex-col gap-2.5">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('projects')
            }}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[1.15em] w-[1.15em] shrink-0">
              <path d="M6 8h12l-1 11a2 2 0 01-2 2H9a2 2 0 01-2-2L6 8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9 8V6.5a3 3 0 016 0V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Featured
          </a>

          <a
            href="#blog"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('blog')
            }}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[1.15em] w-[1.15em] shrink-0">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Blog
          </a>

          <button
            type="button"
            onClick={onOpenGear}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[1.15em] w-[1.15em] shrink-0">
              <rect x="5" y="5" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 19h18M9.5 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Gear
          </button>

          <button
            type="button"
            onClick={onOpenResources || (() => scrollTo('certifications'))}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[1.15em] w-[1.15em] shrink-0">
              <path d="M4 5.5A1.5 1.5 0 015.5 4H11v15.5H6a2 2 0 00-2 1.2V5.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M20 5.5A1.5 1.5 0 0018.5 4H13v15.5h5a2 2 0 012 1.2V5.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            Resources
          </button>
        </div>

        <div className="h-px bg-gray-200 dark:bg-white/10" />

        {/* Group 2 */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onOpenCollabs || (() => scrollTo('affiliations'))}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[1.15em] w-[1.15em] shrink-0">
              <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M16 6.2a3 3 0 010 5.6M17 19c0-2.2-.8-3.8-2.1-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Collabs
          </button>

          <button
            type="button"
            onClick={onOpenConsulting || onOpenEmail}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[1.15em] w-[1.15em] shrink-0">
              <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7M3 12.5h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Consulting
          </button>
        </div>

        <div className="h-px bg-gray-200 dark:bg-white/10" />

        {/* Group 3 */}
        <div className="flex flex-col gap-2.5">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('projects')
            }}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('experience')
            }}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Experience
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('experience')
            }}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Stack
          </a>
          <a
            href="#certifications"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('certifications')
            }}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Certifications
          </a>
          <a
            href="#recommendations"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('recommendations')
            }}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Recommendations
          </a>
          <a
            href="#affiliations"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('affiliations')
            }}
            className="relative inline-flex w-fit items-center gap-2.5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Affiliations
          </a>
        </div>
      </div>

      {/* Ask anything button */}
      <button
        type="button"
        onClick={onOpenAsk}
        className="mt-6 inline-flex w-fit items-center gap-2 text-[12px] text-gray-400 hover:text-black dark:hover:text-white cursor-pointer transition-colors"
      >
        <span>Ask anything</span>
        <span className="inline-flex items-center gap-1">
          <kbd className="rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] leading-none text-gray-500 dark:border-white/20 dark:bg-white/10 dark:text-gray-300">
            ⌘
          </kbd>
          <span className="font-mono text-[10px] text-gray-400">+</span>
          <kbd className="rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] leading-none text-gray-500 dark:border-white/20 dark:bg-white/10 dark:text-gray-300">
            K
          </kbd>
        </span>
      </button>

      {/* Typing test button */}
      <button
        type="button"
        onClick={onOpenTyping}
        className="mt-2.5 inline-flex w-fit items-center gap-2 text-[12px] text-gray-400 hover:text-black dark:hover:text-white cursor-pointer transition-colors"
      >
        <span>Typing test</span>
        <span className="inline-flex items-center gap-1">
          <kbd className="rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] leading-none text-gray-500 dark:border-white/20 dark:bg-white/10 dark:text-gray-300">
            ⌘
          </kbd>
          <span className="font-mono text-[10px] text-gray-400">+</span>
          <kbd className="rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] leading-none text-gray-500 dark:border-white/20 dark:bg-white/10 dark:text-gray-300">
            J
          </kbd>
        </span>
      </button>

      {/* Live Presence Box */}
      <div className="mt-4 border-y border-gray-200 dark:border-white/10 py-3.5">
        <span className="inline-flex items-center">
          <img
            className="presence-avatar"
            alt=""
            src="https://api.dicebear.com/9.x/notionists/svg?seed=Maria&radius=50&backgroundColor=f1f1f1"
          />
        </span>
        <p className="mt-1 font-mono text-[10.5px] text-gray-400">
          <b className="font-bold text-black dark:text-white">1</b> person viewing now
        </p>
        <button
          type="button"
          onClick={onOpenChat}
          className="mt-3.5 inline-flex w-fit items-center gap-2 font-mono text-[12px] text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M4 5.5h16v10H10l-4.5 4v-4H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="9" cy="10.5" r=".9" fill="currentColor" />
            <circle cx="12" cy="10.5" r=".9" fill="currentColor" />
            <circle cx="15" cy="10.5" r=".9" fill="currentColor" />
          </svg>
          community chat
        </button>
      </div>

      {/* Footer: Theme switcher, sound toggle, email */}
      <div className="mt-6 shrink-0">
        <div className="mb-4 flex items-center gap-2">
          {/* Theme switcher */}
          <div className="theme-switch dark:border-white/10" role="group" aria-label="Theme">
            <button
              type="button"
              onClick={() => handleSetTheme('system')}
              className={`theme-opt ${theme === 'system' ? 'is-active dark:bg-white/15 dark:text-white' : ''}`}
              title="System theme"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M9 21h6M12 17v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSetTheme('light')}
              className={`theme-opt ${theme === 'light' ? 'is-active dark:bg-white/15 dark:text-white' : ''}`}
              title="Light theme"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSetTheme('dark')}
              className={`theme-opt ${theme === 'dark' ? 'is-active dark:bg-white/15 dark:text-white' : ''}`}
              title="Dark theme"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M20 13.6A8 8 0 1 1 10.4 4a6.2 6.2 0 0 0 9.6 9.6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Sound toggle button */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="inline-flex h-7.5 w-7.5 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-black dark:border-white/10 dark:text-gray-400 dark:hover:border-white/30 dark:hover:text-white cursor-pointer transition-colors"
            title={soundEnabled ? 'Sounds on' : 'Sounds off'}
            aria-label="Toggle interface sounds"
          >
            {soundEnabled ? (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M5 10v4h3l4 3V7L8 10H5zM16 9a4 4 0 010 6M18.5 6.5a7.5 7.5 0 010 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M5 10v4h3l4 3V7L8 10H5zM16 10l5 5M21 10l-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-[12px] leading-relaxed text-gray-400">
          For work, collabs &amp; everything else, reach me at
        </p>
        <button
          type="button"
          onClick={onOpenEmail}
          className="mt-1.5 inline-flex w-fit items-center gap-2 font-mono text-[13px] text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-400 cursor-pointer transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-[1.15em] w-[1.15em] shrink-0">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {email}
        </button>
      </div>
    </nav>
  )
}
