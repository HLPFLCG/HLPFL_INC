# HLPFL INC - Site Editing Guide

This guide will help you edit and maintain the HLPFL INC website. The site is built with Next.js, TypeScript, and Tailwind CSS.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Design System](#design-system)
3. [Common Edits](#common-edits)
4. [Adding New Pages](#adding-new-pages)
5. [Editing Components](#editing-components)
6. [Working with Styles](#working-with-styles)
7. [Images and Assets](#images-and-assets)
8. [Running Locally](#running-locally)

---

## Project Structure

```
src/
├── app/                    # Pages (Next.js App Router)
│   ├── layout.tsx         # Root layout (header, footer, fonts)
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles & design system
│   ├── about/page.tsx     # About page
│   ├── contact/page.tsx   # Contact page
│   ├── services/page.tsx  # Services page
│   └── portal/page.tsx    # Creative Entrepreneur Portal
│
├── components/
│   ├── layout/            # Layout components
│   │   ├── Header.tsx     # Site header & navigation
│   │   └── Footer.tsx     # Site footer
│   │
│   ├── sections/          # Page sections (homepage blocks)
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── CTASection.tsx
│   │
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── ScrollReveal.tsx
```

---

## Design System

### Colors

The HLPFL brand uses a dark luxury aesthetic with gold accents:

| Color | Hex | Usage |
|-------|-----|-------|
| Void (Black) | `#0a0a0a` | Primary background |
| Void Light | `#141414` | Secondary background |
| Void Lighter | `#1a1a1a` | Hover states |
| Gold | `#c87941` | Primary accent (CTAs, highlights) |
| Gold Light | `#d4945c` | Hover states |
| Gold Dark | `#a86535` | Depth accents |
| White | `#ffffff` | Text |
| Gray | `#888888` | Secondary text |

**In Tailwind:**
```html
<div class="bg-void text-gold hover:bg-void-light">
  Gold text on dark background
</div>
```

### Typography

- **Headings:** Bebas Neue (uppercase, letter-spaced)
- **Body:** Space Grotesk

**In Tailwind:**
```html
<h1 class="font-display text-4xl">HEADING</h1>
<p class="font-body text-lg">Body text</p>
```

### Common Utility Classes

| Class | Description |
|-------|-------------|
| `.text-gradient` | Gold gradient text effect |
| `.glass` | Glass morphism background |
| `.glass-dark` | Darker glass effect |
| `.nav-link` | Navigation link with underline animation |
| `.card-hover` | Card lift + shadow on hover |
| `.btn-primary` | Primary gold button |
| `.btn-outline` | Outlined gold button |
| `.section` | Standard section padding |
| `.container-custom` | Centered content container |

---

## Common Edits

### Change the Site Title & Description

Edit `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "YOUR TITLE | HLPFL INC",
  description: "Your description here",
};
```

### Update Navigation Links

Edit `src/components/layout/Header.tsx`:

```tsx
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // Add or modify links here
];
```

### Edit Footer Links

Edit `src/components/layout/Footer.tsx`:

```tsx
const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    // Add or modify links
  ],
  // ...
};
```

### Update Social Media Links

Edit `src/components/layout/Footer.tsx`:

```tsx
const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/YOUR_HANDLE", label: "Twitter" },
  // Update URLs
];
```

### Change Homepage Hero Content

Edit `src/components/sections/HeroSection.tsx`:

```tsx
{/* Main Heading */}
<h1 className="font-display text-5xl">
  Your New <span className="text-gradient">Headline</span>
</h1>

{/* Subtitle */}
<p className="text-gray-400">
  Your new subtitle text here.
</p>
```

### Update Services

Edit `src/components/sections/ServicesSection.tsx`:

```tsx
const services = [
  {
    icon: Music,
    title: "Service Name",
    description: "Service description",
  },
  // Add more services
];
```

---

## Adding New Pages

1. Create a new folder in `src/app/` with the page name
2. Add a `page.tsx` file inside

**Example: Create `/resources` page:**

```
src/app/resources/page.tsx
```

```tsx
import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resources | HLPFL INC",
  description: "Your page description",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <section className="section pt-24">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="font-display text-5xl">Resources</h1>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
```

3. Add link to navigation in `Header.tsx` if needed

---

## Editing Components

### Button Component

Located at `src/components/ui/Button.tsx`

**Usage:**
```tsx
import Button from "@/components/ui/Button";

// Primary (default)
<Button>Click Me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button isLoading>Loading...</Button>
<Button fullWidth>Full Width</Button>
```

### Card Component

Located at `src/components/ui/Card.tsx`

**Usage:**
```tsx
import Card from "@/components/ui/Card";

<Card variant="bordered" hover>
  Card content here
</Card>

// Variants: default, bordered, elevated, glass
// Padding: none, sm, md, lg
```

### ScrollReveal Component

Animates content on scroll. Located at `src/components/ui/ScrollReveal.tsx`

**Usage:**
```tsx
import { ScrollReveal } from "@/components/ui";

<ScrollReveal>
  <h2>This fades in on scroll</h2>
</ScrollReveal>

<ScrollReveal delay={0.2} direction="left">
  <p>This slides in from right after a delay</p>
</ScrollReveal>
```

**Props:**
- `delay`: Animation delay in seconds (default: 0)
- `direction`: 'up' | 'down' | 'left' | 'right' (default: 'up')
- `duration`: Animation duration in seconds (default: 0.6)
- `once`: Only animate once (default: true)

---

## Working with Styles

### Adding Custom CSS

Edit `src/app/globals.css`:

```css
/* Add your custom styles at the bottom */
.my-custom-class {
  /* styles */
}
```

### Using Tailwind Classes

The site uses Tailwind CSS. Common patterns:

```html
<!-- Spacing -->
<div class="p-4 m-2 mt-8 px-6 py-4">

<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Typography -->
<h1 class="text-4xl font-display tracking-wider">
<p class="text-lg text-gray-400 leading-relaxed">

<!-- Responsive -->
<div class="text-sm md:text-base lg:text-lg">
```

### Modifying Colors

Edit `tailwind.config.ts` to change brand colors:

```ts
colors: {
  gold: {
    DEFAULT: "#c87941",  // Change this
    light: "#d4945c",
    dark: "#a86535",
  },
}
```

---

## Images and Assets

### Adding Images

1. Place images in `public/images/`
2. Reference in code:

```tsx
import Image from "next/image";

<Image
  src="/images/my-image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

### Using Icons

The site uses Lucide React icons:

```tsx
import { Music, Users, Heart } from "lucide-react";

<Music size={24} className="text-gold" />
```

Browse available icons: https://lucide.dev/icons/

---

## Running Locally

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `out/` folder.

---

## Quick Reference

### File to Edit For...

| Task | File |
|------|------|
| Site title/meta | `src/app/layout.tsx` |
| Navigation | `src/components/layout/Header.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Homepage content | `src/app/page.tsx` + `src/components/sections/` |
| Portal page | `src/app/portal/page.tsx` |
| Global styles | `src/app/globals.css` |
| Colors/fonts | `tailwind.config.ts` |

### Need Help?

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Framer Motion Docs:** https://www.framer.com/motion/
- **Lucide Icons:** https://lucide.dev/icons/
