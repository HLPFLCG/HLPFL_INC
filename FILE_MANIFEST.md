# HLPFL — Complete File Manifest

> Every file in this repository is active and required. There are **zero** duplicate or dead files.
> Use this guide when copying files to a new repository or when editing the site.

---

## Quick Reference: What to Edit

| Want to change… | Edit this file |
|-----------------|---------------|
| Any text/copy (English & Spanish) | `src/lib/translations.ts` |
| Service definitions | `src/lib/data.ts` |
| Colors & design tokens | `tailwind.config.ts` + `src/app/globals.css` |
| WhatsApp number | `src/lib/whatsapp.ts` |
| Contact form API key | `src/lib/web3forms.ts` |
| SEO titles & descriptions | Each route's `page.tsx` → `Metadata` export |
| Logo | `public/logo.svg` + `src/components/common/Logo.tsx` |
| Social share image | `public/og-image.png` |

---

## Complete File List (72 files)

### 🔧 Root — Config Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & npm scripts (`dev`, `build`, `lint`) |
| `package-lock.json` | Locked dependency versions for reproducible installs |
| `next.config.ts` | Next.js config — `output: "export"` for static HTML in `out/` |
| `tailwind.config.ts` | Tailwind CSS config — Caribbean Coast color tokens & fonts |
| `tsconfig.json` | TypeScript strict mode config |
| `postcss.config.mjs` | PostCSS config (required by Tailwind) |
| `.eslintrc.json` | ESLint config |
| `wrangler.toml` | Cloudflare Pages deployment config |
| `.gitignore` | Git ignore rules (node_modules, .next, out, env files) |
| `README.md` | Project documentation |

### 📁 `public/` — Static Assets

Files served at the root URL (e.g., `public/logo.svg` → `https://hlpfl.org/logo.svg`).

| File | Purpose |
|------|---------|
| `public/logo.svg` | HLPFL logo (SVG) |
| `public/og-image.png` | Social media share image (Open Graph) |
| `public/robots.txt` | Search engine crawler rules |
| `public/sitemap.xml` | XML sitemap for SEO |
| `public/sw.js` | Service worker for offline caching |

### 📁 `src/app/` — Pages & Global Styles

Each route is a folder with `page.tsx` (server component for SEO metadata) and an optional `*Client.tsx` (client component for interactivity).

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | **Root layout** — fonts (Playfair Display + Nunito), metadata, providers, HTML shell |
| `src/app/globals.css` | **Global CSS** — design tokens, custom utility classes (`.btn-primary`, `.section`, `.container-custom`, etc.) |
| `src/app/page.tsx` | **Homepage** — imports and renders all section components |
| `src/app/not-found.tsx` | **404 page** |

#### Route Pages

| Route | Server Page | Client Component |
|-------|------------|------------------|
| `/about` | `src/app/about/page.tsx` | `src/app/about/AboutPageClient.tsx` |
| `/services` | `src/app/services/page.tsx` | `src/app/services/ServicesPageClient.tsx` |
| `/contact` | `src/app/contact/page.tsx` | `src/app/contact/ContactPageClient.tsx` |
| `/faq` | `src/app/faq/page.tsx` | `src/app/faq/FAQPageClient.tsx` |
| `/blog` | `src/app/blog/page.tsx` | *(server-only — see Blog Pages below)* |
| `/privacy` | `src/app/privacy/page.tsx` | *(server-only)* |
| `/terms` | `src/app/terms/page.tsx` | *(server-only)* |

#### Blog Pages

| File | Purpose |
|------|---------|
| `src/app/blog/page.tsx` | Blog index — lists all posts |
| `src/app/blog/how-to-get-direct-bookings-puerto-viejo/page.tsx` | Blog post |
| `src/app/blog/ict-registration-guide-tour-operators-costa-rica/page.tsx` | Blog post |
| `src/app/blog/low-season-marketing-cahuita-hotels/page.tsx` | Blog post |
| `src/app/blog/sinpe-movil-setup-vacation-rentals/page.tsx` | Blog post |
| `src/app/blog/whatsapp-booking-automation-caribbean-coast/page.tsx` | Blog post |

### 📁 `src/components/common/` — Shared Components

Used across multiple pages.

| File | Purpose |
|------|---------|
| `src/components/common/index.ts` | Barrel export (re-exports all common components) |
| `src/components/common/Logo.tsx` | HLPFL logo component |
| `src/components/common/LoadingScreen.tsx` | Initial page loading animation |
| `src/components/common/WhatsAppSticky.tsx` | Floating WhatsApp button (bottom-right on all pages) |
| `src/components/common/CookieBanner.tsx` | GDPR cookie consent banner |
| `src/components/common/LanguageToggle.tsx` | EN/ES language switcher |
| `src/components/common/ClientEffects.tsx` | Client-side effects wrapper |

### 📁 `src/components/layout/` — Layout Components

