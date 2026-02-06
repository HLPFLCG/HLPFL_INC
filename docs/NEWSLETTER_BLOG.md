# Newsletter & Blog Implementation Guide

Complete guide for adding a blog for press releases and a newsletter system to the HLPFL INC website.

---

## Table of Contents

1. [Overview](#overview)
2. [Blog Setup](#blog-setup)
3. [MDX Content System](#mdx-content-system)
4. [Newsletter Integration](#newsletter-integration)
5. [Press Release Templates](#press-release-templates)
6. [RSS Feed](#rss-feed)
7. [SEO for Blog Posts](#seo-for-blog-posts)
8. [Social Sharing](#social-sharing)
9. [Admin Dashboard](#admin-dashboard)

---

## Overview

### Recommended Stack

| Feature | Recommended | Alternatives |
|---------|-------------|--------------|
| Blog Content | MDX files | CMS (Sanity, Contentful) |
| Newsletter | Resend + Database | ConvertKit, Mailchimp |
| RSS | Generated at build | Dynamic API |
| Comments | Disabled (nonprofit) | Giscus, Disqus |

### File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Individual post
│   ├── newsletter/
│   │   └── page.tsx              # Newsletter signup
│   └── api/
│       ├── newsletter/
│       │   ├── subscribe/route.ts
│       │   └── unsubscribe/route.ts
│       └── rss/route.ts
├── content/
│   └── blog/                     # MDX blog posts
│       ├── 2026-02-01-launch.mdx
│       └── 2026-02-15-update.mdx
└── lib/
    ├── blog.ts                   # Blog utilities
    └── newsletter.ts             # Newsletter utilities
```

---

## Blog Setup

### Step 1: Install Dependencies

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time
npm install -D @types/mdx
```

### Step 2: Configure MDX

```ts
// next.config.ts
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // ... other config
};

export default withMDX(nextConfig);
```

### Step 3: Create Blog Utilities

```ts
// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: "press-release" | "news" | "update" | "announcement";
  image?: string;
  tags: string[];
  readingTime: string;
  content: string;
  featured?: boolean;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace(".mdx", ""),
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author || "HLPFL Team",
      category: data.category || "news",
      image: data.image,
      tags: data.tags || [],
      readingTime: readingTime(content).text,
      content,
      featured: data.featured || false,
    } as BlogPost;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getRecentPosts(count: number = 5): BlogPost[] {
  return getAllPosts().slice(0, count);
}
```

### Step 4: Create Blog Listing Page

```tsx
// src/app/blog/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog";
import { ScrollReveal, Card } from "@/components/ui";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Press Releases | HLPFL INC",
  description: "News, updates, and press releases from HLPFL INC. Stay informed about our mission to empower creative entrepreneurs.",
  keywords: ["HLPFL news", "press releases", "nonprofit updates", "creative entrepreneur news"],
  openGraph: {
    title: "Blog & Press Releases | HLPFL INC",
    description: "News and updates from HLPFL INC",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "press-release", label: "Press Releases" },
    { id: "news", label: "News" },
    { id: "update", label: "Updates" },
    { id: "announcement", label: "Announcements" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section pt-24 md:pt-32">
        <div className="container-custom">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              News & Updates
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
              Blog & <span className="text-gradient">Press Releases</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Stay informed about our mission to empower creative entrepreneurs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPosts.length > 0 && (
        <section className="section pt-8">
          <div className="container-custom">
            <ScrollReveal>
              <Link href={`/blog/${featuredPosts[0].slug}`}>
                <Card variant="bordered" hover className="overflow-hidden group">
                  <div className="grid md:grid-cols-2 gap-8">
                    {featuredPosts[0].image && (
                      <div className="relative h-64 md:h-auto">
                        <Image
                          src={featuredPosts[0].image}
                          alt={featuredPosts[0].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col justify-center">
                      <span className="text-gold text-sm uppercase tracking-wider mb-2">
                        Featured
                      </span>
                      <h2 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-gold transition-colors">
                        {featuredPosts[0].title}
                      </h2>
                      <p className="text-gray-400 mb-4">
                        {featuredPosts[0].description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(featuredPosts[0].date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {featuredPosts[0].readingTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <Card variant="bordered" hover className="h-full group">
                    {post.image && (
                      <div className="relative h-48 -mx-6 -mt-6 mb-6">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <span className="text-gold text-xs uppercase tracking-wider">
                      {post.category.replace("-", " ")}
                    </span>
                    <h3 className="font-display text-xl mt-2 mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime}
                      </span>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-void-light">
        <div className="container-custom">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest news and updates.
            </p>
            <Link href="/newsletter">
              <button className="btn-primary">
                Subscribe to Newsletter
                <ArrowRight size={18} className="ml-2" />
              </button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
```

### Step 5: Create Individual Blog Post Page

```tsx
// src/app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { ScrollReveal, Card } from "@/components/ui";
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | HLPFL INC`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const shareUrl = `https://hlpfl.org/blog/${post.slug}`;

  return (
    <article className="min-h-screen">
      {/* Header */}
      <section className="section pt-24 md:pt-32">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-8"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>

            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              {post.category.replace("-", " ")}
            </span>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readingTime}
              </span>
              <span>By {post.author}</span>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-void-light rounded-full text-sm text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </ScrollReveal>

          {/* Featured Image */}
          {post.image && (
            <ScrollReveal delay={0.1}>
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-12">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="section pt-0">
        <div className="container-custom max-w-3xl">
          <ScrollReveal delay={0.2}>
            <div className="prose prose-invert prose-gold max-w-none">
              <MDXRemote source={post.content} />
            </div>
          </ScrollReveal>

          {/* Share */}
          <div className="border-t border-gold/20 mt-12 pt-8">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Share this post:</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-void-light hover:bg-gold/20 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-void-light hover:bg-gold/20 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            image: post.image,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "HLPFL INC",
              logo: {
                "@type": "ImageObject",
                url: "https://hlpfl.org/logo.svg",
              },
            },
          }),
        }}
      />
    </article>
  );
}
```

---

## MDX Content System

### Create Content Directory

```bash
mkdir -p src/content/blog
```

### Example Blog Post

```mdx
---
title: "HLPFL INC Launches to Empower Creative Entrepreneurs"
description: "Wyoming nonprofit announces mission to provide fair business services to independent creators with zero upfront costs."
date: "2026-02-01"
author: "James Rockel III"
category: "press-release"
image: "/images/blog/launch.jpg"
tags: ["launch", "nonprofit", "creative entrepreneurs"]
featured: true
---

# HLPFL INC Launches to Empower Creative Entrepreneurs

**WYOMING, February 1, 2026** — HLPFL INC, a new Wyoming 501(c)(3) nonprofit organization, today announced its official launch with a mission to provide fair, transparent business services to creative entrepreneurs.

## Our Mission

The creator economy generates over $100 billion annually, yet the individuals who create this value routinely face exploitation through:

- Predatory business services charging thousands upfront
- Unfair contract terms stripping creators of their rights
- Lack of accessible business education

HLPFL addresses these challenges with a revolutionary commission-only model.

## How It Works

Unlike traditional business services, HLPFL charges **zero upfront fees**. We earn a commission only when our clients earn—typically 15-30% depending on the service.

> "You shouldn't have to pay thousands just to find out if someone can help you," said James Rockel III, Founder & CEO. "Our model ensures our interests are aligned with our clients' success."

## Services Offered

HLPFL provides comprehensive support including:

1. **Brand Development** — Logo, visual identity, market positioning
2. **Business Formation** — LLC filing, entity structure, compliance
3. **Sales Representation** — Direct sales, deal negotiation
4. **Marketing Strategy** — Campaign planning, execution
5. **Content Creation** — Video, photography, social media
6. **Creator Education** — Rights education, business fundamentals

## Who We Serve

HLPFL works with creative entrepreneurs across disciplines:

- Inventors with patents and products
- Independent musicians and producers
- Visual artists and photographers
- Industrial and fashion designers
- Authors and content creators

## Get Started

Creative entrepreneurs can apply for services at [hlpfl.org/contact](/contact) or access the Creative Entrepreneur Portal at [hlpfl.org/portal](/portal).

---

**Media Contact:**
press@hlpfl.org

**About HLPFL INC:**
HLPFL INC is a Wyoming 501(c)(3) nonprofit organization dedicated to empowering creative entrepreneurs with fair, transparent business services. Learn more at [hlpfl.org](/).
```

### MDX Components

```tsx
// src/components/mdx/index.tsx
import Image from "next/image";
import Link from "next/link";

export const mdxComponents = {
  a: ({ href, children }: any) => (
    <Link href={href} className="text-gold hover:text-gold-light">
      {children}
    </Link>
  ),
  img: ({ src, alt }: any) => (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="rounded-lg"
    />
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-gold pl-4 italic text-gray-400">
      {children}
    </blockquote>
  ),
  h2: ({ children }: any) => (
    <h2 className="font-display text-2xl mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="font-display text-xl mt-6 mb-3">{children}</h3>
  ),
};
```

---

## Newsletter Integration

### Newsletter Signup Page

```tsx
// src/app/newsletter/page.tsx
"use client";

import { useState } from "react";
import { Metadata } from "next";
import { ScrollReveal, Card, Button } from "@/components/ui";
import { Mail, Check, AlertCircle } from "lucide-react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to subscribe");

      setStatus("success");
      setMessage("Thanks for subscribing! Check your email to confirm.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <section className="section pt-24 md:pt-32">
        <div className="container-custom max-w-2xl">
          <ScrollReveal className="text-center">
            <div className="p-4 rounded-full bg-gold/10 text-gold w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Mail size={32} />
            </div>

            <h1 className="font-display text-4xl md:text-5xl mb-6">
              Subscribe to Our <span className="text-gradient">Newsletter</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8">
              Get the latest news, updates, and resources for creative entrepreneurs
              delivered straight to your inbox.
            </p>

            <Card variant="bordered" className="text-left">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 bg-void border border-gold/20 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  isLoading={status === "loading"}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>

                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Check size={16} />
                    {message}
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    {message}
                  </div>
                )}
              </form>

              <p className="text-gray-500 text-xs mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
```

### Newsletter API Routes

```ts
// src/app/api/newsletter/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.confirmed) {
        return NextResponse.json(
          { error: "Already subscribed" },
          { status: 400 }
        );
      }
      // Resend confirmation
    }

    // Create or update subscription
    const token = crypto.randomUUID();
    const subscriber = await prisma.newsletter.upsert({
      where: { email },
      update: { token },
      create: { email, token, confirmed: false },
    });

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: "Confirm your HLPFL Newsletter subscription",
      html: `
        <h1>Welcome to HLPFL!</h1>
        <p>Click the link below to confirm your subscription:</p>
        <a href="https://hlpfl.org/api/newsletter/confirm?token=${token}">
          Confirm Subscription
        </a>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

```ts
// src/app/api/newsletter/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/newsletter?error=invalid", request.url));
  }

  const subscriber = await prisma.newsletter.findFirst({
    where: { token },
  });

  if (!subscriber) {
    return NextResponse.redirect(new URL("/newsletter?error=invalid", request.url));
  }

  await prisma.newsletter.update({
    where: { id: subscriber.id },
    data: { confirmed: true, token: null },
  });

  return NextResponse.redirect(new URL("/newsletter?success=confirmed", request.url));
}
```

### Newsletter Database Schema

Add to Prisma schema:

```prisma
model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  confirmed Boolean  @default(false)
  token     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Press Release Templates

