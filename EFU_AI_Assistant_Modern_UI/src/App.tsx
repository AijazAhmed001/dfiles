import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Bell, Bookmark, Check, ChevronDown, ChevronLeft, ChevronRight, Copy,
  Database, Download, FileSpreadsheet, FileText, FileType2, Gauge,
  HelpCircle, History, LockKeyhole, MessageSquare, Mic, MoreHorizontal,
  Paperclip, Pin, Plus, Search, Send, Settings, Share2, ShieldCheck,
  Sparkles, Square, ThumbsDown, ThumbsUp, Volume2, WandSparkles, X,
  ArrowUpRight, TrendingUp, CircleCheck, Layers3, PanelLeftClose,
  PanelLeftOpen, Headphones, FileChartColumn, ScanSearch
} from 'lucide-react'
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie,
  PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'

const C = {
  primary: '#08664B',
  primaryDark: '#064D3A',
  primaryDeep: '#043D2F',
  emerald: '#11A777',
  mint: '#DFF7EE',
  mintSoft: '#F0FBF7',
  lime: '#B7E8D5',
  bg: '#F4F7F6',
  panel: '#FFFFFF',
  sidebar: '#F8FAF9',
  border: '#DDE7E2',
  text: '#13231D',
  muted: '#687A72',
  subtle: '#8A9A93',
  danger: '#D95050',
  warning: '#D79224',
}

const branchData = [
  { branch: 'Karachi', active: 126, assigned: 109, available: 12, maintenance: 5 },
  { branch: 'Lahore', active: 94, assigned: 81, available: 9, maintenance: 4 },
  { branch: 'Islamabad', active: 71, assigned: 61, available: 7, maintenance: 3 },
]

const maintenanceTrend = [
  { month: 'Feb', cost: 1.89 },
  { month: 'Mar', cost: 3.1 },
  { month: 'Apr', cost: 2.75 },
  { month: 'May', cost: 1.9 },
  { month: 'Jun', cost: 3.4 },
  { month: 'Jul', cost: 2.85 },
]

const statusData = [
  { name: 'Assigned', value: 251 },
  { name: 'Available', value: 28 },
  { name: 'Maintenance', value: 12 },
]

const pieColors = ['#08664B', '#23B184', '#D89B32']

type ChartType = 'bar' | 'line' | 'pie'
type ExportFormat = 'PDF' | 'Word' | 'Excel' | 'CSV'
type Message = {
  id: number
  role: 'user' | 'assistant'
  text: string
  time: string
  verified?: boolean
  source?: string
  records?: number
  chart?: ChartType
  table?: boolean
  language?: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'user',
    text: 'Karachi, Lahore aur Islamabad branches ke active laptops compare karo.',
    time: '9:46 AM',
  },
  {
    id: 2,
    role: 'assistant',
    text: 'Karachi branch mein sab se zyada active laptops hain. Karachi mein 126, Lahore mein 94 aur Islamabad mein 71 active laptops maujood hain. Total 291 active laptops hain.',
    time: '9:46 AM',
    verified: true,
    source: 'vw_AI_AssetsByBranch',
    records: 291,
    chart: 'bar',
    table: true,
    language: 'Roman Urdu',
  },
]

