import { Phone, MessageCircle, Mail, MapPin, UserRound } from 'lucide-react'
import { Section, InfoCard, Grid, Reveal } from './ui'

const valid = (n) => /^[6-9]\d{9}$/.test(n)

export default function Contact({ d }) {
  const c = d.contact
  const wa = `Hello, I saw the marriage biodata of ${d.name}.`
  return (
    <Section id="contact" title="Contact" sub="संपर्क" tint>
      <Grid>
        <InfoCard icon={UserRound} label="Contact person" value={c.person} />
        {c.phones.map((p) => <InfoCard key={p} icon={Phone} label="Mobile" value={p} href={valid(p) ? `tel:+${d.countryCode}${p}` : undefined} />)}
        <InfoCard icon={Mail} label="Email" value={c.email} href={c.email && `mailto:${c.email}`} />
        <InfoCard icon={MapPin} label="Address" value={c.address} />
      </Grid>
      <Reveal delay={200}>
        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
          {c.phones.filter(valid).map((p) => (
            <div key={p} className="card-premium flex flex-col gap-3 p-6 text-center">
              <p className="font-display text-2xl text-maroon">{p}</p>
              <a href={`tel:+${d.countryCode}${p}`} className="btn bg-maroon text-cream shadow-soft"><Phone size={16} />Call now</a>
              <a href={`https://wa.me/${d.countryCode}${p}?text=${encodeURIComponent(wa)}`} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white shadow-soft"><MessageCircle size={16} />WhatsApp</a>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
