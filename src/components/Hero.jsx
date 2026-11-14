import { useEffect, useRef } from 'react'
import { CalendarDays, Ruler, Heart, MapPin, Download, Images, FileText } from 'lucide-react'
import Mandala from './Mandala'
import Petals from './Petals'
import { Ornament } from './ui'

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

const Letters = ({ text, offset = 0 }) =>
  text.split('').map((c, i) => <span key={i} className="ch" style={{ '--i': i + offset }}>{c === ' ' ? '\u00A0' : c}</span>)

export default function Hero({ d }) {
  const sec = useRef(null), photo = useRef(null)
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return
    const s = sec.current
    const mv = (e) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5
      photo.current.style.transform = `translate(${x * -18}px, ${y * -12}px) rotateY(${x * 6}deg)`
    }
    s.addEventListener('mousemove', mv)
    return () => s.removeEventListener('mousemove', mv)
  }, [])

  const facts = [
    [CalendarDays, d.dob && fmt(d.dob)], [Ruler, d.height],
    [Heart, [d.religion, d.community].filter(Boolean).join(', ')],
    [MapPin, d.currentLocation || d.birthPlace],
  ].filter(([, v]) => v)

  return (
    <section id="top" ref={sec} className="hero-bg relative flex min-h-screen items-center overflow-hidden px-5 pb-32 pt-28">
      <Mandala className="pointer-events-none absolute -right-[22%] top-1/2 h-[70rem] w-[70rem] -translate-y-1/2 text-gold/25 spin-slow" />
      <Mandala className="pointer-events-none absolute -left-[30%] -top-[30%] h-[44rem] w-[44rem] text-gold/10 spin-rev" />
      <Petals />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 text-center md:order-1 md:text-left" style={{ perspective: 800 }}>
          {d.tagline && (
            <p className="fade-up mb-5 inline-block rounded-full border border-gold-soft/50 bg-white/5 px-5 py-1.5 font-display text-xl text-gold-light backdrop-blur" style={{ '--d': '.1s' }}>{d.tagline}</p>
          )}
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-cream drop-shadow-[0_4px_20px_rgba(0,0,0,.35)] sm:text-7xl lg:text-8xl" aria-label={d.name}>
            {d.name.split(' ').map((w, k, arr) => (
              <span key={k} className="block" aria-hidden="true"><Letters text={w} offset={arr.slice(0, k).join(' ').length + k} /></span>
            ))}
          </h1>
          {d.nameLocal && <p className="gold-text fade-up mt-3 font-display text-3xl sm:text-4xl" style={{ '--d': '1.2s' }}>{d.nameLocal}</p>}
          <div className="fade-up my-6 md:[&>div]:justify-start" style={{ '--d': '1.35s' }}><Ornament light /></div>

          <ul className="mx-auto grid max-w-md gap-3 text-left text-cream/90 md:mx-0">
            {facts.map(([Icon, v], i) => (
              <li key={i} className="fade-up flex items-center gap-3" style={{ '--d': `${1.5 + i * 0.12}s` }}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-soft/40 bg-white/5"><Icon size={15} className="text-gold-light" /></span>{v}
              </li>
            ))}
          </ul>
          {d.intro && <p className="fade-up mx-auto mt-7 max-w-lg leading-relaxed text-cream/75 md:mx-0" style={{ '--d': '2.1s' }}>{d.intro}</p>}

          <div className="fade-up mt-9 flex flex-wrap justify-center gap-3 md:justify-start" style={{ '--d': '2.3s' }}>
            <a href="#about" className="btn btn-gold"><FileText size={17} />View Biodata</a>
            <a href="#gallery" className="btn btn-ghost"><Images size={17} />View Gallery</a>
            {d.pdf && <a href={d.pdf} download="Prashant-Nandanwar-Biodata.pdf" className="btn btn-ghost"><Download size={17} />Download PDF</a>}
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-sm md:order-2" style={{ perspective: 1000 }}>
          <div className="float">
            <div ref={photo} className="relative transition-transform duration-300 ease-out">
              <div className="absolute -inset-4 rounded-t-full rounded-b-[2rem] border border-gold-soft/60" />
              <div className="absolute -inset-8 rounded-t-full rounded-b-[2.6rem] border border-dashed border-gold-soft/25" />
              <div className="arch-in relative overflow-hidden rounded-t-full rounded-b-3xl border-[6px] border-gold-light/80 bg-white shadow-lift">
                <img src={d.images.profile} alt={d.name} className="aspect-[3/4] w-full object-cover object-top" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#glance" aria-label="Scroll down" className="scroll-hint absolute bottom-24 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-10 w-6 justify-center rounded-full border border-gold-soft/60 pt-2"><span className="h-2 w-1 rounded-full bg-gold-light" /></div>
      </a>
    </section>
  )
}
