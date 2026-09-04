import Container from '../common/Container'
import { navigation } from '../../data/navigation'

export default function Navbar() {
  return (
    <header className="navbar-wrap">
      <Container>
        <nav className="navbar" aria-label="Main navigation">
          <a className="brand" href="#home">AIJAZ.</a>
          <div className="nav-links">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </div>
          <a className="availability" href="#contact"><span /> Available</a>
        </nav>
      </Container>
    </header>
  )
}
