import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

// Floating WhatsApp button, shown after scrolling past the hero (only if a valid number exists)
export default function FloatingActions({ d }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const f = () => setShow(scrollY > 500)
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  const num = d.contact.phones.find((p) => /^[6-9]\d{9}$/.test(p))
  if (!num) return null
  const text = encodeURIComponent(`Hello, I saw the marriage biodata of ${d.name}.`)
  return (
    <a href={`https://wa.me/${d.countryCode}${num}?text=${text}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className={`pulse-ring fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-all duration-500 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'}`}>
      <MessageCircle size={26} />
    </a>
  )
}
