import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Archive, BarChart3, Bookmark, Check, ChevronDown, ChevronLeft, ChevronRight,
  Copy, Database, Download, FileSpreadsheet, FileText,
  FileType2, HelpCircle, History, LogOut, Menu, MessageSquare, Mic,
  MoreHorizontal, Paperclip, Pin, Plus, Search, Send, Settings, Share2,
  ShieldCheck, Sparkles, Square, ThumbsDown, ThumbsUp, Trash2, User,
  Volume2, X
} from 'lucide-react'
import {
  Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart,
  Cell, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'

const COLORS = {
  green: '#0A5D44',
  greenDark: '#074233',
  mint: '#EAF5F0',
  bg: '#FFFFFF',
  soft: '#F6F8F7',
  border: '#E4E8E6',
  text: '#18211D',
  muted: '#6D756F',
  danger: '#D64545',
  warning: '#D38A16',
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
const pieColors = ['#0A5D44', '#2B9A70', '#D39A35']

type ChartType = 'bar' | 'line' | 'pie'
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

type ExportFormat = 'PDF' | 'Word' | 'Excel' | 'CSV'

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

const recentChats = [
  { title: 'Active laptops by branch', date: 'Today', pinned: true },
  { title: 'Warranty expiry this month', date: 'Today' },
  { title: 'Unassigned printers Karachi', date: 'Yesterday' },
  { title: 'Maintenance cost trend', date: 'Previous 7 days' },
  { title: 'Department asset summary', date: 'Previous 7 days' },
  { title: 'Inventory availability', date: 'Previous 30 days' },
]

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm" style={{ background: COLORS.green }}>
        EFU
      </div>
      {!compact && (
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate" style={{ color: COLORS.text }}>EFU AI Assistant</div>
          <div className="text-[11px] truncate" style={{ color: COLORS.muted }}>Secure Data Assistant</div>
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
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 800)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F7F9F8' }}>
      <section className="w-full max-w-[430px] bg-white rounded-3xl border p-8 md:p-10 shadow-[0_24px_80px_rgba(10,93,68,0.08)]" style={{ borderColor: COLORS.border }}>
        <div className="flex justify-center mb-8"><Logo /></div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2" style={{ color: COLORS.text }}>Welcome back</h1>
          <p className="text-sm" style={{ color: COLORS.muted }}>Sign in using your EFU employee account.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: COLORS.text }}>Employee email or ID</label>
            <input className="input-field" value={user} onChange={e => setUser(e.target.value)} placeholder="employee@efu.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: COLORS.text }}>Password</label>
            <div className="relative">
              <input className="input-field pr-16" value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium" style={{ color: COLORS.green }} onClick={() => setShowPassword(v => !v)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer" style={{ color: COLORS.muted }}><input type="checkbox" /> Remember me</label>
            <button className="font-medium" style={{ color: COLORS.green }}>Forgot password?</button>
          </div>
          <button onClick={signIn} className="w-full rounded-xl py-3 text-sm font-semibold text-white flex items-center justify-center gap-2" style={{ background: COLORS.green }}>
            {loading ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <ShieldCheck size={16} />}
            {loading ? 'Signing in...' : 'Sign in securely'}
          </button>
          <button className="w-full rounded-xl py-3 text-sm font-semibold border bg-white" style={{ color: COLORS.text, borderColor: COLORS.border }}>Continue with EFU Corporate Account</button>
        </div>

        <div className="mt-8 rounded-xl p-3 flex items-start gap-3" style={{ background: COLORS.mint }}>
          <ShieldCheck size={17} style={{ color: COLORS.green }} className="mt-0.5" />
          <div>
            <p className="text-xs font-semibold" style={{ color: COLORS.green }}>Authorized EFU personnel only</p>
            <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: COLORS.muted }}>All access and database queries are securely audited.</p>
          </div>
        </div>
        <div className="mt-7 text-center text-[11px]" style={{ color: COLORS.muted }}>EFU General Insurance Ltd. · Privacy · Security · Help · v1.0</div>
      </section>
    </main>
  )
}

