import { useState } from 'react'
import { profile, experience, recommendations } from '../../data/profile'
import { certifications } from '../../data/certifications'
import { HalftoneBackdrop } from './HalftoneBackdrop'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { ProfileGaze } from './ProfileGaze'
import { GuidedCursor } from './GuidedCursor'
import { ProjectDeck } from '../projects/ProjectDeck'
import { EmailModal } from '../modals/EmailModal'
import { CommunityModal } from '../modals/CommunityModal'
import { HackathonsModal } from '../modals/HackathonsModal'
import { AskOverlay } from '../modals/AskOverlay'
import { TypingTestOverlay } from '../modals/TypingTestOverlay'
import { CommunityChatOverlay } from '../modals/CommunityChatOverlay'
import { GearModal } from '../modals/GearModal'
import { CollabsModal } from '../modals/CollabsModal'
import { ConsultingModal } from '../modals/ConsultingModal'
import { ResourcesModal } from '../modals/ResourcesModal'
import { CertificationModal } from '../certifications/CertificationModal'
import type { Certification } from '../../types'
import { soundManager } from '../../lib/sounds'
import { getAssetUrl } from '../../lib/assets'

export function DashboardLayout() {
  const [isEmailOpen, setIsEmailOpen] = useState(false)
  const [isCommunityOpen, setIsCommunityOpen] = useState(false)
  const [isHackathonsOpen, setIsHackathonsOpen] = useState(false)
  const [isAskOpen, setIsAskOpen] = useState(false)
  const [isTypingOpen, setIsTypingOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isGearOpen, setIsGearOpen] = useState(false)
  const [isCollabsOpen, setIsCollabsOpen] = useState(false)
  const [isConsultingOpen, setIsConsultingOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [guidePos, setGuidePos] = useState<{ x: number; y: number } | null>(null)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  const blogPosts = [
    {
      id: '1',
      title: 'From Hackathons to Building Capstone Systems',
      summary: 'Building high-stress hackathon prototypes gave me the speed and architectural instincts needed to lead real-world capstone development.',
      date: 'Oct 2026',
    },
    {
      id: '2',
      title: 'Building Maki Desu: POS & Inventory with Real-Time Analytics',
      summary: 'Deep-dive into designing database transactions, automatic stock deductions, sales summaries, and forecasting for retail.',
      date: 'Sep 2026',
    },
    {
      id: '3',
      title: 'Why Cybersecurity and Full-Stack Go Hand in Hand',
      summary: 'Writing clean code is half the battle; understanding network vulnerabilities, input sanitation, and auth flows is what makes it resilient.',
      date: 'Aug 2026',
    },
  ]

  const stackSkills = [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'Flask',
    'PHP',
    'Laravel',
    'MySQL',
    'Tailwind CSS',
    'Docker',
    'REST APIs',
    'Cybersecurity',
    'Chart.js',
  ]

  return (
    <div className="relative min-h-screen bg-white font-sans text-black antialiased dark:bg-[#0c0c0f] dark:text-[#f4f4f5]">
      {/* Ambient Halftone Texture Background */}
      <HalftoneBackdrop />

      {/* Fixed Left Sidebar (lg+) */}
      <Sidebar
        email={profile.email}
        onOpenAsk={() => setIsAskOpen(true)}
        onOpenTyping={() => setIsTypingOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenEmail={() => setIsEmailOpen(true)}
        onOpenGear={() => setIsGearOpen(true)}
        onOpenCollabs={() => setIsCollabsOpen(true)}
        onOpenConsulting={() => setIsConsultingOpen(true)}
        onOpenResources={() => setIsResourcesOpen(true)}
      />

      {/* Mobile Top Bar & Drawer (below lg) */}
      <MobileNav
        email={profile.email}
        onOpenAsk={() => setIsAskOpen(true)}
        onOpenTyping={() => setIsTypingOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenEmail={() => setIsEmailOpen(true)}
        onOpenGear={() => setIsGearOpen(true)}
        onOpenCollabs={() => setIsCollabsOpen(true)}
        onOpenConsulting={() => setIsConsultingOpen(true)}
        onOpenResources={() => setIsResourcesOpen(true)}
      />

      {/* Guided Cursor Tour (Desktop) */}
      <GuidedCursor
        onLook={(x, y) => setGuidePos({ x, y })}
        onReleaseGaze={() => setGuidePos(null)}
      />

      {/* Main Content Area */}
      <main id="top" className="relative z-10 lg:pl-64">
        <div className="mx-auto max-w-2xl px-6">

          {/* ── Hero Section ── */}
          <section className="relative pt-20 pb-16 sm:pt-28">
            <div className="grid gap-9 sm:grid-cols-[18rem_1fr] sm:items-start sm:gap-10">
              {/* Photo Column with 3D Gaze */}
              <div className="reveal d1 mx-auto w-full max-w-[18rem] sm:mx-0">
                <ProfileGaze
                  avatarSrc={getAssetUrl(profile.avatar)}
                  name={profile.name}
                  guidePos={guidePos}
                />
              </div>

              {/* Text Column */}
              <div>
                <h1 data-guide="name" className="reveal d2 font-pixel text-3xl leading-none sm:text-[2.6rem] text-black dark:text-white">
                  Jhon Michael
                </h1>

                <p className="reveal d3 mt-6 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                  I&apos;m a full-stack engineer. I build modern web apps, cloud systems, and these days
                  I&apos;m focused on robust backend architectures and AI.
                </p>

                <p className="reveal d4 mt-5 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                  Right now I&apos;m building practical systems with real-time analytics. I love turning rough ideas
                  into things people actually use.
                </p>

                {/* Social links */}
                <div data-guide="socials" className="reveal d5 mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[12px] text-gray-500 dark:text-gray-400">
                  <a
                    href="https://github.com/Jm-bautista-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors"
                  >
                    github ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jm-bautista-842787329/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors"
                  >
                    linkedin ↗
                  </a>
                  <a
                    href="https://www.instagram.com/michel_laurentt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors"
                  >
                    instagram ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsEmailOpen(true)}
                    className="hover:text-black dark:hover:text-white cursor-pointer transition-colors"
                  >
                    email ↗
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Affiliations Bar ── */}
          <section aria-label="Affiliations" className="border-t border-gray-200 dark:border-white/10 py-5">
            <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-white/10">
              <div className="group flex min-w-0 flex-col items-start gap-1.5 pr-3 sm:flex-row sm:items-center sm:gap-3 sm:pr-5">
                <span className="flex h-8 shrink-0 items-center text-lg">🛡️</span>
                <span className="min-w-0 font-mono leading-tight">
                  <span className="block text-[12px] font-semibold text-black dark:text-white truncate">CCSLYMPICS</span>
                  <span className="mt-1 block whitespace-nowrap text-[9px] uppercase tracking-wider text-gray-500 sm:text-[10px]">
                    2nd Place Winner
                  </span>
                </span>
              </div>

              <div className="group flex min-w-0 flex-col items-start gap-1.5 px-3 sm:flex-row sm:items-center sm:gap-3 sm:px-5">
                <span className="flex h-8 shrink-0 items-center text-lg">🏆</span>
                <span className="min-w-0 font-mono leading-tight">
                  <span className="block text-[12px] font-semibold text-black dark:text-white truncate">DICT OpenGov</span>
                  <span className="mt-1 block whitespace-nowrap text-[9px] uppercase tracking-wider text-gray-500 sm:text-[10px]">
                    Champion · 2025
                  </span>
                </span>
              </div>

              <div className="group flex min-w-0 flex-col items-start gap-1.5 pl-3 sm:flex-row sm:items-center sm:gap-3 sm:pl-5">
                <span className="flex h-8 shrink-0 items-center text-lg">🎓</span>
                <span className="min-w-0 font-mono leading-tight">
                  <span className="block text-[12px] font-semibold text-black dark:text-white truncate">Laguna Univ</span>
                  <span className="mt-1 block whitespace-nowrap text-[9px] uppercase tracking-wider text-gray-500 sm:text-[10px]">
                    BS IT Analytics
                  </span>
                </span>
              </div>
            </div>
          </section>

          {/* ── Stats ── */}
          <section data-guide="stats" className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-white/10 border-t border-gray-200 dark:border-white/10">
            <div className="py-6 pr-3 sm:pr-5">
              <button
                type="button"
                onClick={() => setIsCommunityOpen(true)}
                className="group block text-left cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <span className="font-pixel text-lg leading-none text-black dark:text-white">5+</span>
                  <svg className="h-3 w-3 -translate-y-1 text-gray-300 transition-all group-hover:-translate-y-1.5 group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white" viewBox="0 0 16 16" fill="none">
                    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                  projects built
                </div>
              </button>
            </div>

            <div className="py-6 px-3 sm:px-5">
              <a href="#projects" className="group block">
                <div className="flex items-center gap-1">
                  <span className="font-pixel text-lg leading-none text-black dark:text-white">4+ yrs</span>
                  <svg className="h-3 w-3 -translate-y-1 text-gray-300 transition-all group-hover:-translate-y-1.5 group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white" viewBox="0 0 16 16" fill="none">
                    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                  shipping code
                </div>
              </a>
            </div>

            <div className="py-6 pl-3 sm:pl-5">
              <button
                type="button"
                onClick={() => setIsHackathonsOpen(true)}
                className="group block text-left cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <span className="font-pixel text-lg leading-none text-black dark:text-white">
                    2<span className="text-gray-300 dark:text-gray-600">x</span>
                  </span>
                  <svg className="h-3 w-3 -translate-y-1 text-gray-300 transition-all group-hover:-translate-y-1.5 group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white" viewBox="0 0 16 16" fill="none">
                    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                  hackathons &amp; awards
                </div>
              </button>
            </div>
          </section>

          {/* Halftone divider */}
          <div aria-hidden="true" className="halftone halftone-wide mask-fade-x my-2 h-6 w-full opacity-[0.18]" />

          {/* ── 01 — Blog ── */}
          <section id="blog" className="relative py-14">
            <div aria-hidden="true" className="halftone mask-circle pointer-events-none absolute -left-10 bottom-6 h-32 w-32 opacity-20" />

            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="font-pixel text-sm text-gray-400">01 — blog</h2>
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                all posts →
              </span>
            </div>

            <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-white/10 dark:border-white/10">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="group flex items-baseline justify-between gap-6 py-5 hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => {
                    soundManager.play('click')
                    setIsAskOpen(true)
                  }}
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-medium text-black group-hover:text-gray-500 dark:text-white dark:group-hover:text-gray-300">
                      {post.title}
                    </h3>
                    <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                      {post.summary}
                    </p>
                  </div>
                  <time className="shrink-0 font-mono text-[12px] text-gray-400">
                    {post.date}
                  </time>
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 — Projects (Spotlight Card Deck) ── */}
          <section id="projects" className="py-14">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="font-pixel text-sm text-gray-400">02 — projects</h2>
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                featured deck →
              </span>
            </div>

            <ProjectDeck />
          </section>

          {/* ── 03 — Experience ── */}
          <section id="experience" className="py-14">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-pixel text-sm text-gray-400">03 — experience</h2>
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                full history →
              </span>
            </div>

            <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-white/10 dark:border-white/10">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="group grid grid-cols-12 items-baseline gap-3 py-2.5 hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="col-span-3 sm:col-span-2 font-mono text-[11px] text-gray-400">
                    {exp.year}
                  </div>
                  <div className="col-span-9 sm:col-span-6 text-[14px] font-medium text-black dark:text-white leading-snug">
                    {exp.role}
                  </div>
                  <div className="col-span-12 sm:col-span-4 text-[13px] text-gray-500 dark:text-gray-400 sm:text-right">
                    {exp.company}
                  </div>
                </div>
              ))}
            </div>

            {/* Stack Tags */}
            <div className="mt-7">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-gray-400">Stack</h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                  core tools
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {stackSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-gray-200 bg-white px-2.5 py-1 font-mono text-[12px] text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setIsAskOpen(true)}
                  className="rounded-md border border-dashed border-gray-300 px-2.5 py-1 font-mono text-[12px] text-gray-500 hover:border-gray-500 hover:text-black dark:border-white/20 dark:hover:border-white dark:hover:text-white cursor-pointer"
                >
                  + more
                </button>
              </div>
            </div>
          </section>

          {/* ── 04 — Certifications ── */}
          <section id="certifications" className="py-14">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="font-pixel text-sm text-gray-400">04 — certifications</h2>
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                all certifications →
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {certifications.slice(0, 3).map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => {
                    soundManager.play('pop')
                    setSelectedCert(cert)
                  }}
                  className="group relative flex flex-col items-center rounded-xl bg-linear-to-b from-gray-50 to-white px-4 py-5 text-center shadow-[0_8px_22px_-14px_rgba(10,10,10,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(10,10,10,0.4)] dark:from-[#151518] dark:to-[#0c0c0f] dark:shadow-none cursor-pointer border border-gray-200 dark:border-white/10"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-1.25 rounded-lg border border-gray-200/70 dark:border-white/5"
                  />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-lg dark:border-white/10 dark:bg-white/5">
                    📜
                  </div>
                  <h3 className="relative mt-3 text-[13px] font-semibold leading-snug text-black dark:text-white line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="relative mt-1 font-mono text-[9.5px] uppercase tracking-wider text-gray-400">
                    {cert.issuer}
                  </p>
                  <div className="relative mt-3 flex items-center gap-1.5 text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                    <svg viewBox="0 0 13 22" fill="currentColor" aria-hidden="true" className="h-3.5 w-auto shrink-0">
                      <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 5) rotate(46)" />
                      <path d="M0 -4.3C2.3 -2.8 2.3 2.8 0 4.3C-2.3 2.8 -2.3 -2.8 0 -4.3Z" transform="translate(4.6 11) rotate(14)" />
                      <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 17) rotate(-30)" />
                    </svg>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-gray-400 group-hover:text-black dark:group-hover:text-white">
                      Verify
                    </span>
                    <span className="inline-flex -scale-x-100">
                      <svg viewBox="0 0 13 22" fill="currentColor" aria-hidden="true" className="h-3.5 w-auto shrink-0">
                        <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 5) rotate(46)" />
                        <path d="M0 -4.3C2.3 -2.8 2.3 2.8 0 4.3C-2.3 2.8 -2.3 -2.8 0 -4.3Z" transform="translate(4.6 11) rotate(14)" />
                        <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 17) rotate(-30)" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 05 — Recommendations ── */}
          <section id="recommendations" className="py-14">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="font-pixel text-sm text-gray-400">05 — recommendations</h2>
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                all feedback →
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="group flex flex-col rounded-xl bg-linear-to-b from-gray-50 to-white p-5 shadow-[0_8px_22px_-16px_rgba(10,10,10,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(10,10,10,0.35)] dark:from-[#151518] dark:to-[#0c0c0f] dark:shadow-none border border-gray-200 dark:border-white/10"
                >
                  <svg className="h-5 w-5 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 7H6a3 3 0 00-3 3v1a3 3 0 003 3h1v1a2 2 0 01-2 2H4v2h1a4 4 0 004-4V7zm11 0h-3a3 3 0 00-3 3v1a3 3 0 003 3h1v1a2 2 0 01-2 2h-1v2h1a4 4 0 004-4V7z" />
                  </svg>
                  <p className="rec-quote mt-2 text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300 italic">
                    &ldquo;{rec.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2.5 border-t border-gray-100 dark:border-white/10 pt-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 font-mono text-[10px] font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300">
                      {rec.author.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-semibold text-black dark:text-white">
                        {rec.author}
                      </div>
                      <div className="truncate font-mono text-[9px] uppercase tracking-wider text-gray-400">
                        {rec.role} · {rec.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 06 — Affiliations ── */}
          <section id="affiliations" className="py-14">
            <div className="mb-7 flex items-baseline justify-between">
              <h2 className="font-pixel text-sm text-gray-400">06 — affiliations</h2>
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                networks →
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="group inline-flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg dark:border-white/10 dark:bg-white/5">
                  🎓
                </div>
                <div>
                  <div className="text-[13px] font-medium leading-snug text-black dark:text-white">Laguna University</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400">Student &amp; Developer</div>
                </div>
              </div>

              <div className="group inline-flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg dark:border-white/10 dark:bg-white/5">
                  🏆
                </div>
                <div>
                  <div className="text-[13px] font-medium leading-snug text-black dark:text-white">DICT OpenGov</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400">Hackathon Champion</div>
                </div>
              </div>

              <div className="group inline-flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[18px] leading-none dark:border-white/10 dark:bg-white/5">
                  🇵🇭
                </div>
                <div>
                  <div className="text-[13px] font-medium leading-snug text-black dark:text-white">AppBuildersPH</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400">Active Builder</div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 07 — GitHub Heatmap (Halftone Contribution Graph) ── */}
          <section id="github" className="py-14">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-pixel text-sm text-gray-400">07 — github</h2>
              <a
                href="https://github.com/Jm-bautista-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                @Jm-bautista-dev ↗
              </a>
            </div>

            <a
              href="https://github.com/Jm-bautista-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <svg viewBox="0 0 689 91" className="h-auto w-full text-black dark:text-white" preserveAspectRatio="xMidYMid meet" aria-label="GitHub contribution graph">
                {Array.from({ length: 53 }).map((_, col) => {
                  const cx = 6.5 + col * 13
                  return Array.from({ length: 7 }).map((_, row) => {
                    const cy = 6.5 + row * 13
                    // Generate subtle variations matching the halftone commit graph
                    const seed = (col * 7 + row * 13) % 29
                    const isActive = seed > 14
                    const isSuper = seed > 24
                    const r = isSuper ? 3.8 : isActive ? 2.5 : 1.1
                    const opacity = isActive ? 0.9 : 0.12
                    return (
                      <circle
                        key={`${col}-${row}`}
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill="currentColor"
                        opacity={opacity}
                      />
                    )
                  })
                })}
              </svg>
            </a>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-gray-400">
              2,689 contributions in the last year
            </p>
          </section>

          {/* Bottom Halftone Fade */}
          <div aria-hidden="true" className="halftone halftone-wide mask-fade-x mb-16 mt-2 h-10 w-full opacity-[0.15]" />

        </div>
      </main>

      {/* Modals & Overlays */}
      <EmailModal
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        email={profile.email}
      />

      <CommunityModal
        isOpen={isCommunityOpen}
        onClose={() => setIsCommunityOpen(false)}
      />

      <HackathonsModal
        isOpen={isHackathonsOpen}
        onClose={() => setIsHackathonsOpen(false)}
      />

      <AskOverlay
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />

      <TypingTestOverlay
        isOpen={isTypingOpen}
        onClose={() => setIsTypingOpen(false)}
      />

      <CommunityChatOverlay
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <GearModal
        isOpen={isGearOpen}
        onClose={() => setIsGearOpen(false)}
      />

      <CollabsModal
        isOpen={isCollabsOpen}
        onClose={() => setIsCollabsOpen(false)}
        onOpenEmail={() => setIsEmailOpen(true)}
      />

      <ConsultingModal
        isOpen={isConsultingOpen}
        onClose={() => setIsConsultingOpen(false)}
        onOpenEmail={() => setIsEmailOpen(true)}
      />

      <ResourcesModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />

      <CertificationModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  )
}
