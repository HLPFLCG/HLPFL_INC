# Copilot Instructions — HLPFL

> These instructions help GitHub Copilot (and any AI assistant) generate code that matches the conventions, design system, and architecture already in this repository.

## Project Overview

HLPFL is a **Next.js 15 static-export website** for a B2B hospitality consulting company serving the Caribbean coast of Costa Rica (Cahuita → Puerto Viejo → Manzanillo corridor). The site is fully bilingual (English / Spanish), mobile-first, and deploys to **Cloudflare Pages**.

## Tech Stack

| Tool | Version / Notes |
|------|-----------------|
| Next.js | 15 (App Router, `output: "export"`, static HTML in `out/`) |
| TypeScript | Strict — all components are `.tsx`, utilities are `.ts` |
| Tailwind CSS | 3.4 with `@tailwindcss/forms` and `@tailwindcss/typography` plugins |
| Framer Motion | 10 — used for page transitions, scroll reveals, and micro-animations |
| Lucide React | Icon library — import individual icons, never the full set |
| React | 18 |
| Hosting | Cloudflare Pages — no server functions, everything is static |

## Project Structure

```
src/
├── app/                    # Next.js App Router — one folder per route
│   ├── layout.tsx          # Root layout (fonts, metadata, providers)
│   ├── page.tsx            # Homepage — imports section components
│   ├── globals.css         # Global CSS variables, base styles, utility classes
│   ├── about/              # About page
│   ├── contact/            # Contact page (server page.tsx + client ContactPageClient.tsx)
│   ├── services/           # Services page
│   ├── faq/                # FAQ page
│   ├── blog/               # Blog page
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
│
├── components/
│   ├── common/             # Shared components (Logo, LoadingScreen, WhatsAppSticky, CookieBanner, LanguageToggle)
│   ├── layout/             # Header, Footer, MobileBottomNav, SocialLinks
│   ├── sections/           # Homepage sections (HeroSection, TrustBar, PainSection, HowItWorks, etc.)
│   └── ui/                 # Reusable primitives (Button, Card, ScrollReveal)
│
├── contexts/
│   └── LanguageContext.tsx  # Bilingual context — provides `t()` helper and `lang` state
│
└── lib/
    ├── translations.ts     # All EN/ES copy — single source of truth for text
    ├── data.ts             # Service definitions with bilingual titles, descriptions, tags
    └── whatsapp.ts         # WhatsApp URL builder + phone number constant
```

## Code Conventions

### TypeScript

- Use **strict TypeScript** — no `any` types, always define interfaces/types.
- Prefer `interface` for component props, `type` for unions and utility types.
- Export types alongside their components when they belong together.
- Use `type` imports: `import type { Metadata } from "next"`.

### Components

- **Server Components by default** — only add `"use client"` when the component needs hooks, browser APIs, or event handlers.
- Client components use the `"use client"` directive at the top of the file.
- Component files are PascalCase: `HeroSection.tsx`, `ScrollReveal.tsx`.
- Each route folder has a `page.tsx` (server component for metadata) and an optional `*Client.tsx` for client-side interactivity.
- Use barrel exports (`index.ts`) in component folders.

### Styling

- **Tailwind CSS** is the primary styling method — use utility classes directly in JSX.
- Custom CSS classes are defined in `globals.css` for reusable patterns: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.form-input`, `.form-label`, `.section`, `.container-custom`, `.eyebrow`, `.nav-link`, `.whatsapp-btn`.
- Colors reference the **Caribbean Coast design tokens** (see below) — use Tailwind classes like `text-gold`, `bg-jungle`, `text-sand`, `border-sea/15`.
- Never use arbitrary hex values inline — always reference design tokens.

### Animations

- Use **Framer Motion** for animations — `motion.div`, `AnimatePresence`, etc.
- Wrap content in `<ScrollReveal>` for scroll-triggered fade-in effects.
- Respect `prefers-reduced-motion` — already handled in CSS.

### i18n / Bilingual

- All user-facing text lives in `src/lib/translations.ts` — **never hardcode strings** in components.
- Access translations via the `useLanguage()` hook: `const { t, lang } = useLanguage()`.
- Call `t("sectionName")` to get the typed translation object for a section.
- Service data in `data.ts` has both `title`/`titleEs`, `description`/`descriptionEs`, `tags`/`tagsEs` — switch based on `lang`.
- The `LanguageProvider` wraps the entire app in `layout.tsx`.
- Language detection auto-detects Spanish for Costa Rican users (timezone + browser language).

### Forms

- Form submissions use **Web3Forms** (free, no backend) — POST to `https://api.web3forms.com/submit` with an access key.
- Style form fields with the `.form-input` and `.form-label` CSS classes.
- All form inputs must have `min-height: 48px` for mobile tap targets.
- Use `font-size: 16px` on inputs to prevent iOS zoom.