const chats = [
  { title: 'Active laptops by branch', group: 'Pinned', pinned: true, active: true },
  { title: 'Warranty expiry this month', group: 'Today' },
  { title: 'Unassigned printers Karachi', group: 'Yesterday' },
  { title: 'Maintenance cost trend', group: 'Previous 7 days' },
  { title: 'Department asset summary', group: 'Previous 7 days' },
  { title: 'Inventory availability', group: 'Previous 30 days' },
]

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-[11px] shadow-[0_9px_24px_rgba(8,102,75,.24)]" style={{ background: `linear-gradient(145deg, ${C.primary}, ${C.emerald})` }}>
          EFU
        </div>
        <span className="absolute -right-0.5 -bottom-0.5 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: '#20C58D' }} />
      </div>
      {!compact && (
        <div className="min-w-0">
          <div className="font-bold text-[14px] tracking-[-.01em] truncate" style={{ color: C.text }}>EFU AI Assistant</div>
          <div className="text-[10.5px] truncate" style={{ color: C.muted }}>Private enterprise intelligence</div>
        </div>
      )}
    </div>
  )
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const signIn = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 850)
  }

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-5 md:p-8" style={{ background: 'linear-gradient(145deg,#F6FBF9 0%,#EDF7F3 45%,#F8FAF9 100%)' }}>
      <div className="absolute -top-44 -left-36 w-[460px] h-[460px] rounded-full blur-3xl opacity-40" style={{ background: '#BDEBD9' }} />
      <div className="absolute -bottom-48 -right-36 w-[520px] h-[520px] rounded-full blur-3xl opacity-30" style={{ background: '#A8DCCA' }} />
      <section className="relative w-full max-w-[1020px] grid lg:grid-cols-[1.05fr_.95fr] bg-white/90 backdrop-blur-2xl rounded-[32px] border overflow-hidden shadow-[0_35px_100px_rgba(4,61,47,.15)]" style={{ borderColor: 'rgba(255,255,255,.8)' }}>
        <div className="hidden lg:flex relative min-h-[650px] flex-col justify-between p-10 overflow-hidden" style={{ background: `linear-gradient(145deg,${C.primaryDeep},${C.primary} 55%,${C.emerald})` }}>
          <div className="absolute inset-0 opacity-[.10]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)', backgroundSize: '25px 25px' }} />
          <div className="absolute -right-28 top-20 w-80 h-80 rounded-full border border-white/10" />
          <div className="absolute -right-16 top-36 w-52 h-52 rounded-full border border-white/10" />
          <div className="relative z-10">
            <Logo />
            <div className="mt-24 max-w-md">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white border border-white/15 bg-white/10"><ShieldCheck size={13}/> Authorized EFU data only</span>
              <h1 className="mt-6 text-[42px] leading-[1.12] font-semibold tracking-[-.035em] text-white">Ask company data.<br/>Get clear decisions.</h1>
              <p className="mt-5 text-sm leading-7 text-white/70">A private multilingual assistant for secure database answers, charts, reports and operational insights.</p>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-3">
            {[['100%','Private'],['3','Languages'],['24/7','Available']].map(([v,l]) => <div key={l} className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-4"><div className="text-xl font-bold text-white">{v}</div><div className="text-[11px] text-white/55 mt-1">{l}</div></div>)}
          </div>
        </div>
        <div className="p-7 md:p-12 flex items-center">
          <div className="w-full max-w-[390px] mx-auto">
            <div className="lg:hidden mb-10"><Logo /></div>
            <span className="text-[11px] uppercase tracking-[.16em] font-bold" style={{ color: C.emerald }}>Secure employee access</span>
            <h2 className="text-3xl font-semibold tracking-[-.03em] mt-3" style={{ color: C.text }}>Welcome back</h2>
            <p className="text-sm mt-2" style={{ color: C.muted }}>Sign in with your EFU employee credentials.</p>
            <div className="mt-8 space-y-4">
              <label className="block"><span className="block text-xs font-semibold mb-2" style={{ color: C.text }}>Employee email or ID</span><div className="relative"><div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: C.mintSoft }}><MessageSquare size={14} style={{ color: C.primary }}/></div><input className="w-full h-14 rounded-2xl border bg-white pl-14 pr-4 outline-none text-sm transition focus:ring-4" style={{ borderColor: C.border, color: C.text }} value={user} onChange={e=>setUser(e.target.value)} placeholder="employee@efu.com" /></div></label>
              <label className="block"><span className="block text-xs font-semibold mb-2" style={{ color: C.text }}>Password</span><div className="relative"><div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: C.mintSoft }}><LockKeyhole size={14} style={{ color: C.primary }}/></div><input className="w-full h-14 rounded-2xl border bg-white pl-14 pr-16 outline-none text-sm" style={{ borderColor: C.border, color: C.text }} type={showPassword ? 'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/><button onClick={()=>setShowPassword(v=>!v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ color: C.primary }}>{showPassword?'Hide':'Show'}</button></div></label>
              <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 cursor-pointer" style={{ color:C.muted }}><input type="checkbox" className="accent-emerald-700"/> Remember me</label><button className="font-semibold" style={{ color:C.primary }}>Forgot password?</button></div>
              <button onClick={signIn} className="w-full h-14 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-[0_14px_30px_rgba(8,102,75,.22)] transition hover:-translate-y-.5" style={{ background:`linear-gradient(135deg,${C.primary},${C.emerald})` }}>{loading?<span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"/>:<ShieldCheck size={17}/>} {loading?'Signing in...':'Sign in securely'}</button>
              <button className="w-full h-13 rounded-2xl text-sm font-semibold border bg-white" style={{ borderColor:C.border,color:C.text }}>Continue with EFU Corporate Account</button>
            </div>
            <div className="mt-7 flex items-start gap-3 rounded-2xl p-4 border" style={{ background:C.mintSoft,borderColor:'#D7EEE5' }}><CircleCheck size={17} className="mt-.5" style={{ color:C.emerald }}/><div><div className="text-xs font-semibold" style={{ color:C.primary }}>Protected enterprise environment</div><div className="text-[11px] mt-1 leading-5" style={{ color:C.muted }}>All access, questions and database requests are securely audited.</div></div></div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Sidebar({ collapsed, onToggle, onNew, temporary, setTemporary }: { collapsed:boolean; onToggle:()=>void; onNew:()=>void; temporary:boolean; setTemporary:(v:boolean)=>void }) {
  const groups = useMemo(()=>['Today','Yesterday','Previous 7 days','Previous 30 days'],[])
  return (
    <aside className="h-full flex flex-col transition-all duration-300 border-r" style={{ width:collapsed?82:292, background:C.sidebar, borderColor:C.border }}>
      <div className="h-[72px] px-4 flex items-center justify-between border-b" style={{ borderColor:C.border }}><Logo compact={collapsed}/><button onClick={onToggle} className="w-9 h-9 rounded-xl flex items-center justify-center border bg-white hover:shadow-sm transition" style={{ borderColor:C.border,color:C.muted }}>{collapsed?<PanelLeftOpen size={17}/>:<PanelLeftClose size={17}/>}</button></div>
      <div className="p-3.5 space-y-2">
        <button onClick={onNew} className="relative overflow-hidden w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-white shadow-[0_10px_24px_rgba(8,102,75,.18)] transition hover:-translate-y-.5" style={{ background:`linear-gradient(135deg,${C.primary},${C.emerald})` }}><span className="absolute inset-0 opacity-20" style={{ backgroundImage:'linear-gradient(110deg,transparent 25%,rgba(255,255,255,.6) 45%,transparent 65%)' }}/><Plus size={18}/>{!collapsed&&'New conversation'}</button>
        <button className="w-full h-11 px-3 rounded-2xl flex items-center gap-3 text-sm transition hover:bg-white hover:shadow-sm" style={{ color:C.text }}><Search size={17}/>{!collapsed&&<span>Search conversations</span>}</button>
        <button onClick={()=>setTemporary(!temporary)} className="w-full h-11 px-3 rounded-2xl flex items-center gap-3 text-sm border transition" style={{ color:temporary?C.primary:C.text, background:temporary?C.mintSoft:'transparent', borderColor:temporary?'#CDEBDD':'transparent' }}><History size={17}/>{!collapsed&&<><span className="flex-1 text-left">Temporary chat</span>{temporary&&<Check size={14}/>}</>}</button>
      </div>
      {!collapsed&&<div className="flex-1 overflow-y-auto px-3.5 pb-4">
        <div className="flex items-center justify-between px-2 pt-3 pb-2"><span className="text-[10px] uppercase tracking-[.14em] font-bold" style={{ color:C.subtle }}>Pinned</span><Pin size={12} style={{ color:C.subtle }}/></div>
        {chats.filter(c=>c.pinned).map(c=><ChatRow key={c.title} {...c}/>) }
        {groups.map(g=>{const rows=chats.filter(c=>c.group===g&&!c.pinned);return rows.length?<div key={g} className="mt-5"><div className="px-2 mb-1.5 text-[10px] font-semibold" style={{ color:C.subtle }}>{g}</div>{rows.map(c=><ChatRow key={c.title} {...c}/>)}</div>:null})}
      </div>}
      <div className="p-3.5 border-t" style={{ borderColor:C.border }}>
        {!collapsed&&<div className="grid grid-cols-2 gap-2 mb-3"><button className="h-9 rounded-xl bg-white border flex items-center justify-center gap-1.5 text-[11px] font-semibold" style={{borderColor:C.border,color:C.muted}}><HelpCircle size={13}/> Help</button><button className="h-9 rounded-xl bg-white border flex items-center justify-center gap-1.5 text-[11px] font-semibold" style={{borderColor:C.border,color:C.muted}}><Settings size={13}/> Settings</button></div>}
        <button className="w-full rounded-2xl p-2 flex items-center gap-3 hover:bg-white transition"><div className="relative w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold text-white" style={{ background:`linear-gradient(145deg,${C.primary},${C.emerald})` }}>AA<span className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full border-2 border-white bg-emerald-400"/></div>{!collapsed&&<><div className="min-w-0 flex-1 text-left"><div className="text-sm font-bold truncate" style={{color:C.text}}>Aijaz Ahmed</div><div className="text-[10px] truncate" style={{color:C.muted}}>IT Department · Admin</div></div><MoreHorizontal size={16} style={{color:C.muted}}/></>}</button>
      </div>
    </aside>
  )
}

function ChatRow({ title, pinned, active }: { title:string; pinned?:boolean; active?:boolean }) {
  return <button className="group relative w-full flex items-center gap-2.5 px-3 py-3 rounded-2xl text-left transition mb-1" style={{ background:active?'linear-gradient(90deg,#E7F6F0,#F3FBF8)':'transparent', color:active?C.primary:C.text }}><span className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:active?'#D5F0E5':'#EDF2F0' }}><MessageSquare size={13}/></span><span className="text-[12px] font-medium truncate flex-1">{title}</span>{pinned?<Pin size={12}/>:<MoreHorizontal size={14} className="opacity-0 group-hover:opacity-100 transition"/>}{active&&<span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full" style={{background:C.emerald}}/>}</button>
}

function Topbar({ temporary, language, setLanguage }: { temporary:boolean; language:string; setLanguage:(v:string)=>void }) {
  return <header className="h-[72px] px-5 md:px-7 flex items-center justify-between border-b bg-white/90 backdrop-blur-xl" style={{borderColor:C.border}}>
    <div className="flex items-center gap-3 min-w-0"><div className="hidden sm:flex w-10 h-10 rounded-2xl items-center justify-center" style={{background:C.mintSoft}}><WandSparkles size={18} style={{color:C.primary}}/></div><div className="min-w-0"><div className="text-sm font-bold truncate" style={{color:C.text}}>EFU AI Assistant</div><div className="flex items-center gap-2 mt-0.5"><span className="inline-flex w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.10)]"/><span className="text-[10.5px]" style={{color:C.muted}}>Secure database connection active</span></div></div></div>
    <div className="flex items-center gap-2">{temporary&&<span className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border" style={{background:C.mintSoft,color:C.primary,borderColor:'#CDEBDD'}}><History size={13}/> Temporary</span>}<div className="relative"><select value={language} onChange={e=>setLanguage(e.target.value)} className="appearance-none h-10 pl-3 pr-9 rounded-xl border bg-white text-xs font-semibold outline-none" style={{borderColor:C.border,color:C.text}}><option>Auto</option><option>English</option><option>Urdu</option><option>Roman Urdu</option></select><ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{color:C.muted}}/></div><button className="relative w-10 h-10 rounded-xl border bg-white flex items-center justify-center hover:shadow-sm" style={{borderColor:C.border,color:C.muted}}><Bell size={16}/><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white"/></button><button className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center hover:shadow-sm" style={{borderColor:C.border,color:C.muted}}><Settings size={16}/></button></div>
  </header>
}

function EmptyChat({ onSuggestion }: { onSuggestion:(q:string)=>void }) {
  const items = [
    {icon:Layers3,title:'Compare assets',desc:'Across branches or departments',q:'Show active assets by branch'},
    {icon:Gauge,title:'Warranty insights',desc:'Find upcoming warranty risks',q:'Which laptop warranties expire this month?'},
    {icon:ScanSearch,title:'Find an asset',desc:'Search by asset tag or serial',q:'Find asset tag EFU-KHI-1024'},
    {icon:FileChartColumn,title:'Inventory report',desc:'Analyze available inventory',q:'Show unassigned laptops in Karachi'},
  ]
  return <div className="flex-1 overflow-y-auto px-5 pb-32"><div className="max-w-[860px] mx-auto pt-[10vh] md:pt-[12vh]">
    <div className="relative text-center">
      <div className="absolute left-1/2 top-1 -translate-x-1/2 w-64 h-28 blur-3xl opacity-55" style={{background:'#BFECDD'}}/>
      <div className="relative w-16 h-16 mx-auto rounded-[22px] flex items-center justify-center border shadow-[0_16px_45px_rgba(8,102,75,.16)]" style={{background:'linear-gradient(145deg,#FFFFFF,#E8F7F1)',borderColor:'#D7EEE5'}}><Sparkles size={27} style={{color:C.primary}}/><span className="absolute -right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center text-white border-2 border-white" style={{background:C.emerald}}><Check size={10}/></span></div>
      <span className="inline-flex mt-6 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[.12em] font-bold" style={{background:C.mintSoft,color:C.primary}}>Authorized EFU intelligence</span>
      <h1 className="mt-4 text-[34px] md:text-[44px] leading-tight font-semibold tracking-[-.045em]" style={{color:C.text}}>What would you like to know?</h1>
      <p className="mt-3 text-sm md:text-[15px]" style={{color:C.muted}}>Ask in English, Urdu or Roman Urdu. Get verified answers, charts and downloadable reports.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-10">{items.map(({icon:Icon,title,desc,q},i)=><button key={q} onClick={()=>onSuggestion(q)} className="group relative overflow-hidden text-left rounded-[22px] border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(8,102,75,.10)]" style={{borderColor:C.border}}><div className="flex items-start gap-4"><span className="w-11 h-11 rounded-2xl flex items-center justify-center transition group-hover:scale-105" style={{background:i%2===0?C.mintSoft:'#F5F1E8',color:i%2===0?C.primary:C.warning}}><Icon size={19}/></span><div className="flex-1"><div className="text-sm font-bold" style={{color:C.text}}>{title}</div><div className="text-[11px] mt-1" style={{color:C.muted}}>{desc}</div><div className="text-xs mt-3 font-medium" style={{color:C.primary}}>{q}</div></div><ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" style={{color:C.subtle}}/></div></button>)}</div>
    <div className="mt-7 flex flex-wrap justify-center gap-2">{['Asset status','Branch summary','Warranty risk','Maintenance trend'].map(x=><button key={x} className="px-3 py-2 rounded-full border bg-white text-[11px] font-medium" style={{borderColor:C.border,color:C.muted}}>{x}</button>)}</div>
  </div></div>
}

