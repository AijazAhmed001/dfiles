import { CheckCircle2, Download } from "lucide-react";
import PageHero from "../components/PageHero";
import { personalInfo } from "../data/portfolioData";
import "../styles/about.css";

const values = [
  {
    title: "Clean Code",
    description: "Readable, maintainable code with clear naming and simple structure."
  },
  {
    title: "Problem Solving",
    description: "Breaking complex requirements into practical and testable solutions."
  },
  {
    title: "Continuous Learning",
    description: "Improving technical knowledge through projects, feedback and research."
  },
  {
    title: "Collaboration",
    description: "Communicating clearly and building software that supports real users."
  }
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About me"
        title="I build software that solves real problems."
        description="A professional overview of my background, approach and long-term direction as a software engineer."
      />

      <section className="section">
        <div className="container about-story">
          <div>
            <span className="eyebrow">My story</span>
            <h2>From programming fundamentals to enterprise applications.</h2>
          </div>

          <div className="about-story__copy">
            <p>
              I’m {personalInfo.name}, a Full Stack Software Engineer and BS Computer
              Science student focused on modern web development, backend systems and
              enterprise software.
            </p>
            <p>
              I started with programming fundamentals and gradually moved into React,
              ASP.NET Core, databases, APIs, cloud deployment and AI-powered systems.
              My projects are designed to be clean, understandable and useful in real
              environments.
            </p>
            <p>
              My goal is to continue developing secure, scalable products while growing
              into a complete software engineer with strong backend, cloud and AI skills.
            </p>

            <a className="button button--primary" href="/Aijaz-Ahmed-Resume.pdf" download>
              Download Resume <Download size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">How I work</span>
              <h2>Values behind my work</h2>
            </div>
          </div>

          <div className="value-grid">
            {values.map((value) => (
              <article className="value-card" key={value.title}>
                <CheckCircle2 size={24} />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container profile-details">
          <div>
            <span>Name</span>
            <strong>{personalInfo.name}</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>{personalInfo.role}</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>{personalInfo.location}</strong>
          </div>
          <div>
            <span>Availability</span>
            <strong>Remote & Full-Time</strong>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