### WhatsApp Integration

- WhatsApp number and URL builder are centralized in `src/lib/whatsapp.ts`.
- All components import `getWhatsAppUrl()` from that module — never construct WhatsApp URLs inline.

### Navigation

- Main nav links: Home, Services, About, FAQ, Contact.
- Mobile: slide-out menu + fixed bottom nav bar (`MobileBottomNav`).
- Sticky WhatsApp button on all pages.

## Design System

### Color Palette (Caribbean Coast)

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Jungle | `#1A3728` | `bg-jungle`, `text-jungle` | Primary brand, nav, hero backgrounds |
| Canopy | `#2D6A4F` | `bg-canopy`, `text-canopy` | Secondary green |
| Sea | `#0B7A7A` | `text-sea`, `border-sea` | Links, labels, borders |
| Wave | `#4BBFBF` | `text-wave`, `border-wave` | Icons, highlights, accents |
| Gold | `#C9941A` | `bg-gold`, `text-gold` | CTA buttons, emphasis (hover: `#B8841A`) |
| Cream | `#FBF8F1` | `bg-cream` | Page background |
| Sand | `#F2E4C0` | `text-sand`, `bg-sand` | Alternating sections, light text on dark |
| Mist | `#E8F4F1` | `bg-mist` | Card backgrounds |
| Night | `#0D1C14` | `text-night` | Body text |
| Bark | `#6B4C2A` | `text-bark` | Muted text, placeholders |
| Fog | `#5C7A6A` | `text-fog` | Secondary text |

### Typography

| Role | Font | Tailwind |
|------|------|----------|
| Headings | Playfair Display (700, 800) | `font-display` |
| Body / UI | Nunito (400–700) | `font-body` |

- Headings use `clamp()` for fluid sizing.
- `h3` uses Nunito (not Playfair) — this is intentional for readability at smaller sizes.

### Spacing & Layout

- Sections use `.section` class (5rem / 7rem padding) and `.container-custom` (max-width 1200px, centered).
- Cards use `shadow-card` and `rounded-md` / `rounded-lg`.
- Buttons use `rounded-pill` (50px border-radius).

### Buttons

| Class | Usage |
|-------|-------|
| `.btn-primary` | Gold background, dark text — main CTA |
| `.btn-secondary` | Transparent with wave border — secondary actions |
| `.btn-ghost` | Jungle background, sand text — tertiary actions |
| `.whatsapp-btn` | Green WhatsApp style — always paired with `MessageCircle` icon |

### Dark Mode

- Supported via CSS custom properties and `[data-theme="dark"]` / `prefers-color-scheme`.
- Colors swap automatically — cream ↔ night, sand ↔ dark green variants.

## Build & Development

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:3000
npm run build        # Static export to out/
npm run lint         # ESLint
```

- Build output is `out/` — deploy directly to Cloudflare Pages.
- The `next.config.ts` sets `output: "export"` and `trailingSlash: true`.
- No API routes — this is a fully static site. Use Web3Forms for form handling.

## Important Patterns

1. **Page structure**: Server `page.tsx` exports `Metadata` + renders a `*Client.tsx` component.
2. **Section components**: Each homepage section is a standalone component in `components/sections/`.
3. **ScrollReveal**: Wrap any element that should animate on scroll with `<ScrollReveal delay={0.1}>`.
4. **Responsive**: Mobile-first — use Tailwind breakpoints `md:`, `lg:`. Bottom nav appears below 768px.
5. **Accessibility**: Skip link, `aria-label` attributes, focus-visible outlines, 48px min tap targets.
6. **SEO**: Full `Metadata` export on every page, structured data (JSON-LD) in layout, canonical URLs.
