import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, Download } from "lucide-react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Skills", to: "/skills" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" }
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("portfolio-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <span className="brand__mark">A.</span>
          <span className="brand__text">
            <strong>Aijaz Ahmed</strong>
            <small>Full Stack Software Engineer</small>
          </span>
        </NavLink>

        <nav className={`nav ${isMenuOpen ? "nav--open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "nav__link nav__link--active" : "nav__link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <a className="button button--small button--outline desktop-resume" href="/Aijaz-Ahmed-Resume.pdf" download>
            <Download size={17} />
            Resume
          </a>

          <button
            className="icon-button"
            type="button"
            aria-label="Toggle color theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>

          <button
            className="icon-button menu-button"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
