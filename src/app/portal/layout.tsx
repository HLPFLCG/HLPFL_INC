// src/app/portal/layout.tsx
// Portal layout — server component.
// Detects language from Accept-Language header and auth-gates all /portal/* routes.

import type { Metadata } from 'next'
import { detectLanguage } from '@/lib/portal/language'
import PortalLayoutClient from './PortalLayoutClient'

export const metadata: Metadata = {
  title: { default: 'Portal — HLPFL', template: '%s — HLPFL Portal' },
  description: 'Your HLPFL customer portal.',
  robots: { index: false, follow: false },
}

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const lang = await detectLanguage()
  return <PortalLayoutClient initialLang={lang}>{children}</PortalLayoutClient>
}
