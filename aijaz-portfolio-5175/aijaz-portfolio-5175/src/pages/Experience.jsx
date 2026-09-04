import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import PageHero from "../components/PageHero";
import { experience } from "../data/portfolioData";
import "../styles/experience.css";

function Experience() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="My professional and learning journey."
        description="A timeline of the experiences, education and milestones that shaped my software engineering skills."
      />

      <section className="section">
        <div className="container timeline">
          {experience.map((item, index) => (
            <article className="timeline__item" key={`${item.period}-${item.title}`}>
              <div className="timeline__marker">
                {item.title.includes("BS") ? (
                  <GraduationCap size={20} />
                ) : (
                  <BriefcaseBusiness size={20} />
                )}
              </div>

              <div className="timeline__period">{item.period}</div>

              <div className="timeline__card">
                <h2>{item.title}</h2>
                <h3>{item.organization}</h3>
                <p>{item.description}</p>
                <span>Milestone {index + 1}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Experience;
