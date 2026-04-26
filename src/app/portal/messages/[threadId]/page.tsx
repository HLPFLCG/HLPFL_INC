import type { Metadata } from 'next'
import MessageThreadClient from './MessageThreadClient'

export const metadata: Metadata = { title: 'Message Thread' }

export default function MessageThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>
}) {
  return <MessageThreadClient params={params} />
}
