import type { Metadata } from 'next'
import BookingsPageClient from './BookingsPageClient'

export const metadata: Metadata = { title: 'Bookings' }

export default function BookingsPage() {
  return <BookingsPageClient />
}
