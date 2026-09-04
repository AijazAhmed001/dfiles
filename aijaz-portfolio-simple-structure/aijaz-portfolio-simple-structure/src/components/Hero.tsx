export default function Hero() {
  return (
    <section className="hero container" id="home">
      <div className="hero-copy">
        <p className="eyebrow">SOFTWARE DEVELOPER · KARACHI</p>
        <h1>Aijaz Ahmed</h1>
        <p className="hero-lead">
          I build clean digital products, modern interfaces, and reliable software experiences.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#projects">View my work</a>
          <a className="button button-light" href="#about">About me</a>
        </div>
      </div>
      <div className="hero-visual" aria-label="Profile image placeholder">
        <span>AA</span>
      </div>
    </section>
  )
}
