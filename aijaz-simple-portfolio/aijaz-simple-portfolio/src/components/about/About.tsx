import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'

export default function About() {
  return (
    <section className="section" id="about">
      <Container>
        <SectionHeader number="01" title="About" />
        <div className="about-grid">
          <h3>Building products where engineering meets design.</h3>
          <div>
            <p>I enjoy turning complex ideas into clear interfaces and practical software. My focus is simple structure, maintainable code and strong user experience.</p>
            <div className="stats">
              <div><strong>10+</strong><span>Projects</span></div>
              <div><strong>4</strong><span>Core areas</span></div>
              <div><strong>2026</strong><span>Current work</span></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
