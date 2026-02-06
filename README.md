# HLPFL INC

Wyoming 501(c)(3) nonprofit empowering creative entrepreneurs with professional business services. Zero upfront costs—we earn when you earn.

## Tech Stack

- **Next.js 15** (App Router, Static Export)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Cloudflare Pages**

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── services/           # Services page
│   ├── store/              # Store page
│   ├── portal/             # Creative Entrepreneur Portal
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
│
├── components/
│   ├── common/             # Shared components (Logo, LoadingScreen)
│   ├── layout/             # Header, Footer
│   ├── sections/           # Homepage sections
│   ├── ui/                 # Reusable UI (Button, Card, ScrollReveal)
│   ├── animations/         # Animation components
│   └── auth/               # Auth components
│
├── contexts/               # React contexts
│   └── AuthContext.tsx     # Authentication context
│
└── lib/                    # Shared utilities
    └── data.ts             # Shared data constants
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (outputs to `out/`) |
| `npm run lint` | Run ESLint |

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Void | `#0a0a0a` | Primary background |
| Gold | `#c87941` | Primary accent |
| Gold Light | `#d4945c` | Hover states |

### Typography

- **Headings:** Bebas Neue
- **Body:** Space Grotesk

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

## Portal Demo

Access the Creative Entrepreneur Portal with demo credentials:
- **Email:** demo@hlpfl.org
- **Password:** demo123

## License

All rights reserved. HLPFL INC.
