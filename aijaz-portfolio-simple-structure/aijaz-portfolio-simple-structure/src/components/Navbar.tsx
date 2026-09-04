const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Work', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  return (
    <header className="navbar-wrap">
      <nav className="navbar container">
        <a className="brand" href="#home">AIJAZ</a>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <a className="nav-cta" href="#contact">Let’s talk</a>
      </nav>
    </header>
  )
}
