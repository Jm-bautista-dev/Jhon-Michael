import { useEffect, useRef, useState } from 'react'

interface ProfileGazeProps {
  avatarSrc: string
  name: string
  guidePos?: { x: number; y: number } | null
}

export function ProfileGaze({ avatarSrc, name, guidePos }: ProfileGazeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // If guide cursor is moving, look at guide cursor
    if (guidePos && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = guidePos.x - centerX
      const deltaY = guidePos.y - centerY
      const rotY = Math.max(-14, Math.min(14, deltaX / 40))
      const rotX = Math.max(-14, Math.min(14, -deltaY / 40))
      setRotation({ x: rotX, y: rotY })
      return
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Calculate subtle perspective tilt towards cursor
      const rotY = Math.max(-12, Math.min(12, deltaX / 55))
      const rotX = Math.max(-12, Math.min(12, -deltaY / 55))
      setRotation({ x: rotX, y: rotY })
    }

    const handlePointerLeave = () => {
      setRotation({ x: 0, y: 0 })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', handlePointerLeave)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', handlePointerLeave)
    }
  }, [guidePos])

  return (
    <div
      ref={containerRef}
      style={{
        perspective: '800px',
      }}
      className="relative group mx-auto w-full max-w-[18rem] select-none sm:mx-0"
    >
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(0)`,
          transition: guidePos ? 'transform 0.1s ease-out' : 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 shadow-md dark:border-white/10 dark:bg-white/5 transition-shadow duration-300 group-hover:shadow-xl will-change-transform"
      >
        <img
          src={avatarSrc}
          alt={name}
          width={400}
          height={400}
          loading="eager"
          decoding="async"
          className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          draggable={false}
        />
        {/* Subtle halftone overlay on bottom dissolve */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/20 to-transparent opacity-40 dark:from-black/60"
        />
      </div>
    </div>
  )
}
