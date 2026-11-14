import { Cake, Ruler, GraduationCap, Briefcase } from 'lucide-react'
import { CountUp, Reveal, calcAge } from './ui'

// Floating summary strip that overlaps the bottom of the hero
export default function Glance({ d }) {
  const age = calcAge(d.dob)
  const items = [
    [Cake, 'Age', age ? <><CountUp to={age} /> yrs</> : null],
    [Ruler, 'Height', d.height],
    [GraduationCap, 'Education', d.education.qualification],
    [Briefcase, 'Profession', d.education.occupation],
  ].filter(([, , v]) => v)
  return (
    <div id="glance" className="relative z-10 -mt-20 px-5">
      <Reveal className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 divide-gold-soft/60 rounded-2xl border border-gold-soft bg-ivory/95 p-2 shadow-lift backdrop-blur md:grid-cols-4 md:divide-x">
          {items.map(([Icon, label, v]) => (
            <div key={label} className="flex flex-col items-center px-3 py-5 text-center">
              <Icon size={22} className="mb-2 text-gold" />
              <p className="font-display text-2xl font-semibold leading-tight text-maroon">{v}</p>
              <p className="mt-1 text-xs text-ink/55">{label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
