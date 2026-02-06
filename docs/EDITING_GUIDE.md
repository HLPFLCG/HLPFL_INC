# HLPFL INC - Site Editing Guide

Complete guide for editing content, images, menus, and all customizable elements of the HLPFL INC website.

---

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Images & Media](#images--media)
3. [Headers & Navigation](#headers--navigation)
4. [Footer](#footer)
5. [Homepage Sections](#homepage-sections)
6. [Page Content](#page-content)
7. [Portal Dashboard](#portal-dashboard)
8. [Colors & Branding](#colors--branding)
9. [Typography](#typography)

---

## Quick Reference

| What to Edit | File Location |
|--------------|---------------|
| Site logo | `public/logo.svg` |
| Open Graph image | `public/og-image.svg` |
| Navigation menu | `src/components/layout/Header.tsx` |
| Footer links | `src/components/layout/Footer.tsx` |
| Homepage hero | `src/components/sections/HeroSection.tsx` |
| Services list | `src/lib/data.ts` |
| Audiences list | `src/lib/data.ts` |
| Site metadata/SEO | `src/app/layout.tsx` |
| Colors | `tailwind.config.ts` |
| Global styles | `src/app/globals.css` |

---

## Images & Media

### Logo

**Location:** `public/logo.svg`

To replace the logo:
1. Create your new logo as an SVG file (recommended) or PNG
2. Replace `public/logo.svg` with your new file
3. Keep the same filename, or update references in:
   - `src/components/common/Logo.tsx`
   - `src/components/layout/Header.tsx`
   - `src/components/sections/HeroSection.tsx`
   - `src/app/portal/page.tsx`

**Logo dimensions used:**
- Header (desktop): 24x36px
- Header (mobile): 20x30px
- Hero section: 80x80px
- Loading screen: 120x120px

### Open Graph Image (Social Sharing)

**Location:** `public/og-image.svg`

This image appears when your site is shared on social media (Facebook, Twitter, LinkedIn).

**Requirements:**
- Recommended size: 1200x630px
- Format: SVG, PNG, or JPG
- Update references in `src/app/layout.tsx`:

```tsx
openGraph: {
  images: [
    {
      url: "/og-image.svg",  // Update this path
      width: 1200,
      height: 630,
      alt: "HLPFL INC - Empowering Creative Entrepreneurs",
    },
  ],
},
```

### Adding New Images

1. Place images in `public/images/` folder (create if needed)
2. Reference in code:

```tsx
import Image from "next/image";

<Image
  src="/images/your-image.jpg"
  alt="Description of image"
  width={800}
  height={600}
/>
```

**For background images in CSS:**
```css
.hero-bg {
  background-image: url('/images/hero-bg.jpg');
}
```

---

## Headers & Navigation

### Main Navigation Menu

**File:** `src/components/layout/Header.tsx`

Find the `navLinks` array (around line 20):

```tsx
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];
```

**To add a new link:**
```tsx
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },        // New link
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];
```

**To add an external link:**
```tsx
{ href: "https://external-site.com", label: "External", external: true },
```

Then update the link rendering to handle external links:
```tsx
{link.external ? (
  <a href={link.href} target="_blank" rel="noopener noreferrer">
    {link.label}
  </a>
) : (
  <Link href={link.href}>{link.label}</Link>
)}
```

### Header Logo Text

**File:** `src/components/layout/Header.tsx`

Find and edit the text next to the logo:
```tsx
<span className="font-display text-xl tracking-wider">HLPFL</span>
```

---

## Footer

**File:** `src/components/layout/Footer.tsx`

### Footer Navigation Links

Find the link sections and modify:

```tsx
{/* Company Links */}
<div>
  <h4 className="font-display text-lg mb-4">Company</h4>
  <ul className="space-y-2">
    <li><Link href="/about">About</Link></li>
    <li><Link href="/services">Services</Link></li>
    <li><Link href="/contact">Contact</Link></li>
  </ul>
</div>
```

### Social Media Links

**File:** `src/components/layout/SocialLinks.tsx`

Update social media URLs:

```tsx
const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/hlpfl", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/hlpfl", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/hlpfl", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@hlpfl", label: "YouTube" },
];
```

### Contact Information

Update email, phone, or address in footer:

```tsx
<p>contact@hlpfl.org</p>
<p>Wyoming, USA</p>
```

---

## Homepage Sections

### Hero Section

**File:** `src/components/sections/HeroSection.tsx`

**Main headline:**
```tsx
<h1 className="font-display text-5xl md:text-6xl lg:text-7xl">
  Empowering{" "}
  <span className="text-gradient">Creative Entrepreneurs</span>
</h1>
```

**Subtitle:**
```tsx
<p className="text-gray-400 text-lg md:text-xl">
  Your subtitle text here
</p>
```

**Call-to-action buttons:**
```tsx
<Link href="/contact">
  <Button size="lg">Get Started</Button>
</Link>
<Link href="/services">
  <Button variant="outline" size="lg">Learn More</Button>
</Link>
```

### Services Section

**File:** `src/lib/data.ts`

Edit the services array:

```tsx
export const services: Service[] = [
  {
    icon: Palette,
    title: "Brand Development",
    description: "Build a distinctive brand identity...",
    features: [
      "Logo design & visual identity",
      "Brand strategy & positioning",
      // Add more features
    ],
  },
  // Add more services
];
```

**Available icons:** Import from `lucide-react`. Browse at https://lucide.dev/icons/

### About Section (Homepage)

**File:** `src/components/sections/AboutSection.tsx`

Edit values, mission statement, and stats displayed on homepage.

### CTA Section

**File:** `src/components/sections/CTASection.tsx`

Edit the call-to-action at the bottom of the homepage.

---

## Page Content

### About Page

**File:** `src/app/about/page.tsx`

Key sections to edit:
- Mission statement
- Core values (in `values` array)
- Timeline (in `timeline` array)
- Team members

### Services Page

**File:** `src/app/services/page.tsx`

Services and audiences are imported from `src/lib/data.ts`.

### Contact Page

**File:** `src/app/contact/page.tsx`

- Form fields
- Contact information
- Office hours

### Store Page

**File:** `src/app/store/page.tsx`

Edit products array:
```tsx
const products = [
  {
    id: "product-1",
    title: "Product Name",
    description: "Product description",
    price: 99,
    icon: Package,
    gradient: "from-gold/20 to-gold/5",
    stripeLink: "https://buy.stripe.com/your-link",
  },
];
```

### Legal Pages

- Privacy Policy: `src/app/privacy/page.tsx`
- Terms of Service: `src/app/terms/page.tsx`

---

## Portal Dashboard

**File:** `src/app/portal/page.tsx`

### Dashboard Stats

Edit the `quickStats` array:
```tsx
const quickStats = [
  { label: "Active Projects", value: "3", change: "+1", icon: Briefcase },
  { label: "Revenue Generated", value: "$12,450", change: "+18%", icon: DollarSign },
  // Add more stats
];
```

### Sidebar Navigation

Edit the `sidebarNav` array to add/remove dashboard sections:
```tsx
const sidebarNav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "My Projects", icon: Briefcase },
  // Add more sections
];
```

### Demo Credentials

**File:** `src/contexts/AuthContext.tsx`

```tsx
const DEMO_CREDENTIALS = {
  email: "demo@hlpfl.org",
  password: "demo123",
};
```

---

## Colors & Branding

**File:** `tailwind.config.ts`

### Brand Colors

```tsx
colors: {
  void: {
    DEFAULT: "#0a0a0a",  // Primary background
    light: "#141414",    // Secondary background
    lighter: "#1a1a1a",  // Tertiary background
  },
  gold: {
    DEFAULT: "#c87941",  // Primary accent
    light: "#d4945c",    // Light accent
    dark: "#a86535",     // Dark accent
  },
},
```

### Using Colors in Components

```tsx
// Tailwind classes
<div className="bg-void text-gold">
<div className="bg-gold hover:bg-gold-light">
<div className="border-gold/20">  // 20% opacity
```

---

## Typography

### Fonts

**File:** `src/app/layout.tsx`

Current fonts:
- **Headings:** Bebas Neue (`font-display`)
- **Body:** Space Grotesk (`font-body`)

To change fonts:
```tsx
import { Your_Font } from "next/font/google";

const yourFont = Your_Font({
  subsets: ["latin"],
  variable: "--font-custom",
});
```

### Using Typography

```tsx
<h1 className="font-display text-4xl">Heading</h1>
<p className="font-body text-lg">Body text</p>
```

### Text Gradient Effect

```tsx
<span className="text-gradient">Gradient Text</span>
```

Defined in `src/app/globals.css`:
```css
.text-gradient {
  @apply bg-gradient-to-r from-gold via-gold-light to-gold
         bg-clip-text text-transparent;
}
```

---

## Common Tasks

### Adding a New Page

1. Create folder: `src/app/your-page/`
2. Create file: `src/app/your-page/page.tsx`

```tsx
import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for SEO",
};

export default function YourPage() {
  return (
    <div className="min-h-screen">
      <section className="section pt-24">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="font-display text-5xl">Your Page</h1>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
```

3. Add to navigation in `Header.tsx` if needed
4. Add to sitemap in `public/sitemap.xml`

### Changing Button Styles

**File:** `src/components/ui/Button.tsx`

Variants available:
- `primary` - Gold background
- `outline` - Gold border, transparent background
- `ghost` - No border, transparent background

```tsx
<Button variant="primary" size="lg">Click Me</Button>
```

---

## Testing Changes

```bash
# Start development server
npm run dev

# Check for errors
npm run lint

# Build for production
npm run build
```

Always test on both desktop and mobile before deploying.
