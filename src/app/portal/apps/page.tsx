import type { Metadata } from 'next'
import AppsPageClient from './AppsPageClient'

export const metadata: Metadata = { title: 'Apps' }

export default function AppsPage() {
  return <AppsPageClient />
}
