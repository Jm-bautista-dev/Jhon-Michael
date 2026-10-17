import { useEffect, useRef, useState } from 'react'
import { soundManager } from '../../lib/sounds'
import { RetroPlayground } from '../chat/RetroPlayground'

interface ChatMessage {
  id: string
  name: string
  message: string
  time: string
  avatarSeed: string
  location?: string
}

interface CommunityChatOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    name: 'Bryl Lim',
    message: 'welcome to the site! say hi or leave a message 🙌',
    time: '2h ago',
    avatarSeed: 'Bryl',
    location: 'Metro Manila 🇵🇭',
  },
  {
    id: '2',
    name: 'Alex D.',
    message: 'Maki Desu POS looks super clean! Great architecture.',
    time: '1h ago',
    avatarSeed: 'Alex',
    location: 'Singapore 🇸🇬',
  },
  {
    id: '3',
    name: 'Maria Santos',
    message: 'Love the minimalist monochrome look! Congrats on the CCSLYMPICS win 🏆',
    time: '35m ago',
    avatarSeed: 'Maria',
    location: 'Laguna 🇵🇭',
  },
]

export function CommunityChatOverlay({ isOpen, onClose }: CommunityChatOverlayProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_chat_messages')
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES
    } catch (e) {
      void e
      return INITIAL_MESSAGES
    }
  })
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem('portfolio_chat_name') || ''
    } catch (e) {
      void e
      return ''
    }
  })
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'name' | 'message'>(() => {
    try {
      return localStorage.getItem('portfolio_chat_name') ? 'message' : 'name'
    } catch (e) {
      void e
      return 'name'
    }
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    soundManager.play('pop')
    const timer = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phase === 'name') {
      const trimmed = name.trim()
      if (!trimmed) return
      try {
        localStorage.setItem('portfolio_chat_name', trimmed)
      } catch (e) {
        void e
      }
      setPhase('message')
      soundManager.play('toggle')
      setTimeout(() => inputRef.current?.focus(), 50)
      return
    }

    const trimmedMsg = text.trim()
    if (!trimmedMsg) return

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      name: name || 'Guest',
      message: trimmedMsg,
      time: 'just now',
      avatarSeed: name || 'Guest',
      location: 'Philippines 🇵🇭',
    }

    const updated = [...messages, newMsg]
    setMessages(updated)
    try {
      localStorage.setItem('portfolio_chat_messages', JSON.stringify(updated))
    } catch (e) {
      void e
    }

    setText('')
    soundManager.play('success')
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-end p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full sm:h-[88vh] w-full max-w-md flex-col border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#121215] sm:rounded-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4 mb-3">
          <div>
            <h2 className="font-pixel text-lg text-black dark:text-white">community chat</h2>
            <p className="font-mono text-[11px] text-gray-400">say hi or leave feedback</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 2D Retro Canvas Lounge */}
        <RetroPlayground playerName={name || 'Visitor'} />

        {/* Message list */}
        <div className="flex-1 space-y-4 overflow-y-auto py-4 pr-1">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-3">
              <img
                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(m.avatarSeed)}&radius=50&backgroundColor=f1f1f1`}
                alt=""
                className="h-8 w-8 shrink-0 rounded-full bg-gray-100 border border-gray-200 dark:border-white/10"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5 font-mono text-[11px]">
                  <span className="font-semibold text-black dark:text-white truncate">{m.name}</span>
                  {m.location && <span className="text-gray-400">· {m.location}</span>}
                  <span className="text-gray-400">· {m.time}</span>
                </div>
                <div className="mt-1 inline-block rounded-xl rounded-tl-sm bg-gray-100 dark:bg-white/10 px-3.5 py-2 text-[13px] text-black dark:text-white leading-relaxed">
                  {m.message}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-white/10 pt-3">
          <div className="font-mono text-[11px] text-gray-500 mb-1.5">
            {phase === 'name' ? "what's your name?" : `say something, ${name}…`}
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={phase === 'name' ? name : text}
              onChange={(e) => (phase === 'name' ? setName(e.target.value) : setText(e.target.value))}
              placeholder={phase === 'name' ? 'your name' : 'say something…'}
              maxLength={phase === 'name' ? 40 : 400}
              className="flex-1 rounded-lg border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5 px-3 py-2 font-mono text-sm text-black dark:text-white outline-none focus:border-black dark:focus:border-white"
            />
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 font-mono text-xs font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer transition-colors"
            >
              {phase === 'name' ? 'next ↵' : 'send ↵'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
