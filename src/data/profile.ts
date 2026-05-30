import type {
  Achievement,
  Experience,
  Profile,
  Recommendation,
  SkillCategory,
} from '../types'

export { allProjects, recentProjects } from './projects'
export { certifications } from './certifications'

export const profile: Profile = {
  name: 'Jhon Michael Bautista',
  title: 'AI \\ Web Developer \\ Freelancer',
  location: 'Laguna, Philippines',
  tagline: 'AI \\ Web Developer \\ Freelancer',
  avatar: '/Avatar/myavatar.jpg',
  status: 'available',
  statusLabel: 'Open to opportunities',
  highlightBadge: '2nd Place Winner - Cybersecurity CCSLYMPICS 2026',
  bio: [
    "I’m an Information Technology student specializing in full-stack web development and system design. I build practical applications using TypeScript, React, PHP, Laravel, Python, Flask,  and MySQL, focusing on both frontend and backend development.",
    "I have experience developing academic and personal projects such as POS, inventory management, and attendance systems with database integration and analytics features.",
    "I’m continuously improving my skills in building scalable, real-world applications and exploring backend systems, APIs, and modern web technologies.",
  ],
  stats: [
    { label: 'Web Projects Built', value: '5+' },
    { label: 'Full-Stack Systems', value: '3+' },
    { label: 'Technologies Used', value: '8+' },
    { label: 'Major Capstone Project', value: '1' },
  ],
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jm-bautista-842787329/', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/Jm-bautista-dev', icon: 'github' },
    { label: 'Instagram', href: 'https://www.instagram.com/michel_laurentt/', icon: 'instagram' },
  ],
  cvUrl: '#',
  email: 'jmbautistaa0428@gmail.com',
  calendlyUrl: 'https://calendly.com/jmbautistaa0428/30min',
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'CSS', 'Bootstrap'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Python', 'PHP', 'Laravel', 'MySQL', 'MongoDB', 'Flask'],
  },
  {
    name: 'Cybersecurity',
    skills: [
      'Network Security',
      'Web Security',
      'Penetration Testing',
      'Ethical Hacking',
      'Vulnerability Assessment',
      'Linux Security',
      'Firewalls',
      'SIEM Basics',
      'Cryptography Basics'
    ],
  },
  {
    name: 'Analytics',
    skills: ['Business Analytics', 'Data Visualization', 'SQL / MySQL Queries', 'Chart.js', 'Sales Forecasting', 'Reporting Tools'],
  }
]

export const allSkillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'HTML & CSS', 'Framer Motion', 'CSS', 'Bootstrap'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Python', 'PHP', 'Laravel', 'MySQL', 'MongoDB', 'Flask', 'PostgreSQL', 'REST APIs'],
  },
  {
    name: 'Cybersecurity',
    skills: [
      'Network Security',
      'Web Security',
      'Penetration Testing',
      'Ethical Hacking',
      'Vulnerability Assessment',
      'Linux Security',
      'Firewalls',
      'SIEM Basics',
      'Cryptography Basics'
    ],
  },
  {
    name: 'Analytics',
    skills: ['Business Analytics', 'Data Visualization', 'SQL / MySQL Queries', 'Chart.js', 'Sales Forecasting', 'Reporting Tools'],
  }
]

export const recommendations: Recommendation[] = [
  {
    id: '1',
    quote: 'Worked well in developing system features and improving the overall user experience of our project. Demonstrated strong willingness to learn modern technologies.',
    author: 'Capstone Teammate',
    role: 'Project Member',
    company: 'Laguna University',
  },
  {
    id: '2',
    quote: 'JM showed good problem-solving skills during project development and was able to adapt quickly to technical challenges.',
    author: 'Professor',
    role: 'IT Instructor',
    company: 'Laguna University',
  },
]

export const experience: Experience[] = [
  {
    id: '1',
    role: 'Capstone Developer - Point-of-Sale & Inventory Management System with Analytics',
    company: 'Laguna University',
    year: '2026-2027',
    summary: 'Developed a full-stack Point of Sale and Inventory Management System with analytics as a capstone project. Implemented sales tracking, inventory monitoring, reporting dashboards, and database-driven analytics to support business decision-making.',
  },
  {
    id: '2',
    role: 'Full-Stack Web Developer (Personal & Academic Projects)',
    company: 'Self-Directed Learning',
    year: '2021 - present',
    summary: 'Built multiple web applications using React, Flask, PHP, and MySQL. Focused on full-stack development, UI design, and API integration.',
  },
  {
    id: '3',
    role: 'Project Developer - Attendance Management System (Attendo)',
    company: 'Laguna University',
    year: '2024',
    summary: 'Developing core web systems, SEO pipelines, and digital operations infrastructure.',
  },
  {
    id: '4',
    role: 'BS Information Technology - Business Analytics',
    company: 'Laguna University',
    year: '2022 - 2027',
    summary: 'Studied modern computing, database systems, and Business Analytics.',
  },
  {
    id: '5',
    role: 'Hello World!',
    company: 'Wrote my first line of code',
    year: '2021',
    summary: 'Discovered programming and fell in love with code.',
  },
]

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'OpenGov Hackathon Champion',
    issuer: 'DICT',
    year: '2025',
    type: 'hackathon',
  },
  {
    id: '2',
    title: 'PH100 List of Brightest Minds',
    issuer: 'StellarPH',
    year: '2025',
    type: 'award',
  },
]
