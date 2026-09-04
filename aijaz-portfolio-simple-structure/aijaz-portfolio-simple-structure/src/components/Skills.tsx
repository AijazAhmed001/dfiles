import { skills } from '../data/skills'

export default function Skills() {
  return (
    <section className="section section-dark" id="skills">
      <div className="container">
        <div className="section-number muted">02 / SKILLS</div>
        <h2 className="section-title">Tools I use to build.</h2>
        <div className="skill-grid">
          {skills.map((skill) => <div className="skill-item" key={skill}>{skill}</div>)}
        </div>
      </div>
    </section>
  )
}
