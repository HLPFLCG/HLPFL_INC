import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'HLPFL | Modern Services. Local Prices.',
  description: 'Your website, Google presence, and brand — built by hand, delivered fast, priced for real business. Starting at $49.',
  alternates: { canonical: 'https://hlpfl.org/' },
  openGraph: {
    title: 'HLPFL | Modern Services. Local Prices.',
    description: 'Hand-built websites, branding, and local SEO for small business owners. No AI. No agency markup. Starting at $49.',
    url: 'https://hlpfl.org/',
  },
}

export default function HomePage() {
  return <HomePageClient />
}
