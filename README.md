# Baroni Impianti

Sito vetrina + blog SEO per Baroni Impianti (Sestri Levante). Rifacimento di
`elettricistasestrilevante.it`. Cliente diretto: ADevolution SL — cliente
finale: Luca Baroni.

## Stack

- **Framework**: Next.js 16 (App Router) — TypeScript strict
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **DB & Auth**: Supabase (`@supabase/ssr`)
- **Email**: Resend (cablato in fase successiva)
- **Icons**: lucide-react
- **Deploy**: Vercel · Node ≥ 20

## Setup locale

```bash
cp .env.example .env.local        # poi inserisci le chiavi reali
npm install
npm run dev
```

Apri http://localhost:3000.

### Variabili obbligatorie

| Variabile | Note |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del progetto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chiave pubblica anon |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo server, mai esposta al client |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico (per metadata, sitemap) |

## Build

```bash
npm run build
npm run start
```

## Struttura cartelle

```
src/
├── app/
│   ├── (public)/        # layout pubblico (Header + Footer) e tutte le pagine site
│   ├── admin/           # area protetta + login fuori dal layout protetto
│   ├── auth/            # callback OAuth, signout
│   ├── api/             # route handlers
│   ├── sitemap.ts       # sitemap dinamica da Supabase
│   ├── robots.ts        # robots.txt
│   └── not-found.tsx    # 404 custom
├── components/
│   ├── ui/              # primitives shadcn/ui
│   ├── public/          # Header, Footer, Container, Logo
│   └── admin/           # Sidebar, TopBar, LoginForm, PlaceholderSection
├── lib/
│   ├── supabase/        # client browser/server, middleware helper, admin (service role)
│   ├── constants.ts     # costanti UI / nav links
│   └── utils.ts         # cn()
├── types/
│   └── database.ts      # tipi DB (placeholder — vedi sotto)
└── middleware.ts        # session refresh + redirect 301 dinamici da DB
```

## Tipi Supabase

Il file `src/types/database.ts` contiene un placeholder ragionato sullo schema
in produzione. Per generare i tipi reali dal DB:

```bash
npm install -D supabase
npx supabase login
npx supabase gen types typescript --project-id igtwzuxufrdflhmwuzpq > src/types/database.ts
```

## Supabase

- Project ID: `igtwzuxufrdflhmwuzpq`
- Schema già applicato in produzione (RLS attiva su tutte le tabelle)
- Storage buckets pubblici: `post-images`, `testimonial-thumbnails`,
  `certifications`, `service-images`, `site-assets`

## Deploy Vercel

1. Importa il repo su Vercel e seleziona il framework Next.js
2. Configura le env (sezione "Setup locale") in **Production** e **Preview**
3. Build command default (`next build`)
4. Aggiungi il dominio `elettricistasestrilevante.it`

## Roadmap (prossimi step)

- Pagine admin CRUD (articoli, servizi, testimonianze, certificazioni, pagine, redirect, settings)
- Form contatti + Resend
- Import script articoli WordPress (mantenendo slug per SEO)
- Integrazione Google Reviews
