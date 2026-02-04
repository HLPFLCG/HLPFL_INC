# HLPFL INC

Empowering creative entrepreneurs with tools, resources, and community. No contracts, no exploitation—just support for your creative journey.

## Overview

HLPFL INC is a modern website built for supporting creative entrepreneurs (musicians, artists, content creators) with distribution tools, analytics, community resources, and more.

**Live Site:** [Coming Soon]

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)

## Features

- Modern dark luxury design with gold accents
- Responsive layout (mobile-first)
- Smooth scroll animations
- Creative Entrepreneur Portal (demo)
- Static site generation for optimal performance
- Cloudflare Pages ready

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/HLPFLCG/HLPFL_INC.git
cd HLPFL_INC

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Output will be in the `out/` folder.

## Project Structure

```
src/
├── app/                    # Pages (Next.js App Router)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   └── portal/            # Creative Entrepreneur Portal
│
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Homepage sections
│   └── ui/                # Reusable components
```

## Documentation

- **[EDITING_GUIDE.md](./EDITING_GUIDE.md)** - How to edit and maintain the site
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Cloudflare Pages deployment instructions

## Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Void | `#0a0a0a` | Primary background |
| Gold | `#c87941` | Primary accent |
| Gold Light | `#d4945c` | Hover states |
| White | `#ffffff` | Text |

### Typography

- **Headings:** Bebas Neue
- **Body:** Space Grotesk

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

This site is configured for Cloudflare Pages. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

Quick deploy:
```bash
npm run build
wrangler pages deploy out --project-name hlpfl-inc
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

All rights reserved. HLPFL INC.

---

**Built with love for creative entrepreneurs.**
