import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { skills } from '../../data/skills'

export default function Skills() {
  return (
    <section className="section section-soft" id="skills">
      <Container>
        <SectionHeader number="02" title="Expertise" />
        <div className="skills-grid">
          {skills.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-list">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
