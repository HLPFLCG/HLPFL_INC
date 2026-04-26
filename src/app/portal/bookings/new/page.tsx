import type { Metadata } from 'next'
import NewBookingClient from './NewBookingClient'

export const metadata: Metadata = { title: 'New Booking' }

export default function NewBookingPage() {
  return <NewBookingClient />
}
