# HLPFL INC

**Modern Services. Local Prices.**

Marketing site + booking platform for [HLPFL](https://hlpfl.org) — hand-built websites, Google presence, branding, and a direct-booking vacation rental platform for Costa Rica's Caribbean coast.

Built with **Next.js** (App Router, SSR + API routes) and deployed to **Cloudflare Workers** via `@opennextjs/cloudflare`.

---

## Tech Stack

| Tool | Version | Notes |
|---|---|---|
| Next.js | 16.2.4 | App Router, SSR, API routes |
| TypeScript | 5.9 | Strict mode throughout |
| Tailwind CSS | 3.4 | With `@tailwindcss/forms` + `@tailwindcss/typography` |
| Framer Motion | 10 | ScrollReveal animations |
| Lucide React | 0.468 | Icon library — individual imports only |
| Supabase | 2.x | PostgreSQL database + Auth (email, Google, Facebook) |
| Stripe | 22.x | Payment links + webhooks |
| Resend | 6.x | Transactional email (booking confirmations) |
| Cloudflare Workers | — | Hosting via `@opennextjs/cloudflare` |

---

## Project Structure

```
HLPFL_INC/
├── public/
│   ├── logo.svg
│   ├── og-image.png
│   ├── sitemap.xml
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx / HomePageClient.tsx
│   │   ├── about/ contact/ faq/ packages/ services/ testimonials/
│   │   ├── privacy/ terms/
│   │   ├── stays/            # Property listing + detail + booking flow
│   │   ├── dashboard/        # Client portal (Supabase Auth protected)
│   │   ├── admin/            # Internal admin (Supabase Auth protected)
│   │   └── api/
│   │       ├── bookings/create/    # Create booking + Stripe payment link
│   │       ├── webhooks/stripe/    # Stripe webhook handler
│   │       └── v1/[slug]/          # Availability + booking API
│   │
│   ├── components/
│   │   ├── layout/   Header.tsx, Footer.tsx
│   │   ├── sections/ HowItWorksSection.tsx, SocialProofSection.tsx
│   │   └── ui/       ScrollReveal, PackageCard, RetainerCard, ServiceCard
│   │
│   ├── contexts/
│   │   └── LanguageContext.tsx   # EN/ES language toggle
│   │
│   └── lib/
│       ├── supabase.ts     # Supabase client + types + helpers
│       ├── data.ts         # Service catalog with Stripe links
│       ├── translations.ts # EN/ES copy
│       ├── web3forms.ts    # Contact form helper
│       └── whatsapp.ts     # WhatsApp URL builder
│
├── supabase/migrations/    # SQL schema migrations
├── wrangler.jsonc          # Cloudflare Workers config
├── open-next.config.ts     # @opennextjs/cloudflare config
├── next.config.ts
└── SETUP.md                # Full setup guide (Supabase, Stripe, Resend, deploy)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
git clone https://github.com/HLPFLCG/HLPFL_INC.git
cd HLPFL_INC

npm install

# Copy and fill in your environment variables
cp .env.local.example .env.local

npm run dev
# → http://localhost:3000
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

See `.env.local.example` for the full list. Required variables:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks |
| `RESEND_API_KEY` | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | Your verified Resend domain email |
| `NEXT_PUBLIC_SITE_URL` | Your production domain |

---

## Deployment

See **SETUP.md → Section 10** for complete Cloudflare Workers deploy instructions.

**Quick deploy:**

```bash
# Set server-side secrets once
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY

# Build + deploy (requires .env.local with NEXT_PUBLIC_* vars)
npm run deploy
```

---

## Branching

| Branch | Purpose |
|---|---|
| `main` | Production — deploys to hlpfl.org |
| `claude/*` | AI-assisted feature/fix branches |
| `copilot/*` | GitHub Copilot branches |

---

## Contact

- Site: [hlpfl.org](https://hlpfl.org)
- Email: hello@hlpfl.com
- WhatsApp: [wa.me/50688888888](https://wa.me/50688888888)
- Instagram: [@hlpfl.co](https://www.instagram.com/hlpfl.co)

