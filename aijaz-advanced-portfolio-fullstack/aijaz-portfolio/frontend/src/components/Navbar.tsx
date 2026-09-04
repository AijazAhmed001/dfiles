import { Command, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onSearch }: { onSearch?: () => void }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const location = useLocation();
  useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [dark]);
  useEffect(() => setOpen(false), [location.pathname]);
  const links = ['about', 'skills', 'projects', 'experience', 'contact'];
  return <nav className="nav" aria-label="Primary navigation">
    <Link className="brand" to="/">AA<span>.</span></Link>
    <div className={`navlinks ${open ? 'open' : ''}`}>
      {links.map(x => <a key={x} href={`/#${x}`}>{x[0].toUpperCase() + x.slice(1)}</a>)}
      <Link to="/recruiter">Recruiter view</Link>
      <a className="btn small" href="/resume.pdf" download>Resume</a>
    </div>
    <div className="nav-actions">
      {onSearch && <button className="icon-btn" onClick={onSearch} aria-label="Search portfolio"><Search /></button>}
      <button className="icon-btn command-hint" onClick={onSearch} aria-label="Open command palette"><Command /></button>
      <button className="icon-btn" onClick={() => setDark(v => !v)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>{dark ? <Sun/> : <Moon/>}</button>
      <button className="icon-btn mobile" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
    </div>
  </nav>;
}
