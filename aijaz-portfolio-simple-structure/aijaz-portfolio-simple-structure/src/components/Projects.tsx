import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section className="section container" id="projects">
      <div className="section-number">03 / SELECTED WORK</div>
      <div className="section-heading-row">
        <h2>Selected projects.</h2>
        <p>A small collection of product, engineering, and interface work.</p>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  )
}
