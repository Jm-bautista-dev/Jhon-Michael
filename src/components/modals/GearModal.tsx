interface GearModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GearModal({ isOpen, onClose }: GearModalProps) {
  if (!isOpen) return null

  const gearItems = [
    { category: 'Hardware', title: 'Windows Dev Workstation', desc: '16GB RAM · Fast NVMe SSD · Multi-Monitor setup' },
    { category: 'Editor & Shell', title: 'VS Code + Antigravity IDE', desc: 'Geist Mono · Tokyo Night / Dark Minimal · PowerShell & WSL' },
    { category: 'Tooling', title: 'Git, Vite, Node.js, Python, Docker', desc: 'Modern fast build pipelines and containerized testing' },
    { category: 'Database & Backend', title: 'MySQL Workbench & TablePlus', desc: 'Relational data modeling, indexing, and query optimization' },
  ]

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative max-h-[88vh] w-full max-w-md overflow-y-auto rounded-2xl border border-gray-200 bg-white p-7 shadow-2xl dark:border-white/10 dark:bg-[#121215] z-10 animate-fade-in">
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

        <p className="font-mono text-[11px] uppercase tracking-wider text-gray-400">Setup &amp; Tools</p>
        <h2 className="mt-3 font-pixel text-xl leading-none text-black dark:text-white">Gear &amp; Workspace</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
          The software and hardware I use every day to build web apps and systems.
        </p>

        <div className="mt-5 space-y-3">
          {gearItems.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 p-3.5 dark:border-white/10 dark:bg-white/5"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                {item.category}
              </span>
              <h3 className="mt-1 text-sm font-semibold text-black dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
