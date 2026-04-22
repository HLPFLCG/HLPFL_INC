import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact — HLPFL',
  description: 'Get in touch with HLPFL. Start your project, ask a question, or reach us on WhatsApp. We respond within 24 hours.',
  alternates: { canonical: 'https://hlpfl.org/contact/' },
  openGraph: {
    title: 'Contact HLPFL',
    description: 'Start your project or ask a question. We respond within 24 hours.',
    url: 'https://hlpfl.org/contact/',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
