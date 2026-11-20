import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'

const STATUSES = {
  new: { label: 'Шинэ', cls: 'bg-accent text-white' },
  contacted: { label: 'Холбогдсон', cls: 'bg-tg text-white' },
  enrolled: { label: 'Элссэн', cls: 'bg-emerald-600 text-white' },
  declined: { label: 'Татгалзсан', cls: 'bg-ink/15 text-ink/60' },
}

const fmt = d => new Date(d).toLocaleString('mn-MN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(e) {
    e.preventDefault()
    setBusy(true); setErr('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setErr('Имэйл эсвэл нууц үг буруу байна.')
    setBusy(false)
  }
  const input = 'w-full rounded-xl border-2 border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent'
  return (
    <form onSubmit={submit} className="mx-auto mt-24 max-w-sm space-y-4 rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="font-display font-bold text-2xl">Багшийн самбар</h1>
      <input className={input} type="email" placeholder="Имэйл" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
      <input className={input} type="password" placeholder="Нууц үг" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
      {err && <p className="text-sm font-semibold text-accent-dark">{err}</p>}
      <button disabled={busy} className="w-full rounded-full bg-ink py-3 font-bold text-cream disabled:opacity-60">{busy ? '…' : 'Нэвтрэх'}</button>
    </form>
  )
}

function Dashboard({ session }) {
  const [rows, setRows] = useState(null)
  const [filter, setFilter] = useState('all')
  const [err, setErr] = useState('')
  const [copied, setCopied] = useState(false)

  const fetchRows = () => supabase.from('registrations').select('*').order('created_at', { ascending: false })
  function applyResult({ data, error }) {
    if (error) setErr('Бүртгэл уншиж чадсангүй.')
    else setRows(data)
  }
  async function load() { applyResult(await fetchRows()) }
  useEffect(() => {
    let cancelled = false
    fetchRows().then(res => { if (!cancelled) applyResult(res) })
    return () => { cancelled = true }
  }, [])

  async function setStatus(id, status) {
    setRows(rs => rs.map(r => (r.id === id ? { ...r, status } : r)))
    const { error } = await supabase.from('registrations').update({ status }).eq('id', id)
    if (error) { setErr('Төлөв хадгалж чадсангүй.'); load() }
  }

  async function copyCsv() {
    const head = ['Огноо', 'Нэр', 'Утас', 'Төрөл', 'Бизнес', 'Цаг авдаг', 'Төлөв', 'Тайлбар']
    const lines = rows.map(r => [fmt(r.created_at), r.name, r.phone, r.business_type, r.business_name, r.booking_method, STATUSES[r.status]?.label, r.message]
      .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
    try {
      await navigator.clipboard.writeText([head.join(','), ...lines].join('\n'))
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    } catch { setErr('Хуулж чадсангүй.') }
  }

  const shown = rows?.filter(r => filter === 'all' || r.status === filter) ?? []
  const count = s => rows?.filter(r => r.status === s).length ?? 0

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl">Бүртгэлүүд</h1>
          <p className="text-ink/60 text-sm mt-1">{session.user.email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="rounded-full border-2 border-ink/15 px-4 py-2 text-sm font-bold">Шинэчлэх</button>
          <button onClick={copyCsv} disabled={!rows?.length} className="rounded-full border-2 border-ink/15 px-4 py-2 text-sm font-bold disabled:opacity-40">{copied ? 'Хуулагдлаа ✓' : 'CSV хуулах'}</button>
          <button onClick={() => supabase.auth.signOut()} className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream">Гарах</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[['all', 'Бүгд', rows?.length ?? 0], ...Object.entries(STATUSES).map(([k, v]) => [k, v.label, count(k)])].map(([k, label, n]) => (
          <button key={k} onClick={() => setFilter(k)} className={`rounded-2xl p-4 text-left transition ${filter === k ? 'bg-ink text-cream' : 'bg-white'}`}>
            <p className="font-display text-2xl font-bold">{n}</p>
            <p className="text-sm opacity-70">{label}</p>
          </button>
        ))}
      </div>

      {err && <p className="mb-4 rounded-xl bg-accent/10 px-4 py-3 text-sm font-semibold text-accent-dark">{err}</p>}
      {rows === null && !err && <p className="text-ink/60">Ачаалж байна…</p>}
      {rows && shown.length === 0 && <p className="rounded-2xl bg-white p-10 text-center text-ink/60">Одоогоор бүртгэл алга. Хуудсаа Facebook, Instagram-д хуваалцаарай!</p>}

      <div className="space-y-3">
        {shown.map(r => (
          <div key={r.id} className="rounded-2xl bg-white p-5 grid md:grid-cols-[1.2fr_1fr_1.4fr_auto] gap-4 items-start">
            <div>
              <p className="font-bold text-lg">{r.name}</p>
              <a href={`tel:${r.phone}`} className="font-semibold text-accent-dark">{r.phone}</a>
              <p className="text-xs text-ink/50 mt-1">{fmt(r.created_at)}</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold">{r.business_type}</p>
              {r.business_name && <p className="text-ink/60">{r.business_name}</p>}
              {r.booking_method && <p className="text-ink/60">📞 {r.booking_method}</p>}
            </div>
            <p className="text-sm text-ink/70">{r.message || <span className="text-ink/30">—</span>}</p>
            <select value={r.status} onChange={e => setStatus(r.id, e.target.value)} className={`rounded-full px-3 py-1.5 text-sm font-bold outline-none ${STATUSES[r.status]?.cls}`}>
              {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        ))}
      </div>
      <a href="#" className="mt-10 inline-block text-sm font-semibold text-ink/60 underline">← Бүртгэлийн хуудас руу</a>
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(undefined)
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!supabase) return <p className="p-10 text-center">Supabase холбогдоогүй байна (.env файлаа шалгана уу).</p>
  if (session === undefined) return <p className="p-10 text-center text-ink/60">Ачаалж байна…</p>
  return session ? <Dashboard session={session} /> : <Login />
}
