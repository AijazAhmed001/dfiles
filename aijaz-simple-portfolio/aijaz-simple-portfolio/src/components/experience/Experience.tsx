import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { experience } from '../../data/experience'

export default function Experience() {
  return (
    <section className="section section-dark" id="experience">
      <Container>
        <SectionHeader number="04" title="Experience" />
        {experience.map((item) => (
          <article className="experience-row" key={item.company}>
            <div><span>{item.period}</span></div>
            <div><h3>{item.company}</h3><p>{item.role}</p></div>
            <p>{item.description}</p>
          </article>
        ))}
      </Container>
    </section>
  )
}
