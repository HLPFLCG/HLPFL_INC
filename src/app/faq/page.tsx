import type { Metadata } from 'next'
import FAQPageClient from './FAQPageClient'

export const metadata: Metadata = {
  title: 'FAQ — HLPFL',
  description: 'Answers to common questions about HLPFL web services — pricing, ownership, delivery times, AI policy, and more.',
  alternates: { canonical: 'https://hlpfl.org/faq/' },
  openGraph: {
    title: 'FAQ — HLPFL',
    description: 'Answers to common questions about pricing, ownership, and delivery for HLPFL services.',
    url: 'https://hlpfl.org/faq/',
  },
}

export default function FAQPage() {
  return <FAQPageClient />
}
