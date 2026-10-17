interface HackathonsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HackathonsModal({ isOpen, onClose }: HackathonsModalProps) {
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

      <div className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-7 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-[#121215] z-10 animate-fade-in sm:p-8">
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

        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-gray-400">Competitions &amp; Honors</p>
            <h2 className="mt-3 font-pixel text-2xl leading-none text-black dark:text-white">
              Award <span className="text-gray-300 dark:text-gray-600">&amp;</span> Hackathon Wins
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400">Selected highlights</span>
        </div>

        {/* Featured Win 1 */}
        <div className="group mt-5 block overflow-hidden rounded-xl border border-black bg-black p-5 text-white dark:border-white/20 dark:bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-300">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4zM7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              2nd Place Winner · 2026
            </span>
            <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white">
              Featured
            </span>
          </div>
          <h3 className="mt-3 text-[17px] font-semibold">Cybersecurity CCSLYMPICS 2026</h3>
          <p className="mt-1.5 text-xs text-gray-300">
            Competed in network security, vulnerability defense, and penetration testing scenarios.
          </p>
        </div>

        {/* Featured Win 2 */}
        <div className="group mt-3 block overflow-hidden rounded-xl border border-black bg-black p-5 text-white dark:border-white/20 dark:bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-300">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4zM7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Champion · 2025
            </span>
            <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white">
              National
            </span>
          </div>
          <h3 className="mt-3 text-[17px] font-semibold">OpenGov Hackathon Champion</h3>
          <p className="mt-1.5 text-xs text-gray-300">
            DICT national initiative developing open governance tools and public sector digital workflows.
          </p>
        </div>

        <p className="mb-3 mt-7 font-mono text-[11px] uppercase tracking-wider text-gray-400">Other achievements</p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="flex flex-col rounded-xl border border-gray-200 p-3.5 dark:border-white/10 dark:hover:border-white/30 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-[13px] font-medium leading-snug text-black dark:text-white">PH100 List of Brightest Minds</h4>
              <span className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black">Honoree</span>
            </div>
            <span className="mt-auto pt-2.5 font-mono text-[10px] uppercase tracking-wider text-gray-400">StellarPH · 2025</span>
          </div>

          <div className="flex flex-col rounded-xl border border-gray-200 p-3.5 dark:border-white/10 dark:hover:border-white/30 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-[13px] font-medium leading-snug text-black dark:text-white">Major Capstone System Lead</h4>
              <span className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black">Lead Dev</span>
            </div>
            <span className="mt-auto pt-2.5 font-mono text-[10px] uppercase tracking-wider text-gray-400">Laguna University · 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}