function MessageContent({ message, onExport }: { message:Message; onExport:()=>void }) {
  if(message.role==='user') return <div className="flex justify-end"><div className="max-w-[82%] md:max-w-[72%]"><div className="rounded-[22px] rounded-br-md px-4 py-3.5 text-sm leading-6 shadow-[0_7px_20px_rgba(8,102,75,.08)]" style={{background:`linear-gradient(145deg,${C.primary},${C.primaryDark})`,color:'white'}}>{message.text}</div><div className="text-[10px] text-right mt-1.5 pr-1" style={{color:C.subtle}}>{message.time}</div></div></div>
  return <div className="flex gap-3.5"><div className="relative w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_8px_20px_rgba(8,102,75,.18)]" style={{background:`linear-gradient(145deg,${C.primary},${C.emerald})`}}><Sparkles size={16} color="white"/><span className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-white flex items-center justify-center"><Check size={10} style={{color:C.emerald}}/></span></div><div className="min-w-0 flex-1">
    <div className="flex items-center gap-2 mb-2"><span className="text-xs font-bold" style={{color:C.text}}>EFU AI</span><span className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider" style={{background:C.mintSoft,color:C.primary}}>Verified assistant</span></div>
    <div className="text-[15px] leading-7" style={{color:C.text}}>{message.text}</div>
    {message.chart&&<ChartCard type={message.chart}/>} {message.table&&<ResultsTable/>}
    {message.verified&&<details className="mt-4 rounded-2xl border overflow-hidden bg-white" style={{borderColor:C.border}}><summary className="cursor-pointer list-none px-4 py-3.5 flex items-center gap-2.5 text-xs font-bold" style={{color:C.primary,background:C.mintSoft}}><span className="w-7 h-7 rounded-xl flex items-center justify-center bg-white"><ShieldCheck size={14}/></span>Verified using EFU authorized data<ChevronDown size={14} className="ml-auto"/></summary><div className="p-4 grid sm:grid-cols-2 gap-3 text-xs" style={{color:C.muted}}><Info label="Source" value={message.source||'-'}/><Info label="Records" value={String(message.records||0)}/><Info label="Response language" value={message.language||'-'}/><Info label="Retrieved" value={`Today at ${message.time}`}/><div className="sm:col-span-2 rounded-xl p-3" style={{background:C.bg}}><b style={{color:C.text}}>Applied filters:</b> Karachi, Lahore, Islamabad · Laptop · Active</div></div></details>}
    <div className="mt-3 flex items-center flex-wrap gap-1"><Action icon={Copy} label="Copy"/><Action icon={ThumbsUp} label="Helpful"/><Action icon={ThumbsDown} label="Not helpful"/><Action icon={Bookmark} label="Save"/><Action icon={Share2} label="Share"/><button onClick={onExport} className="ml-1 h-9 px-3 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border" style={{background:C.mintSoft,color:C.primary,borderColor:'#CFEADF'}}><Download size={13}/> Export response</button></div><div className="text-[10px] mt-2" style={{color:C.subtle}}>{message.time}</div>
  </div></div>
}

