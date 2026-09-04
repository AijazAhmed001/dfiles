import {
  ArrowDown,
  ArrowRight,
  Download,
  Mail
} from "lucide-react";

import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

import {
  personalInfo,
  projects,
  stats
} from "../data/portfolioData";

import "../styles/home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow">
              — Portfolio 2026
            </span>

            <h1 className="hero__title">
              Software

              <span>
                <em>that</em> scales.
              </span>
            </h1>

            <p className="hero__description">
              {personalInfo.role} building secure, scalable web
              applications and enterprise systems that earn trust.
              Based in Karachi, working globally.
            </p>

            <div className="hero__actions">
              <Link
                className="button button--primary"
                to="/projects"
              >
                View Projects

                <ArrowRight size={18} />
              </Link>

              <a
                className="button button--outline"
                href="/Aijaz-Ahmed-Resume.pdf"
                download
              >
                Download Resume

                <Download size={18} />
              </a>

              <Link
                className="button button--ghost"
                to="/contact"
              >
                Let&apos;s Talk

                <Mail size={18} />
              </Link>
            </div>

            <div className="stats">
              {stats.map((stat) => (
                <div
                  className="stat"
                  key={stat.label}
                >
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <a
              className="scroll-indicator"
              href="#featured-projects"
            >
              <span>
                <ArrowDown size={19} />
              </span>

              Scroll to explore
            </a>
          </div>

          <div className="hero__visual">
            <div className="hero__halo" />

            <img
              src="/profile-illustration.svg"
              alt="Professional illustration representing Aijaz Ahmed"
            />

            <div className="availability-card">
              <span />

              Available for work
            </div>

            <Link
              className="hero__talk"
              to="/contact"
            >
              Let&apos;s talk

              <ArrowRight size={18} />
            </Link>

            <span className="signature">
              Aijaz Ahmed
            </span>
          </div>
        </div>
      </section>

      <section className="home-intro section">
        <div className="container home-intro__grid">
          <span className="eyebrow">
            What I do
          </span>

          <h2>
            I turn complex requirements into simple,
            reliable software.
          </h2>

          <p>
            My work combines thoughtful frontend design,
            secure backend engineering, clean database
            structure and practical deployment.
          </p>
        </div>
      </section>

      <section
        className="section section--muted"
        id="featured-projects"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                Selected work
              </span>

              <h2>
                Featured projects
              </h2>
            </div>

            <Link to="/projects">
              View all projects

              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="project-grid">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;