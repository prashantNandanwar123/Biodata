import biodata from './data/biodata'
import { hasAny } from './components/ui'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Glance from './components/Glance'
import About from './components/About'
import EducationCareer from './components/EducationCareer'
import FamilyDetails from './components/FamilyDetails'
import Lifestyle from './components/Lifestyle'
import Gallery from './components/Gallery'
import PartnerPreferences from './components/PartnerPreferences'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'

export default function App() {
  const d = { ...biodata, __hasLifestyle: hasAny(biodata.lifestyle), __hasPrefs: hasAny(biodata.partnerPreferences) }
  return (
    <>
      <ScrollProgress />
      <Navbar data={d} />
      <main>
        <Hero d={d} />
        <Glance d={d} />
        <About d={d} />
        <EducationCareer d={d} />
        <FamilyDetails d={d} />
        <Lifestyle d={d} />
        <Gallery d={d} />
        <PartnerPreferences d={d} />
        <Contact d={d} />
      </main>
      <Footer d={d} />
      <FloatingActions d={d} />
    </>
  )
}
