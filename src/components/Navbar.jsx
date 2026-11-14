import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [['about', 'About'], ['education', 'Career'], ['family', 'Family'], ['lifestyle', 'Lifestyle'], ['gallery', 'Gallery'], ['preferences', 'Preferences'], ['contact', 'Contact']]

export default function Navbar({ data }) {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')
  const visible = links.filter(([id]) => (id === 'lifestyle' ? data.__hasLifestyle : id === 'preferences' ? data.__hasPrefs : true))

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 60)
    f(); window.addEventListener('scroll', f, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    visible.forEach(([id]) => document.getElementById(id) && io.observe(document.getElementById(id)))
    return () => { window.removeEventListener('scroll', f); io.disconnect() }
  }, [])

  const dark = !solid && !open
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${solid || open ? 'border-b border-gold-soft bg-cream/90 shadow-soft backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className={`font-display text-2xl font-bold transition-colors ${dark ? 'text-gold-light' : 'text-maroon'}`}>{data.name}</a>
        <ul className={`hidden gap-7 md:flex ${dark ? 'text-cream' : 'text-ink'}`}>
          {visible.map(([id, l]) => <li key={id}><a href={`#${id}`} className={`nav-link text-sm ${active === id ? 'active' : ''}`}>{l}</a></li>)}
        </ul>
        <button className={`md:hidden ${dark ? 'text-cream' : 'text-maroon'}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </nav>
      <ul className={`overflow-hidden bg-cream px-5 transition-all duration-500 md:hidden ${open ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        {visible.map(([id, l]) => <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className="block border-b border-gold-soft/50 py-3">{l}</a></li>)}
      </ul>
    </header>
  )
}