| File | Purpose |
|------|---------|
| `src/components/layout/Header.tsx` | Top navigation bar (desktop + mobile hamburger menu) |
| `src/components/layout/Footer.tsx` | Site footer with links, logo, copyright |
| `src/components/layout/MobileBottomNav.tsx` | Fixed bottom navigation bar (mobile only, < 768px) |
| `src/components/layout/SocialLinks.tsx` | Social media icon links |

### 📁 `src/components/sections/` — Homepage Sections

Each section of the homepage is a standalone, self-contained component.

| File | Purpose |
|------|---------|
| `src/components/sections/index.ts` | Barrel export |
| `src/components/sections/HeroSection.tsx` | Hero banner with headline, CTA buttons |
| `src/components/sections/TrustBar.tsx` | Trust badges / partner logos |
| `src/components/sections/PainSection.tsx` | Pain points your audience faces |
| `src/components/sections/HowItWorks.tsx` | Step-by-step "how it works" |
| `src/components/sections/ServicesSection.tsx` | Services overview cards |
| `src/components/sections/CompetitorSection.tsx` | Competitor comparison table |
| `src/components/sections/ResultsSection.tsx` | Results & statistics |
| `src/components/sections/TestimonialsSection.tsx` | Client testimonials / reviews |
| `src/components/sections/ValueStack.tsx` | Value proposition stacking |
| `src/components/sections/AboutSection.tsx` | About preview section |
| `src/components/sections/CTASection.tsx` | Final call-to-action with form |

### 📁 `src/components/ui/` — Reusable UI Primitives

| File | Purpose |
|------|---------|
| `src/components/ui/index.ts` | Barrel export |
| `src/components/ui/Button.tsx` | Button component (primary, secondary, ghost variants) |
| `src/components/ui/Card.tsx` | Card component |
| `src/components/ui/ScrollReveal.tsx` | Framer Motion scroll-triggered animation wrapper |

### 📁 `src/contexts/` — React Context

| File | Purpose |
|------|---------|
| `src/contexts/LanguageContext.tsx` | Bilingual EN/ES context provider — `useLanguage()` hook, `t()` helper, auto-detection for Costa Rican users |

### 📁 `src/lib/` — Utilities & Data

| File | Purpose |
|------|---------|
| `src/lib/translations.ts` | **All English/Spanish text** — single source of truth for every string on the site |
| `src/lib/data.ts` | Service definitions with bilingual titles, descriptions, and tags |
| `src/lib/whatsapp.ts` | WhatsApp phone number constant + URL builder function |
| `src/lib/web3forms.ts` | Web3Forms contact form API configuration |

### 📁 `docs/` — Documentation *(optional — not used at build time)*

| File | Purpose |
|------|---------|
| `docs/EDITING_GUIDE.md` | How to edit images, headers, menus, and site content |
| `docs/API_INTEGRATION.md` | Guide for adding backend APIs |
| `docs/NEWSLETTER_BLOG.md` | Newsletter and blog setup guide |
| `docs/SEO_GUIDE.md` | SEO optimization best practices |

### 📁 `.github/` — GitHub Config *(optional)*

| File | Purpose |
|------|---------|
| `.github/copilot-instructions.md` | AI coding assistant instructions |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│  layout.tsx (Root Layout)                           │
│  ├── Fonts: Playfair Display + Nunito               │
│  ├── LanguageProvider (i18n context)                 │
│  ├── Header + MobileBottomNav                       │
│  ├── WhatsAppSticky + CookieBanner                  │
│  └── Footer                                         │
├─────────────────────────────────────────────────────┤
│  page.tsx (Homepage)                                │
│  ├── HeroSection                                    │
│  ├── TrustBar                                       │
│  ├── PainSection                                    │
│  ├── HowItWorks                                     │
│  ├── ServicesSection                                 │
│  ├── CompetitorSection                              │
│  ├── ResultsSection                                 │
│  ├── TestimonialsSection                            │
│  ├── ValueStack                                     │
│  ├── AboutSection                                   │
│  └── CTASection                                     │
├─────────────────────────────────────────────────────┤
│  /about, /services, /contact, /faq, /blog,          │
│  /privacy, /terms (each has its own page.tsx)        │
└─────────────────────────────────────────────────────┘

Data Flow:
  translations.ts ──→ LanguageContext ──→ t("section") ──→ Components
  data.ts ──→ ServicesSection, ServicesPageClient
  whatsapp.ts ──→ WhatsAppSticky, MobileBottomNav, CTASection, ContactPage
  web3forms.ts ──→ CTASection, ContactPageClient
```

---

## Build & Deploy

```bash
npm install          # Install dependencies
npm run dev          # Dev server at localhost:3000
npm run build        # Static export → out/ directory
npm run lint         # Run ESLint

# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name hlpfl-inc
```

Build output goes to `out/` — this is the folder you deploy.
