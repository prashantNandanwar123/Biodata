import { ArrowUp } from 'lucide-react'
import Mandala from './Mandala'
import { Ornament, Reveal } from './ui'

export default function Footer({ d }) {
  return (
    <footer className="hero-bg relative overflow-hidden px-5 py-20 text-center text-cream">
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 text-gold/15 spin-slow" />
      <Reveal className="relative">
        {d.tagline && <p className="font-display text-xl text-gold-light">{d.tagline}</p>}
        <h3 className="gold-text mt-2 font-display text-4xl font-semibold sm:text-5xl">{d.name}</h3>
        <div className="my-6"><Ornament light /></div>
        {d.quote && <p className="mx-auto max-w-xl font-display text-2xl italic leading-relaxed text-cream/90">“{d.quote}”</p>}
        <a href="#top" className="btn btn-ghost mt-10"><ArrowUp size={16} />Back to top</a>
        <p className="mt-10 text-sm text-cream/55">© {new Date().getFullYear()} {d.name}. All rights reserved.</p>
      </Reveal>
    </footer>
  )
}
