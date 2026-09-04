import PageLayout from '../../components/layout/PageLayout'
import Hero from '../../components/hero/Hero'
import About from '../../components/about/About'
import Skills from '../../components/skills/Skills'
import Projects from '../../components/projects/Projects'
import Experience from '../../components/experience/Experience'
import Education from '../../components/education/Education'
import Certifications from '../../components/certifications/Certifications'
import Contact from '../../components/contact/Contact'

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
    </PageLayout>
  )
}
