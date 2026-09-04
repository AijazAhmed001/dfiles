import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
export default function Navbar(){
 const [open,setOpen]=useState(false); const [dark,setDark]=useState(true);
 useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light'},[dark]);
 const links=['about','skills','projects','experience','contact'];
 return <nav className="nav"><a className="brand" href="#top">AA<span>.</span></a><div className={`navlinks ${open?'open':''}`}>{links.map(x=><a key={x} href={`#${x}`} onClick={()=>setOpen(false)}>{x[0].toUpperCase()+x.slice(1)}</a>)}<a className="btn small" href="/resume.pdf" download>Resume</a></div><div className="nav-actions"><button className="icon-btn" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?<Sun/>:<Moon/>}</button><button className="icon-btn mobile" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></nav>
}
