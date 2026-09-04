import { Bot, Send, X } from 'lucide-react';
import { useState } from 'react';
type Msg={role:'user'|'bot',text:string};
const api=import.meta.env.VITE_API_URL || 'http://localhost:8000';
export default function Chatbot(){const [open,setOpen]=useState(false);const [text,setText]=useState('');const [msgs,setMsgs]=useState<Msg[]>([{role:'bot',text:'Hi! Ask me about Aijaz’s skills, projects or experience.'}]);
 async function send(){if(!text.trim())return;const q=text;setMsgs(m=>[...m,{role:'user',text:q}]);setText('');try{const r=await fetch(`${api}/api/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q})});const d=await r.json();setMsgs(m=>[...m,{role:'bot',text:d.answer}]);}catch{setMsgs(m=>[...m,{role:'bot',text:'The backend is offline. Start FastAPI on port 8000.'}]);}}
 return <><button className="chat-fab" onClick={()=>setOpen(true)}><Bot/></button>{open&&<div className="chat"><div className="chat-head"><div><strong>Portfolio Assistant</strong><small>Usually replies instantly</small></div><button onClick={()=>setOpen(false)}><X/></button></div><div className="chat-body">{msgs.map((m,i)=><div key={i} className={`msg ${m.role}`}>{m.text}</div>)}</div><div className="chat-input"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about projects..."/><button onClick={send}><Send/></button></div></div>}</>
}
