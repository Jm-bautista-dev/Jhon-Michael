import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Mail,
  Compass,
  Briefcase,
  Trophy
} from 'lucide-react'
import {
  profile,
  skillCategories,
  recentProjects,
  certifications,
  recommendations,
  experience
} from '../../data/profile'
import { ProfileHeader } from '../profile/ProfileHeader'
import { AccessCard } from '../profile/AccessCard'
import { ProjectModal } from '../projects/ProjectModal'
import { CertificationModal } from '../certifications/CertificationModal'
import { ContactModal } from '../ui/ContactModal'
import type { Project, Certification } from '../../types'
import { PageShell } from './PageShell'

export function DashboardLayout() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [activeRec, setActiveRec] = useState(0)
  const [showContact, setShowContact] = useState(false)

  // Auto-rotate recommendations every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRec((prev) => (prev + 1) % recommendations.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [])

  const currentRecommendation = recommendations[activeRec]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-svh bg-surface-muted dark:bg-[#09090b]"
    >
      <PageShell>
        {/* Top Profile Header */}
        <div className="mb-4">
          <ProfileHeader profile={profile} onContactClick={() => setShowContact(true)} />
        </div>

        {/* 6-Column Bento Grid Container */}
        <section className="grid grid-cols-1 md:grid-cols-6 gap-2">

          {/* Card 1: About Section (col-span-4) */}
          <div className="bento-card p-5 col-span-1 md:col-span-4 space-y-3 group animate-fade-in">
            <h2 className="text-base font-bold text-foreground">About</h2>
            <div className="space-y-3 text-[13px] leading-relaxed text-foreground/80 md:text-[14px]">
              {profile.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Card 2: Right Column Group (Access Card, StellarPH Award Badge, Experience Timeline)
              This aligns vertically next to About and Tech Stack cards */}
          <div className="col-span-1 md:col-span-2 md:row-span-3 space-y-2 animate-fade-in">

            {/* Access Card Component */}
            <AccessCard />

            {/* Featured Project Card */}
            <div className="flex justify-center w-full">
              <Link
                to="/projects"
                className="block w-full transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 cursor-pointer"
              >
                <div className="w-full rounded-xl bg-gradient-to-r from-accent/10 via-accent/5 to-purple-500/10 border border-accent/25 p-4 text-left">
                  <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold">
                    FEATURED PROJECT
                  </span>
                  <p className="text-xs font-bold text-foreground mt-1.5 leading-snug">
                    Attendance Management System
                  </p>
                  <p className="text-[9.5px] font-mono text-muted mt-0.5">
                    Flask + PHP + MySQL
                  </p>
                  <p className="text-[10.5px] text-muted/95 mt-2 leading-relaxed font-sans">
                    Full-stack attendance system with authentication, employee tracking, and database integration.
                  </p>
                  <div className="mt-3 flex items-center justify-end text-[10px] font-bold text-accent">
                    <span>View Project</span>
                    <ChevronRight className="w-3 h-3 ml-0.5" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Experience Card */}
            <div className="bento-card p-4 space-y-2 group flex-1">
              <h2 className="text-base font-bold text-foreground">Experience</h2>
              <div className="relative space-y-4 mt-3">
                {/* Timeline vertical bar */}
                <div className="absolute left-1.5 top-1.5 bottom-2 w-px bg-border dark:bg-white/10" />

                {experience.map((item) => (
                  <div key={item.id} className="relative pl-5 group/role">
                    {/* Circle timeline dot */}
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:border-accent group-hover/role:bg-accent transition-colors dark:border-white/10" />

                    <div className="space-y-0.5">
                      <h3 className="text-xs font-semibold text-foreground group-hover/role:text-accent transition-colors">
                        {item.role}
                      </h3>
                      <div className="flex items-center justify-between text-[10px] text-muted">
                        <span>{item.company}</span>
                        <span className="font-mono">{item.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Tech Stack (col-span-4) */}
          <div className="bento-card p-5 col-span-1 md:col-span-4 space-y-3 group animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">Tech Stack</h2>
              <Link
                className="text-xs text-muted hover:text-accent flex items-center gap-0.5 transition-colors"
                to="/tech-stack"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              {skillCategories.map((cat) => (
                <div key={cat.name}>
                  <h3 className="text-xs font-semibold text-foreground/80 mb-1.5">{cat.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[11px] rounded-md bg-foreground/5 dark:bg-white/5 border border-border/40 text-foreground/85 font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Recent Projects (col-span-4) */}
          <div className="bento-card p-5 col-span-1 md:col-span-4 space-y-3 group animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">Recent Projects</h2>
              <Link
                className="text-xs text-muted hover:text-accent flex items-center gap-0.5 transition-colors"
                to="/projects"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bento-card !p-3 space-y-1.5 cursor-pointer hover:border-accent/30 dark:hover:border-accent/30 hover:bg-surface-muted dark:hover:bg-white/5 transition-all duration-300"
                >
                  <h3 className="text-xs font-bold text-foreground">{project.name}</h3>
                  <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-[10px] text-accent font-mono font-medium inline-block">
                    {project.displayUrl}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Recent Certifications (col-span-3) */}
          <div className="bento-card p-5 col-span-1 md:col-span-3 space-y-3 group animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">Recent Certifications</h2>
              <Link
                className="text-xs text-muted hover:text-accent flex items-center gap-0.5 transition-colors"
                to="/certifications"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-1.5 pt-1">
              {certifications.slice(0, 4).map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="p-2.5 rounded-lg bg-foreground/5 dark:bg-white/5 border border-border/40 hover:bg-foreground/10 dark:hover:bg-white/10 transition-colors cursor-pointer text-left"
                >
                  <h3 className="text-xs font-bold text-foreground line-clamp-1">{cert.title}</h3>
                  <p className="text-[10px] text-muted">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 6: Recommendations (col-span-3) */}
          <div className="bento-card p-5 col-span-1 md:col-span-3 flex flex-col justify-between group overflow-hidden animate-fade-in">
            <h2 className="text-base font-bold text-foreground mb-2">Recommendations</h2>

            <div className="flex-1 flex flex-col justify-between min-h-[140px] pt-1">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={currentRecommendation.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <p className="text-[14px] md:text-[15px] leading-relaxed text-foreground/90 font-sans italic line-clamp-5">
                    “{currentRecommendation.quote}”
                  </p>

                  <footer className="mt-3 pt-2.5 border-t border-border/80 dark:border-white/10">
                    <p className="text-xs font-bold text-foreground">{currentRecommendation.author}</p>
                    <p className="text-[10px] text-muted truncate">
                      {currentRecommendation.role} at {currentRecommendation.company}
                    </p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex gap-1.5 mt-3 justify-start">
                {recommendations.map((rec, i) => (
                  <button
                    key={rec.id}
                    onClick={() => setActiveRec(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeRec ? 'bg-accent w-3' : 'bg-muted/40 hover:bg-muted/80'
                      }`}
                    aria-label={`Jump to recommendation ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card 7: Memberships, Speaking, Socials, & Email (col-span-6) */}
          <div className="bento-card p-5 col-span-1 md:col-span-6 space-y-4 group animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Speaking Engagements */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                  Open for Opportunities
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Available for freelance work, internships, and entry-level software development roles. Open to collaborating on web development projects, system builds, and startup ideas.
                </p>
                <button
                  type="button"
                  onClick={() => setShowContact(true)}
                  className="inline-flex items-center gap-1 text-xs text-accent font-semibold hover:underline"
                >
                  <span>Send me a message</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* A Member Of */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                  Professional Development
                </h3>
                <div className="space-y-1.5">
                  <a
                    href="https://www.aap.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-medium text-foreground/80 hover:text-accent leading-snug truncate"
                  >
                    Focused on opportunities in Software Development, Full-Stack Web Development, and IT Support roles. Interested in building real-world systems and scalable web applications.
                  </a>
                  <a
                    href="https://www.psia.org.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-medium text-foreground/80 hover:text-accent leading-snug truncate"
                  >
                    Continuously improving skills in web development, full-stack systems, and software engineering through hands-on projects and self-study.
                  </a>
                </div>
              </div>

              {/* Social Links & Talk CTAs */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                  Social Links
                </h3>
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/jm-bautista-842787329/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-surface hover:bg-surface-muted text-foreground transition-all duration-200 hover:-translate-y-0.5"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current text-foreground" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/Jm-bautista-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-surface hover:bg-surface-muted text-foreground transition-all duration-200 hover:-translate-y-0.5"
                    aria-label="GitHub"
                  >
                    <svg className="w-4 h-4 fill-current text-foreground" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/michel_laurentt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-surface hover:bg-surface-muted text-foreground transition-all duration-200 hover:-translate-y-0.5"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Card 8: Gallery (col-span-6) */}
          <div className="bento-card p-5 col-span-1 md:col-span-6 space-y-3 group animate-fade-in">
            <h2 className="text-base font-bold text-foreground">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">

              {/* Four stylish placeholder image cards for Gallery (easy to replace) */}
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-foreground/[0.03] dark:bg-white/5 flex items-center justify-center">
                <Compass className="w-5 h-5 text-muted opacity-40" />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-muted uppercase">Workspace</span>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-foreground/[0.03] dark:bg-white/5 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-muted opacity-40" />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-muted uppercase">Conferences</span>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-foreground/[0.03] dark:bg-white/5 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-muted opacity-40" />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-muted uppercase">Hackathon</span>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-foreground/[0.03] dark:bg-white/5 flex items-center justify-center">
                <Mail className="w-5 h-5 text-muted opacity-40" />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-muted uppercase">Community</span>
              </div>

            </div>
          </div>

        </section>

        {/* Footer */}
        <footer className="mt-8 mb-4 text-center text-[11px] text-muted tracking-tight">
          <p>© {new Date().getFullYear()} © 2026 JM Bautista. All rights reserved.</p>
        </footer>
      </PageShell>

      {/* Project details overlay modal popup */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Certification details overlay modal popup */}
      <CertificationModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      {/* EmailJS contact form modal */}
      <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
        recipientEmail={profile.email}
      />
    </motion.div>
  )
}
