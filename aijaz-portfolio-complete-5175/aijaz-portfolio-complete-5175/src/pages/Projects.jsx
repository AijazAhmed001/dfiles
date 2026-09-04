import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/portfolioData";
import "../styles/projects.css";

function Projects() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", ...new Set(projects.map((project) => project.category))];

  const visibleProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Projects built to solve practical problems."
        description="Enterprise applications, real-time experiences, AI systems and frontend projects built with modern technologies."
      />

      <section className="section">
        <div className="container">
          <div className="filter-bar" aria-label="Project filters">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "filter-button filter-button--active" : "filter-button"}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="project-grid project-grid--two">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;