### Template 1: Announcement

```mdx
---
title: "[HEADLINE]"
description: "[Brief 1-2 sentence summary]"
date: "YYYY-MM-DD"
author: "James Rockel III"
category: "press-release"
tags: ["announcement"]
featured: false
---

**FOR IMMEDIATE RELEASE**

# [HEADLINE]

**[CITY, STATE, Month Day, Year]** — [Opening paragraph with the most important news. Answer who, what, when, where, why.]

## [Section Heading]

[Supporting details and context]

## [Section Heading]

[Additional information, quotes, or data]

> "[Quote from spokesperson]," said [Name], [Title] at HLPFL INC.

## About HLPFL INC

HLPFL INC is a Wyoming 501(c)(3) nonprofit organization dedicated to empowering creative entrepreneurs with fair, transparent business services. Learn more at [hlpfl.org](/).

---

**Media Contact:**
[Name]
[Email]
[Phone]
```

### Template 2: Partnership

```mdx
---
title: "HLPFL INC Partners with [Partner Name]"
description: "Partnership announcement..."
date: "YYYY-MM-DD"
author: "HLPFL Team"
category: "press-release"
tags: ["partnership"]
---

**FOR IMMEDIATE RELEASE**

# HLPFL INC Announces Strategic Partnership with [Partner]

[Details about the partnership and its benefits...]
```

