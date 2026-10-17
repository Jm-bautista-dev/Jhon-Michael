interface CommunityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CommunityModal({ isOpen, onClose }: CommunityModalProps) {
  if (!isOpen) return null

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

      <div className="relative w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-7 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-[#121215] z-10 animate-fade-in">
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

        <p className="font-mono text-[11px] uppercase tracking-wider text-gray-400">Community</p>
        <h2 className="mt-3 font-pixel text-xl leading-none text-black dark:text-white">Community &amp; Reach</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
          Where I build, collaborate, and share with fellow developers.
        </p>

        <div className="mt-5 space-y-2">
          <a
            href="https://github.com/Jm-bautista-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-lg border border-gray-200 p-3 hover:border-black dark:border-white/10 dark:hover:border-white transition-colors"
          >
            <span className="text-[14px] font-medium text-black dark:text-white">GitHub</span>
            <span className="flex items-center gap-1.5 font-mono text-[12px] text-gray-400 group-hover:text-black dark:group-hover:text-white">
              @Jm-bautista-dev
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/jm-bautista-842787329/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-lg border border-gray-200 p-3 hover:border-black dark:border-white/10 dark:hover:border-white transition-colors"
          >
            <span className="text-[14px] font-medium text-black dark:text-white">LinkedIn</span>
            <span className="flex items-center gap-1.5 font-mono text-[12px] text-gray-400 group-hover:text-black dark:group-hover:text-white">
              JM Bautista
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <p className="mb-3 mt-6 font-mono text-[11px] uppercase tracking-wider text-gray-400">Affiliation &amp; Group</p>
        <div className="block rounded-xl border border-black bg-black p-4 text-white dark:border-white/20 dark:bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-300">Student &amp; Developer</span>
            <span className="text-gray-300">🇵🇭</span>
          </div>
          <h3 className="mt-3 text-[16px] font-semibold">Laguna University IT &amp; Dev</h3>
          <span className="mt-1.5 block font-mono text-[12px] text-gray-300">Full-Stack &amp; Business Analytics</span>
        </div>
      </div>
    </div>
  )
}
