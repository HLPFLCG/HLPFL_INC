import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'HLPFL | Modern Services. Local Prices.',
  description: 'Your website, Google presence, and brand — built by hand, delivered fast, priced for real business. Starting at $49.',
  openGraph: {
    title: 'HLPFL | Modern Services. Local Prices.',
    description: 'Hand-built websites, branding, and local SEO for small business owners. No AI. No agency markup. Starting at $49.',
    url: 'https://hlpfl.org',
    siteName: 'HLPFL',
  },
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
      </head>
      <body className="bg-void text-white font-body antialiased">
        <LanguageProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
