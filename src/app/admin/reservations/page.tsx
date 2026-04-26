import type { Metadata } from 'next'
import AdminReservationsClient from './AdminReservationsClient'

export const metadata: Metadata = { title: 'Reservations — HLPFL Admin' }

export default function AdminReservationsPage() {
  return <AdminReservationsClient />
}
