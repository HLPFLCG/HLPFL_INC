// src/lib/portal/mailchimp.ts
// Mailchimp audience sync helper.
// Call syncToMailchimp() when a new portal customer is created.
// Requires MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID env vars.
// The API key datacenter prefix (e.g. "us1") is parsed from the key itself.

interface MailchimpMember {
  email_address: string
  status: 'subscribed' | 'pending'
  merge_fields?: {
    FNAME?: string
    LNAME?: string
    BTYPE?: string
  }
  tags?: string[]
}

function getDatacenter(apiKey: string): string {
  // Mailchimp API keys end with "-us1", "-us6", etc.
  return apiKey.split('-').pop() ?? 'us1'
}

/**
 * Upserts a member in the configured Mailchimp audience.
 * Silently returns if env vars are not set (graceful degradation).
 */
export async function syncToMailchimp(member: MailchimpMember): Promise<void> {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    // Mailchimp not configured — skip silently
    return
  }

  const dc = getDatacenter(apiKey)
  const emailHash = await hashEmail(member.email_address)
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${emailHash}`

  const payload: Record<string, unknown> = {
    email_address: member.email_address,
    status_if_new: member.status,
    status: member.status,
  }

  if (member.merge_fields && Object.keys(member.merge_fields).length > 0) {
    payload.merge_fields = member.merge_fields
  }
  if (member.tags && member.tags.length > 0) {
    payload.tags = member.tags
  }

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({})) as { title?: string }
      console.error(
        `Mailchimp sync failed for ${member.email_address}:`,
        err.title ?? res.statusText
      )
    }
  } catch (err) {
    console.error('Mailchimp sync network error:', err)
  }
}

// ── MD5 hash for Mailchimp member ID ─────────────────────────────────────────
// Mailchimp uses MD5(lowercased email) as the member identifier.
// We use the Web Crypto API (available in both Node.js 18+ and Edge Runtime).
async function hashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim()
  const msgBuffer = new TextEncoder().encode(normalized)
  const hashBuffer = await crypto.subtle.digest('MD5', msgBuffer).catch(() => null)

  // MD5 is not available in all environments — fall back to encoded email
  if (!hashBuffer) {
    return encodeURIComponent(normalized)
  }

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
