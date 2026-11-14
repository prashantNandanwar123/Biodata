import { User, Briefcase, Users, Home, Heart, MapPin, Phone, Info } from 'lucide-react'
import { Section, InfoCard, Grid } from './ui'

export default function FamilyDetails({ d }) {
  const f = d.family
  return (
    <Section id="family" title="Family Details" sub="परिवार">
      <Grid>
        <InfoCard icon={User} label="Father's name" value={f.fatherName} />
        <InfoCard icon={Briefcase} label="Father's occupation" value={f.fatherOccupation} />
        <InfoCard icon={User} label="Mother's name" value={f.motherName} />
        <InfoCard icon={Briefcase} label="Mother's occupation" value={f.motherOccupation} />
        <InfoCard icon={Users} label="Maternal uncle (Mama)" value={f.maternalUncle} />
        <InfoCard icon={Phone} label="Maternal uncle contact" value={f.maternalUnclePhone} href={f.maternalUnclePhone && `tel:+${d.countryCode}${f.maternalUnclePhone}`} />
        <InfoCard icon={Users} label="Brother" value={f.brothers} />
        <InfoCard icon={Users} label="Sister" value={f.sisters} />
        <InfoCard icon={Home} label="Family type" value={f.familyType} />
        <InfoCard icon={Heart} label="Family values" value={f.familyValues} />
        <InfoCard icon={MapPin} label="Native place" value={f.nativePlace} />
        <InfoCard icon={Info} label="Family background" value={f.background} />
      </Grid>
    </Section>
  )
}
