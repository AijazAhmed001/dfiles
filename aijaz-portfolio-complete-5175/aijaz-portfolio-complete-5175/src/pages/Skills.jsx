import { Braces, CloudCog, Code2, Database, Wrench } from "lucide-react";
import PageHero from "../components/PageHero";
import { skills } from "../data/portfolioData";
import "../styles/skills.css";

const categoryIcons = {
  Frontend: Code2,
  Backend: Braces,
  Database: Database,
  DevOps: CloudCog,
  Tools: Wrench
};

function Skills() {
  return (
    <>
      <PageHero
        eyebrow="Skills"
        title="Technologies I work with."
        description="A clear overview of the tools and technologies I use to design, build, test and deploy modern applications."
      />

      <section className="section">
        <div className="container skill-grid">
          {Object.entries(skills).map(([category, items]) => {
            const Icon = categoryIcons[category];

            return (
              <article className="skill-card" key={category}>
                <div className="skill-card__icon">
                  <Icon size={24} />
                </div>
                <h2>{category}</h2>
                <div className="skill-list">
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Skills;
