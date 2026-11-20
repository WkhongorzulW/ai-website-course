# Wonderland — туршилтын ангийн бүртгэлийн хуудас

🌐 https://course.wonderland.mn

"Утсаар цаг авахаас залхсан уу?" Үйлчилгээний бизнес эрхлэгчдэд зориулсан, AI-тай хамтран өөрийн цаг захиалгын вэбсайтаа 6 долоо хоногт бүтээх сургалтын бүртгэлийн хуудас.

**Stack:** React 19 · Vite · Tailwind CSS v4 · Supabase

## Бүтэц

| Файл | Юу хийдэг |
|---|---|
| `src/content.js` | **Хуудасны бүх текст.** Хөтөлбөр, FAQ, багшийн түүхийг эндээс засна |
| `src/Landing.jsx` | Бүртгэлийн хуудас |
| `src/RegisterForm.jsx` | Бүртгүүлэх форм → Supabase `registrations` хүснэгт |
| `src/Admin.jsx` | Багшийн самбар (`/#admin`): бүртгэл харах, төлөв өөрчлөх, CSV хуулах |
| `supabase/migrations/` | Хүснэгт ба RLS эрхүүд |

## Ажиллуулах

```bash
npm install
# .env.production-ийн утгууд локалд ч ажиллана
npm run dev
```

## Supabase тохиргоо

1. `supabase/migrations/001_registrations.sql`-ийг SQL Editor дээр ажиллуулна.
2. Authentication → Users хэсэгт өөрийн имэйл, нууц үгээр хэрэглэгч үүсгэнэ.
3. Тэр имэйлээ админ болгоно:
   ```sql
   insert into public.admins (email) values ('таны@имэйл.com');
   ```

## GitHub Pages-д гаргах

1. Settings → Pages → Source: **GitHub Actions**
2. Supabase URL болон publishable key `.env.production` файлд байгаа (нууц биш, RLS хамгаална). **service_role түлхүүрийг хэзээ ч энд бүү хийгээрэй.**
3. `main` руу push хийхэд автоматаар гарна.