function Sidebar({ collapsed, onToggle, onNew, temporary, setTemporary }: {
  collapsed: boolean
  onToggle: () => void
  onNew: () => void
  temporary: boolean
  setTemporary: (v: boolean) => void
}) {
  const grouped = useMemo(() => ['Today', 'Yesterday', 'Previous 7 days', 'Previous 30 days'], [])

  if (collapsed) {
    return (
      <aside className="h-full w-[72px] flex flex-col items-center border-r bg-[#F7F9F8]" style={{ borderColor: COLORS.border }}>
        <button
          onClick={onToggle}
          className="mt-3 w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-xs shadow-[0_8px_24px_rgba(10,93,68,.20)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(10,93,68,.28)]"
          style={{ background: `linear-gradient(145deg, ${COLORS.green}, #13815F)` }}
          title="Open sidebar"
        >
          EFU
        </button>

        <div className="w-full px-3 mt-5 space-y-2">
          <button onClick={onNew} className="w-full h-11 rounded-2xl flex items-center justify-center text-white shadow-sm hover:scale-[1.03] transition-transform" style={{ background: COLORS.green }} title="New chat">
            <Plus size={19} />
          </button>
          <RailButton icon={Search} label="Search chats" />
          <RailButton icon={History} label="Temporary chat" active={temporary} onClick={() => setTemporary(!temporary)} />
        </div>

        <div className="mt-auto w-full px-3 pb-3 pt-3 border-t" style={{ borderColor: COLORS.border }}>
          <button className="w-full h-11 rounded-2xl flex items-center justify-center text-white text-xs font-semibold hover:scale-[1.03] transition-transform" style={{ background: COLORS.green }} title="Aijaz Ahmed — Settings">
            AA
          </button>
        </div>
      </aside>
    )
  }

  return (
    <aside className="h-full w-[292px] flex flex-col border-r bg-[#F7F9F8] shadow-[8px_0_30px_rgba(24,33,29,.025)]" style={{ borderColor: COLORS.border }}>
      <div className="px-4 pt-4 pb-3">
        <div className="h-14 px-3 flex items-center gap-3 rounded-2xl bg-white border shadow-[0_5px_18px_rgba(24,33,29,.04)]" style={{ borderColor: COLORS.border }}>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-xs shadow-sm" style={{ background: `linear-gradient(145deg, ${COLORS.green}, #13815F)` }}>EFU</div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-sm truncate" style={{ color: COLORS.text }}>EFU AI Assistant</div>
            <div className="text-[11px] flex items-center gap-1.5 truncate" style={{ color: COLORS.muted }}><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Secure data assistant</div>
          </div>
          <button onClick={onToggle} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#F2F6F4] transition-colors" title="Close sidebar">
            <ChevronLeft size={18} style={{ color: COLORS.muted }} />
          </button>
        </div>
      </div>

      <div className="px-4 space-y-1.5">
        <button onClick={onNew} className="w-full h-12 px-4 rounded-2xl flex items-center gap-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(10,93,68,.16)] hover:-translate-y-0.5 transition-all" style={{ background: `linear-gradient(135deg, ${COLORS.green}, #0F7657)` }}>
          <span className="w-7 h-7 rounded-xl flex items-center justify-center bg-white/14"><Plus size={17} /></span>
          New chat
          <span className="ml-auto text-[10px] font-medium text-white/65">Ctrl K</span>
        </button>
        <button className="w-full h-11 px-3 rounded-xl flex items-center gap-3 text-sm hover:bg-white transition-colors" style={{ color: COLORS.text }}>
          <Search size={17} style={{ color: COLORS.muted }} /> Search chats
        </button>
        <button onClick={() => setTemporary(!temporary)} className="w-full h-11 px-3 rounded-xl flex items-center gap-3 text-sm transition-colors" style={{ color: temporary ? COLORS.green : COLORS.text, background: temporary ? COLORS.mint : 'transparent' }}>
          <History size={17} />
          <span className="flex-1 text-left">Temporary chat</span>
          {temporary && <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-white"><Check size={14} /></span>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 mt-3 pb-3 sidebar-scroll">
        <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-[.14em]" style={{ color: '#89918C' }}>Pinned</div>
        {recentChats.filter(c => c.pinned).map(c => <ChatRow key={c.title} title={c.title} pinned active />)}
        {grouped.map(group => {
          const rows = recentChats.filter(c => c.date === group && !c.pinned)
          if (!rows.length) return null
          return <div key={group} className="mt-4"><div className="px-3 mb-1 text-[10px] font-bold uppercase tracking-[.12em]" style={{ color: '#89918C' }}>{group}</div>{rows.map(c => <ChatRow key={c.title} title={c.title} />)}</div>
        })}
      </div>

      <div className="p-3 border-t" style={{ borderColor: COLORS.border }}>
        <button className="group w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-2xl text-white flex items-center justify-center text-xs font-semibold shadow-sm" style={{ background: `linear-gradient(145deg, ${COLORS.green}, #168566)` }}>AA</div>
          <div className="text-left min-w-0 flex-1">
            <div className="text-sm font-semibold truncate" style={{ color: COLORS.text }}>Aijaz Ahmed</div>
            <div className="text-[11px] truncate" style={{ color: COLORS.muted }}>IT Department</div>
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:bg-[#F3F7F5]" title="Settings">
            <Settings size={16} style={{ color: COLORS.muted }} />
          </div>
        </button>
      </div>
    </aside>
  )
}

function RailButton({ icon: Icon, label, active, onClick }: { icon: typeof Search, label: string, active?: boolean, onClick?: () => void }) {
  return <button onClick={onClick} className="w-full h-11 rounded-2xl flex items-center justify-center transition-colors hover:bg-white" style={{ color: active ? COLORS.green : COLORS.muted, background: active ? COLORS.mint : 'transparent' }} title={label}><Icon size={18} /></button>
}
function ChatRow({ title, pinned, active }: { title: string, pinned?: boolean, active?: boolean }) {
  return <button className="group relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all hover:bg-white" style={{ background: active ? '#E9F3EF' : 'transparent' }}>
    {active && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full" style={{ background: COLORS.green }} />}
    <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: active ? 'white' : '#EEF2F0' }}><MessageSquare size={13} style={{ color: active ? COLORS.green : COLORS.muted }} /></span>
    <span className="text-xs truncate flex-1 font-medium" style={{ color: active ? COLORS.greenDark : COLORS.text }}>{title}</span>
    {pinned ? <Pin size={12} style={{ color: COLORS.green }} /> : <MoreHorizontal size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COLORS.muted }} />}
  </button>
}
function EmptyChat({ onSuggestion }: { onSuggestion: (q: string) => void }) {
  const questions = [
    'Show active assets by branch',
    'Which laptop warranties expire this month?',
    'Find asset tag EFU-KHI-1024',
    'Show unassigned laptops in Karachi',
  ]
  return <div className="flex-1 flex items-center justify-center px-5 pb-24">
    <div className="w-full max-w-3xl text-center -mt-12">
      <div className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-5" style={{ background: COLORS.mint }}><Sparkles size={23} style={{ color: COLORS.green }} /></div>
      <h1 className="text-2xl md:text-3xl font-medium mb-2" style={{ color: COLORS.text }}>How can I help you today?</h1>
      <p className="text-sm mb-8" style={{ color: COLORS.muted }}>Ask questions using authorized EFU company data.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
        {questions.map(q => <button key={q} onClick={() => onSuggestion(q)} className="p-4 rounded-2xl border bg-white hover:shadow-sm transition text-sm flex items-center justify-between gap-3" style={{ borderColor: COLORS.border, color: COLORS.text }}><span>{q}</span><ChevronRight size={15} style={{ color: COLORS.muted }} /></button>)}
      </div>
    </div>
  </div>
}