---

## RSS Feed

```ts
// src/app/api/rss/route.ts
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = "https://hlpfl.org";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HLPFL INC Blog</title>
    <link>${siteUrl}/blog</link>
    <description>News and updates from HLPFL INC</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <category>${post.category}</category>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
```

Add RSS link to layout:

```tsx
// In src/app/layout.tsx head
<link rel="alternate" type="application/rss+xml" title="HLPFL Blog" href="/api/rss" />
```

---

## SEO for Blog Posts

### Automatic Meta Tags

Each blog post automatically gets:

- Title tag
- Meta description
- Open Graph tags
- Twitter Card tags
- JSON-LD Article schema

### Update Sitemap

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
  <url>
    <loc>https://hlpfl.org/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hlpfl.org/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://hlpfl.org/newsletter</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- Blog posts will be added dynamically at build time -->
</urlset>
```

### Dynamic Sitemap Generation

```ts
// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `https://hlpfl.org/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: "https://hlpfl.org", changeFrequency: "weekly", priority: 1.0 },
    { url: "https://hlpfl.org/about", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://hlpfl.org/services", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://hlpfl.org/blog", changeFrequency: "daily", priority: 0.9 },
    { url: "https://hlpfl.org/newsletter", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://hlpfl.org/contact", changeFrequency: "monthly", priority: 0.8 },
    ...blogUrls,
  ];
}
```

---

## Admin Dashboard

For managing blog posts without code changes, consider adding a headless CMS:

### Option 1: Sanity.io

```bash
npm install @sanity/client next-sanity
```

### Option 2: Simple Admin UI

Create a protected admin route for creating/editing posts.

```tsx
// src/app/admin/blog/page.tsx
// Protected admin page for managing blog posts
```

This requires:
1. Admin authentication
2. Form for creating/editing posts
3. File upload for images
4. Preview functionality

See API_INTEGRATION.md for authentication setup.
