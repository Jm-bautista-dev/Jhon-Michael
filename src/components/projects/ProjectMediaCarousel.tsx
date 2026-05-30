import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'

interface ProjectMediaCarouselProps {
  images: string[]
  alt: string
  autoPlay?: boolean
}

export function ProjectMediaCarousel({ images, alt, autoPlay = false }: ProjectMediaCarouselProps) {
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const [isFullscreen, setIsFullscreen] = useState(false)

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [autoPlay, images.length, index])

  // Keyboard navigation & close controls for fullscreen
  useEffect(() => {
    if (!isFullscreen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false)
      } else if (e.key === 'ArrowRight') {
        go(1)
      } else if (e.key === 'ArrowLeft') {
        go(-1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, go])

  const current = images[index]

  const getImageUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path
    }
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const base = import.meta.env.BASE_URL
    const formattedBase = base.endsWith('/') ? base : `${base}/`
    return `${formattedBase}${cleanPath}`
  }

  return (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-card-dark sm:aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={getImageUrl(current)}
            alt={`${alt} screenshot ${index + 1}`}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: loaded[index] ? 1 : 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            onLoad={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
            onClick={() => setIsFullscreen(true)}
            className="absolute inset-0 h-full w-full object-cover cursor-zoom-in"
          />
        </AnimatePresence>

        {!loaded[index] && (
          <div className="absolute inset-0 animate-pulse bg-card-dark-muted" aria-hidden />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur transition-colors hover:bg-black/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur transition-colors hover:bg-black/50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to screenshot ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {createPortal(
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsFullscreen(false)}
              className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFullscreen(false)
                }}
                aria-label="Close fullscreen view"
                className="absolute right-6 top-6 z-50 rounded-full border border-white/20 bg-black/40 p-2 text-white transition-colors hover:bg-black/60 hover:border-white/40 cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Fullscreen Image */}
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: easeOut }}
                src={getImageUrl(current)}
                alt={`${alt} screenshot fullscreen`}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-[95vw] rounded-xl object-contain shadow-2xl select-none"
              />

              {/* Helpers Info bar */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-white/60 select-none bg-black/35 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur">
                Screenshot {index + 1} of {images.length} · Use <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white text-[10px]">Esc</kbd> to close or <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white text-[10px]">←</kbd> <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white text-[10px]">→</kbd> to navigate
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
