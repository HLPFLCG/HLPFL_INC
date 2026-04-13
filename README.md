# HLPFL

B2B hospitality consulting for the Caribbean coast of Costa Rica — Cahuita to Manzanillo. We help hotels, lodges, restaurants, and tour operators turn chaos into clarity with systems, branding, and digital marketing.

**Bilingual (EN / ES) · Mobile-first · Static export · Cloudflare Pages**

## Tech Stack

- **Next.js 15** — App Router, static export (`output: "export"`)
- **TypeScript** — strict, no `any`
- **Tailwind CSS 3.4** — with `@tailwindcss/forms` and `@tailwindcss/typography`
- **Framer Motion** — scroll reveals, page transitions, micro-animations
- **Lucide React** — icon library
- **Web3Forms** — free contact form submissions (no backend)
- **Cloudflare Pages** — static hosting

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router — one folder per route
│   ├── layout.tsx          # Root layout (fonts, metadata, providers)
│   ├── page.tsx            # Homepage — imports section components
│   ├── globals.css         # Design tokens, base styles, utility classes
│   ├── about/              # About page
│   ├── contact/            # Contact page (form + WhatsApp)
│   ├── services/           # Services page
│   ├── faq/                # FAQ page
│   ├── blog/               # Blog page
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
│
├── components/
│   ├── common/             # LoadingScreen, WhatsAppSticky, CookieBanner, LanguageToggle
│   ├── layout/             # Header, Footer, MobileBottomNav, SocialLinks
│   ├── sections/           # Homepage sections (Hero, TrustBar, Pain, HowItWorks, etc.)
│   └── ui/                 # Reusable primitives (Button, Card, ScrollReveal)
│
├── contexts/
│   └── LanguageContext.tsx  # Bilingual context — t() helper + language detection
│
└── lib/
    ├── translations.ts     # All EN/ES copy — single source of truth
    ├── data.ts             # Service definitions (bilingual)
    └── whatsapp.ts         # WhatsApp URL builder
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (static export to `out/`) |
| `npm run lint` | Run ESLint |

## Design System

### Colors (Caribbean Coast)

| Name | Hex | Usage |
|------|-----|-------|
| Jungle | `#1A3728` | Primary brand, nav, hero backgrounds |
| Canopy | `#2D6A4F` | Secondary green |
| Sea | `#0B7A7A` | Links, labels, borders |
| Wave | `#4BBFBF` | Icons, highlights, accents |
| Gold | `#C9941A` | CTA buttons, emphasis |
| Cream | `#FBF8F1` | Page background |
| Sand | `#F2E4C0` | Alternating sections, light text on dark |
| Mist | `#E8F4F1` | Card backgrounds |
| Night | `#0D1C14` | Body text |
| Bark | `#6B4C2A` | Muted text |
| Fog | `#5C7A6A` | Secondary text |

### Typography

- **Headings:** Playfair Display (700, 800) — `font-display`
- **Body:** Nunito (400–700) — `font-body`

### Bilingual (i18n)

All user-facing text lives in `src/lib/translations.ts`. Components use the `useLanguage()` hook:

```tsx
const { t, lang } = useLanguage();
const home = t("home");
```

Language is auto-detected for Costa Rican users (timezone + browser language) and persisted in `localStorage`.

## Contact Form

The contact form uses [Web3Forms](https://web3forms.com/) — a free service that sends form submissions directly to your email. No backend required, works perfectly with static sites.

**Setup:** Replace the `WEB3FORMS_ACCESS_KEY` in `src/lib/web3forms.ts` with your own key from [web3forms.com](https://web3forms.com/).

## Deployment

Configured for Cloudflare Pages static export.

```bash
npm run build
wrangler pages deploy out --project-name hlpfl-inc
```

### Cloudflare Dashboard Setup

1. Connect repository in Workers & Pages
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Set Node.js version: `18`

## Documentation

Detailed guides are available in the `docs/` folder:

| Guide | Description |
|-------|-------------|
| [Editing Guide](docs/EDITING_GUIDE.md) | Edit images, headers, menus, and all site content |
| [API Integration](docs/API_INTEGRATION.md) | Add backend APIs for dashboard and client management |
| [Newsletter & Blog](docs/NEWSLETTER_BLOG.md) | Implement newsletter and blog for press releases |
| [SEO Guide](docs/SEO_GUIDE.md) | Optimize for search engines |

## License

All rights reserved. HLPFL INC.
