import { BriefcaseBusiness, FileText, FolderKanban, Mail, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/content';

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => { if (open) setQuery(''); }, [open]);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', listener); return () => window.removeEventListener('keydown', listener);
  }, [onClose]);
  const actions = useMemo(() => [
    {label:'View all projects', icon:FolderKanban, run:()=>navigate('/#projects')},
    {label:'Open recruiter view', icon:BriefcaseBusiness, run:()=>navigate('/recruiter')},
    {label:'Download resume', icon:FileText, run:()=>window.open('/resume.pdf','_blank')},
    {label:'Contact Aijaz', icon:Mail, run:()=>navigate('/#contact')},
    ...projects.map(project => ({label:project.title, icon:FolderKanban, run:()=>navigate(`/projects/${project.id}`)}))
  ].filter(x => x.label.toLowerCase().includes(query.toLowerCase())), [query, navigate]);
  if (!open) return null;
  return <div className="modal-backdrop" onMouseDown={onClose} role="presentation"><section className="command" role="dialog" aria-modal="true" aria-label="Portfolio search" onMouseDown={e=>e.stopPropagation()}>
    <div className="command-search"><Search/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects or actions..."/><button onClick={onClose} aria-label="Close"><X/></button></div>
    <div className="command-results">{actions.map(({label,icon:Icon,run})=><button key={label} onClick={()=>{run();onClose();}}><Icon/><span>{label}</span><small>Open</small></button>)}{actions.length===0&&<p>No matching project or action.</p>}</div>
  </section></div>;
}
