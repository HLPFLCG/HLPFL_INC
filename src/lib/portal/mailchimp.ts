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
// Web Crypto API does not support MD5, so we use a pure-JS implementation.
async function hashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim()
  return md5(normalized)
}

// Pure-JS MD5 implementation (RFC 1321)
// Based on the well-known public-domain algorithm.
function md5(str: string): string {
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff)
    return ((((x >> 16) + (y >> 16) + (lsw >> 16)) & 0xffff) << 16) | (lsw & 0xffff)
  }
  function bitRotateLeft(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt))
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  // Encode string as UTF-8 bytes then pad to 512-bit blocks
  const utf8 = unescape(encodeURIComponent(str))
  const len8 = utf8.length
  const n = (((len8 + 8) >>> 6) + 1) * 16
  const x: number[] = new Array(n).fill(0)

  for (let i = 0; i < len8; i++) {
    x[i >> 2] |= utf8.charCodeAt(i) << ((i & 3) << 3)
  }
  x[len8 >> 2] |= 0x80 << ((len8 & 3) << 3)
  x[n - 2] = len8 * 8

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878

  for (let i = 0; i < n; i += 16) {
    const [olda, oldb, oldc, oldd] = [a, b, c, d]

    a = md5ff(a, b, c, d, x[i], 7, -680876936);         b = md5ff(d, a, b, c, x[i+1], 12, -389564586)
    c = md5ff(c, d, a, b, x[i+2], 17, 606105819);       d = md5ff(b, c, d, a, x[i+3], 22, -1044525330)
    a = md5ff(a, b, c, d, x[i+4], 7, -176418897);       b = md5ff(d, a, b, c, x[i+5], 12, 1200080426)
    c = md5ff(c, d, a, b, x[i+6], 17, -1473231341);     d = md5ff(b, c, d, a, x[i+7], 22, -45705983)
    a = md5ff(a, b, c, d, x[i+8], 7, 1770035416);       b = md5ff(d, a, b, c, x[i+9], 12, -1958414417)
    c = md5ff(c, d, a, b, x[i+10], 17, -42063);         d = md5ff(b, c, d, a, x[i+11], 22, -1990404162)
    a = md5ff(a, b, c, d, x[i+12], 7, 1804603682);      b = md5ff(d, a, b, c, x[i+13], 12, -40341101)
    c = md5ff(c, d, a, b, x[i+14], 17, -1502002290);    d = md5ff(b, c, d, a, x[i+15], 22, 1236535329)

    a = md5gg(a, b, c, d, x[i+1], 5, -165796510);       b = md5gg(d, a, b, c, x[i+6], 9, -1069501632)
    c = md5gg(c, d, a, b, x[i+11], 14, 643717713);      d = md5gg(b, c, d, a, x[i], 20, -373897302)
    a = md5gg(a, b, c, d, x[i+5], 5, -701558691);       b = md5gg(d, a, b, c, x[i+10], 9, 38016083)
    c = md5gg(c, d, a, b, x[i+15], 14, -660478335);     d = md5gg(b, c, d, a, x[i+4], 20, -405537848)
    a = md5gg(a, b, c, d, x[i+9], 5, 568446438);        b = md5gg(d, a, b, c, x[i+14], 9, -1019803690)
    c = md5gg(c, d, a, b, x[i+3], 14, -187363961);      d = md5gg(b, c, d, a, x[i+8], 20, 1163531501)
    a = md5gg(a, b, c, d, x[i+13], 5, -1444681467);     b = md5gg(d, a, b, c, x[i+2], 9, -51403784)
    c = md5gg(c, d, a, b, x[i+7], 14, 1735328473);      d = md5gg(b, c, d, a, x[i+12], 20, -1926607734)

    a = md5hh(a, b, c, d, x[i+5], 4, -378558);          b = md5hh(d, a, b, c, x[i+8], 11, -2022574463)
    c = md5hh(c, d, a, b, x[i+11], 16, 1839030562);     d = md5hh(b, c, d, a, x[i+14], 23, -35309556)
    a = md5hh(a, b, c, d, x[i+1], 4, -1530992060);      b = md5hh(d, a, b, c, x[i+4], 11, 1272893353)
    c = md5hh(c, d, a, b, x[i+7], 16, -155497632);      d = md5hh(b, c, d, a, x[i+10], 23, -1094730640)
    a = md5hh(a, b, c, d, x[i+13], 4, 681279174);       b = md5hh(d, a, b, c, x[i], 11, -358537222)
    c = md5hh(c, d, a, b, x[i+3], 16, -722521979);      d = md5hh(b, c, d, a, x[i+6], 23, 76029189)
    a = md5hh(a, b, c, d, x[i+9], 4, -640364487);       b = md5hh(d, a, b, c, x[i+12], 11, -421815835)
    c = md5hh(c, d, a, b, x[i+15], 16, 530742520);      d = md5hh(b, c, d, a, x[i+2], 23, -995338651)

    a = md5ii(a, b, c, d, x[i], 6, -198630844);         b = md5ii(d, a, b, c, x[i+7], 10, 1126891415)
    c = md5ii(c, d, a, b, x[i+14], 15, -1416354905);    d = md5ii(b, c, d, a, x[i+5], 21, -57434055)
    a = md5ii(a, b, c, d, x[i+12], 6, 1700485571);      b = md5ii(d, a, b, c, x[i+3], 10, -1894986606)
    c = md5ii(c, d, a, b, x[i+10], 15, -1051523);       d = md5ii(b, c, d, a, x[i+1], 21, -2054922799)
    a = md5ii(a, b, c, d, x[i+8], 6, 1873313359);       b = md5ii(d, a, b, c, x[i+15], 10, -30611744)
    c = md5ii(c, d, a, b, x[i+6], 15, -1560198380);     d = md5ii(b, c, d, a, x[i+13], 21, 1309151649)
    a = md5ii(a, b, c, d, x[i+4], 6, -145523070);       b = md5ii(d, a, b, c, x[i+11], 10, -1120210379)
    c = md5ii(c, d, a, b, x[i+2], 15, 718787259);       d = md5ii(b, c, d, a, x[i+9], 21, -343485551)

    a = safeAdd(a, olda); b = safeAdd(b, oldb)
    c = safeAdd(c, oldc); d = safeAdd(d, oldd)
  }

  return [a, b, c, d]
    .map((n) =>
      (n >>> 0)
        .toString(16)
        .padStart(8, '0')
        .match(/../g)!
        .reverse()
        .join('')
    )
    .join('')
}
