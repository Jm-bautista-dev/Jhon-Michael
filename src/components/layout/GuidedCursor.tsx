import { useEffect, useRef, useState, useCallback } from 'react'

interface GuidedCursorProps {
  onLook?: (x: number, y: number) => void
  onReleaseGaze?: () => void
}

interface TourStep {
  targetSelector?: string
  text: string
  at?: 'above' | 'below' | 'right'
  free?: boolean
}

const TOUR_STEPS: TourStep[] = [
  { targetSelector: '[data-guide="name"]', at: 'above', text: "Hi! I'm Jhon Michael, welcome to my website! 👋" },
  { targetSelector: '[data-guide="socials"]', at: 'below', text: 'Here are my social links.' },
  { targetSelector: '[data-guide="stats"]', at: 'below', text: 'Click these for my projects, experience, and awards.' },
  { targetSelector: '#blog', at: 'above', text: 'I write about full-stack systems and engineering here.' },
  { targetSelector: '#projects', at: 'above', text: 'Check out my featured projects — click any side card to swap!' },
  { targetSelector: '#experience', at: 'above', text: 'Here is my experience and core tech stack.' },
  { targetSelector: '[data-guide="chat"]', at: 'right', text: 'Say hi in community chat. Visitors hang out here!' },
  { targetSelector: '[data-guide="email"]', at: 'right', text: "Here's my email — drop me a message anytime." },
  { free: true, text: "That's the tour. Scroll around and enjoy your stay! ✌️" },
]

