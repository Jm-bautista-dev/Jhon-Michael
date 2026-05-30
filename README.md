# Developer Profile Dashboard

A premium, recruiter-friendly developer portfolio built as a single-page SaaS-style dashboard.

## Stack

- **React 19** + **TypeScript** (Vite)
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide React**

## Features

- Two-column dashboard layout (main content + sticky sidebar)
- Profile header with CTAs, status badge, and theme toggle
- About, grouped tech stack pills, and project cards with hover effects
- Sidebar: identity card, stats, expandable experience timeline, achievements, hire CTAs
- Light / dark mode (persisted in `localStorage`)
- Responsive: stacks to single column on mobile/tablet
- Staggered fade-in and card micro-interactions

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Customize your profile

Edit `src/data/profile.ts` to update:

- Name, bio, location, links
- Skills, projects, experience, achievements
- Stats, badges, and contact URLs

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/
│   ├── layout/      # Dashboard shell, theme toggle, chat FAB
│   ├── profile/     # Header, about, tech stack, projects
│   ├── sidebar/     # Identity, stats, experience, CTA cards
│   └── ui/          # Reusable Card, Button, SkillPill, etc.
├── data/profile.ts  # All portfolio content
├── hooks/useTheme.ts
└── lib/             # Motion variants, cn helper
```