function MessageContent({ message, onExport }: { message: Message, onExport: () => void }) {
  if (message.role === 'user') {
    return <div className="flex justify-end"><div className="max-w-[78%] rounded-2xl rounded-br-md px-4 py-3 text-sm leading-relaxed" style={{ background: COLORS.mint, color: COLORS.text }}>{message.text}<div className="text-[10px] mt-1 text-right" style={{ color: COLORS.muted }}>{message.time}</div></div></div>
  }

  return <div className="flex gap-3">
    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: COLORS.green }}><Sparkles size={15} color="white" /></div>
    <div className="min-w-0 flex-1">
      <div className="text-sm leading-7" style={{ color: COLORS.text }}>{message.text}</div>

      {message.chart && <ChartCard type={message.chart} />}
      {message.table && <ResultsTable />}

      {message.verified && <details className="mt-4 rounded-xl border overflow-hidden" style={{ borderColor: COLORS.border }}>
        <summary className="cursor-pointer px-4 py-3 flex items-center gap-2 text-xs font-semibold list-none" style={{ color: COLORS.green, background: '#FBFDFC' }}>
          <ShieldCheck size={14} /> Verified using EFU authorized data <ChevronDown size={13} className="ml-auto" />
        </summary>
        <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs" style={{ color: COLORS.muted }}>
          <div><b style={{ color: COLORS.text }}>Source:</b> {message.source}</div>
          <div><b style={{ color: COLORS.text }}>Records:</b> {message.records}</div>
          <div><b style={{ color: COLORS.text }}>Language:</b> {message.language}</div>
          <div><b style={{ color: COLORS.text }}>Retrieved:</b> Today at {message.time}</div>
          <div className="sm:col-span-2"><b style={{ color: COLORS.text }}>Filters:</b> Branch = Karachi, Lahore, Islamabad · Asset Type = Laptop · Status = Active</div>
        </div>
      </details>}

      <div className="mt-3 flex flex-wrap items-center gap-1">
        {[Copy, ThumbsUp, ThumbsDown, Bookmark, Share2].map((Icon, i) => <button key={i} className="p-2 rounded-lg hover:bg-gray-50" title={['Copy','Helpful','Not helpful','Save','Share'][i]}><Icon size={14} style={{ color: COLORS.muted }} /></button>)}
        <button onClick={onExport} className="ml-1 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5" style={{ background: COLORS.mint, color: COLORS.green }}><Download size={14} /> Download</button>
      </div>
      <div className="text-[10px] mt-1" style={{ color: COLORS.muted }}>{message.time}</div>
    </div>
  </div>
}

