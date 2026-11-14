import { Palette, Sparkles, Utensils, Languages, Coffee } from 'lucide-react'
import { Section, InfoCard, Grid, hasAny } from './ui'

export default function Lifestyle({ d }) {
  const l = d.lifestyle
  if (!hasAny(l)) return null
  return (
    <Section id="lifestyle" title="Lifestyle & Interests" sub="आवडीनिवडी" tint>
      <Grid>
        <InfoCard icon={Palette} label="Hobbies" value={l.hobbies} />
        <InfoCard icon={Sparkles} label="Interests" value={l.interests} />
        <InfoCard icon={Utensils} label="Food preferences" value={l.food} />
        <InfoCard icon={Languages} label="Languages known" value={l.languages} />
        <InfoCard icon={Coffee} label="Lifestyle" value={l.preferences} />
      </Grid>
    </Section>
  )
}
