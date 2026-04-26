import type { Metadata } from 'next'
import ReservationStatusClient from './ReservationStatusClient'

export const metadata: Metadata = { title: 'Reservation Status — HLPFL Portal' }

export default function ReservationStatusPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <ReservationStatusClient params={params} />
}