export function GuidedCursor({ onLook, onReleaseGaze }: GuidedCursorProps) {
  const [isPromptVisible, setIsPromptVisible] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        return sessionStorage.getItem('portfolio_tour_prompt') !== 'off'
      }
    } catch (e) {
      void e
    }
    return false
  })
  const [isRunning, setIsRunning] = useState(false)
  const [bubbleText, setBubbleText] = useState('')
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [isTalking, setIsTalking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [bubblePlacement, setBubblePlacement] = useState<'default' | 'up' | 'left' | 'up-left'>('default')

  const isCancelledRef = useRef(false)
  const cursorPosRef = useRef({ x: -100, y: -100 })

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const stopTour = useCallback(() => {
    isCancelledRef.current = true
    setCursorVisible(false)
    setIsRunning(false)
    onReleaseGaze?.()
  }, [onReleaseGaze])

  // Cancel immediately if the user touches the mouse, scrolls, or presses Escape
  useEffect(() => {
    if (!isRunning) return

    const handleUserInterrupt = (e: Event) => {
      if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Escape') return
      stopTour()
    }

    window.addEventListener('wheel', handleUserInterrupt, { passive: true })
    window.addEventListener('pointerdown', handleUserInterrupt, { passive: true })
    window.addEventListener('keydown', handleUserInterrupt)

    return () => {
      window.removeEventListener('wheel', handleUserInterrupt)
      window.removeEventListener('pointerdown', handleUserInterrupt)
      window.removeEventListener('keydown', handleUserInterrupt)
    }
  }, [isRunning, stopTour])

  const typeMessage = useCallback(async (text: string) => {
    setIsTalking(true)
    setIsTyping(true)
    setBubbleText('')

    for (let i = 0; i < text.length; i++) {
      if (isCancelledRef.current) return
      setBubbleText(text.slice(0, i + 1))
      const char = text[i]
      let delay = 16 + Math.random() * 18
      if (/[.!?]/.test(char)) delay = 120
      else if (/[,:]/.test(char)) delay = 70
      else if (char === ' ' && Math.random() < 0.15) delay = 90
      await sleep(delay)
    }

    setIsTyping(false)
    await sleep(1500)
    if (isCancelledRef.current) return
    setIsTalking(false)
    setBubbleText('')
  }, [])

  const glideTo = useCallback(async (targetX: number, targetY: number, duration = 650) => {
    const startX = cursorPosRef.current.x < 0 ? window.innerWidth + 20 : cursorPosRef.current.x
    const startY = cursorPosRef.current.y < 0 ? window.innerHeight * 0.5 : cursorPosRef.current.y
    const startTime = performance.now()

    return new Promise<void>((resolve) => {
      const animate = (now: number) => {
        if (isCancelledRef.current) return resolve()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)

        const currentX = startX + (targetX - startX) * ease
        const currentY = startY + (targetY - startY) * ease

        cursorPosRef.current = { x: currentX, y: currentY }
        setCursorPos({ x: currentX, y: currentY })
        onLook?.(currentX, currentY)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          resolve()
        }
      }
      requestAnimationFrame(animate)
    })
  }, [onLook])

  const runTour = useCallback(async () => {
    if (window.innerWidth < 1024) return
    isCancelledRef.current = false
    setIsRunning(true)
    setCursorVisible(true)

    // Initial enter from right
    await glideTo(window.innerWidth * 0.7, window.innerHeight * 0.4, 700)
    await sleep(300)

    for (const step of TOUR_STEPS) {
      if (isCancelledRef.current) break

      let targetPos = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45 }

      if (step.targetSelector) {
        const el = document.querySelector(step.targetSelector)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (step.at === 'above') {
            targetPos = { x: rect.left + 24, y: rect.top - 20 }
          } else if (step.at === 'below') {
            targetPos = { x: rect.left + rect.width / 2, y: rect.bottom + 8 }
          } else {
            targetPos = { x: rect.right + 20, y: rect.top + rect.height / 2 }
          }
        }
      }

      // Check boundary flip
      const placeUp = targetPos.y > window.innerHeight * 0.7
      const placeLeft = targetPos.x > window.innerWidth * 0.65
      if (placeUp && placeLeft) setBubblePlacement('up-left')
      else if (placeUp) setBubblePlacement('up')
      else if (placeLeft) setBubblePlacement('left')
      else setBubblePlacement('default')

      await glideTo(targetPos.x, targetPos.y, 650)
      await sleep(150)
      await typeMessage(step.text)
      await sleep(350)
    }

    // Exit gracefully to right edge
    if (!isCancelledRef.current) {
      await glideTo(window.innerWidth + 90, window.innerHeight * 0.35, 700)
    }
    setCursorVisible(false)
    setIsRunning(false)
    onReleaseGaze?.()
  }, [glideTo, typeMessage, onReleaseGaze])

  // Only auto-run if explicitly requested via ?tour=true in URL,
  // otherwise visitors browse peacefully and can click "take the tour again"
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('tour')) {
        const timer = setTimeout(() => {
          runTour()
        }, 800)
        return () => clearTimeout(timer)
      }
    } catch (e) {
      void e
    }
  }, [runTour])

  const handleDismissPrompt = () => {
    setIsPromptVisible(false)
    try {
      sessionStorage.setItem('portfolio_tour_prompt', 'off')
    } catch (e) {
      void e
    }
  }

  const handleReplay = () => {
    runTour()
  }

  return (
    <>
      {/* ── Guided Cursor (Desktop) ── */}
      {cursorVisible && (
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${cursorPos.x.toFixed(1)}px, ${cursorPos.y.toFixed(1)}px, 0)`,
          }}
          className="pointer-events-none fixed left-0 top-0 z-90 transition-opacity duration-300 will-change-transform hidden lg:block"
        >
          {/* Mouse Arrow SVG */}
          <svg className="absolute -left-1 -top-1 h-6 w-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24" fill="none">
            <path
              className="stroke-white dark:stroke-[#0c0c0f]"
              strokeWidth="6"
              strokeLinejoin="round"
              d="M5.5 5.5l3.9 11.7 2.2-5.6 5.6-2.2-11.7-3.9z"
            />
            <path
              className="fill-black stroke-black dark:fill-white dark:stroke-white"
              strokeWidth="3.5"
              strokeLinejoin="round"
              d="M5.5 5.5l3.9 11.7 2.2-5.6 5.6-2.2-11.7-3.9z"
            />
          </svg>

          {/* Name Tag & Properly-Proportioned Speech Bubble */}
          <div
            className={`absolute left-0 top-0 w-max min-w-[180px] max-w-[280px] flex flex-col items-start px-3.5 py-2.5 bg-black text-white dark:bg-white dark:text-black shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 ${
              bubblePlacement === 'up'
                ? 'translate-x-4 -translate-y-[calc(100%+8px)] rounded-[16px_16px_16px_6px]'
                : bubblePlacement === 'left'
                ? '-translate-x-[calc(100%+8px)] translate-y-5 rounded-[16px_6px_16px_16px]'
                : bubblePlacement === 'up-left'
                ? '-translate-x-[calc(100%+8px)] -translate-y-[calc(100%+8px)] rounded-[16px_16px_6px_16px]'
                : 'translate-x-4 translate-y-5 rounded-[6px_16px_16px_16px]'
            }`}
          >
            <span className="whitespace-nowrap font-sans text-[11px] font-semibold tracking-wider uppercase opacity-65">
              Jhon Michael
            </span>

            {isTalking && (
              <div className="mt-1.5 w-full font-mono text-[12.5px] leading-relaxed whitespace-normal break-words">
                <span>{bubbleText}</span>
                {isTyping && (
                  <span className="inline-block h-3.5 w-1 bg-current ml-1 animate-pulse align-middle" />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Replay Tour Floating Pill (Desktop) ── */}
      {isPromptVisible && !isRunning && (
        <div
          role="region"
          aria-label="Interactive guide prompt"
          className="fixed bottom-5 left-[calc(50%+7rem)] -translate-x-1/2 z-80 hidden lg:flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/92 px-2 py-1 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-[#0c0c0f]/92 animate-fade-in"
        >
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11.5px] text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
              <path d="M13 8a5 5 0 11-1.6-3.7M13 2.5v2.6h-2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            take the tour again
          </button>
          <button
            type="button"
            onClick={handleDismissPrompt}
            aria-label="Dismiss tour prompt"
            className="inline-flex h-5 w-5 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-black dark:hover:bg-white/10 dark:hover:text-white cursor-pointer transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
