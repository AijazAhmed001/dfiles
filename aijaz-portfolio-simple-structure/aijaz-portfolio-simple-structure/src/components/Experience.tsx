import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section className="section container" id="experience">
      <div className="section-number">04 / EXPERIENCE</div>
      <div className="timeline">
        {experience.map((item) => (
          <div className="timeline-item" key={`${item.company}-${item.period}`}>
            <span>{item.period}</span>
            <div>
              <h3>{item.role}</h3>
              <p className="company">{item.company}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
