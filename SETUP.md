# HLPFL Stays — Setup Guide

This document covers everything you need to do before the first live booking can work.

---

## 1. Supabase — Database

### Create a project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Choose a region closest to your users (US East recommended for American travelers).
3. Note your **Project URL** and **API keys** (Settings → API).

### Run the migration
1. In your Supabase dashboard, go to **SQL Editor**.
2. Open `supabase/migrations/001_initial_schema.sql`.
3. Paste the entire contents and click **Run**.
4. This creates the `properties`, `bookings`, and `availability_blocks` tables, sets up RLS policies, and seeds the first property (Villa Caribe Azul).

### Verify the seed data
After running the migration, go to **Table Editor → properties**. You should see "Villa Caribe Azul" with `published = true`.

### Create the admin user
1. In Supabase dashboard, go to **Authentication → Users**.
2. Click **Add user** → **Create new user**.
3. Enter your admin email and a strong password.
4. This is the only user who can access `/admin/`.

### Enable Google and Facebook OAuth (for customer dashboard login)

#### Google
1. Go to [console.cloud.google.com](https://console.cloud.google.com) → **APIs & Services → Credentials**.
2. Create a new **OAuth 2.0 Client ID** (Web application).
3. Add these **Authorized redirect URIs**:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - *(replace `your-project-id` with your actual project ID — visible in Supabase dashboard → Settings → API → Project URL)*
4. Copy the **Client ID** and **Client secret**.
5. In Supabase dashboard → **Authentication → Providers → Google**:
   - Toggle **Enable**.
   - Paste your Client ID and Client secret.
   - Save.

#### Facebook
1. Go to [developers.facebook.com](https://developers.facebook.com) → **My Apps → Create App**.
2. Choose **Consumer** type, enter your app name.
3. In the app dashboard → **Facebook Login → Settings**:
   - Add **Valid OAuth Redirect URI**: `https://your-project-id.supabase.co/auth/v1/callback`
   - *(same `your-project-id` as above)*
4. Copy the **App ID** and **App Secret** from **Settings → Basic**.
5. In Supabase dashboard → **Authentication → Providers → Facebook**:
   - Toggle **Enable**.
   - Paste your App ID and App Secret.
   - Save.

#### Supabase URL configuration (required for both)
In Supabase dashboard → **Authentication → URL Configuration**:
- **Site URL**: `https://hlpfl.org`
- **Redirect URLs**: add `https://hlpfl.org/dashboard`
- For local testing also add: `http://localhost:3000/dashboard`

### Environment variables to add
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Keep this server-side only
```

---

## 2. Stripe — Payments

### Test mode (development)
Test mode is safe — no real money moves. Use these test card details:
- **Card number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., `12/30`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `10001`)

### Get API keys
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → Developers → API keys.
2. Copy the **Secret key** (`sk_test_...` for test, `sk_live_...` for production).

### Configure webhook endpoint
1. In Stripe dashboard, go to **Developers → Webhooks**.
2. Click **Add endpoint**.
3. **Endpoint URL:** `https://hlpfl.org/api/webhooks/stripe`
   - For local testing: use [Stripe CLI](https://stripe.com/docs/stripe-cli) with `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. **Events to listen to:**
   - `checkout.session.completed`
5. After saving, click **Reveal** next to **Signing secret** and copy the `whsec_...` value.

### Environment variables to add
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Production cutover
- Replace `sk_test_...` with `sk_live_...`
- Replace `whsec_...` with the live webhook signing secret
- Add live webhook endpoint in Stripe dashboard pointing to production URL

---

## 3. Resend — Confirmation Emails

### Create an account
1. Go to [resend.com](https://resend.com) and create an account.
2. Go to **Domains** and add `hlpfl.org`.
3. Add the DNS records Resend provides (SPF, DKIM, DMARC) to your domain registrar.
4. Wait for domain verification (usually a few minutes with Cloudflare).

### Get API key
1. Go to **API Keys** in Resend dashboard.
2. Create a new API key with **Full access**.
3. Copy the `re_...` value.

### Environment variables to add
```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=stays@hlpfl.org
```

> **Note:** The from email must match a verified domain. If your domain isn't verified yet, use `onboarding@resend.dev` for testing (Resend provides this as a default sender).

---

## 4. App Configuration

```
NEXT_PUBLIC_SITE_URL=https://hlpfl.org
```

For local development, set this to `http://localhost:3000`. This controls where Stripe redirects users after payment.

---

## 5. Local Development

```bash
# Copy the example env file
cp .env.local.example .env.local

# Fill in your values, then:
npm run dev
```

Visit:
- `http://localhost:3000/stays/` — property listing
- `http://localhost:3000/stays/villa-caribe-azul/` — property detail (placeholder data if no Supabase)
- `http://localhost:3000/admin/` — admin dashboard

---

## 6. Adding Property Photos

Photos are stored as URLs in the `photos` JSONB column. For now, place images in `public/stays/`:

```
public/
  stays/
    villa-caribe-azul/
      photo-1.jpg
      photo-2.jpg
      ...
```

Then update the property's `photos` field in Supabase:
```json
[
  {"url": "/stays/villa-caribe-azul/photo-1.jpg", "alt": "Oceanfront view"},
  {"url": "/stays/villa-caribe-azul/photo-2.jpg", "alt": "Living room"}
]
```

For production, consider uploading to Supabase Storage or Cloudflare Images.

---

## 7. Checklist Before First Booking

- [ ] Supabase project created and migration SQL executed
- [ ] Admin user created in Supabase Authentication
- [ ] Stripe account verified (may need business info for live mode)
- [ ] Stripe webhook endpoint configured with correct URL and `checkout.session.completed` event
- [ ] Resend domain verified for your from address
- [ ] All environment variables set in production (Vercel/Cloudflare env settings)
- [ ] `NEXT_PUBLIC_SITE_URL` set to production URL
- [ ] Property photos uploaded and URLs updated in Supabase
- [ ] Test end-to-end with Stripe test card before switching to live keys

---

## 8. Costa Rica Compliance Notes

The `/stays/terms/` page includes the required disclaimer, but you should also:

- **ICT Registration:** If renting for more than 30 nights/year, register with [ICT](https://www.ict.go.cr/).
- **Hacienda e-invoicing:** Rental income requires comprobantes electrónicos via the [ATV portal](https://www.hacienda.go.cr/). Contact a local contador for setup.
- **Municipal tax:** Some cantons (including Limón) have specific tourism taxes. Verify with a local attorney.
- **Seller of Travel:** If you plan to sell travel packages to California, Florida, Hawaii, Washington, or Iowa residents, you may need to register in those states. Consult with a travel law attorney.

---

## 9. Environment Variables — Full List

| Variable | Where to find it | Required |
|----------|-----------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | ✅ |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → signing secret | ✅ |
| `RESEND_API_KEY` | Resend → API Keys | ✅ |
| `RESEND_FROM_EMAIL` | Your verified domain email | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Your production domain | ✅ |

---

## 10. Deployment — Cloudflare Workers

This app deploys to **Cloudflare Workers** via `@opennextjs/cloudflare`. No R2 bucket is needed — ISR pages use per-worker in-memory caching, which is sufficient for this site's traffic level.

### Prerequisites

```bash
npm install -g wrangler
wrangler login          # Opens browser to authenticate with your Cloudflare account
```

### First-time setup

1. Make sure your Worker is created in Cloudflare (it's created automatically on first deploy).
2. Set all **server-side secrets** via Wrangler (these are encrypted and never visible in your code):

```bash
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY
```

3. Set **public build-time variables** in your local `.env.local` before deploying. These are baked into the client JS bundle at build time, so they must be present when you run `npm run deploy`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://hlpfl.org
RESEND_FROM_EMAIL=stays@hlpfl.org
```

### Deploy commands

```bash
# Build and deploy to production
npm run deploy

# Build and preview locally with Wrangler (uses your .env.local)
npm run preview

# Build only (no deploy)
npm run build
```

### CI/CD via GitHub Actions

A deploy workflow is already set up at `.github/workflows/deploy.yml`. It builds on every PR and deploys to production on every push to `main`.

#### Step 1 — Disconnect Cloudflare Pages GitHub integration (important)

The Cloudflare Pages GitHub App auto-builds on every push, but this project is a **Workers** app, not a Pages app. The Pages builds will always fail. Remove it:

1. Go to **Cloudflare Dashboard → Workers & Pages → hlpfl-inc → Settings → Git Integration**.
2. Click **Disconnect** (or delete the Pages project if it was only ever a CI preview).

#### Step 2 — Add GitHub repository secrets

Go to **GitHub → HLPFLCG/HLPFL_INC → Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret name | Where to find it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare Dashboard → My Profile → API Tokens → Create Token → use the **Edit Cloudflare Workers** template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard → Workers & Pages → right side of the overview page |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → `anon` key |

> **Note:** Server-side secrets (`SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`) are stored as **Wrangler secrets** (run `wrangler secret put <NAME>` once after first deploy). They are NOT needed as GitHub secrets because they are not used at build time.

---
