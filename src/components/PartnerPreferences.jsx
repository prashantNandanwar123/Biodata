import { CalendarDays, Ruler, GraduationCap, Briefcase, Users, MapPin, Sparkles } from 'lucide-react'
import { Section, InfoCard, Grid, hasAny } from './ui'

export default function PartnerPreferences({ d }) {
  const p = d.partnerPreferences
  if (!hasAny(p)) return null
  return (
    <Section id="preferences" title="Partner Preferences" sub="अपेक्षा">
      <Grid>
        <InfoCard icon={CalendarDays} label="Preferred age" value={p.age} />
        <InfoCard icon={Ruler} label="Preferred height" value={p.height} />
        <InfoCard icon={GraduationCap} label="Education" value={p.education} />
        <InfoCard icon={Briefcase} label="Profession" value={p.profession} />
        <InfoCard icon={Users} label="Religion / Community" value={p.community} />
        <InfoCard icon={MapPin} label="Location" value={p.location} />
        <InfoCard icon={Sparkles} label="Other expectations" value={p.other} />
      </Grid>
    </Section>
  )
}
