import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo } from "../data/portfolioData";
import "../styles/footer.css";

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link className="footer__brand" to="/">
            <span>A.</span> AHMED
          </Link>
          <p>{personalInfo.role}</p>
        </div>

        <div className="footer__links">
          <Link to="/projects">Projects</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer__socials">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email">
            <Mail size={20} />
          </a>
          <button type="button" onClick={scrollTop} aria-label="Back to top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      <div className="container footer__bottom">
  <span>
    © {new Date().getFullYear()} Aijaz Ahmed. All rights reserved.
  </span>

  <span>Designed and built with React.</span>
</div>
    </footer>
  );
}

export default Footer;
