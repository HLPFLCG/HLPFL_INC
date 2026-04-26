// src/lib/portal/language.ts
// Server-side language detection from Accept-Language header.
// Eliminates the need for a UI language toggle in the portal.

import { headers } from 'next/headers'
import type { Lang } from '@/lib/translations'

/**
 * Reads the Accept-Language request header and returns 'es' or 'en'.
 * Costa Rica (es-CR) and any Spanish locale default to 'es'.
 * Everything else falls back to 'en'.
 *
 * Call this in Server Components / layouts only.
 */
export async function detectLanguage(): Promise<Lang> {
  const h = await headers()
  const acceptLang = h.get('accept-language') ?? ''
  const lang = acceptLang.toLowerCase()
  if (lang.startsWith('es') || lang.includes('es-') || lang.includes(',es')) {
    return 'es'
  }
  return 'en'
}
