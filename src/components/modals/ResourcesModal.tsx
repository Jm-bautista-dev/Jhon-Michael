interface ResourcesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResourcesModal({ isOpen, onClose }: ResourcesModalProps) {
  if (!isOpen) return null

  const categories = [
    {
      title: 'Core Development Tools',
      items: [
        { name: 'Vite & React', desc: 'Ultra-fast frontend build tool and component architecture.', link: 'https://vitejs.dev/' },
        { name: 'Tailwind CSS v4', desc: 'Modern utility-first CSS framework with dynamic design tokens.', link: 'https://tailwindcss.com/' },
        { name: 'TypeScript', desc: 'Typed JavaScript at Any Scale for bulletproof web apps.', link: 'https://www.typescriptlang.org/' },
      ],
    },
    {
      title: 'Backend & Data',
      items: [
        { name: 'Node.js & Express', desc: 'High-performance JavaScript runtime for scalable backend microservices.', link: 'https://nodejs.org/' },
        { name: 'PostgreSQL & MySQL', desc: 'ACID-compliant relational database management systems.', link: 'https://www.postgresql.org/' },
        { name: 'Docker', desc: 'Containerization for consistent deployment environments.', link: 'https://www.docker.com/' },
      ],
    },
    {
      title: 'Design & Typography',
      items: [
        { name: 'Geist & Geist Pixel', desc: 'Precision-engineered fonts for developers and modern web systems.', link: 'https://vercel.com/font' },
        { name: 'DiceBear Avatars', desc: 'Procedurally generated notionist avatar SVGs for real-time presence.', link: 'https://www.dicebear.com/' },
      ],
    },
  ]

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-5" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-7 shadow-2xl dark:border-white/10 dark:bg-[#121215] animate-scale-up">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <p className="font-mono text-[11px] uppercase tracking-wider text-gray-400">Curated Kit</p>
        <h2 className="mt-2 font-pixel text-xl text-black dark:text-white">Developer Resources</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
          Hand-picked developer tools, frameworks, and packages I use daily for building fast, resilient applications.
        </p>

        <div className="mt-6 space-y-6">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-2.5">
                {cat.title}
              </h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-gray-200 dark:border-white/10 p-3 hover:border-black dark:hover:border-white transition-colors bg-gray-50/50 dark:bg-white/5"
                  >
                    <div>
                      <div className="text-[13px] font-semibold text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.desc}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-gray-400 group-hover:text-black dark:group-hover:text-white">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
