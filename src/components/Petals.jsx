import { useEffect, useRef } from 'react'

// Gentle falling marigold petals on a canvas (pauses when off-screen / reduced motion)
export default function Petals({ count = 26 }) {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = ref.current, ctx = c.getContext('2d')
    let w, h, raf, visible = true
    const colors = ['#F3B63F', '#E8932A', '#F6D26B', '#D9772B', '#F3E2A9']
    const size = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight }
    const mk = (init) => ({
      x: Math.random() * w, y: init ? Math.random() * h : -20, s: 5 + Math.random() * 9,
      vy: 0.35 + Math.random() * 0.8, vx: -0.2 + Math.random() * 0.6, a: Math.random() * 6.28,
      va: (Math.random() - 0.5) * 0.03, sw: Math.random() * 6.28, col: colors[(Math.random() * colors.length) | 0],
      o: 0.35 + Math.random() * 0.5,
    })
    size()
    const ps = Array.from({ length: count }, () => mk(true))
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(c)
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.sw += 0.02; p.x += p.vx + Math.sin(p.sw) * 0.6; p.y += p.vy; p.a += p.va
        if (p.y > h + 20) Object.assign(p, mk(false))
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.sin(p.sw)))
        ctx.globalAlpha = p.o; ctx.fillStyle = p.col
        ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 6.28); ctx.fill(); ctx.restore()
      }
    }
    tick()
    window.addEventListener('resize', size)
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', size) }
  }, [count])
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
}
