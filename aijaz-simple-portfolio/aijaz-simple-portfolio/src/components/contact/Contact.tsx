import { ArrowUpRight } from 'lucide-react'
import Container from '../common/Container'
import { socialLinks } from '../../data/socialLinks'

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <Container>
        <p className="eyebrow">07 / CONTACT</p>
        <h2>Have a project<br />in mind?</h2>
        <div className="contact-bottom">
          <p>Let’s build something useful, clean and memorable.</p>
          <div className="contact-links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {link.label}<ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
