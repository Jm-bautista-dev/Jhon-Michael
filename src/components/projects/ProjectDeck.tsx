import { useState } from 'react'
import { soundManager } from '../../lib/sounds'

interface DeckProject {
  id: string
  title: string
  badge: string
  tags: string[]
  icon: string
  description: string
  liveUrl?: string
  githubUrl?: string
}

const DECK_PROJECTS: DeckProject[] = [
  {
    id: 'maki-desu',
    title: 'Maki Desu – POS & Inventory',
    badge: '#1 POS & Analytics System',
    tags: ['Full-Stack', 'MySQL'],
    icon: '/projects/landingpage.jpg',
    description: 'An offline & cloud-ready POS & inventory management system with real-time stock tracking and business analytics.',
    liveUrl: 'https://makidesuoperation.site/',
    githubUrl: 'https://github.com/Jm-bautista-dev/Updated-Capstone-Project',
  },
  {
    id: 'dancrism',
    title: 'DANCRISM&S – Minerals',
    badge: '#1 Client Showcase',
    tags: ['E-Commerce Catalog'],
    icon: '/projects/wixhero.jpg',
    description: 'A clean digital showcase presenting minerals and natural stones with interactive product discovery.',
    liveUrl: 'https://jmbautistaa0428.wixsite.com/mysite',
  },
  {
    id: 'attendo',
    title: 'Attendo – Attendance System',
    badge: '#1 Campus System',
    tags: ['Flask + PHP'],
    icon: '/projects/login.jpg',
    description: 'Full-stack employee and student attendance tracker with biometric logging, database security, and reporting dashboards.',
    liveUrl: 'https://github.com/Jm-bautista-dev',
    githubUrl: 'https://github.com/Jm-bautista-dev',
  },
]

export function ProjectDeck() {
  // centerIndex stores which project index is currently in the center
  const [centerIdx, setCenterIdx] = useState(0)

  const handleCardClick = (targetIdx: number) => {
    if (targetIdx === centerIdx) return
    soundManager.play('pop')
    setCenterIdx(targetIdx)
  }

  // Calculate card slot class: center, left, or right
  const getSlotClass = (idx: number) => {
    if (idx === centerIdx) return 'is-center'
    const leftIdx = (centerIdx - 1 + DECK_PROJECTS.length) % DECK_PROJECTS.length
    if (idx === leftIdx) return 'is-left'
    return 'is-right'
  }

  return (
    <div className="deck" data-deck>
      {DECK_PROJECTS.map((proj, idx) => {
        const slot = getSlotClass(idx)
        return (
          <article
            key={proj.id}
            className={`deck-card ${slot} rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#151518]`}
            role="button"
            tabIndex={0}
            aria-label={`Show ${proj.title}`}
            onClick={() => handleCardClick(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleCardClick(idx)
              }
            }}
          >
            {/* Laurel Wreath Badge */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white dark:bg-white dark:text-black">
                <svg viewBox="0 0 13 22" fill="currentColor" aria-hidden="true" className="h-3.75 w-auto shrink-0">
                  <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 5) rotate(46)" />
                  <path d="M0 -4.3C2.3 -2.8 2.3 2.8 0 4.3C-2.3 2.8 -2.3 -2.8 0 -4.3Z" transform="translate(4.6 11) rotate(14)" />
                  <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 17) rotate(-30)" />
                </svg>
                {proj.badge}
                <span className="inline-flex -scale-x-100">
                  <svg viewBox="0 0 13 22" fill="currentColor" aria-hidden="true" className="h-3.75 w-auto shrink-0">
                    <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 5) rotate(46)" />
                    <path d="M0 -4.3C2.3 -2.8 2.3 2.8 0 4.3C-2.3 2.8 -2.3 -2.8 0 -4.3Z" transform="translate(4.6 11) rotate(14)" />
                    <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 17) rotate(-30)" />
                  </svg>
                </span>
              </span>
              {proj.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-gray-300 dark:border-white/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* App Icon + Title */}
            <div className="mt-4 flex items-center gap-3.5">
              <img
                src={proj.icon}
                alt=""
                className="h-12 w-12 shrink-0 rounded-xl border border-gray-200 object-cover shadow-sm dark:border-white/10"
              />
              <h3 className="font-pixel text-base leading-tight text-black dark:text-white truncate">
                {proj.title}
              </h3>
            </div>

            {/* Description */}
            <p className="mt-3 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
              {proj.description}
            </p>

            {/* Buttons */}
            <div className="mt-4 flex items-center gap-2">
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 font-mono text-[11px] font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
                >
                  <span>Live Demo</span>
                  <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
                    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-white/20 px-3 py-1.5 font-mono text-[11px] font-medium text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white transition-colors"
                >
                  <span>Code ↗</span>
                </a>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}
