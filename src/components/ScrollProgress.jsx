import { useEffect, useRef } from 'react'
export default function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    const f = () => {
      const h = document.documentElement
      bar.current.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`
    }
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return <div ref={bar} className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-light to-gold" />
}
