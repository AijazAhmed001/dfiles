import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import ProjectCard from './ProjectCard'
import { projects } from '../../data/projects'

export default function Projects() {
  return (
    <section className="section" id="work">
      <Container>
        <SectionHeader number="03" title="Selected Work" />
        <div className="projects-list">
          {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}
        </div>
      </Container>
    </section>
  )
}
