import React, { useRef, useState } from 'react'

export function AccessCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [shimmer, setShimmer] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left // Mouse position inside card
    const y = e.clientY - rect.top

    // Calculate percentage coords for gradient shimmer
    const px = (x / rect.width) * 100
    const py = (y / rect.height) * 100
    setShimmer({ x: px, y: py })

    // Calculate rotation (-15 to 15 degrees)
    const rx = -((y - rect.height / 2) / (rect.height / 2)) * 15
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 15
    setRotate({ x: rx, y: ry })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  return (
    <div className="flex justify-center w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="card-hover-shimmer-parent relative w-full max-w-[260px] overflow-hidden rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] cursor-pointer"
        style={{
          transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${
            isHovered ? 'translateY(-2px)' : ''
          }`,
          aspectRatio: '3 / 4',
          '--mouse-x': `${shimmer.x}%`,
          '--mouse-y': `${shimmer.y}%`,
        } as React.CSSProperties}
        role="button"
        tabIndex={0}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 rounded-[12px]"
          style={{
            background:
              'linear-gradient(203.33deg, rgb(17, 17, 17) 1.16%, rgb(40, 40, 40) 14.27%, rgb(80, 80, 80) 34.09%, rgb(55, 55, 55) 53.64%, rgb(30, 30, 30) 80.17%, rgb(10, 10, 10) 100%)',
          }}
        />

        {/* Borders and Shimmers */}
        <div className="card-border-shimmer absolute inset-0 rounded-[12px]" />
        <div className="card-hover-shimmer pointer-events-none absolute inset-0 rounded-[12px]" />
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[12px] border border-white/10" />

        {/* Content Card Body */}
        <div className="absolute left-[20px] top-[25px] right-[20px] z-10 flex flex-col text-left select-none">
          {/* Terminal Icon (Pure SVG fallback for portability) */}
          <svg
            className="w-8 h-8 text-white opacity-95 mb-2.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>

          <p className="text-[14px] font-bold tracking-tight text-white uppercase font-mono">
            DEV PROFILE
          </p>
          <p className="mt-[1px] text-[9px] font-mono font-medium uppercase tracking-[0.08em] text-accent">
            Aspiring Full-Stack
          </p>

          <div className="mt-[20px] space-y-2">
            <div>
              <p className="text-[7.5px] font-mono uppercase tracking-[0.08em] text-white/40">Role</p>
              <p className="text-[10px] font-sans font-semibold text-white">Frontend Developer</p>
            </div>
            <div>
              <p className="text-[7.5px] font-mono uppercase tracking-[0.08em] text-white/40">Location</p>
              <p className="text-[10px] font-sans font-semibold text-white">Philippines 🇵🇭</p>
            </div>
            <div>
              <p className="text-[7.5px] font-mono uppercase tracking-[0.08em] text-white/40">Focus</p>
              <p className="text-[10px] font-sans font-semibold text-white leading-tight">React, UI/UX, Web Systems</p>
            </div>
            <div>
              <p className="text-[7.5px] font-mono uppercase tracking-[0.08em] text-white/40">Experience</p>
              <p className="text-[10px] font-sans font-semibold text-white">Personal + Academic</p>
            </div>
          </div>
        </div>

        {/* Developer Footer */}
        <p className="absolute bottom-[20px] left-[20px] right-[60px] z-10 text-[8.5px] font-mono font-medium uppercase tracking-[0.08em] text-emerald-400 select-none">
          Active: Open for Roles
        </p>

        {/* QR Code Icon (Pure SVG fallback) */}
        <div className="absolute bottom-[20px] right-[20px] z-10 opacity-40">
          <svg
            className="w-11 h-11 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
            <line x1="17" y1="7" x2="17.01" y2="7" />
            <line x1="7" y1="17" x2="7.01" y2="17" />
            {/* Small random blocks to look like QR data */}
            <line x1="14" y1="17" x2="14.01" y2="17" />
            <line x1="17" y1="14" x2="17.01" y2="14" />
            <line x1="18" y1="18" x2="18.01" y2="18" />
          </svg>
        </div>
      </div>
    </div>
  )
}