function ChartCard({ type }: { type: ChartType }) {
  const [chartType, setChartType] = useState(type)
  return <section className="mt-5 border rounded-2xl overflow-hidden bg-white" style={{ borderColor: COLORS.border }}>
    <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: COLORS.border }}>
      <div><div className="text-sm font-semibold" style={{ color: COLORS.text }}>{chartType === 'bar' ? 'Active laptops by branch' : chartType === 'line' ? 'Monthly maintenance cost' : 'Asset status distribution'}</div><div className="text-[11px] mt-0.5" style={{ color: COLORS.muted }}>Generated from the verified database result</div></div>
      <div className="flex items-center gap-1">
        <select value={chartType} onChange={e => setChartType(e.target.value as ChartType)} className="text-[11px] border rounded-lg px-2 py-1.5" style={{ borderColor: COLORS.border }}><option value="bar">Bar</option><option value="line">Line</option><option value="pie">Donut</option></select>
        <button className="p-2 rounded-lg hover:bg-gray-50"><Download size={14} style={{ color: COLORS.muted }} /></button>
        <button className="p-2 rounded-lg hover:bg-gray-50"><MoreHorizontal size={14} style={{ color: COLORS.muted }} /></button>
      </div>
    </div>
    <div className="p-4 h-64">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'bar' ? <BarChart data={branchData}><CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} /><XAxis dataKey="branch" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="active" fill={COLORS.green} radius={[6,6,0,0]} /></BarChart> : chartType === 'line' ? <LineChart data={maintenanceTrend}><CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} /><XAxis dataKey="month" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip formatter={(v: number) => [`PKR ${v}M`, 'Cost']} /><Line type="monotone" dataKey="cost" stroke={COLORS.green} strokeWidth={3} dot={{ r: 4 }} /></LineChart> : <PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3}>{statusData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}</Pie><Tooltip /><Legend /></PieChart>}
      </ResponsiveContainer>
    </div>
  </section>
}