function Info({label,value}:{label:string;value:string}){return <div><div className="text-[10px] uppercase tracking-wider font-semibold" style={{color:C.subtle}}>{label}</div><div className="font-semibold mt-1" style={{color:C.text}}>{value}</div></div>}
function Action({icon:Icon,label}:{icon:typeof Copy;label:string}){return <button className="h-9 px-2.5 rounded-xl hover:bg-gray-50 flex items-center gap-1.5 text-[11px] font-medium" style={{color:C.muted}} title={label}><Icon size={13}/><span className="hidden sm:inline">{label}</span></button>}

function ChartCard({type}:{type:ChartType}){
  const [chartType,setChartType]=useState(type)
  return <section className="mt-5 rounded-[24px] border overflow-hidden bg-white shadow-[0_15px_45px_rgba(17,49,39,.06)]" style={{borderColor:C.border}}><div className="px-5 py-4 flex items-start justify-between gap-3 border-b" style={{borderColor:C.border,background:'linear-gradient(180deg,#FFFFFF,#FBFDFC)'}}><div><div className="flex items-center gap-2"><span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:C.mintSoft,color:C.primary}}><TrendingUp size={15}/></span><div><div className="text-sm font-bold" style={{color:C.text}}>{chartType==='bar'?'Active laptops by branch':chartType==='line'?'Monthly maintenance cost':'Asset status distribution'}</div><div className="text-[10.5px] mt-0.5" style={{color:C.muted}}>Interactive visualization from verified result</div></div></div></div><div className="flex items-center gap-1.5"><select value={chartType} onChange={e=>setChartType(e.target.value as ChartType)} className="h-9 rounded-xl border px-2.5 text-[10px] font-semibold outline-none" style={{borderColor:C.border,color:C.text}}><option value="bar">Bar chart</option><option value="line">Line chart</option><option value="pie">Donut chart</option></select><button className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{borderColor:C.border,color:C.muted}}><Download size={14}/></button><button className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{borderColor:C.border,color:C.muted}}><MoreHorizontal size={14}/></button></div></div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 pb-0">{[['Total','291'],['Highest','Karachi'],['Available','28'],['Maintenance','12']].map(([l,v])=><div key={l} className="rounded-2xl p-3 border" style={{borderColor:C.border,background:C.bg}}><div className="text-[10px]" style={{color:C.muted}}>{l}</div><div className="text-sm font-bold mt-1" style={{color:C.text}}>{v}</div></div>)}</div>
    <div className="p-4 h-72"><ResponsiveContainer width="100%" height="100%">{chartType==='bar'?<BarChart data={branchData} barSize={34}><CartesianGrid strokeDasharray="3 4" stroke="#E6ECE9" vertical={false}/><XAxis dataKey="branch" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:14,border:`1px solid ${C.border}`,boxShadow:'0 12px 30px rgba(0,0,0,.08)'}}/><Bar dataKey="active" fill={C.primary} radius={[9,9,3,3]}/></BarChart>:chartType==='line'?<LineChart data={maintenanceTrend}><CartesianGrid strokeDasharray="3 4" stroke="#E6ECE9" vertical={false}/><XAxis dataKey="month" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/><Tooltip formatter={(v:number)=>[`PKR ${v}M`,'Cost']} contentStyle={{borderRadius:14,border:`1px solid ${C.border}`}}/><Line type="monotone" dataKey="cost" stroke={C.emerald} strokeWidth={3.5} dot={{r:4,fill:C.primary,strokeWidth:3,stroke:'#fff'}}/></LineChart>:<PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={64} outerRadius={96} paddingAngle={4}>{statusData.map((_,i)=><Cell key={i} fill={pieColors[i]}/>)}</Pie><Tooltip contentStyle={{borderRadius:14,border:`1px solid ${C.border}`}}/><Legend iconType="circle"/></PieChart>}</ResponsiveContainer></div>
  </section>
}

