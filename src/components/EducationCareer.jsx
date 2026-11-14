import { GraduationCap, BookOpen, Building2, Briefcase, Landmark, Wallet } from 'lucide-react'
import { Section, InfoCard, Grid } from './ui'

export default function EducationCareer({ d }) {
  const e = d.education
  return (
    <Section id="education" title="Education & Career" sub="शिक्षण व व्यवसाय" tint>
      <Grid>
        <InfoCard icon={GraduationCap} label="Highest qualification" value={e.qualification} />
        <InfoCard icon={BookOpen} label="Educational background" value={e.background} />
        <InfoCard icon={Building2} label="College / University" value={e.college} />
        <InfoCard icon={Briefcase} label="Occupation" value={e.occupation} />
        <InfoCard icon={Landmark} label="Company / Organization" value={e.company} />
        <InfoCard icon={Wallet} label="Annual income" value={e.income} />
      </Grid>
    </Section>
  )
}
