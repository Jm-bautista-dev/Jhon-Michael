import { useEffect, useRef, useState } from 'react'
import { soundManager } from '../../lib/sounds'

interface TypingTestOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const SAMPLE_TEXT = 'turning rough ideas into things people actually use with typescript react and python'

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

export function TypingTestOverlay({ isOpen, onClose }: TypingTestOverlayProps) {
  const [typed, setTyped] = useState('')
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    soundManager.play('pop')
    const timer = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.altKey) && e.code === 'KeyJ') {
        e.preventDefault()
        if (isOpen) onClose()
      } else if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (isFinished) return

    soundManager.play('click')

    if (!startTime) {
      setStartTime(Date.now())
    }

    const lastChar = val.slice(-1).toLowerCase()
    setActiveKey(lastChar)
    setTimeout(() => setActiveKey(null), 120)

    setTyped(val)

    if (val === SAMPLE_TEXT || val.length >= SAMPLE_TEXT.length) {
      setIsFinished(true)
      const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000
      const words = val.trim().split(/\s+/).length
      setWpm(Math.round(words / Math.max(elapsedMinutes, 0.05)))
      soundManager.play('success')
    } else if (startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 60000
      const words = val.trim().split(/\s+/).length
      setWpm(Math.round(words / Math.max(elapsedMinutes, 0.05)))
    }
  }

  const resetTest = () => {
    setTyped('')
    setStartTime(null)
    setWpm(0)
    setIsFinished(false)
    inputRef.current?.focus()
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-white/85 backdrop-blur-xl dark:bg-[#0c0c0f]/85"
        onClick={onClose}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-xl text-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer font-mono text-xs"
        >
          [esc to close]
        </button>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-gray-400">Typing speed</span>
          <h2 className="mt-2 font-pixel text-2xl sm:text-3xl text-black dark:text-white">
            {isFinished ? `${wpm} WPM · Complete!` : 'type the text below'}
          </h2>
        </div>

        {/* Text sample with highlights */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-left font-mono text-sm sm:text-base leading-relaxed dark:border-white/10 dark:bg-white/5 w-full">
          {SAMPLE_TEXT.split('').map((char, idx) => {
            let color = 'text-gray-400'
            if (idx < typed.length) {
              color = typed[idx] === char ? 'text-emerald-500 font-semibold' : 'text-red-500 bg-red-100 dark:bg-red-950/50'
            } else if (idx === typed.length) {
              color = 'text-black dark:text-white underline font-bold'
            }
            return (
              <span key={idx} className={color}>
                {char}
              </span>
            )
          })}
        </div>

        {/* Hidden input taking actual typing */}
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={handleInputChange}
          className="opacity-0 absolute h-0 w-0"
          autoFocus
        />

        {/* Virtual Keyboard */}
        <div className="w-full space-y-1.5 pt-2">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1.5">
              {row.map((k) => (
                <div
                  key={k}
                  className={`k-key w-8 sm:w-10 ${activeKey === k ? 'is-hit' : ''}`}
                >
                  {k}
                </div>
              ))}
            </div>
          ))}
          <div className="flex justify-center pt-1">
            <div className={`k-key w-48 sm:w-64 ${activeKey === ' ' ? 'is-hit' : ''}`}>
              space
            </div>
          </div>
        </div>

        {/* Restart button */}
        <button
          type="button"
          onClick={resetTest}
          className="font-mono text-xs text-gray-500 hover:text-black dark:hover:text-white underline cursor-pointer"
        >
          restart test ↵
        </button>
      </div>
    </div>
  )
}
