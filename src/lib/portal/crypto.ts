// src/lib/portal/crypto.ts
// Application-layer encryption for PII fields (phone, address, notes).
// Uses libsodium secretbox (XSalsa20-Poly1305).
// Key is loaded from HLPFL_PORTAL_ENCRYPTION_KEY (32-byte hex, never committed).

import _sodium from 'libsodium-wrappers'

let _ready = false

async function sodium() {
  if (!_ready) {
    await _sodium.ready
    _ready = true
  }
  return _sodium
}

function getKey(): Uint8Array {
  const hex = process.env.HLPFL_PORTAL_ENCRYPTION_KEY
  if (!hex || hex.length !== 64) {
    throw new Error(
      'HLPFL_PORTAL_ENCRYPTION_KEY must be a 64-char hex string (32 bytes)'
    )
  }
  return Uint8Array.from(Buffer.from(hex, 'hex'))
}

/**
 * Encrypts a plaintext string.
 * Returns a base64 string: `<nonce_b64>.<ciphertext_b64>`
 */
export async function encryptField(plaintext: string): Promise<string> {
  const lib = await sodium()
  const key = getKey()
  const nonce = lib.randombytes_buf(lib.crypto_secretbox_NONCEBYTES)
  const ciphertext = lib.crypto_secretbox_easy(
    lib.from_string(plaintext),
    nonce,
    key
  )
  return (
    lib.to_base64(nonce, lib.base64_variants.ORIGINAL) +
    '.' +
    lib.to_base64(ciphertext, lib.base64_variants.ORIGINAL)
  )
}

/**
 * Decrypts a value produced by `encryptField`.
 * Returns null if the value is null/empty, throws on decryption failure.
 */
export async function decryptField(
  encrypted: string | null | undefined
): Promise<string | null> {
  if (!encrypted) return null
  const lib = await sodium()
  const key = getKey()
  const [noncePart, ciphertextPart] = encrypted.split('.')
  if (!noncePart || !ciphertextPart) {
    throw new Error('Invalid encrypted field format')
  }
  const nonce = lib.from_base64(noncePart, lib.base64_variants.ORIGINAL)
  const ciphertext = lib.from_base64(
    ciphertextPart,
    lib.base64_variants.ORIGINAL
  )
  const plaintext = lib.crypto_secretbox_open_easy(ciphertext, nonce, key)
  if (!plaintext) throw new Error('Decryption failed')
  return lib.to_string(plaintext)
}
