import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { certifications } from '../../data/certifications'

export default function Certifications() {
  return (
    <section className="section section-soft" id="certifications">
      <Container>
        <SectionHeader number="06" title="Learning" />
        <div className="cert-grid">
          {certifications.map((item, index) => (
            <article className="cert-card" key={item.name}>
              <span>0{index + 1}</span>
              <h3>{item.name}</h3>
              <p>{item.provider}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
