# Data Encryption Guide — HLPFL INC

Customer data (names, emails, phones, booking records) should be encrypted at rest whenever stored locally on your machine or on an external SSD. This guide covers OS-level encryption, database-level encryption, and application-level field encryption for Supabase.

---

## 1. Encrypt Your External SSD

### macOS

**Option A — FileVault (system drive)**
FileVault encrypts your entire system disk with AES-256-XTS. Enable it in:
`System Settings → Privacy & Security → FileVault → Turn On`.

**Option B — Encrypted disk image for an external SSD**
1. Open **Disk Utility**.
2. `File → New Image → Blank Image`.
3. Set size to match your SSD, choose **Format: Mac OS Extended (Journaled)**, **Encryption: 256-bit AES**.
4. Pick a strong passphrase — store it in your password manager, not in iCloud Keychain.
5. Mount the `.dmg` each time you need to access backups; eject it when done.

```bash
# Or create an encrypted sparse bundle from Terminal:
hdiutil create -size 500g -fs HFS+J -volname "HLPFL_Data" \
  -encryption AES-256 -stdinpass ~/hlpfl-data.sparsebundle
```

---

### Windows

**BitLocker (Windows 10/11 Pro / Enterprise)**
1. Connect your external SSD.
2. Open **File Explorer**, right-click the drive → **Turn on BitLocker**.
3. Choose **Use a password to unlock the drive**.
4. Save the recovery key to your password manager (not a Microsoft account if privacy matters).
5. Use **AES-256** (set via Group Policy: `Computer Configuration → Administrative Templates → Windows Components → BitLocker Drive Encryption → Choose drive encryption method → XTS-AES 256`).

**BitLocker To Go** works on USB drives with the same flow and is readable on other Windows machines after entering the password.

---

### Linux

**LUKS (Linux Unified Key Setup) — recommended**

```bash
# Install cryptsetup if not present
sudo apt install cryptsetup   # Debian/Ubuntu
sudo dnf install cryptsetup   # Fedora

# 1. Identify your drive (replace /dev/sdX)
lsblk

# 2. Wipe and create a LUKS2 container (AES-256-XTS)
sudo cryptsetup luksFormat --type luks2 --cipher aes-xts-plain64 \
  --key-size 512 --hash sha512 /dev/sdX

# 3. Open (unlock) the container
sudo cryptsetup luksOpen /dev/sdX hlpfl_data

# 4. Format and mount
sudo mkfs.ext4 /dev/mapper/hlpfl_data
sudo mount /dev/mapper/hlpfl_data /mnt/hlpfl

# 5. When done, unmount and close
sudo umount /mnt/hlpfl
sudo cryptsetup luksClose hlpfl_data
```

**VeraCrypt (cross-platform, works on macOS / Windows / Linux)**
VeraCrypt volumes are portable. Download from https://veracrypt.fr and use the GUI to:
1. **Create Volume** → **Encrypt a non-system partition/drive** → select your SSD.
2. Algorithm: **AES**, Hash: **SHA-512**.
3. Use a strong passphrase (20+ characters, mix of symbols).

---

## 2. Supabase — Transparent Encryption at Rest

Supabase runs on AWS/GCP with AES-256 encryption at the storage layer — all data is encrypted on disk by default without any action on your part. This covers the database, WAL, and backups.

For additional assurance, enable **Point-in-Time Recovery** in your Supabase project settings so backups are also encrypted and retained.

---

## 3. Column-Level Encryption with pgcrypto

For especially sensitive fields (guest contact info, API keys) you can encrypt individual columns in Postgres using the `pgcrypto` extension, which is already enabled by migration `001_initial_schema.sql`.

### 3a. Symmetric encryption with a secret key

```sql
-- Encrypting a value before insert
INSERT INTO bookings (guest_email, ...)
VALUES (
  pgp_sym_encrypt('jane@example.com', current_setting('app.encryption_key')),
  ...
);

-- Decrypting on read
SELECT pgp_sym_decrypt(guest_email::bytea, current_setting('app.encryption_key'))
FROM bookings WHERE id = $1;
```

Set the encryption key as a Postgres config parameter (never hard-code it in SQL):

```sql
-- In supabase/migrations/003_encryption_key.sql (run via service role only)
ALTER DATABASE postgres SET app.encryption_key = 'your-32-byte-hex-key-here';
```

Or pass it per-session from your API:

```ts
await db.rpc('set_config', { setting: 'app.encryption_key', value: process.env.DB_ENCRYPTION_KEY, is_local: true })
```

### 3b. Generate a strong 32-byte key

```bash
openssl rand -hex 32
# Example output: a3f1e2d4b5c6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
```

Store this in your `.env.local` as `DB_ENCRYPTION_KEY` and add it to your hosting environment (Vercel environment variables, etc.).

---

## 4. Application-Level Encryption (Node.js)

If you prefer to encrypt before data reaches the database, use the Node.js `crypto` module (no extra dependency):

```ts
// src/lib/crypto.ts
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ALGO = 'aes-256-gcm'
const KEY = Buffer.from(process.env.FIELD_ENCRYPTION_KEY!, 'hex') // 32-byte hex key

export function encryptField(plaintext: string): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv(ALGO, KEY, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  // Store iv:tag:ciphertext as a single base64 string
  return Buffer.concat([iv, tag, encrypted]).toString('base64')
}

export function decryptField(stored: string): string {
  const buf = Buffer.from(stored, 'base64')
  const iv = buf.subarray(0, 12)
  const tag = buf.subarray(12, 28)
  const encrypted = buf.subarray(28)
  const decipher = createDecipheriv(ALGO, KEY, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}
```

Use in your booking route:

```ts
import { encryptField, decryptField } from '@/lib/crypto'

// Before insert
const { data: booking } = await db.from('bookings').insert({
  guest_email: encryptField(guest_email),
  guest_phone: encryptField(guest_phone),
  // ...
})

// After read
booking.guest_email = decryptField(booking.guest_email)
```

> **Note:** Encrypting guest_email breaks Supabase's ability to filter on it (you can't `WHERE guest_email = $1`). Keep a hashed index if you need lookups: `guest_email_hash = sha256(email)`.

---

## 5. Key Management Checklist

- [ ] Generate a unique key per environment (dev, staging, prod) — never reuse keys
- [ ] Store keys in a password manager (1Password, Bitwarden) — not in git, not in Notion
- [ ] Add `FIELD_ENCRYPTION_KEY` and `DB_ENCRYPTION_KEY` to `.env.local` and your hosting env vars
- [ ] Rotate keys annually or after any suspected compromise — re-encrypt affected rows in a migration
- [ ] Back up your LUKS/VeraCrypt header: `cryptsetup luksHeaderBackup /dev/sdX --header-backup-file luks-header.bak` — store this separately from the drive
- [ ] Test decryption after each key rotation before deleting the old key

---

## 6. Quick Reference

| Layer | Tool | Scope |
|-------|------|-------|
| External SSD (macOS) | Disk Utility encrypted .dmg / FileVault | Full disk |
| External SSD (Windows) | BitLocker To Go | Full disk |
| External SSD (Linux) | LUKS2 + cryptsetup | Full disk |
| Cross-platform portable | VeraCrypt | Container file or full disk |
| Postgres columns | pgcrypto `pgp_sym_encrypt` | Individual fields |
| App layer | Node.js AES-256-GCM | Before DB write |
| Supabase infra | AWS/GCP AES-256 (automatic) | All data at rest |
