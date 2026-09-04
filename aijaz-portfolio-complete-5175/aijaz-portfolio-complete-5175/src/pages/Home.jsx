import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
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
      <section
        className="hero"
        aria-labelledby="home-hero-title"
      >
        <div className="container hero__grid">
          {/* Left content */}
          <div className="hero__content">
            <div className="hero__intro">
              <span className="eyebrow">
                — Portfolio 2026
              </span>

              <span className="hero__location">
                Karachi, Pakistan
              </span>
            </div>

            <div className="hero__status">
              <span aria-hidden="true" />

              Available for remote opportunities
            </div>

            <h1
              className="hero__title"
              id="home-hero-title"
            >
              Software

              <span>
                <em>that</em> scales.
              </span>
            </h1>

            <p className="hero__role">
              {personalInfo.role}
            </p>

            <p className="hero__description">
              I build secure, scalable and production-ready web
              applications using React, ASP.NET Core, SQL Server,
              cloud technologies and clean architecture.
            </p>

            <div className="hero__actions">
              <Link
                className="button button--primary"
                to="/projects"
              >
                View Projects

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </Link>

              <a
                className="button button--outline"
                href="/Aijaz-Ahmed-Resume.pdf"
                download
              >
                Download Resume

                <Download
                  size={18}
                  aria-hidden="true"
                />
              </a>

              <Link
                className="button button--ghost"
                to="/contact"
              >
                Let&apos;s Talk

                <Mail
                  size={18}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div
              className="stats"
              aria-label="Portfolio statistics"
            >
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
                <ArrowDown
                  size={19}
                  aria-hidden="true"
                />
              </span>

              Scroll to explore
            </a>
          </div>

          {/* Right photo area */}
          <div className="hero__visual">
            <div
              className="hero__glow"
              aria-hidden="true"
            />

            <div
              className="hero__orbit"
              aria-hidden="true"
            />

            <div
              className="hero__dots"
              aria-hidden="true"
            />

            <div className="hero__photo-frame">
              <img
                className="hero__portrait"
                src="/aijaz-profile.png"
                alt="Aijaz Ahmed, Full Stack Software Engineer"
              />

              <div
                className="hero__photo-overlay"
                aria-hidden="true"
              />
            </div>

            <div className="profile-card profile-card--availability">
              <span
                className="profile-card__status"
                aria-hidden="true"
              />

              <div>
                <small>Current status</small>
                <strong>Available for Work</strong>
              </div>
            </div>

            <div className="profile-card profile-card--projects">
              <BriefcaseBusiness
                size={20}
                aria-hidden="true"
              />

              <div>
                <strong>20+</strong>
                <small>Projects Built</small>
              </div>
            </div>

            <div className="profile-card profile-card--technologies">
              <Code2
                size={20}
                aria-hidden="true"
              />

              <div>
                <strong>15+</strong>
                <small>Technologies</small>
              </div>
            </div>

            <Link
              className="hero__talk"
              to="/contact"
            >
              Let&apos;s talk

              <ArrowRight
                size={18}
                aria-hidden="true"
              />
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
        aria-labelledby="featured-projects-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                Selected work
              </span>

              <h2 id="featured-projects-title">
                Featured projects
              </h2>
            </div>

            <Link to="/projects">
              View all projects

              <ArrowRight
                size={18}
                aria-hidden="true"
              />
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