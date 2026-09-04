import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { education } from '../../data/education'

export default function Education() {
  return (
    <section className="section" id="education">
      <Container>
        <SectionHeader number="05" title="Education" />
        {education.map((item) => (
          <div className="education-card" key={item.school}>
            <div><p className="eyebrow">{item.period}</p><h3>{item.school}</h3></div>
            <div><p>{item.degree}</p><span>{item.location}</span></div>
          </div>
        ))}
      </Container>
    </section>
  )
}
