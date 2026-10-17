// Synthesized UI sound effects using Web Audio API (no external audio assets required)
class SoundManager {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  constructor() {
    try {
      this.enabled = localStorage.getItem('site_sounds') === 'true'
    } catch (e) {
      void e
      this.enabled = false
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public toggle(): boolean {
    this.enabled = !this.enabled
    try {
      localStorage.setItem('site_sounds', this.enabled ? 'true' : 'false')
    } catch (e) {
      void e
    }
    if (this.enabled) {
      this.play('toggle')
    }
    return this.enabled
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public play(type: 'click' | 'toggle' | 'chime' | 'success' | 'droplet' | 'pop' = 'click') {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const now = this.ctx.currentTime

      if (type === 'click' || type === 'pop') {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(type === 'pop' ? 520 : 380, now)
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.05)
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.05)
      } else if (type === 'toggle') {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(440, now)
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08)
        gain.gain.setValueAtTime(0.07, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.08)
      } else if (type === 'success' || type === 'chime') {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          if (!this.ctx) return
          const osc = this.ctx.createOscillator()
          const gain = this.ctx.createGain()
          osc.type = 'sine'
          const start = now + idx * 0.05
          osc.frequency.setValueAtTime(freq, start)
          gain.gain.setValueAtTime(0.06, start)
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25)
          osc.connect(gain)
          gain.connect(this.ctx.destination)
          osc.start(start)
          osc.stop(start + 0.25)
        })
      } else if (type === 'droplet') {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(1200, now)
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1)
        gain.gain.setValueAtTime(0.06, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.1)
      }
    } catch (e) {
      void e
    }
  }
}

export const soundManager = new SoundManager()
