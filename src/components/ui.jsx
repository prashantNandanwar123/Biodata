import { Children, cloneElement, useEffect, useRef, useState } from 'react'
import Mandala from './Mandala'

export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen]
}

export function Reveal({ children, className = '', delay = 0, dir = '' }) {
  const [ref, seen] = useInView(0.12)
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${dir === 'left' ? 'reveal-left' : dir === 'right' ? 'reveal-right' : ''} ${seen ? 'show' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function CountUp({ to, suffix = '' }) {
  const [ref, seen] = useInView(0.4)
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!seen) return
    let raf, t0
    const step = (t) => {
      t0 ??= t
      const p = Math.min((t - t0) / 1400, 1)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return <span ref={ref}>{v}{suffix}</span>
}

export function Ornament({ light = false }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${light ? 'text-gold-soft' : 'text-gold'}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-current sm:w-24" />
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M12 2c1.5 3 1.5 6 0 9-1.5-3-1.5-6 0-9zm0 11c1.5 3 1.5 6 0 9-1.5-3-1.5-6 0-9zM2 12c3-1.5 6-1.5 9 0-3 1.5-6 1.5-9 0zm11 0c3-1.5 6-1.5 9 0-3 1.5-6 1.5-9 0z" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-current sm:w-24" />
    </div>
  )
}

export function Section({ id, title, sub, children, tint = false }) {
  return (
    <section id={id} className={`relative overflow-hidden px-5 py-24 ${tint ? 'bg-sand/60 dots' : ''}`}>
      <Mandala className={`pointer-events-none absolute -top-40 h-[36rem] w-[36rem] text-gold/[0.12] spin-rev ${tint ? '-left-60' : '-right-60'}`} />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            {sub && <p className="font-display text-xl text-gold">{sub}</p>}
            <h2 className="mt-1 font-display text-4xl font-semibold text-maroon sm:text-6xl">{title}</h2>
            <div className="mb-14 mt-5"><Ornament /></div>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

// 3D tilt that follows the pointer (mouse only)
function useTilt() {
  const ref = useRef(null)
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current, r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateZ(0)`
  }
  const leave = () => { ref.current.style.transform = '' }
  return { ref, onPointerMove: move, onPointerLeave: leave }
}

// Renders nothing when the value is empty
export function InfoCard({ icon: Icon, label, value, href, delay = 0 }) {
  const tilt = useTilt()
  if (!value || (Array.isArray(value) && !value.length)) return null
  const text = Array.isArray(value) ? value.join(', ') : value
  return (
    <Reveal delay={delay} className="h-full">
      <div {...tilt} style={{ transition: 'transform .25s ease-out, box-shadow .4s, border-color .4s' }} className="card-premium flex h-full gap-4 p-6">
        <span className="ic flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-soft bg-sand text-gold"><Icon size={21} /></span>
        <div className="min-w-0">
          <p className="text-sm text-ink/55">{label}</p>
          {href ? <a href={href} className="break-words text-lg font-medium text-maroon hover:underline">{text}</a>
                : <p className="break-words text-lg font-medium leading-snug">{text}</p>}
        </div>
      </div>
    </Reveal>
  )
}

// Staggers the entrance of its children
export function Grid({ children }) {
  let n = 0
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Children.map(children, (c) => (c ? cloneElement(c, { delay: n++ * 90 }) : c))}
    </div>
  )
}
export const hasAny = (o) => Object.values(o).some((v) => (Array.isArray(v) ? v.length : v))
export const calcAge = (dob) => {
  if (!dob) return 0
  const b = new Date(dob), n = new Date()
  let a = n.getFullYear() - b.getFullYear()
  if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) a--
  return a
}
