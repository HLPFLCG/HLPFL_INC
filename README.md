# HLPFL INC

**Modern Services. Local Prices.**

Marketing site for [HLPFL](https://hlpfl.org) — hand-built websites, Google presence, branding, and digital services for small business owners, starting at $49. No AI. No agency markup. No contracts.

Built with Next.js 15 (static export) and deployed to Cloudflare Pages.

---

## Tech Stack

| Tool | Version | Notes |
|---|---|---|
| Next.js | 15 | App Router, `output: "export"` — fully static |
| TypeScript | 5.9 | Strict mode throughout |
| Tailwind CSS | 3.4 | With `@tailwindcss/forms` + `@tailwindcss/typography` |
| Framer Motion | 10 | ScrollReveal animations, hero accent lines |
| Lucide React | 0.468 | Icon library — individual imports only |
| React | 18 | |
| Hosting | Cloudflare Pages | `out/` directory, `wrangler.toml` config |

---

## Project Structure

```
HLPFL_INC/
├── public/
│   ├── logo.svg              # Brand logomark (gold, 160×160)
│   ├── og-image.png          # Open Graph / social share image
│   ├── sitemap.xml
│   └── robots.txt
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout — fonts, metadata, JSON-LD, providers
│   │   ├── page.tsx          # Homepage (server component — renders HomePageClient)
│   │   ├── globals.css       # CSS variables, base styles, utility classes
│   │   ├── HomePageClient.tsx # Homepage sections (client component)
│   │   ├── about/
│   │   ├── contact/          # page.tsx + ContactPageClient.tsx
│   │   ├── faq/
│   │   ├── packages/         # page.tsx + PackagesPageClient.tsx
│   │   ├── services/         # page.tsx + ServicesPageClient.tsx
│   │   ├── testimonials/
│   │   ├── privacy/
│   │   └── terms/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx    # Fixed nav with SVG logo, scroll state, mobile menu
│   │   │   └── Footer.tsx    # Links, address, payment badges
│   │   ├── sections/
│   │   │   ├── HowItWorksSection.tsx   # 3-step customer funnel
│   │   │   └── SocialProofSection.tsx  # Logos banner, testimonials, before/after
│   │   └── ui/
│   │       ├── ScrollReveal.tsx  # Framer Motion scroll-triggered fade-in
│   │       ├── PackageCard.tsx
│   │       ├── RetainerCard.tsx
│   │       ├── ServiceCard.tsx
│   │       └── index.ts
│   │
│   ├── contexts/
│   │   └── LanguageContext.tsx  # EN/ES language toggle (unused in current build — stub)
│   │
│   └── lib/
│       ├── data.ts           # Full service catalog with Stripe Payment Links
│       ├── translations.ts   # EN/ES copy (future bilingual support)
│       ├── web3forms.ts      # Contact form submission helper
│       └── whatsapp.ts       # WhatsApp URL builder + phone number constant
│
├── tailwind.config.ts
├── next.config.ts
├── wrangler.toml             # Cloudflare Pages config
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Clone
git clone https://github.com/HLPFLCG/HLPFL_INC.git
cd HLPFL_INC

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000
```

### Build

```bash
npm run build
# Outputs static files to out/
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Yes (contact form) | Access key from [web3forms.com](https://web3forms.com) — free, no backend needed |

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
```

Without this key the contact form will still render but submissions will fail. The fallback is the WhatsApp link on the contact page.

---

## Design System

### Colors

Defined as CSS custom properties in `globals.css` and mirrored in `tailwind.config.ts`:

| Token | Hex | Tailwind class | Usage |
|---|---|---|---|
| `void` | `#344968` | `bg-void`, `text-void` | Primary background (navy) |
| `void-dark` | `#273856` | `bg-void-dark` | Darker sections, footer |
| `void-light` | `#3e5578` | `bg-void-light` | Card surfaces |
| `void-lighter` | `#4a6484` | `border-void-lighter` | Card borders |
| `void-border` | `#4a6285` | `border-void-border` | Subtle borders |
| `gold` | `#ab6c3d` | `text-gold`, `bg-gold` | Primary accent (copper/orange) |
| `gold-light` | `#c47d4a` | `bg-gold-light` | Button hover state |
| `gold-dark` | `#8a5230` | `text-gold-dark` | Depth / darker gold |
| `turquoise` | `#5b8fa8` | `text-turquoise` | Secondary accent |

### Typography

| Role | Font | Tailwind |
|---|---|---|
| Display / Headings | Bebas Neue | `font-display` |
| Body / UI | Space Grotesk | `font-body` |

Fonts are loaded via Google Fonts in `layout.tsx` with `preconnect` and `preload` hints.

### CSS Utility Classes

Defined in `globals.css` — use these in components instead of repeating patterns:

| Class | Description |
|---|---|
| `.section` | Vertical padding (4rem mobile / 6rem desktop) |
| `.container-custom` | Max-width 1280px, centered, horizontal padding |
| `.btn-primary` | Gold background button with hover lift |
| `.btn-ghost` | Transparent button with white/20 border |
| `.eyebrow` | Small gold uppercase label above headings |
| `.nav-link` | Nav link with animated underline on hover |
| `.text-gradient` | Gold linear gradient text fill |
| `.glass` | Semi-transparent backdrop-blur header (scrolled) |
| `.glass-dark` | Darker glass for scrolled state |
| `.trust-bar-track` | Infinite CSS scroll animation for the services ticker |
| `.card-gold-border` | Card with gold border glow on hover |

### Logos / Assets

- **`/public/logo.svg`** — Square logomark (160×160 viewBox), orange/gold strokes. Used in the header at 32×32px.
- **`/public/og-image.png`** — 1200×630 Open Graph image for social shares.

---

## Key Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, trust bar, pain section, stats, how it works, pricing, services, social proof, CTA |
| `/services` | Full service catalog pulled from `src/lib/data.ts` |
| `/packages` | Pre-built packages with Stripe payment links |
| `/about` | Founder story and company values |
| `/contact` | Contact form (Web3Forms) + WhatsApp fallback |
| `/faq` | Common objections and answers |
| `/testimonials` | Extended testimonials page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## Editing Content

### Service Catalog

All services — including names, descriptions, prices, delivery times, and Stripe links — live in:

```
src/lib/data.ts
```

Each `Service` object has:
- `id`, `slug`, `category` — identification and routing
- `nameEn` / `nameEs` — bilingual display names
- `descEn` / `descEs` — bilingual descriptions
- `price` — number, `"quote"`, or `{ human, ai }` for content services
- `priceNote` — optional qualifier (e.g. `"+ domain"`)
- `stripeLink` — direct Stripe Payment Link URL
- `deliveryDays` — used in package displays
- `featured` — highlights the service in listings

### Pricing Comparison Table

The comparison table on the homepage is hardcoded in `HomePageClient.tsx` in the `comparisonRows` array. Update values there directly.

### Testimonials / Social Proof

Testimonials in `SocialProofSection.tsx` are hardcoded in the `testimonials` array at the top of that file. The before/after comparison is in the `beforeAfter` object in the same file.

### WhatsApp Number

Update the phone number in one place:

```ts
// src/lib/whatsapp.ts
export const WHATSAPP_NUMBER = "50688888888";
```

Use E.164 format without `+` (e.g. `50688888888` for Costa Rica).

---

## Homepage Sections (in order)

1. **Hero** — Full-screen with animated gold accent lines, eyebrow label, headline, CTA buttons, price badge, scroll indicator
2. **Trust Bar** — Infinite CSS ticker listing all service types
3. **Pain Section** — 3 problem cards for the target customer
4. **Stats Bar** — 5 key numbers ($49, 5-7 days, 0 contracts, 24hr response, 100% ownership)
5. **How It Works** — 3 numbered steps (choose → submit → build in 48h) — `HowItWorksSection.tsx`
6. **Pricing** — "What's Included" + "Why It's Affordable" cards, comparison table, risk reversal guarantee
7. **Service Categories** — 6-card grid (Foundation, Presence, Commerce, Growth, Content, Business Intelligence)
8. **Why HLPFL** — 4 value propositions (Human-Made, You Own Everything, No Contracts, Prices That Make Sense)
9. **Social Proof** — Logo/tool banner, 3 testimonials, before/after comparison — `SocialProofSection.tsx`
10. **Final CTA** — "Ready to Get Found?" with primary and secondary actions

---

## Deployment

The site deploys automatically to **Cloudflare Pages** on push to `main`.

Build settings (`wrangler.toml`):
```toml
name = "hlpfl-inc"
pages_build_output_dir = "out"
```

No server functions — this is a fully static site. All form handling is done client-side via Web3Forms.

### Manual Deploy

```bash
npm run build
# Upload the out/ directory to Cloudflare Pages
```

---

## Branching

| Branch | Purpose |
|---|---|
| `main` | Production — auto-deploys to hlpfl.org |
| `claude/*` | AI-assisted feature/fix branches |
| `copilot/*` | GitHub Copilot branches |

PRs merge into `main`. Each push to a non-main branch gets a unique Cloudflare Pages preview URL in the format `<commit-hash>.hlpfl-inc.pages.dev`.

---

## Contact

- Site: [hlpfl.org](https://hlpfl.org)
- Email: hello@hlpfl.com
- WhatsApp: [wa.me/50688888888](https://wa.me/50688888888)
- Instagram: [@hlpfl.co](https://www.instagram.com/hlpfl.co)
- Address: Caribbean Coast, Costa Rica — Cahuita–Puerto Viejo Corridor