function ResultsTable(){return <section className="mt-4 rounded-[24px] border overflow-hidden bg-white shadow-[0_12px_36px_rgba(17,49,39,.05)]" style={{borderColor:C.border}}><div className="px-5 py-4 flex items-center justify-between border-b" style={{borderColor:C.border}}><div className="flex items-center gap-3"><span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:C.mintSoft,color:C.primary}}><FileSpreadsheet size={16}/></span><div><div className="text-sm font-bold" style={{color:C.text}}>Branch comparison</div><div className="text-[10.5px] mt-0.5" style={{color:C.muted}}>3 verified records</div></div></div><div className="flex gap-1.5"><button className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{borderColor:C.border,color:C.muted}}><Search size={14}/></button><button className="h-9 px-3 rounded-xl border flex items-center gap-1.5 text-[10px] font-bold" style={{borderColor:C.border,color:C.primary}}><Download size={13}/> Export</button></div></div><div className="overflow-x-auto"><table className="w-full min-w-[660px] text-xs"><thead style={{background:'#F6F9F8',color:C.muted}}><tr>{['Branch','Active laptops','Assigned','Available','Maintenance'].map(h=><th key={h} className="text-left px-5 py-3.5 font-semibold">{h}</th>)}</tr></thead><tbody>{branchData.map((r,i)=><tr key={r.branch} className="border-t hover:bg-emerald-50/30 transition" style={{borderColor:C.border}}><td className="px-5 py-4"><div className="flex items-center gap-2"><span className="w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-bold" style={{background:i===0?C.mintSoft:'#F1F4F3',color:i===0?C.primary:C.muted}}>{r.branch[0]}</span><span className="font-bold" style={{color:C.text}}>{r.branch}</span></div></td><td className="px-5 py-4 font-bold" style={{color:C.primary}}>{r.active}</td><td className="px-5 py-4" style={{color:C.text}}>{r.assigned}</td><td className="px-5 py-4"><span className="px-2 py-1 rounded-lg" style={{background:C.mintSoft,color:C.primary}}>{r.available}</span></td><td className="px-5 py-4"><span className="px-2 py-1 rounded-lg" style={{background:'#FFF5E6',color:C.warning}}>{r.maintenance}</span></td></tr>)}</tbody></table></div></section>}

