import Container from '../common/Container'
import Button from '../common/Button'
import HeroMedia from './HeroMedia'

export default function Hero() {
  return (
    <section className="hero section" id="home">
      <Container>
        <div className="hero-topline">SOFTWARE ENGINEER / CREATIVE DEVELOPER</div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">PORTFOLIO / 2026</p>
            <h1>AIJAZ<br />AHMED.</h1>
            <p className="hero-description">I build clean, fast and useful digital products for web and mobile.</p>
            <div className="hero-actions">
              <Button href="#work">Explore Work</Button>
              <Button href="#about" variant="secondary">About Me</Button>
            </div>
          </div>
          <HeroMedia />
        </div>
      </Container>
    </section>
  )
}
