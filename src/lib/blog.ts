// Blog types and data for HLPFL INC

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "press-release" | "case-study" | "news" | "guide";
  featured: boolean;
  image?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
  featured: boolean;
}

// Featured testimonials
export const testimonials: Testimonial[] = [
  {
    name: "Heather Krystecki",
    role: "Poet & Author",
    company: "HCJK",
    quote:
      "HLPFL took everything I had — poems in notebooks, a dream of a book — and helped me build a real author platform from scratch. They designed my brand, built hcjk.org, handled the publishing logistics, and gave me a professional presence I never could have created alone. The commission-only model meant I could focus on writing without worrying about costs. My debut collection is now available worldwide, and I have a home for my words that truly feels like mine.",
    featured: true,
  },
  {
    name: "Emma Laureen",
    role: "Founder & Artist",
    company: "Elisabeth Jane",
    quote:
      "HLPFL helped me turn a handmade passion into a real business. I was painting recipe boxes one at a time from my kitchen table, and they built me a professional brand, a beautiful website with e-commerce, and a strategy to reach customers I never could have found on my own. The commission-only model meant I could invest in materials and focus on my craft instead of worrying about upfront agency fees. Now I have an online store, a retail stockist, and a brand that truly represents who I am.",
    featured: true,
  },
];