function ResultsTable() {
  return <section className="mt-4 border rounded-2xl overflow-hidden bg-white" style={{ borderColor: COLORS.border }}>
    <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: COLORS.border }}>
      <div><div className="text-sm font-semibold" style={{ color: COLORS.text }}>Branch comparison</div><div className="text-[11px]" style={{ color: COLORS.muted }}>3 records</div></div>
      <div className="flex gap-1"><button className="p-2 rounded-lg hover:bg-gray-50"><Search size={14} /></button><button className="p-2 rounded-lg hover:bg-gray-50"><FileSpreadsheet size={14} /></button></div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-xs">
        <thead style={{ background: '#FAFBFA', color: COLORS.muted }}><tr>{['Branch','Active laptops','Assigned','Available','Maintenance'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
        <tbody>{branchData.map(row => <tr key={row.branch} className="border-t" style={{ borderColor: COLORS.border }}><td className="px-4 py-3 font-semibold" style={{ color: COLORS.text }}>{row.branch}</td><td className="px-4 py-3">{row.active}</td><td className="px-4 py-3">{row.assigned}</td><td className="px-4 py-3">{row.available}</td><td className="px-4 py-3">{row.maintenance}</td></tr>)}</tbody>
      </table>
    </div>
  </section>
}

function Composer({ value, setValue, onSend, recording, setRecording }: {
  value: string
  setValue: (v: string) => void
  onSend: () => void
  recording: boolean
  setRecording: (v: boolean) => void
}) {
  return <div className="px-4 md:px-7 pb-4 pt-2 bg-gradient-to-t from-white via-white to-transparent">
    <div className="max-w-3xl mx-auto">
      {recording ? <div className="rounded-2xl border px-4 py-3 flex items-center gap-3 bg-white shadow-sm" style={{ borderColor: '#F1B7B7' }}>
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: COLORS.danger }} />
        <div className="flex items-center gap-1 flex-1">{[10,18,26,15,23,12,20,28,14,22].map((h,i) => <span key={i} className="wave-bar w-1 rounded-full" style={{ height: h, background: COLORS.green }} />)}</div>
        <span className="text-xs" style={{ color: COLORS.muted }}>Listening · Detecting language automatically</span>
        <button onClick={() => setRecording(false)} className="p-2 rounded-lg" style={{ background: '#FDECEC', color: COLORS.danger }}><X size={15} /></button>
        <button onClick={() => { setRecording(false); setValue('Karachi branch mein kitne active laptops hain?') }} className="p-2 rounded-lg text-white" style={{ background: COLORS.green }}><Square size={14} /></button>
      </div> : <div className="rounded-2xl border bg-white px-3 py-3 shadow-[0_8px_30px_rgba(24,33,29,0.06)] focus-within:ring-4 focus-within:ring-green-50" style={{ borderColor: COLORS.border }}>
        <textarea value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() } }} rows={1} placeholder="Ask about authorized EFU data..." className="w-full resize-none outline-none text-sm px-2 min-h-7 max-h-32" style={{ color: COLORS.text }} />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-gray-50"><Paperclip size={17} style={{ color: COLORS.muted }} /></button>
            <button onClick={() => setRecording(true)} className="p-2 rounded-lg hover:bg-gray-50"><Mic size={17} style={{ color: COLORS.muted }} /></button>
            <button className="p-2 rounded-lg hover:bg-gray-50"><Volume2 size={17} style={{ color: COLORS.muted }} /></button>
          </div>
          <button onClick={onSend} disabled={!value.trim()} className="w-9 h-9 rounded-xl flex items-center justify-center text-white disabled:opacity-35" style={{ background: COLORS.green }}><Send size={16} /></button>
        </div>
      </div>}
      <p className="text-center text-[10px] mt-2" style={{ color: COLORS.muted }}>Responses use authorized EFU database sources only.</p>
    </div>
  </div>
}

