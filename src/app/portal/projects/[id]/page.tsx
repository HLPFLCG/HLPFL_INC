import type { Metadata } from 'next'
import ProjectDetailClient from './ProjectDetailClient'

export const metadata: Metadata = { title: 'Project Detail' }

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <ProjectDetailClient params={params} />
}
