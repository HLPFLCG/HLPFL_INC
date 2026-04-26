import type { Metadata } from 'next'
import AdminProjectDetailClient from './AdminProjectDetailClient'

export const metadata: Metadata = { title: 'Project Detail — HLPFL Admin' }

export default function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <AdminProjectDetailClient params={params} />
}
