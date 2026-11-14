import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { Section, Reveal } from './ui'

export default function Gallery({ d }) {
  const imgs = [d.images.profile, ...d.images.gallery].filter(Boolean)
  const [i, setI] = useState(null)
  const touch = useRef(0)
  const step = useCallback((n) => setI((v) => (v + n + imgs.length) % imgs.length), [imgs.length])

  useEffect(() => {
    if (i === null) return
    const k = (e) => (e.key === 'Escape' ? setI(null) : e.key === 'ArrowRight' ? step(1) : e.key === 'ArrowLeft' && step(-1))
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [i, step])

  return (
    <Section id="gallery" title="Photo Gallery" sub="छायाचित्रे">
      <div className="grid auto-rows-[18rem] grid-cols-2 gap-5 md:grid-cols-3 md:auto-rows-[20rem]">
        {imgs.map((src, n) => (
          <Reveal key={src} delay={n * 120} className={n === 0 ? 'col-span-2 row-span-2 md:col-span-1' : ''}>
            <button onClick={() => setI(n)} aria-label={`Open photo ${n + 1}`}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-gold-soft bg-sand p-1.5 shadow-soft transition-shadow duration-500 hover:shadow-lift">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <img src={src} alt={`${d.name} photo ${n + 1}`} loading="lazy"
                  className="h-full w-full object-cover object-[50%_25%] transition duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-wine/70 via-transparent to-transparent pb-5 opacity-0 transition duration-500 group-hover:opacity-100">
                  <span className="flex h-11 w-11 translate-y-4 items-center justify-center rounded-full bg-gold-light text-wine transition duration-500 group-hover:translate-y-0"><ZoomIn size={20} /></span>
                </div>
                <div className="pointer-events-none absolute inset-3 rounded-lg border border-gold-light/0 transition duration-500 group-hover:border-gold-light/80" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {i !== null && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-wine/95 p-4 backdrop-blur-md" onClick={() => setI(null)} role="dialog" aria-modal="true"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1) }}>
          <button className="absolute right-5 top-5 rounded-full border border-gold-soft/40 p-2 text-cream hover:bg-white/10" onClick={() => setI(null)} aria-label="Close"><X size={26} /></button>
          <button className="absolute left-2 z-10 rounded-full border border-gold-soft/40 p-2 text-cream hover:bg-white/10 sm:left-8" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous"><ChevronLeft size={30} /></button>
          <img key={i} src={imgs[i]} alt="" onClick={(e) => e.stopPropagation()} className="lb-img max-h-[76vh] max-w-[84vw] rounded-lg border-4 border-gold-light/70 object-contain shadow-lift" />
          <button className="absolute right-2 z-10 rounded-full border border-gold-soft/40 p-2 text-cream hover:bg-white/10 sm:right-8" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next"><ChevronRight size={30} /></button>
          <div className="mt-5 flex gap-2" onClick={(e) => e.stopPropagation()}>
            {imgs.map((s, n) => (
              <button key={s} onClick={() => setI(n)} aria-label={`Photo ${n + 1}`} className={`h-14 w-11 overflow-hidden rounded border-2 transition ${n === i ? 'border-gold-light opacity-100' : 'border-transparent opacity-50 hover:opacity-90'}`}>
                <img src={s} alt="" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-cream/60">{i + 1} / {imgs.length}</p>
        </div>
      )}
    </Section>
  )
}
