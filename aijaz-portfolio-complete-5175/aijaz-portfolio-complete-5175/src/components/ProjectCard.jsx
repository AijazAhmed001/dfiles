import { ArrowUpRight, Github } from "lucide-react";
import "../styles/projectCard.css";

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className={`project-image ${project.imageClass}`}>
        <span>{project.category}</span>
        <div className="project-window">
          <div className="project-window__bar">
            <i />
            <i />
            <i />
          </div>
          <div className="project-window__content">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>

      <div className="project-card__body">
        <span className="project-card__category">{project.category}</span>
        <h2>{project.title}</h2>
        <p>{project.description}</p>

        <div className="tag-list">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="project-card__actions">
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live Demo <ArrowUpRight size={17} />
          </a>
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub <Github size={17} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
