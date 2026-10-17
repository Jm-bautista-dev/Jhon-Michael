import { soundManager } from '../../lib/sounds'

interface ConsultingModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenEmail: () => void
}

export function ConsultingModal({ isOpen, onClose, onOpenEmail }: ConsultingModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-5" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 shadow-2xl dark:border-white/10 dark:bg-[#121215] animate-scale-up">
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

        <p className="font-mono text-[11px] uppercase tracking-wider text-gray-400">Advisory &amp; Builds</p>
        <h2 className="mt-2 font-pixel text-xl text-black dark:text-white">Consulting &amp; Engineering</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
          Need a robust web application built, database architecture optimized, or security audit? I help teams ship from 0 to 1.
        </p>

        <div className="mt-5 space-y-2.5">
          <div className="rounded-xl border border-gray-200 dark:border-white/10 p-3.5 bg-gray-50 dark:bg-white/5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-black dark:text-white font-semibold">💼 Full-Stack Web Systems</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Modern React / Next.js interfaces backed by performant Node / Python / Laravel APIs and transactional SQL.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-white/10 p-3.5 bg-gray-50 dark:bg-white/5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-black dark:text-white font-semibold">🔒 POS, Inventory &amp; Analytics</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Reliable point-of-sale engines, real-time sales reporting, and automated stock deductions.
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => {
              soundManager.play('pop')
              onClose()
              onOpenEmail()
            }}
            className="flex-1 rounded-lg bg-black px-4 py-2.5 text-center font-mono text-xs font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer transition-colors"
          >
            Inquire for project ↵
          </button>
        </div>
      </div>
    </div>
  )
}
