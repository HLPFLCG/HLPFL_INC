import type { Metadata } from 'next'
import ReservationsPageClient from './ReservationsPageClient'

export const metadata: Metadata = { title: 'Reservations — HLPFL Portal' }

export default function ReservationsPage() {
  return <ReservationsPageClient />
}
