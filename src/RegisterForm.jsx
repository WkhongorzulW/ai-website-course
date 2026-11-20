import { useState } from 'react'
import { supabase } from './supabase.js'
import { businessTypes, bookingMethods } from './content.js'

const empty = { name: '', phone: '', business_type: '', business_name: '', booking_method: '', message: '' }

const Field = ({ label, optional, children }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-bold">
      {label} {optional && <span className="font-normal text-plum/50">(заавал биш)</span>}
    </span>
    {children}
  </label>
)

const input = 'w-full rounded-xl border-2 border-plum/10 bg-cream px-4 py-3 outline-none transition focus:border-coral focus:bg-white'

export default function RegisterForm() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    const phone = form.phone.replace(/\D/g, '')
    if (form.name.trim().length < 2) return setError('Нэрээ оруулна уу.')
    if (phone.length !== 8) return setError('8 оронтой утасны дугаар оруулна уу.')
    if (!form.business_type) return setError('Бизнесийн төрлөө сонгоно уу.')
    setError('')

    if (!supabase) {
      setStatus('error')
      return setError('Бүртгэлийн систем хараахан холбогдоогүй байна. Facebook-ээр холбогдоно уу.')
    }

    setStatus('sending')
    const { error: dbError } = await supabase.from('registrations').insert({
      name: form.name.trim(),
      phone,
      business_type: form.business_type,
      business_name: form.business_name.trim() || null,
      booking_method: form.booking_method || null,
      message: form.message.trim() || null,
    })
    if (dbError) {
      setStatus('error')
      setError('Илгээж чадсангүй. Түр хүлээгээд дахин оролдоно уу.')
      return
    }
    setStatus('done')
    setForm(empty)
  }

  if (status === 'done') {
    return (
      <div className="pop-in rounded-[2rem] bg-cream p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-display font-bold text-2xl mb-3">Бүртгэл амжилттай!</h3>
        <p className="text-plum/70 text-lg">Ойрын хоногуудад тань руу утсаар холбогдоно. Баярлалаа!</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] bg-white p-7 sm:p-9 space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Таны нэр">
          <input className={input} value={form.name} onChange={set('name')} placeholder="Болор" autoComplete="given-name" />
        </Field>
        <Field label="Утасны дугаар">
          <input className={input} value={form.phone} onChange={set('phone')} placeholder="9911 2233" inputMode="tel" autoComplete="tel" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Бизнесийн төрөл">
          <select className={input} value={form.business_type} onChange={set('business_type')}>
            <option value="">Сонгох…</option>
            {businessTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Бизнесийн нэр" optional>
          <input className={input} value={form.business_name} onChange={set('business_name')} placeholder="Сарнай салон" />
        </Field>
      </div>
      <Field label="Одоо цагаа хэрхэн авдаг вэ?" optional>
        <select className={input} value={form.booking_method} onChange={set('booking_method')}>
          <option value="">Сонгох…</option>
          {bookingMethods.map(t => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Асуулт, хүсэлт" optional>
        <textarea className={`${input} min-h-24`} value={form.message} onChange={set('message')} placeholder="Жишээ нь: ажлын өдрийн оройд л цаг гарна" />
      </Field>
      {error && <p className="rounded-xl bg-coral/10 px-4 py-3 text-sm font-semibold text-coral-dark">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-full bg-coral py-4 font-bold text-white text-lg transition hover:bg-coral-dark disabled:opacity-60"
      >
        {status === 'sending' ? 'Илгээж байна…' : 'Суудлаа баталгаажуулах →'}
      </button>
    </form>
  )
}
