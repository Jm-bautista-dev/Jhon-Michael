import { AnimatePresence, motion } from 'framer-motion'
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import emailjs from '@emailjs/browser'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'

const SERVICE_ID = 'service_8o5bdoa'
const TEMPLATE_ID = 'template_mp0emk8'
const PUBLIC_KEY = 'ETO9sWWdkSkwuxj_2' // Replace with your EmailJS public key

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  recipientEmail: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactModal({ isOpen, onClose, recipientEmail }: ContactModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleClose = useCallback(() => {
    if (status === 'sending') return
    onClose()
    setTimeout(() => {
      setStatus('idle')
      setForm({ name: '', email: '', message: '' })
    }, 300)
  }, [status, onClose])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    try {
      console.log('Sending message via EmailJS...', {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        params: {
          name: form.name,
          from_name: form.name,
          email: form.email,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        }
      })

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          from_name: form.name,
          email: form.email,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      )

      console.log('EmailJS response success:', response)
      setStatus('success')
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-border bg-surface shadow-2xl dark:border-white/10 dark:bg-[#111111]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4 dark:border-white/10">
              <div>
                <h2 className="text-sm font-bold text-foreground">Send a Message</h2>
                <p className="text-[11px] text-muted mt-0.5 font-mono">{recipientEmail}</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={status === 'sending'}
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:opacity-40"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Success State */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 px-6 py-12 text-center"
              >
                <CheckCircle className="h-12 w-12 text-emerald-500" />
                <h3 className="text-base font-bold text-foreground">Message Sent!</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-2 rounded-xl bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              /* Form */
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
                {/* Error banner */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs text-red-600 dark:text-red-400"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>Failed to send. Please try again or email me directly.</span>
                  </motion.div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    placeholder="Your full name"
                    className={cn(
                      'w-full rounded-xl border border-border bg-surface-muted px-3.5 py-2.5 text-sm text-foreground',
                      'placeholder:text-muted/50 outline-none transition-colors',
                      'focus:border-accent/60 focus:ring-1 focus:ring-accent/20',
                      'dark:border-white/10 dark:bg-white/5 dark:focus:border-accent/50',
                      'disabled:opacity-50',
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    placeholder="your@email.com"
                    className={cn(
                      'w-full rounded-xl border border-border bg-surface-muted px-3.5 py-2.5 text-sm text-foreground',
                      'placeholder:text-muted/50 outline-none transition-colors',
                      'focus:border-accent/60 focus:ring-1 focus:ring-accent/20',
                      'dark:border-white/10 dark:bg-white/5 dark:focus:border-accent/50',
                      'disabled:opacity-50',
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    placeholder="What's on your mind?"
                    className={cn(
                      'w-full resize-none rounded-xl border border-border bg-surface-muted px-3.5 py-2.5 text-sm text-foreground',
                      'placeholder:text-muted/50 outline-none transition-colors',
                      'focus:border-accent/60 focus:ring-1 focus:ring-accent/20',
                      'dark:border-white/10 dark:bg-white/5 dark:focus:border-accent/50',
                      'disabled:opacity-50',
                    )}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={status === 'sending'}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:opacity-40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2 text-sm font-medium text-white shadow-sm shadow-accent/20 transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
