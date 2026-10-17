import { useState } from 'react'
import { soundManager } from '../../lib/sounds'

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export function EmailModal({ isOpen, onClose, email }: EmailModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      soundManager.play('success')
      setTimeout(() => setCopied(false), 1800)
    }).catch(() => {
      soundManager.play('droplet')
    })
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Email panel */}
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

        <p className="font-mono text-[11px] uppercase tracking-wider text-gray-400">Get in touch</p>
        <h2 className="mt-3 font-pixel text-xl leading-none text-black dark:text-white">say hello</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
          For work, collabs, or just to say hi — drop me a line.
        </p>

        <div className="mt-5 flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-1.5 dark:border-white/10 dark:bg-white/5">
          <span className="flex-1 truncate px-2 font-mono text-[13px] text-black dark:text-white">{email}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-md bg-black px-3 py-1.5 text-[12px] font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer transition-colors"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <a
          href={`mailto:${email}`}
          className="mt-3 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-black hover:border-black dark:border-white/20 dark:text-white dark:hover:border-white transition-colors"
        >
          Open mail app
        </a>
      </div>
    </div>
  )
}
