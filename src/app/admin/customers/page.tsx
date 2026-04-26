import type { Metadata } from 'next'
import AdminCustomersClient from './AdminCustomersClient'

export const metadata: Metadata = { title: 'Customers — HLPFL Admin' }

export default function AdminCustomersPage() {
  return <AdminCustomersClient />
}
