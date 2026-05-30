import { motion } from 'framer-motion'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { Certification } from '../../types'
import { isPdfAsset } from '../../lib/certificates'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { CertificateSkeleton } from './CertificateSkeleton'

const ZOOM_LEVELS = [1, 1.15, 1.3] as const

interface CertificatePreviewProps {
  certification: Certification
}

export function CertificatePreview({ certification }: CertificatePreviewProps) {
  const previewSrc = certification.image ?? certification.pdf
  const isPdf = isPdfAsset(previewSrc)

  const [loaded, setLoaded] = useState(false)
  const [zoomIndex, setZoomIndex] = useState(0)
  const scale = ZOOM_LEVELS[zoomIndex]

  useEffect(() => {
    setLoaded(false)
    setZoomIndex(0)
    if (!isPdf) return
    const timer = setTimeout(() => setLoaded(true), 600)
    return () => clearTimeout(timer)
  }, [certification.id, previewSrc, isPdf])

  const zoomIn = useCallback(() => {
    setZoomIndex((i) => Math.min(i + 1, ZOOM_LEVELS.length - 1))
  }, [])

  const zoomOut = useCallback(() => {
    setZoomIndex((i) => Math.max(i - 1, 0))
  }, [])

  return (
    <div className="relative flex h-full min-h-[320px] flex-col md:min-h-[480px]">
      <div className="absolute right-3 top-3 z-10 flex gap-1">
        <button
          type="button"
          onClick={zoomOut}
          disabled={zoomIndex === 0}
          aria-label="Zoom out"
          className="rounded-lg border border-border bg-surface/90 p-2 text-muted shadow-sm backdrop-blur transition-colors hover:text-foreground disabled:opacity-40"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={zoomIn}
          disabled={zoomIndex === ZOOM_LEVELS.length - 1}
          aria-label="Zoom in"
          className="rounded-lg border border-border bg-surface/90 p-2 text-muted shadow-sm backdrop-blur transition-colors hover:text-foreground disabled:opacity-40"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-auto rounded-xl border border-border bg-surface-muted/50 p-2 sm:p-4"
        style={!isPdf ? { transform: `scale(${scale})`, transformOrigin: 'center center' } : undefined}
      >
        {!loaded && <CertificateSkeleton className="absolute inset-2 sm:inset-4" />}

        {isPdf ? (
          <motion.iframe
            key={previewSrc}
            src={`${previewSrc}#view=FitH&toolbar=0`}
            title={`${certification.title} certificate`}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            onLoad={() => setLoaded(true)}
            className={cn(
              'h-[min(70vh,560px)] w-full rounded-lg bg-white shadow-md ring-1 ring-border/60',
              !loaded && 'invisible absolute h-0 w-0',
            )}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              minHeight: '420px',
            }}
          />
        ) : (
          <motion.img
            key={previewSrc}
            src={previewSrc}
            alt={`${certification.title} certificate`}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            onLoad={() => setLoaded(true)}
            className={cn(
              'max-h-[min(70vh,520px)] w-auto max-w-full rounded-lg object-contain shadow-md ring-1 ring-border/60',
              !loaded && 'invisible absolute h-0 w-0',
            )}
          />
        )}
      </div>

      <p className="mt-2 text-center text-xs text-muted">
        {isPdf ? 'PDF viewer' : 'Image preview'} · Zoom {Math.round(scale * 100)}%
      </p>
    </div>
  )
}
