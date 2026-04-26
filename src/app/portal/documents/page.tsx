import type { Metadata } from 'next'
import DocumentsPageClient from './DocumentsPageClient'

export const metadata: Metadata = { title: 'Documents — HLPFL Portal' }

export default function DocumentsPage() {
  return <DocumentsPageClient />
}
