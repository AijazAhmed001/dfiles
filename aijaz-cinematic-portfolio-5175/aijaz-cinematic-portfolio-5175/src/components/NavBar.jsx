import { navLinks } from "../constants";

const NavBar = () => {
  return (
    <header>
      <nav>
        <a href="#hero" aria-label="Aijaz Ahmed home">
          <img src="/logo.svg" alt="Aijaz Ahmed logo" />
        </a>

        <ul>
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="flex-center gap-3">
          <a href="https://github.com/AijazAhmed001" target="_blank" rel="noreferrer" aria-label="Open GitHub profile">
            <img src="/search.svg" alt="GitHub" />
          </a>
          <a href="/Aijaz-Ahmed-Resume.pdf" download aria-label="Download resume">
            <img src="/cart.svg" alt="Download resume" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
