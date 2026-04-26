import type { Metadata } from 'next'
import NewReservationClient from './NewReservationClient'

export const metadata: Metadata = { title: 'New Reservation — HLPFL Portal' }

export default function NewReservationPage() {
  return <NewReservationClient />
}