// Blog posts — HCJK is primary client, Elisabeth Jane is secondary
export const blogPosts: BlogPost[] = [
  {
    slug: "hlpfl-launches-to-empower-creative-entrepreneurs",
    title: "HLPFL Launches to Empower Creative Entrepreneurs",
    excerpt:
      "Wyoming-based 501(c)(3) nonprofit introduces commission-only model to support inventors, artists, and creators without upfront fees.",
    content: `
# HLPFL Launches to Empower Creative Entrepreneurs

**FOR IMMEDIATE RELEASE**

HLPFL INC, a Wyoming-based 501(c)(3) nonprofit organization, officially launches its mission to empower creative entrepreneurs with professional business services—without the traditional barriers that have long plagued the creative industry.

## A New Model for Creative Support

Unlike traditional agencies, management companies, or incubators that charge hefty upfront fees or demand equity, HLPFL operates on a revolutionary commission-only model. The organization earns only when its clients earn, ensuring complete alignment of interests.

"We started HLPFL because we were tired of seeing talented creative entrepreneurs get trapped in exploitative deals," said James Rockel III, Founder & CEO. "The industry is changing, and creatives deserve partners who actually help—not extract."

## Comprehensive Services

HLPFL provides a full suite of business support services:

- **Brand Development** - Logo design, visual identity, and market positioning
- **Business Formation** - LLC filing, entity structure, and compliance support
- **Sales Representation** - Direct sales outreach and deal negotiation
- **Marketing Strategy** - Campaign planning and performance tracking
- **Content Creation** - Video production, photography, and social media
- **Creator Education** - Rights education and business fundamentals

## Who We Serve

HLPFL supports a diverse range of creative entrepreneurs:

- Inventors with patented products needing sales and marketing infrastructure
- Musicians seeking management and touring support
- Visual artists building collector bases
- Designers launching product lines
- Writers navigating publishing and rights protection

## The HLPFL Difference

**No VCs. No Exploitation. No Bullshit.**

As a nonprofit, HLPFL exists solely to serve its clients. There are no venture capital investors demanding returns, no hidden fees, and no pressure to sign away rights or equity.

"Your work stays yours—always," the organization states in its mission. "We're here to support, not control."

## Get Started

Creative entrepreneurs can apply for HLPFL's services through the organization's website at hlpfl.org. The application process is designed to be straightforward, with no upfront costs or long-term commitments required.

---

**About HLPFL INC**

HLPFL INC is a Wyoming 501(c)(3) nonprofit organization dedicated to empowering creative entrepreneurs with professional business services. Operating on a commission-only model, HLPFL ensures that creators can access the support they need without financial barriers.

**Media Contact:**
contact@hlpfl.org
    `,
    author: "HLPFL Team",
    date: "2025-01-15",
    category: "press-release",
    featured: true,
  },
  {
    slug: "elisabeth-jane-hand-painted-recipe-boxes-case-study",
    title: "Case Study: How HLPFL Helped Elisabeth Jane Grow from Kitchen Table to Online Brand",
    excerpt:
      "From hand-painting recipe boxes as gifts to a full e-commerce brand—how Emma Laureen partnered with HLPFL to build Elisabeth Jane into a thriving artisan business.",
    content: `
# Case Study: Elisabeth Jane Partnership

## The Challenge

Emma Laureen is a former teacher turned stay-at-home mom with a rare gift: she hand-paints recipe boxes and cards with nature-inspired botanical designs — wildflowers, garden herbs, strawberry vines — each one sketched, painted, sealed, and shipped entirely by hand. No stencils, no stamps, no batch production. Every piece is one of a kind.

What started as a single hand-painted recipe box given as a gift quickly turned into something much bigger. Emma had the talent, the product, and the passion — but she didn't have the business infrastructure to turn a craft into a brand.

She faced the same barriers many independent artisans encounter:

- **No online presence** — No website, no e-commerce, no way to reach customers beyond word of mouth
- **No brand identity** — No cohesive visual brand, no professional positioning
- **No marketing strategy** — No plan for reaching customers, building an audience, or driving sales
- **Limited budget** — Traditional branding and web development agencies charge thousands upfront
- **Time constraints** — As a stay-at-home mom, every hour matters

## The HLPFL Solution

When Emma connected with HLPFL, we saw an artist with a beautiful product and an authentic story that deserved to reach people. More importantly, we saw someone who needed a partner, not an invoice.

### What We Built Together

**1. Complete Brand Identity — Elisabeth Jane**

We developed the Elisabeth Jane brand from the ground up:

- **Brand name & identity** — Elisabeth Jane as a warm, memorable artisan brand
- **Visual design system** — A cottagecore-inspired aesthetic with Cormorant Garamond serif typography, ivory and cream tones, and elegant minimal design that lets the handwork shine
- **Brand voice** — Warm, personal, nature-inspired — matching Emma's authentic creative spirit
- **Professional positioning** — "Hand-painted recipe boxes made to be used, loved, and passed down"

**2. Full E-Commerce Website — elisabethjane.com**

We designed and built a complete online store and brand platform:

- **Homepage** with hero section, product showcase, brand story, and process breakdown
- **Shop page** with Stripe-powered checkout for direct purchases
- **About page** with Emma's full story, values, and creative philosophy
- **Process section** showing the four-step journey: Sketch, Paint, Seal, Ship
- **Stockist page** featuring retail partner Stoffer Home in Grand Rapids, Michigan
- **Shipping & policies** with clear, transparent terms
- **Full SEO optimization** with metadata and social sharing
- **Mobile-responsive design** optimized for all devices

The site was built with Next.js, Tailwind CSS, and TypeScript — a modern, fast platform deployed on Cloudflare Pages for edge performance.

**3. Product Strategy & Pricing**

We helped Emma structure her product line:

- **Hand-Illustrated Strawberry Garden Recipe Cards** (Set of 10) — $10.00
- **Strawberry Hand-Painted Recipe Box (Large)** — $30.00, fits 4x6 cards
- **Strawberry Hand-Painted Recipe Box (Small)** — $20.00, fits 3x5 cards
- Archival-quality materials, metal hinges, magnetic closures, polyurethane sealed for real kitchen use

**4. Marketing & Brand Storytelling**

We built a marketing foundation rooted in authenticity:

- **Instagram strategy** connecting @elisabeth.jane.c for showcasing the painting process
- **Brand storytelling** — "In a world of screens and bookmarked links, a recipe box is easily overlooked — until it's your grandmother's. Then, it's no longer just a box; it's a legacy."
- **Retail outreach** resulting in a stockist partnership with Stoffer Home
- **Content strategy** for process photos, behind-the-scenes, and finished pieces

**5. Brand Values That Sell**

We helped Emma articulate what makes Elisabeth Jane special:

- **Handmade, Always** — Every step done by hand, no shortcuts
- **Built to Last** — Sealed and finished for real everyday kitchen use
- **Nature-Inspired** — Designs drawn from what's growing outside
- **One at a Time** — Individual attention from start to finish

## The Results

Emma went from painting recipe boxes as gifts to running a professional artisan brand with:

- **A full e-commerce website** at elisabethjane.com with Stripe checkout
- **A cohesive brand identity** that authentically represents her craft and values
- **A retail stockist** — Stoffer Home in Grand Rapids, Michigan
- **A growing Instagram presence** showcasing her process and finished pieces
- **A sustainable product line** with clear pricing and professional presentation
- **A platform built to grow** as she expands her designs and reaches more customers

## Emma's Words

> "HLPFL helped me turn a handmade passion into a real business. I was painting recipe boxes one at a time from my kitchen table, and they built me a professional brand, a beautiful website with e-commerce, and a strategy to reach customers I never could have found on my own. The commission-only model meant I could invest in materials and focus on my craft instead of worrying about upfront agency fees. Now I have an online store, a retail stockist, and a brand that truly represents who I am."

## The HLPFL Difference

This partnership shows what HLPFL's model means for artisans and makers:

- **$0 upfront** — Emma didn't pay for branding, web development, or e-commerce setup
- **Full creative ownership** — Every design, every brushstroke, every product stays with Emma
- **Comprehensive execution** — Not just advice, but actual brand design, web development, e-commerce integration, and marketing strategy
- **Authentic partnership** — We built what Emma needed, in her voice, for her customers
- **Long-term platform** — Not a one-time project, but a foundation for a growing artisan business

## For Makers and Artisans Considering HLPFL

If you're a maker, artist, or artisan with a product people love but no way to reach them at scale — we want to hear from you. HLPFL provides:

- Brand development and visual identity
- Professional website design and e-commerce
- Product strategy and pricing
- Marketing and audience building
- Retail outreach and stockist development

All on a commission-only basis. No upfront fees. No gatekeeping. Your craft, your rights, your business — with real support behind you.

**Ready to build your artisan brand? Apply at hlpfl.org**

---

*Visit Emma's website at [elisabethjane.com](https://elisabethjane.com) and follow her on Instagram at [@elisabeth.jane.c](https://www.instagram.com/elisabeth.jane.c).*
    `,
    author: "HLPFL Team",
    date: "2026-03-01",
    category: "case-study",
    featured: true,
  },
  {
    slug: "why-commission-only-matters",
    title: "Why $1,000 + Commission Matters: The Problem with Traditional Creative Services",
    excerpt:
      "Understanding why HLPFL's $1,000 activation + commission model is a game-changer for creative entrepreneurs who've been burned by $10K+ upfront fees and empty promises.",
    content: `
# Why $1,000 + Commission Matters

## The Traditional Model is Broken

For decades, creative entrepreneurs have faced a frustrating choice: pay tens of thousands upfront for services that may or may not work, or struggle to build everything themselves.

Consider the typical paths available to an independent creator:

### Option 1: Traditional Agencies

Marketing agencies, business consultants, and creative services firms typically charge:

- $5,000-$50,000+ for branding packages
- $2,000-$10,000/month for marketing retainers
- $500-$1,000/hour for business consulting
- Plus additional costs for every deliverable

For a creator just starting out, these costs are prohibitive. And here's the uncomfortable truth: **these agencies get paid whether or not you succeed.**

### Option 2: Management Companies & Labels

In music, publishing, and other creative industries, traditional management often means:

- 15-25% commission (sounds reasonable, right?)
- But also: multi-year lock-in contracts
- Rights assignments and ownership claims
- 360 deals that take from every revenue stream
- Advances that become debt

The creator ends up with less control, less ownership, and often less money than if they'd stayed independent.

### Option 3: DIY Everything

Many creators choose to do everything themselves:

- Learn marketing from YouTube videos
- Figure out business formation on their own
- Cold call potential customers
- Handle contracts without legal support

This approach preserves independence but sacrifices growth. There are only so many hours in a day, and time spent on business is time not spent creating.

## The HLPFL Alternative

We designed our model to solve these problems:

### $1,000 Activation + Commission

- **$1,000 replaces $10,000+** — Entity formation, branding, web, contracts, sales materials — all built for you in weeks
- **Aligned incentives** — We earn a commission on the revenue we help generate. If you don't make money, we don't make money
- **No lock-in** — If it's not working, walk. We don't hold your domain, your brand, or your business hostage
- **Transparent terms** — 10-25% commission negotiated upfront and in writing

### Nonprofit Structure

As a 501(c)(3), we have no:

- Shareholders demanding returns
- VCs pushing for exits
- Pressure to squeeze clients
- Incentive to prioritize profit over mission

### Complete Services

Your $1,000 activation includes:

- Entity formation + EIN
- Brand strategy + visual identity
- Custom website design + development
- Contract templates (NDAs, service agreements)
- Sales materials + social media setup
- Market research + positioning

Total market value: $10,000–$31,500. Your cost: $1,000. That's 3–10 cents on the dollar.

## Real Results, Real Alignment

When Heather Krystecki partnered with us to build HCJK, she invested $1,000 in herself — and we invested our time, expertise, and resources into her author platform because we believed in her work.

Our return? A commission on the revenue we help generate.

If we don't help her succeed, we don't earn. Period.

This is how it should work.

## Is This Right for You?

Our $1,000 + commission model works best for:

- Creators with products/services ready for market
- Entrepreneurs who need business infrastructure, not just advice
- People tired of paying $10K+ for promises
- Anyone who believes success should be shared, not extracted

**Ready to work with a partner who only wins when you win?**

Apply at hlpfl.org

---

*HLPFL INC is a Wyoming 501(c)(3) nonprofit organization.*
    `,
    author: "James Rockel III",
    date: "2025-01-20",
    category: "guide",
    featured: false,
  },
  {
    slug: "from-gift-to-brand-building-a-handmade-business",
    title: "From Gift to Brand: How One Hand-Painted Recipe Box Became a Business",
    excerpt:
      "The story behind Elisabeth Jane — how a single hand-painted recipe box given as a gift turned into a thriving artisan brand with an online store and retail presence.",
    content: `
# From Gift to Brand: How One Hand-Painted Recipe Box Became a Business

Emma Laureen never planned to start a business. She was a teacher for seven years before becoming a stay-at-home mom in Grand Rapids, Michigan. But when she hand-painted a recipe box as a gift, something clicked — for both the recipient and for Emma.

That single box turned into something much bigger. Here's how.

## The Origin Story

It started with a simple idea: take an ordinary recipe box and make it beautiful. Emma sketched wildflowers and strawberry vines in pencil, layered on paint by hand, sealed it with polyurethane for real kitchen use, and gave it away.

The response was immediate. People wanted their own. Friends asked for gifts. Word spread.

But Emma didn't just see a product — she saw a philosophy: **everyday items should be as beautiful as they are useful.**

## What Makes Elisabeth Jane Different

In a market flooded with mass-produced kitchenware and machine-printed designs, Elisabeth Jane stands apart:

### Handmade, Always

Every piece is done entirely by hand — sketch, paint, seal. No stencils, no stamps, no batch production. Each box takes hours of careful work. No two are exactly alike.

### Built to Last

These aren't decorative shelf pieces. Every box is sealed with polyurethane and built with metal hinges and magnetic closures. They're designed to sit on your kitchen counter, hold your grandmother's recipes, and get used every single day.

### Nature-Inspired

Emma's designs come from what she sees outside — wildflowers, garden herbs, vintage botanicals, strawberry vines. There's something timeless about bringing the garden into the kitchen.

### One at a Time

In Emma's words: "I paint each one like it's the only one." That philosophy shows in every brushstroke.

## The Business Behind the Art

Having a beautiful product is one thing. Having a business is another. With HLPFL's support, Emma built:

- A professional brand identity that captures the warmth and authenticity of her craft
- A full e-commerce website with Stripe checkout for direct sales
- A product line with clear pricing and professional photography
- A retail partnership with Stoffer Home in Grand Rapids
- An Instagram presence showcasing her process from sketch to ship

## Why This Matters for Artisans

Emma's story illustrates a crucial principle for independent makers: **your craft deserves business infrastructure, not just an Etsy listing.**

Too many talented artisans are stuck selling through marketplace platforms that take large cuts, commoditize their work, and give them no control over the customer experience.

With a dedicated brand and website, Emma controls:

- Her pricing and margins
- Her customer relationships
- Her brand story and presentation
- Her growth trajectory

### Questions for Fellow Makers

1. Does your current sales channel reflect the quality of your work?
2. Are you building a brand, or just filling orders?
3. Do customers know the story behind what you make?
4. Could you reach more people with a professional online presence?
5. What would change if you had real business support behind your craft?

## The Legacy Angle

Here's what resonates most about Elisabeth Jane's recipe boxes:

> "In a world of screens and bookmarked links, a recipe box is easily overlooked — until it's your grandmother's. Then, it's no longer just a box; it's a legacy."

Emma isn't just selling painted wood. She's creating heirlooms. And that's the kind of story that builds a lasting brand.

## Ready to Build Your Artisan Brand?

If you're a maker with a product people love but no business infrastructure to match, HLPFL can help. Commission-only. No upfront fees. Your craft, your business.

**Apply at hlpfl.org**

---

*This article is based on our partnership with Elisabeth Jane. Visit [elisabethjane.com](https://elisabethjane.com) and follow [@elisabeth.jane.c](https://www.instagram.com/elisabeth.jane.c) on Instagram.*
    `,
    author: "HLPFL Team",
    date: "2026-03-05",
    category: "case-study",
    featured: false,
  },
  {
    slug: "hcjk-heather-krystecki-author-platform-case-study",
    title:
      "Case Study: How HLPFL Helped Poet Heather Krystecki Launch Her Debut Collection and Build hcjk.org",
    excerpt:
      "From poems in notebooks to a worldwide book launch — how HLPFL partnered with Heather Krystecki to build a complete author brand, website, and publishing strategy for her debut poetry collection 'I See You, I See Me.'",
    content: `
# Case Study: Heather Krystecki & hcjk.org

## From Notebooks to Nationwide — Building an Author Platform from Scratch

Heather Krystecki is a poet whose work explores the intimate geography of human connection — love, loss, mental health, self-discovery, and the quiet courage of being truly seen. Her debut poetry collection, *I See You, I See Me*, is raw, honest, and deeply personal.

But like many writers, Heather had the talent and the work — what she didn't have was the business infrastructure to turn a manuscript into a published, marketed, professionally presented book and author brand.

That's where HLPFL came in.

## The Challenge

Heather had been writing for years. Poems lived in notebooks, voice memos, and phone notes — captured in quiet moments, at 2am, during the pauses between conversations. The work was real. The voice was clear. But the path from personal writing to published author was anything but.

She faced the same barriers many independent writers encounter:

- **No publishing infrastructure** — No agent, no publisher, no roadmap for self-publishing
- **No brand or web presence** — No website, no professional identity, no way to reach readers
- **No marketing strategy** — No plan for book promotion, audience building, or sales channels
- **Limited budget** — Traditional publishing services charge thousands upfront with no guarantee of results
- **Mental health context** — The collection deals with her own mental health crisis, making the stakes deeply personal

## The HLPFL Solution

When Heather connected with HLPFL, we saw a writer with a powerful voice and a collection that deserved to reach people. More importantly, we saw someone who needed a partner, not a gatekeeper.

### What We Built Together

**1. Complete Author Brand Identity**

We developed the HCJK brand from the ground up:

- **Brand name & identity** — HCJK (Heather's initials) as a clean, memorable author brand
- **Visual design system** — A warm, literary aesthetic with Cormorant Garamond serif typography, a cream-and-blush color palette, and a minimal design that lets the poetry breathe
- **Brand voice** — Intimate, honest, lowercase — matching the tone of Heather's writing
- **Professional positioning** — "Poet, author, and believer in the beauty of quiet moments"

**2. Full Author Website — hcjk.org**

We designed and built a complete author platform at [hcjk.org](https://hcjk.org):

- **Homepage** with hero section, featured poems, book showcase, and newsletter signup
- **About page** with full biography, writing philosophy, and press section
- **Poetry archive** — a growing collection of poems from the book and beyond
- **Shop page** with purchase links across multiple retailers (direct, Barnes & Noble, Amazon)
- **Journal/Blog** for personal reflections, writing process insights, and new work
- **Events page** for readings, signings, and speaking engagements
- **Book Club Discussion Guide** with 12 thoughtful questions and key themes
- **Contact page** for press inquiries, collaborations, and reader messages
- **Newsletter integration** for building a direct reader community
- **Instagram integration** connecting @hcjk_collection for weekly poem sharing
- **Full SEO optimization** with metadata, schema markup, and social sharing

The site was built with Next.js, Tailwind CSS, and TypeScript — a modern, fast, responsive platform designed to grow with Heather's career.

**3. Publishing Strategy & Execution**

We guided the entire self-publishing process:

- **ISBN registration** (979-8-2954-8091-1)
- **IngramSpark distribution** for worldwide availability
- **Multi-platform listing** — Direct author sales, Barnes & Noble, Amazon
- **Book formatting** for paperback publication
- **Back cover copy and book description** crafted for emotional resonance and discoverability

**4. Content & Marketing Infrastructure**

- **Social media strategy** with weekly poem sharing on Instagram
- **Reader praise collection** and testimonial system
- **Blog/journal content** to build ongoing reader engagement
- **Newsletter system** for direct audience building
- **Book club outreach** with a ready-made discussion guide
- **Press and media section** for review copies and interview requests

**5. Community & Reader Experience**

We created touchpoints that turn readers into a community:

- **Book Club Guide** with 12 discussion questions exploring mental health, love, identity, and vulnerability
- **Events framework** for readings, signings, and virtual book club visits
- **Direct contact** making Heather accessible to her readers: "Every message is read, every word matters"

## The Book: I See You, I See Me

*"A poetry collection about the act of truly seeing — others, ourselves, and the quiet revelations that emerge when we let ourselves be known."*

The collection moves through love, solitude, healing, and the small sacred moments that make up a life. Heather writes in spare, honest language — lowercase, minimal punctuation — that invites readers into the most human spaces.

From the back cover:

> "This book holds the journey through my own mental health crisis — poems that hold more dark than light. It's being shared so that no one feels alone. You're not alone."

### Sample Poems

**"in the quiet between us"**

> in the quiet between us / i found the words / i had been searching for — / the ones that sound like home

**"what i was looking for"**

> you asked me / what i was looking for — / i didn't have the words then / but i do now: / someone who stays / when the quiet gets loud

**"too true to say out loud"**

> i write because / some things are too true / to say out loud — / so i give them / to the page instead

## Reader Response

> "A collection that wraps around you like a conversation you didn't know you needed." — Early Reader

> "Raw, honest, and deeply human. These poems made me feel less alone." — Reader Review

> "The kind of poetry that makes you stop scrolling and start feeling." — Instagram Reader

## The Results

Heather went from poems in notebooks to a professionally published, globally available author with:

- **A published poetry collection** available worldwide through multiple retailers
- **A professional author website** at hcjk.org with full e-commerce, blog, and community features
- **A growing Instagram presence** at @hcjk_collection sharing weekly poems
- **A complete brand identity** that authentically represents her voice and vision
- **Book club infrastructure** making her work accessible to reading groups and classrooms
- **Press-ready materials** for media coverage, interviews, and review copies
- **A sustainable platform** built to grow as she writes more, publishes more, and reaches more readers

## Heather's Words

> "HLPFL took everything I had — poems in notebooks, a dream of a book — and helped me build a real author platform from scratch. They designed my brand, built hcjk.org, handled the publishing logistics, and gave me a professional presence I never could have created alone. The commission-only model meant I could focus on writing without worrying about costs. My debut collection is now available worldwide, and I have a home for my words that truly feels like mine."

## The HLPFL Difference

This partnership shows what HLPFL's model means for writers:

- **$0 upfront** — Heather didn't pay for branding, web development, or publishing support
- **Full creative ownership** — Every poem, every word, every right stays with Heather
- **Comprehensive execution** — Not just advice, but actual brand design, web development, publishing logistics, and marketing strategy
- **Authentic partnership** — We built what Heather needed, in her voice, for her readers
- **Long-term platform** — Not a one-time project, but a foundation for an entire writing career

## For Writers Considering HLPFL

If you're a writer with work that deserves to reach people — whether it's poetry, fiction, nonfiction, or anything in between — we want to hear from you. HLPFL provides:

- Brand development and author identity
- Professional website design and development
- Publishing strategy and distribution
- Marketing and audience building
- Rights protection and business guidance

All on a commission-only basis. No upfront fees. No gatekeeping. Your words, your rights, your career — with real support behind you.

**Ready to build your author platform? Apply at hlpfl.org**

---

*Visit Heather's website at [hcjk.org](https://hcjk.org) and follow her on Instagram at [@hcjk_collection](https://www.instagram.com/hcjk_collection/). I See You, I See Me is available at [Barnes & Noble](https://www.barnesandnoble.com/w/i-see-you-i-see-me-heather-krystecki/1149164117) and [direct from the author](https://shop.ingramspark.com/b/084).*
    `,
    author: "HLPFL Team",
    date: "2026-02-08",
    category: "case-study",
    featured: true,
  },
];

// Helper functions
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
