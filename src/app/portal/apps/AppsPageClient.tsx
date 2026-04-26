'use client'

import { Link2, Edit, Send, MessageSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface App {
  slug: string
  name: string
  description: string
  url: string
  Icon: LucideIcon
}

const APPS: App[] = [
  {
    slug: 'bio',
    name: 'Link in Bio',
    description: 'Manage your link-in-bio page for social media.',
    url: 'https://bio.hlpfl.org',
    Icon: Link2,
  },
  {
    slug: 'forms',
    name: 'Form Builder',
    description: 'Create and manage lead capture and intake forms.',
    url: 'https://forms.hlpfl.org',
    Icon: Edit,
  },
  {
    slug: 'social',
    name: 'Social Manager',
    description: 'Schedule and manage your social media posts.',
    url: 'https://social.hlpfl.org',
    Icon: Send,
  },
  {
    slug: 'chat',
    name: 'Chatbot',
    description: 'Configure and monitor your AI chat assistant.',
    url: 'https://chat.hlpfl.org',
    Icon: MessageSquare,
  },
]

export default function AppsPageClient() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-1">
          Ecosystem
        </p>
        <h1 className="font-display text-3xl tracking-wider text-white">
          Apps
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Your HLPFL session works across all apps — no re-login needed.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {APPS.map(({ slug, name, description, url, Icon }) => (
          <a
            key={slug}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-void-lighter bg-void-light hover:border-gold/30 transition-colors p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center border border-void-lighter bg-void group-hover:border-gold/20 transition-colors shrink-0">
                <Icon className="w-4 h-4 text-gold/70" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{name}</p>
                <p className="text-white/30 text-xs">hlpfl.org</p>
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed">{description}</p>
            <p className="text-gold/60 group-hover:text-gold text-xs transition-colors mt-auto">
              Open → {url.replace('https://', '')}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