function Composer({value,setValue,onSend,recording,setRecording,language}:{value:string;setValue:(v:string)=>void;onSend:()=>void;recording:boolean;setRecording:(v:boolean)=>void;language:string}){
  return <div className="px-4 md:px-7 pb-4 pt-2 bg-gradient-to-t from-white via-white to-transparent"><div className="max-w-[850px] mx-auto">{recording?<div className="rounded-[24px] border p-3.5 flex items-center gap-3 bg-white shadow-[0_18px_45px_rgba(17,49,39,.10)]" style={{borderColor:'#F0C4C4'}}><div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{background:'#FFF0F0',color:C.danger}}><Mic size={18}/></div><div className="flex items-center gap-1 flex-1">{[12,20,28,16,25,13,21,30,17,24,14,27].map((h,i)=><span key={i} className="wave-bar w-1 rounded-full" style={{height:h,background:i%3===0?C.emerald:C.primary}}/>)}</div><span className="text-[11px] hidden sm:inline" style={{color:C.muted}}>Listening · {language}</span><button onClick={()=>setRecording(false)} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'#FFF0F0',color:C.danger}}><X size={15}/></button><button onClick={()=>{setRecording(false);setValue('Karachi branch mein kitne active laptops hain?')}} className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{background:C.primary}}><Square size={14}/></button></div>:<div className="relative rounded-[25px] border bg-white p-2 shadow-[0_22px_55px_rgba(17,49,39,.10)] focus-within:shadow-[0_22px_60px_rgba(8,102,75,.16)] transition" style={{borderColor:'#CFE1DA'}}><textarea value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();onSend()}}} rows={1} placeholder="Ask anything about authorized EFU data..." className="w-full resize-none outline-none bg-transparent text-sm px-4 pt-3 pb-2 min-h-[48px] max-h-32" style={{color:C.text}}/><div className="flex items-center justify-between px-1 pb-1"><div className="flex items-center gap-1"><button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-50" style={{color:C.muted}}><Paperclip size={17}/></button><button onClick={()=>setRecording(true)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-50" style={{color:C.muted}}><Mic size={17}/></button><button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-50" style={{color:C.muted}}><Volume2 size={17}/></button><span className="hidden sm:inline-flex ml-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold" style={{background:C.mintSoft,color:C.primary}}>{language}</span></div><button onClick={onSend} disabled={!value.trim()} className="w-11 h-11 rounded-2xl flex items-center justify-center text-white disabled:opacity-35 transition hover:scale-105 shadow-[0_8px_20px_rgba(8,102,75,.22)]" style={{background:`linear-gradient(145deg,${C.primary},${C.emerald})`}}><Send size={17}/></button></div></div>}<div className="flex items-center justify-center gap-2 mt-2"><ShieldCheck size={11} style={{color:C.emerald}}/><p className="text-[9.5px]" style={{color:C.subtle}}>Private · Audited · Authorized database sources only</p></div></div></div>
}

