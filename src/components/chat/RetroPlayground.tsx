import { useEffect, useRef } from 'react'

interface RetroPlaygroundProps {
  playerName: string
}

export function RetroPlayground({ playerName }: RetroPlaygroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const TILE = 24
    const MAP_COLS = 16
    const MAP_ROWS = 6

    // Player state
    const player = {
      x: 3 * TILE,
      y: 3 * TILE,
      targetX: 3 * TILE,
      targetY: 3 * TILE,
      color: '#000000',
    }

    // NPCs (empty - real visitors only)
    const npcs: { x: number; y: number; name: string; emoji: string }[] = []

    // Furniture (desks)
    const desks = [
      { x: 6 * TILE, y: 2 * TILE },
      { x: 11 * TILE, y: 3 * TILE },
    ]

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = TILE
      if (['ArrowUp', 'w', 'W'].includes(e.key)) {
        player.targetY = Math.max(TILE, player.targetY - step)
      } else if (['ArrowDown', 's', 'S'].includes(e.key)) {
        player.targetY = Math.min((MAP_ROWS - 2) * TILE, player.targetY + step)
      } else if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        player.targetX = Math.max(TILE, player.targetX - step)
      } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        player.targetX = Math.min((MAP_COLS - 2) * TILE, player.targetX + step)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    const render = () => {
      // Smooth movement interpolation
      player.x += (player.targetX - player.x) * 0.2
      player.y += (player.targetY - player.y) * 0.2

      const isDark = document.documentElement.classList.contains('dark')

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw Grid Floor
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'
      ctx.lineWidth = 1

      for (let x = 0; x <= canvas.width; x += TILE) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y <= canvas.height; y += TILE) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw Desks
      for (const d of desks) {
        ctx.fillStyle = isDark ? '#26262a' : '#e5e7eb'
        ctx.fillRect(d.x, d.y, TILE * 1.6, TILE * 0.9)
        ctx.strokeStyle = isDark ? '#3f3f46' : '#d1d5db'
        ctx.strokeRect(d.x, d.y, TILE * 1.6, TILE * 0.9)
        // Little monitor
        ctx.fillStyle = isDark ? '#71717a' : '#9ca3af'
        ctx.fillRect(d.x + 6, d.y + 4, 12, 8)
      }

      // Draw NPCs
      for (const npc of npcs) {
        ctx.font = '14px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(npc.emoji, npc.x + TILE / 2, npc.y + TILE * 0.75)

        // NPC Name tag
        ctx.font = '9px monospace'
        ctx.fillStyle = isDark ? '#a1a1aa' : '#6b7280'
        ctx.fillText(npc.name, npc.x + TILE / 2, npc.y - 4)
      }

      // Draw Player Character
      ctx.font = '16px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('👾', player.x + TILE / 2, player.y + TILE * 0.8)

      // Player Name tag
      ctx.font = 'bold 9.5px monospace'
      ctx.fillStyle = isDark ? '#ffffff' : '#000000'
      ctx.fillText(playerName || 'You', player.x + TILE / 2, player.y - 4)

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      cancelAnimationFrame(animId)
    }
  }, [playerName])

  return (
    <div className="relative mb-3 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/70 dark:bg-black/40 p-2">
      <div className="mb-1 flex items-center justify-between px-1 text-[10px] font-mono text-gray-400">
        <span>🎮 Pixel Lounge</span>
        <span>Use WASD / Arrows to walk</span>
      </div>
      <canvas
        ref={canvasRef}
        width={384}
        height={144}
        className="block w-full h-30 rounded-lg cursor-crosshair bg-white/60 dark:bg-white/5"
      />
    </div>
  )
}
