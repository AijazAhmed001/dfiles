import type { Project } from '../data/projects'

type Props = { project: Project; index: number }

export default function ProjectCard({ project, index }: Props) {
  return (
    <article className="project-card">
      <div className="project-preview">
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-meta">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="project-stack">{project.stack.join(' · ')}</div>
      </div>
    </article>
  )
}
