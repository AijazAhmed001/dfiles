import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types'

type Props = { project: Project; index: number }

export default function ProjectCard({ project, index }: Props) {
  return (
    <article className="project-card">
      <div className={`project-visual project-visual--${(index % 3) + 1}`}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <strong>{project.title.slice(0, 2).toUpperCase()}</strong>
      </div>
      <div className="project-info">
        <div>
          <p className="eyebrow">{project.category} / {project.year}</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="project-bottom">
          <div className="tech-row">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
          <a href="#contact" aria-label={`Ask about ${project.title}`}><ArrowUpRight size={20} /></a>
        </div>
      </div>
    </article>
  )
}
