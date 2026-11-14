import { User, CalendarDays, Hourglass, Ruler, Heart, Users, Languages, Flag, MapPin, Home } from 'lucide-react'
import { Section, InfoCard, Grid, calcAge } from './ui'

export default function About({ d }) {
  const dob = d.dob && new Date(d.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const age = calcAge(d.dob)
  return (
    <Section id="about" title="About Me" sub="परिचय">
      <Grid>
        <InfoCard icon={User} label="Full name" value={d.name} />
        <InfoCard icon={CalendarDays} label="Date of birth" value={dob} />
        <InfoCard icon={Hourglass} label="Age" value={age ? `${age} years` : ''} />
        <InfoCard icon={Home} label="Birth place" value={d.birthPlace} />
        <InfoCard icon={Ruler} label="Height" value={d.height} />
        <InfoCard icon={Heart} label="Religion" value={d.religion} />
        <InfoCard icon={Users} label="Caste / Community" value={d.community} />
        <InfoCard icon={Languages} label="Mother tongue" value={d.motherTongue} />
        <InfoCard icon={Heart} label="Marital status" value={d.maritalStatus} />
        <InfoCard icon={Flag} label="Nationality" value={d.nationality} />
        <InfoCard icon={MapPin} label="Current location" value={d.currentLocation} />
      </Grid>
    </Section>
  )
}
