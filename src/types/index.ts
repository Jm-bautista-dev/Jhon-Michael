export interface Profile {
  name: string
  title: string
  location: string
  tagline: string
  avatar: string
  status: 'available' | 'busy' | 'open'
  statusLabel: string
  highlightBadge: string
  bio: string[]
  stats: { label: string; value: string }[]
  socials: { label: string; href: string; icon: string }[]
  cvUrl: string
  email: string
  calendlyUrl: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export type ProjectStatus = 'completed' | 'in-progress' | 'archived'

export interface RepoLanguage {
  name: string
  percent: number
  color: string
}

export interface ProjectRepoStats {
  commits: number
  stars: number
  languages: RepoLanguage[]
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  displayUrl: string
  url?: string
  github?: string
  videoUrl?: string
  tags: string[]
  status: ProjectStatus
  category: string
  typeLabel: string
  year: string
  tagline: string
  images: string[]
  features: string[]
  repoStats?: ProjectRepoStats
}

export interface Certification {
  id: string
  title: string
  issuer: string
  year: string
  date: string
  category: string
  summary: string
  skills: string[]
  credentialId?: string
  /** PDF filename in public/certificates/ or full path e.g. /certificates/file.pdf */
  pdf: string
  /** Optional PNG/JPG preview; falls back to inline PDF viewer */
  image?: string
}

export interface Recommendation {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export interface Experience {
  id: string
  role: string
  company: string
  year: string
  summary?: string
}

export interface Achievement {
  id: string
  title: string
  issuer: string
  year: string
  type: 'certification' | 'award' | 'hackathon'
}
