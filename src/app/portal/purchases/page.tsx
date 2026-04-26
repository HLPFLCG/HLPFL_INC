import type { Metadata } from 'next'
import PurchasesPageClient from './PurchasesPageClient'

export const metadata: Metadata = { title: 'Purchases' }

export default function PurchasesPage() {
  return <PurchasesPageClient />
}
