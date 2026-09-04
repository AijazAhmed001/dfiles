import { useEffect, useState } from "react";
import {
  Check,
  Download,
  Menu,
  Moon,
  Sun,
  X
} from "lucide-react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 14);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1080) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <>
      <header
        className={`header ${isScrolled ? "header--scrolled" : ""}`}
      >
        <div className="container header__container">
          <div className="header__inner">
            <NavLink
              className="brand"
              to="/"
              onClick={closeMenu}
              aria-label="Aijaz Ahmed portfolio home"
            >
              <span className="brand__mark" aria-hidden="true">
                A<span>.</span>
              </span>

              <span className="brand__content">
                <span className="brand__name-row">
                  <strong className="brand__name">
                    Aijaz Ahmed
                  </strong>

                  <span
                    className="brand__verified"
                    title="Verified portfolio"
                    aria-label="Verified portfolio"
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                </span>

                <span className="brand__role">
                  Full Stack Software Engineer
                </span>
              </span>
            </NavLink>

            <nav
              id="primary-navigation"
              className={`nav ${isMenuOpen ? "nav--open" : ""}`}
              aria-label="Primary navigation"
            >
              <div className="nav__links">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "nav__link nav__link--active"
                        : "nav__link"
                    }
                  >
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>

              <div className="nav__mobile-footer">
                <a
                  className="resume-button resume-button--mobile"
                  href="/Aijaz-Ahmed-Resume.pdf"
                  download
                  onClick={closeMenu}
                >
                  <Download size={18} />
                  <span>
                    <strong>Resume</strong>
                    <small>Download CV</small>
                  </span>
                </a>

                <div className="availability">
                  <span className="availability__dot" />
                  Available for opportunities
                </div>
              </div>
            </nav>

            <div className="header__actions">
              <a
                className="resume-button desktop-resume"
                href="/Aijaz-Ahmed-Resume.pdf"
                download
              >
                <Download size={18} />
                <span>
                  <strong>Resume</strong>
                  <small>Download CV</small>
                </span>
              </a>

              <button
                className="icon-button"
                type="button"
                aria-label={
                  theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                title={
                  theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                onClick={toggleTheme}
              >
                <span className="icon-button__icon">
                  {theme === "light" ? (
                    <Moon size={19} />
                  ) : (
                    <Sun size={19} />
                  )}
                </span>
              </button>

              <button
                className={`icon-button menu-button ${
                  isMenuOpen ? "menu-button--active" : ""
                }`}
                type="button"
                aria-label={
                  isMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls="primary-navigation"
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                {isMenuOpen ? (
                  <X size={21} />
                ) : (
                  <Menu size={21} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <button
          className="navigation-overlay"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}
    </>
  );
}

export default Header;