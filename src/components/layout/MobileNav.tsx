import { useState } from 'react'
import { soundManager } from '../../lib/sounds'

interface MobileNavProps {
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

export function MobileNav({
  onOpenAsk,
  onOpenTyping,
  onOpenChat,
  onOpenEmail,
  onOpenGear,
  onOpenCollabs,
  onOpenConsulting,
  onOpenResources,
  email,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(false)
    soundManager.play('click')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#0c0c0f]/90 lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <a href="#" className="font-pixel text-[14px] text-black dark:text-white">
            Jhon Michael
          </a>
          <button
            type="button"
            onClick={() => {
              soundManager.play('pop')
              setIsOpen(true)
            }}
            aria-label="Open menu"
            className="-mr-1 p-1 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-60 flex flex-col bg-white dark:bg-[#0c0c0f] lg:hidden animate-fade-in overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 px-6 py-3">
            <span className="font-pixel text-[14px] text-black dark:text-white">Jhon Michael</span>
            <button
              type="button"
              onClick={() => {
                soundManager.play('click')
                setIsOpen(false)
              }}
              aria-label="Close menu"
              className="-mr-1 p-1 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-1 flex-col px-7 py-8 font-mono text-[16px] gap-6">
            <div className="flex flex-col gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('projects')
                }}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Featured
              </a>
              <a
                href="#blog"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('blog')
                }}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Blog
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  onOpenGear()
                }}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-left"
              >
                Gear
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  if (onOpenResources) onOpenResources()
                  else scrollTo('certifications')
                }}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-left"
              >
                Resources
              </button>
            </div>

            <div className="h-px bg-gray-200 dark:bg-white/10" />

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  if (onOpenCollabs) onOpenCollabs()
                  else scrollTo('affiliations')
                }}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-left"
              >
                Collabs
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  if (onOpenConsulting) onOpenConsulting()
                  else onOpenEmail()
                }}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-left"
              >
                Consulting
              </button>
            </div>

            <div className="h-px bg-gray-200 dark:bg-white/10" />

            <div className="flex flex-col gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('projects')
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Projects
              </a>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('experience')
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Experience
              </a>
              <a
                href="#certifications"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('certifications')
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Certifications
              </a>
              <a
                href="#recommendations"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('recommendations')
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Recommendations
              </a>
            </div>

            <div className="h-px bg-gray-200 dark:bg-white/10" />

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(onOpenAsk, 200)
                }}
                className="flex items-center gap-2 text-[14px] text-gray-600 dark:text-gray-400"
              >
                <span>ask anything</span>
                <span className="rounded border border-gray-300 px-1.5 py-0.5 text-[10px] dark:border-white/20">
                  ⌘K
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(onOpenTyping, 200)
                }}
                className="flex items-center gap-2 text-[14px] text-gray-600 dark:text-gray-400"
              >
                <span>typing test</span>
                <span className="rounded border border-gray-300 px-1.5 py-0.5 text-[10px] dark:border-white/20">
                  ⌘J
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(onOpenChat, 200)
                }}
                className="flex items-center gap-2 text-[14px] text-gray-600 dark:text-gray-400"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M4 5.5h16v10H10l-4.5 4v-4H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                community chat
              </button>
            </div>

            {/* Theme & sound */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
              <div className="theme-switch dark:border-white/10" role="group" aria-label="Theme">
                <button
                  type="button"
                  onClick={() => handleSetTheme('system')}
                  className={`theme-opt ${theme === 'system' ? 'is-active' : ''}`}
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
                  className={`theme-opt ${theme === 'light' ? 'is-active' : ''}`}
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
                  className={`theme-opt ${theme === 'dark' ? 'is-active' : ''}`}
                  title="Dark theme"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 13.6A8 8 0 1 1 10.4 4a6.2 6.2 0 0 0 9.6 9.6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                onClick={handleToggleSound}
                className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-black dark:border-white/10 dark:text-gray-400 dark:hover:border-white/30 dark:hover:text-white cursor-pointer transition-colors"
                title={soundEnabled ? 'Sounds on' : 'Sounds off'}
                aria-label="Toggle interface sounds"
                aria-pressed={soundEnabled}
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

            <div className="mt-4">
              <p className="text-[12px] leading-relaxed text-gray-400">
                For work, collabs &amp; everything else, reach me at
              </p>
              <a
                href={`mailto:${email}`}
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(false)
                  onOpenEmail()
                }}
                className="mt-1.5 inline-flex w-fit items-center gap-2 font-mono text-[12px] font-normal tracking-tight text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-400 cursor-pointer transition-colors"
                title={`Send email to ${email}`}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-[1.15em] w-[1.15em] shrink-0">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="truncate">{email}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