function ExportModal({onClose}:{onClose:()=>void}){
  const [format,setFormat]=useState<ExportFormat>('PDF');const [loading,setLoading]=useState(false)
  const formats:{id:ExportFormat;icon:typeof FileText;color:string}[]=[{id:'PDF',icon:FileType2,color:'#E55A5A'},{id:'Word',icon:FileText,color:'#3478D4'},{id:'Excel',icon:FileSpreadsheet,color:'#1D9A64'},{id:'CSV',icon:FileSpreadsheet,color:'#8A6AD8'}]
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{background:'rgba(6,30,23,.42)'}}><div className="w-full max-w-[560px] bg-white rounded-[28px] overflow-hidden shadow-[0_35px_100px_rgba(4,61,47,.28)]"><div className="px-6 py-5 flex items-center justify-between border-b" style={{borderColor:C.border}}><div className="flex items-center gap-3"><span className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{background:C.mintSoft,color:C.primary}}><Download size={17}/></span><div><div className="font-bold" style={{color:C.text}}>Export response</div><div className="text-[11px] mt-0.5" style={{color:C.muted}}>Create a branded document with charts and data</div></div></div><button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-50"><X size={16}/></button></div><div className="p-6"><div className="grid grid-cols-4 gap-2.5">{formats.map(({id,icon:Icon,color})=><button key={id} onClick={()=>setFormat(id)} className="rounded-2xl border p-3.5 flex flex-col items-center gap-2 text-[11px] font-bold transition" style={{borderColor:format===id?color:C.border,background:format===id?`${color}10`:'white',color:format===id?color:C.text}}><span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:`${color}12`}}><Icon size={19}/></span>{id}</button>)}</div><div className="mt-5 rounded-2xl p-4 border space-y-3" style={{background:C.bg,borderColor:C.border}}>{['Original question','Answer and summary','Charts and visualizations','Detailed data table','Database source and filters','EFU branding and timestamp','Confidentiality watermark'].map((x,i)=><label key={x} className="flex items-center gap-3 text-xs cursor-pointer" style={{color:C.text}}><input type="checkbox" defaultChecked={i<6} className="accent-emerald-700"/><span className="flex-1">{x}</span>{i<6&&<Check size={13} style={{color:C.emerald}}/>}</label>)}</div><div className="flex justify-end gap-2 mt-6"><button onClick={onClose} className="h-11 px-4 rounded-xl border text-xs font-bold" style={{borderColor:C.border,color:C.text}}>Cancel</button><button onClick={()=>{setLoading(true);setTimeout(()=>{setLoading(false);onClose()},1000)}} className="h-11 px-5 rounded-xl text-xs font-bold text-white flex items-center gap-2" style={{background:`linear-gradient(135deg,${C.primary},${C.emerald})`}}>{loading?<span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"/>:<Download size={14}/>} {loading?'Preparing...':`Download ${format}`}</button></div></div></div></div>
}

