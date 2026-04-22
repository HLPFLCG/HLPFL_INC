import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'

const siteUrl = 'https://hlpfl.org'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HLPFL | Modern Services. Local Prices.',
    template: '%s — HLPFL',
  },
  description: 'Your website, Google presence, and brand — built by hand, delivered fast, priced for real business. Starting at $49.',
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'HLPFL | Modern Services. Local Prices.',
    description: 'Hand-built websites, branding, and local SEO for small business owners. No AI. No agency markup. Starting at $49.',
    url: siteUrl,
    siteName: 'HLPFL',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HLPFL — Modern Services. Local Prices.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HLPFL | Modern Services. Local Prices.',
    description: 'Hand-built websites, branding, and local SEO for small business owners. No AI. No agency markup. Starting at $49.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'HLPFL',
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description: 'Hand-built websites, branding, and local SEO for small business owners. No AI. No agency markup. Starting at $49.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CR',
    addressRegion: 'Limón',
  },
  areaServed: ['Costa Rica', 'Caribbean Coast', 'Latin America'],
  sameAs: [
    'https://www.instagram.com/hlpfl.co',
  ],
  priceRange: '$',
  telephone: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void text-white font-body antialiased">
        <LanguageProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:font-semibold focus:rounded"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
