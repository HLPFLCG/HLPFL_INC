import type { Metadata } from 'next'
import AdminProjectsClient from './AdminProjectsClient'

export const metadata: Metadata = { title: 'Projects — HLPFL Admin' }

export default function AdminProjectsPage() {
  return <AdminProjectsClient />
}