function ExportModal({ onClose }: { onClose: () => void }) {
  const [format, setFormat] = useState<ExportFormat>('PDF')
  const [downloading, setDownloading] = useState(false)
  const formats: { id: ExportFormat, icon: typeof FileText }[] = [
    { id: 'PDF', icon: FileType2 }, { id: 'Word', icon: FileText }, { id: 'Excel', icon: FileSpreadsheet }, { id: 'CSV', icon: FileSpreadsheet },
  ]
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(11,17,14,.38)' }}>
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: COLORS.border }}><div><div className="font-semibold" style={{ color: COLORS.text }}>Download response</div><div className="text-xs" style={{ color: COLORS.muted }}>Choose a format and included sections</div></div><button onClick={onClose} className="p-2"><X size={17} /></button></div>
      <div className="p-5">
        <div className="grid grid-cols-4 gap-2 mb-5">{formats.map(({id, icon: Icon}) => <button key={id} onClick={() => setFormat(id)} className="rounded-xl border p-3 flex flex-col items-center gap-2 text-xs font-semibold" style={{ borderColor: format === id ? COLORS.green : COLORS.border, background: format === id ? COLORS.mint : 'white', color: format === id ? COLORS.green : COLORS.text }}><Icon size={20} />{id}</button>)}</div>
        <div className="space-y-3 rounded-xl p-4" style={{ background: '#F8FAF9' }}>
          {['Include original question','Include answer and summary','Include charts','Include data table','Include database source and filters','Include timestamp and EFU branding','Add confidentiality watermark'].map((label,i) => <label key={label} className="flex items-center gap-3 text-sm" style={{ color: COLORS.text }}><input type="checkbox" defaultChecked={i < 6} /> {label}</label>)}
        </div>
        <div className="flex justify-end gap-2 mt-5"><button onClick={onClose} className="px-4 py-2.5 rounded-xl border text-sm font-semibold" style={{ borderColor: COLORS.border }}>Cancel</button><button onClick={() => { setDownloading(true); setTimeout(() => { setDownloading(false); onClose() }, 1000) }} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2" style={{ background: COLORS.green }}>{downloading ? <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" /> : <Download size={15} />} {downloading ? 'Preparing...' : `Download ${format}`}</button></div>
      </div>
    </div>
  </div>
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [temporary, setTemporary] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [recording, setRecording] = useState(false)
  const [typing, setTyping] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const newChat = () => { setMessages([]); setInput('') }
  const send = () => {
    const q = input.trim()
    if (!q) return
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: q, time }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const isRoman = /\b(kitne|hain|mein|dikhao|karo|ka|ki|ke)\b/i.test(q)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        text: isRoman
          ? 'Karachi branch mein 126 active laptops hain. Lahore mein 94 aur Islamabad mein 71 active laptops hain. Neeche branch comparison chart aur detailed records diye gaye hain.'
          : 'Karachi has 126 active laptops, Lahore has 94, and Islamabad has 71. The chart and detailed records are shown below.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verified: true,
        source: 'vw_AI_AssetsByBranch',
        records: 291,
        chart: 'bar',
        table: true,
        language: isRoman ? 'Roman Urdu' : 'English',
      }])
      setTyping(false)
    }, 1400)
  }

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />

  return <div className="h-screen flex overflow-hidden bg-white">
    <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} onNew={newChat} temporary={temporary} setTemporary={setTemporary} />
    <main className="flex-1 min-w-0 flex flex-col">
      {temporary && <div className="mx-auto mt-3 px-4 py-2 text-xs rounded-full flex items-center justify-center gap-2" style={{ background: COLORS.mint, color: COLORS.green }}><History size={13} /> This temporary conversation will not appear in chat history.</div>}
      {messages.length === 0 ? <EmptyChat onSuggestion={setInput} /> : <div className="flex-1 overflow-y-auto px-4 md:px-7 py-7"><div className="max-w-3xl mx-auto space-y-8">{messages.map(m => <MessageContent key={m.id} message={m} onExport={() => setExportOpen(true)} />)}{typing && <div className="flex gap-3"><div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: COLORS.green }}><Sparkles size={15} color="white" /></div><div className="flex items-center gap-2 text-xs" style={{ color: COLORS.muted }}><span className="typing-dot w-2 h-2 rounded-full" style={{ background: COLORS.green }} /><span className="typing-dot w-2 h-2 rounded-full" style={{ background: COLORS.green }} /><span className="typing-dot w-2 h-2 rounded-full" style={{ background: COLORS.green }} /> Searching authorized EFU data...</div></div>}<div ref={bottomRef} /></div></div>}
      <Composer value={input} setValue={setInput} onSend={send} recording={recording} setRecording={setRecording} />
    </main>
    {exportOpen && <ExportModal onClose={() => setExportOpen(false)} />}
  </div>
}
