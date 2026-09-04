import { useEffect, useState } from 'react'
import { api } from '../api'

interface Notification {
  id: string
  title: string
  message: string
  type: string
  createdAt: string
  readAt?: string | null
}

export default function Notifications() {
  const [items, setItems] = useState<Notification[]>([])
  const [error, setError] = useState('')
  const load = () => api.get<Notification[]>('/notifications').then(setItems).catch((e) => setError(e.message))
  useEffect(() => { void load() }, [])

  const markAll = async () => {
    await api.patch('/notifications/read-all', {})
    setItems((all) => all.map((item) => ({ ...item, readAt: item.readAt || new Date().toISOString() })))
  }
  const markOne = async (id: string) => {
    const updated = await api.patch<Notification>(`/notifications/${id}/read`, {})
    setItems((all) => all.map((item) => item.id === id ? updated : item))
  }
  const unread = items.filter((item) => !item.readAt).length

  return <div style={{ maxWidth: 720 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
      <div><h1 style={{ fontSize: 22, margin: 0 }}>Notifications</h1><p style={{ fontSize: 13, color: '#6B7280' }}>System alerts and activity updates</p></div>
      <div style={{ display: 'flex', gap: 8 }}><span style={{ padding: '5px 10px', borderRadius: 99, background: '#FEF2F2', color: '#DC2626', fontSize: 12 }}>{unread} Unread</span><button onClick={markAll} disabled={!unread} style={{ border: 0, color: '#005BAC', background: '#EBF4FF', borderRadius: 8, padding: '6px 14px' }}>Mark All Read</button></div>
    </div>
    {error && <div style={{ padding: 12, background: '#FEF2F2', color: '#DC2626', borderRadius: 8 }}>{error}</div>}
    {!error && !items.length && <div style={{ padding: 32, textAlign: 'center', background: '#fff', borderRadius: 12, color: '#6B7280' }}>No notifications found.</div>}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{items.map((item) =>
      <button key={item.id} onClick={() => !item.readAt && markOne(item.id)} style={{ textAlign: 'left', background: '#fff', borderRadius: 12, border: `1px solid ${item.readAt ? '#E5E7EB' : '#93C5FD'}`, padding: '16px 20px', cursor: item.readAt ? 'default' : 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{item.title}</strong><span style={{ fontSize: 11, color: '#9CA3AF' }}>{new Date(item.createdAt).toLocaleString()}</span></div>
        <div style={{ fontSize: 13, color: '#6B7280', marginTop: 5 }}>{item.message}</div>
        <div style={{ fontSize: 11, color: item.readAt ? '#6B7280' : '#005BAC', marginTop: 8 }}>{item.readAt ? 'Read' : 'Unread'}</div>
      </button>)}</div>
  </div>
}