export default function App(){
  const [loggedIn,setLoggedIn]=useState(false),[collapsed,setCollapsed]=useState(false),[temporary,setTemporary]=useState(false),[language,setLanguage]=useState('Auto'),[messages,setMessages]=useState<Message[]>(initialMessages),[input,setInput]=useState(''),[recording,setRecording]=useState(false),[typing,setTyping]=useState(false),[exportOpen,setExportOpen]=useState(false)
  const bottomRef=useRef<HTMLDivElement>(null)
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:'smooth'})},[messages,typing])
  const newChat=()=>{setMessages([]);setInput('')}
  const send=()=>{const q=input.trim();if(!q)return;const time=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});setMessages(p=>[...p,{id:Date.now(),role:'user',text:q,time}]);setInput('');setTyping(true);setTimeout(()=>{const roman=/\b(kitne|hain|mein|dikhao|karo|ka|ki|ke)\b/i.test(q);setMessages(p=>[...p,{id:Date.now()+1,role:'assistant',text:roman?'Karachi branch mein 126 active laptops hain. Lahore mein 94 aur Islamabad mein 71 active laptops hain. Neeche branch comparison chart aur detailed records diye gaye hain.':'Karachi has 126 active laptops, Lahore has 94, and Islamabad has 71. The comparison chart and detailed records are shown below.',time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),verified:true,source:'vw_AI_AssetsByBranch',records:291,chart:'bar',table:true,language:roman?'Roman Urdu':'English'}]);setTyping(false)},1350)}
  if(!loggedIn)return <LoginScreen onLogin={()=>setLoggedIn(true)}/>
  return <div className="h-screen flex overflow-hidden" style={{background:C.bg}}><Sidebar collapsed={collapsed} onToggle={()=>setCollapsed(v=>!v)} onNew={newChat} temporary={temporary} setTemporary={setTemporary}/><main className="flex-1 min-w-0 flex flex-col"><Topbar temporary={temporary} language={language} setLanguage={setLanguage}/>{temporary&&<div className="px-5 py-2.5 text-[11px] border-b flex items-center justify-center gap-2" style={{background:C.mintSoft,color:C.primary,borderColor:'#D8EEE5'}}><History size={13}/> Temporary conversation — it will not appear in recent chats.</div>}{messages.length===0?<EmptyChat onSuggestion={setInput}/>:<div className="flex-1 overflow-y-auto px-4 md:px-7 py-8"><div className="max-w-[850px] mx-auto space-y-9">{messages.map(m=><MessageContent key={m.id} message={m} onExport={()=>setExportOpen(true)}/>)}{typing&&<div className="flex gap-3.5"><div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{background:`linear-gradient(145deg,${C.primary},${C.emerald})`}}><Sparkles size={16} color="white"/></div><div className="rounded-2xl border bg-white px-4 py-3 flex items-center gap-3 shadow-sm" style={{borderColor:C.border}}><div className="flex gap-1">{[0,1,2].map(i=><span key={i} className="typing-dot w-2 h-2 rounded-full" style={{background:i===1?C.emerald:C.primary}}/>)}</div><span className="text-xs" style={{color:C.muted}}>Searching authorized EFU data...</span></div></div>}<div ref={bottomRef}/></div></div>}<Composer value={input} setValue={setInput} onSend={send} recording={recording} setRecording={setRecording} language={language}/></main>{exportOpen&&<ExportModal onClose={()=>setExportOpen(false)}/>}</div>
}
