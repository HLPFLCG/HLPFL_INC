import type { Metadata } from 'next'
import AdminNewProjectClient from './AdminNewProjectClient'

export const metadata: Metadata = { title: 'New Project — HLPFL Admin' }

export default function AdminNewProjectPage() {
  return <AdminNewProjectClient />
}
