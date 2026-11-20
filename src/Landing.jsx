import { teacher, pains, audiences, compare, weeks, format, faqs } from './content.js'
import RegisterForm from './RegisterForm.jsx'

const Section = ({ id, className = '', children }) => (
  <section id={id} className={`px-5 sm:px-8 py-16 sm:py-24 ${className}`}>
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
)

const Eyebrow = ({ children, light }) => (
  <p className={`text-xs font-bold uppercase tracking-[.18em] mb-3 ${light ? 'text-blush' : 'text-accent-dark'}`}>{children}</p>
)

const H2 = ({ children, light }) => (
  <h2 className={`font-display font-bold text-3xl sm:text-4xl leading-tight tracking-tight ${light ? 'text-cream' : ''}`}>{children}</h2>
)

const Cta = ({ children = 'Туршилтын ангид бүртгүүлэх', className = '' }) => (
  <a
    href="#register"
    className={`inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-bold text-white shadow-[0_10px_30px_-10px_rgba(209,51,111,.55)] transition hover:bg-accent-dark hover:-translate-y-0.5 ${className}`}
  >
    {children} <span aria-hidden>→</span>
  </a>
)

function PhoneMock() {
  const slots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30']
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="rounded-[2.6rem] bg-ink p-3 shadow-2xl rotate-[-3deg]">
        <div className="rounded-[2rem] bg-cream p-5 h-[470px] overflow-hidden">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-full bg-accent grid place-items-center text-white font-display text-sm">С</div>
            <div>
              <p className="font-bold text-sm leading-none">Сарнай салон</p>
              <p className="text-[11px] text-ink/60">Үсчин · Хумс</p>
            </div>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50 mb-2">Үйлчилгээ</p>
          <div className="space-y-2 mb-5">
            {[['Эмэгтэй үс засалт', '35,000₮'], ['Будалт', '80,000₮']].map(([s, p], i) => (
              <div key={s} className={`flex justify-between rounded-xl px-3 py-2.5 text-sm ${i === 0 ? 'bg-ink text-cream' : 'bg-white'}`}>
                <span>{s}</span><span className="font-bold">{p}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50 mb-2">Баасан, 11-р сарын 28</p>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {slots.map((t, i) => (
              <div key={t} className={`rounded-lg py-2 text-center text-sm font-semibold ${i === 2 ? 'bg-accent text-white' : i === 4 ? 'bg-blush text-ink/30 line-through' : 'bg-white'}`}>{t}</div>
            ))}
          </div>
          <div className="rounded-xl bg-accent py-3 text-center font-bold text-white">Цаг захиалах</div>
        </div>
      </div>
      <div className="pop-in absolute -right-6 sm:-right-16 top-24 w-60 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-ink/5 rotate-[2deg]" style={{ animationDelay: '.6s' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="h-6 w-6 rounded-full bg-tg grid place-items-center text-white text-xs">✈</div>
          <p className="text-xs font-bold">Telegram · Салон бот</p>
          <span className="ml-auto text-[10px] text-ink/40">одоо</span>
        </div>
        <p className="text-[13px] leading-snug">🔔 <b>Шинэ захиалга!</b><br />Болор · 9911-xxxx<br />Үс засалт · Баасан 13:00</p>
      </div>
    </div>
  )
}

export default function Landing() {
  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-20 bg-cream/85 backdrop-blur border-b border-ink/5">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-5 sm:px-8 h-16">
          <a href="#" className="font-display font-extrabold text-lg tracking-tight">wonderland<span className="text-accent">.</span></a>
          <nav className="hidden md:flex gap-7 text-sm font-semibold text-ink/70">
            <a href="#program" className="hover:text-ink">Хөтөлбөр</a>
            <a href="#format" className="hover:text-ink">Хэлбэр</a>
            <a href="#teacher" className="hover:text-ink">Багш</a>
            <a href="#faq" className="hover:text-ink">Асуулт</a>
          </nav>
          <a href="#register" className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream hover:bg-ink-soft">Бүртгүүлэх</a>
        </div>
      </header>

      {/* Hero */}
      <Section className="pt-10 sm:pt-16 overflow-hidden">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-sm font-bold text-accent-dark mb-6">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" /> Туршилтын анги · 10 хүртэлх суудал
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] tracking-tight mb-6">
              Утсаар цаг авахаас <span className="text-accent">залхсан</span> уу?
            </h1>
            <p className="text-lg sm:text-xl text-ink/75 leading-relaxed mb-8 max-w-xl">
              6 долоо хоногт AI-тай хамтран <b className="text-ink">өөрийн цаг захиалгын вэбсайтаа</b> өөрөө бүтээ. Захиалга бүр Telegram-д тань шууд очно.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Cta />
              <a href="#program" className="font-semibold underline underline-offset-4 decoration-accent/50 hover:decoration-accent">Хөтөлбөр харах</a>
            </div>
            <p className="mt-8 text-sm text-ink/60">Код мэдэхгүй байсан ч болно · Утсаараа үзнэ · Өөрийн цагаар</p>
          </div>
          <PhoneMock />
        </div>
      </Section>

      {/* Pains */}
      <Section className="bg-white">
        <Eyebrow>Танил санагдаж байна уу?</Eyebrow>
        <H2>Ажил сайн явж байгаа ч цаг захиалга тань эмх замбараагүй</H2>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {pains.map((p, i) => (
            <div key={p.title} className={`rounded-3xl p-7 ${['bg-blush', 'bg-lavender', 'bg-peach'][i % 3]}`}>
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-ink/70 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          <span className="text-sm font-semibold text-ink/60 mr-2 self-center">Энэ анги танд зориулагдсан:</span>
          {audiences.map(a => <span key={a} className="rounded-full bg-lavender px-4 py-1.5 text-sm font-semibold">{a}</span>)}
        </div>
      </Section>

      {/* Compare */}
      <Section className="bg-lavender">
        <Eyebrow>Яагаад зүгээр AI ашиглаж болохгүй гэж?</Eyebrow>
        <H2>AI код бичдэг. Харин <span className="text-accent">удирдах нь</span> таны ажил.</H2>
        <p className="mt-4 max-w-2xl text-ink/70 text-lg">Юу хүсэж байгаагаа тайлбарлаж, алдааг нь ойлгож засаж, санаагаа бүрэн гүйцэд болгох. Би танд яг үүнийг заана.</p>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <div className="rounded-3xl bg-white/60 p-7">
            <h3 className="font-bold text-lg mb-4 text-ink/50">{compare.alone.title}</h3>
            <ul className="space-y-3">
              {compare.alone.items.map(i => <li key={i} className="flex gap-3 text-ink/60"><span className="text-ink/40">✕</span>{i}</li>)}
            </ul>
          </div>
          <div className="rounded-3xl bg-accent p-7 text-white">
            <h3 className="font-bold text-lg mb-4">{compare.withUs.title}</h3>
            <ul className="space-y-3">
              {compare.withUs.items.map(i => <li key={i} className="flex gap-3 font-semibold"><span>✓</span>{i}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {/* Program */}
      <Section id="program">
        <Eyebrow>6 долоо хоногийн хөтөлбөр</Eyebrow>
        <H2>Долоо хоног бүр сайтынхаа нэг хэсгийг дуусгана</H2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {weeks.map(w => (
            <div key={w.n} className="group rounded-3xl bg-white p-7 ring-1 ring-blush transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(209,51,111,.35)]">
              <p className="font-display text-sm font-bold text-accent mb-3">{String(w.n).padStart(2, '0')} долоо хоног</p>
              <h3 className="font-bold text-lg mb-2 leading-snug">{w.title}</h3>
              <p className="text-ink/70 leading-relaxed">{w.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-3xl bg-peach p-7 flex flex-col sm:flex-row gap-5 sm:items-center">
          <div className="text-4xl">🎁</div>
          <p className="text-lg"><b>Төгсөхөд:</b> өөрийн домэйн дээр ажиллаж буй, бодит захиалга авдаг, Telegram-д мэдэгдэл илгээдэг <b>таны өөрийн</b> цаг захиалгын сайт.</p>
        </div>
      </Section>

      {/* Format */}
      <Section id="format" className="bg-white">
        <Eyebrow>Завгүй хүнд зориулсан хэлбэр</Eyebrow>
        <H2>Танхимд суух шаардлагагүй. Салоноо хаах шаардлагагүй.</H2>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {format.map((f, i) => (
            <div key={f.title} className={`rounded-3xl p-7 ${['bg-mint', 'bg-blush', 'bg-lavender'][i % 3]}`}>
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-ink/70 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Teacher */}
      <Section id="teacher">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div className="rounded-[2rem] bg-gradient-to-br from-blush via-lavender to-peach p-10 text-ink aspect-square flex flex-col justify-end relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/60 blur-2xl" />
            <p className="font-display text-6xl font-extrabold mb-2">3 жил</p>
            <p className="text-ink/70">Юу ч мэдэхгүй сурагчаас<br />Master Teacher хүртэл</p>
          </div>
          <div>
            <Eyebrow>Багш</Eyebrow>
            <H2>Сайн байна уу, би {teacher.name}</H2>
            <p className="mt-2 font-semibold text-accent-dark">{teacher.title}</p>
            <div className="mt-6 space-y-4 text-lg text-ink/75 leading-relaxed">
              {teacher.story.map((s, i) => <p key={i}>{s}</p>)}
            </div>
            <a href={teacher.facebook} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-semibold underline underline-offset-4 decoration-accent/50 hover:decoration-accent">Facebook дээр дагах →</a>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-white">
        <Eyebrow>Түгээмэл асуулт</Eyebrow>
        <H2>Асуух зүйл байна уу?</H2>
        <div className="mt-10 divide-y divide-ink/10 max-w-3xl">
          {faqs.map(f => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-lg">
                {f.q}<span className="ml-4 text-accent text-2xl transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-ink/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Register */}
      <Section id="register" className="bg-ink">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div className="text-cream">
            <Eyebrow light>Туршилтын анги</Eyebrow>
            <H2 light>Суудлаа одоо баталгаажуул</H2>
            <p className="mt-4 text-cream/70 text-lg leading-relaxed">Эхний анги 10 хүртэлх хүнтэй. Бүртгүүлсэн хүн бүрт утсаар холбогдож, эхлэх хугацаа болон үүсгэн байгуулагчийн тусгай үнийг мэдэгдэнэ.</p>
            <ul className="mt-8 space-y-3 text-cream/80">
              <li>✓ Бүртгүүлэх нь үнэгүй, үүрэг хүлээхгүй</li>
              <li>✓ Утасны дугаараа зөвхөн холбогдоход ашиглана</li>
              <li>✓ Эхний ангийнхан хамгийн хямд үнээр орно</li>
            </ul>
          </div>
          <RegisterForm />
        </div>
      </Section>

      <footer className="bg-ink border-t border-cream/10 px-5 py-8 text-center text-sm text-cream/50">
        © {new Date().getFullYear()} Wonderland · {teacher.name}
      </footer>
    </main>
  )
}
