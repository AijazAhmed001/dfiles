import { Bot, LoaderCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '../services/api';
type Msg={role:'user'|'bot';text:string};
const suggestions=['Show Aijaz’s best full-stack project','What technologies does he use?','How can I contact him?'];
export default function Chatbot(){
 const [open,setOpen]=useState(false),[text,setText]=useState(''),[loading,setLoading]=useState(false);
 const [msgs,setMsgs]=useState<Msg[]>([{role:'bot',text:'Hi! I can guide you through Aijaz’s skills, projects and experience.'}]);
 const end=useRef<HTMLDivElement>(null),input=useRef<HTMLInputElement>(null);
 useEffect(()=>{end.current?.scrollIntoView({behavior:'smooth'});},[msgs,loading]);
 useEffect(()=>{if(open) setTimeout(()=>input.current?.focus(),100);},[open]);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};addEventListener('keydown',fn);return()=>removeEventListener('keydown',fn)},[]);
 async function send(value=text){const q=value.trim();if(!q||loading)return;setMsgs(m=>[...m,{role:'user',text:q}]);setText('');setLoading(true);try{const d=await apiRequest<{answer:string}>('/api/chat',{method:'POST',body:JSON.stringify({message:q})});setMsgs(m=>[...m,{role:'bot',text:d.answer}]);}catch(e){setMsgs(m=>[...m,{role:'bot',text:e instanceof Error?e.message:'The assistant is temporarily unavailable.'}]);}finally{setLoading(false)}}
 return <><button className="chat-fab" onClick={()=>setOpen(true)} aria-label="Open portfolio assistant"><Bot/></button>{open&&<section className="chat" role="dialog" aria-label="Portfolio assistant"><div className="chat-head"><div><strong>Portfolio Assistant</strong><small>Ask about skills, work or contact</small></div><button onClick={()=>setOpen(false)} aria-label="Close assistant"><X/></button></div><div className="chat-body" aria-live="polite">{msgs.map((m,i)=><div key={i} className={`msg ${m.role}`}>{m.text}</div>)}{loading&&<div className="msg bot typing"><LoaderCircle/> Thinking…</div>}<div ref={end}/></div><div className="chat-suggestions">{suggestions.map(s=><button key={s} onClick={()=>send(s)}>{s}</button>)}</div><div className="chat-input"><input ref={input} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about projects..." aria-label="Message"/><button onClick={()=>send()} disabled={!text.trim()||loading} aria-label="Send message"><Send/></button></div></section>}</>;
}
