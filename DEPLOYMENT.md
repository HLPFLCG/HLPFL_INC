# HLPFL INC - Cloudflare Pages Deployment Guide

This guide covers deploying the HLPFL INC website to Cloudflare Pages.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Configuration](#project-configuration)
3. [Deploy via Cloudflare Dashboard](#deploy-via-cloudflare-dashboard)
4. [Deploy via Wrangler CLI](#deploy-via-wrangler-cli)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Environment Variables](#environment-variables)
7. [Continuous Deployment](#continuous-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 18+ installed locally

---

## Project Configuration

This project is already configured for Cloudflare Pages static export. Key settings in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: "export",        // Static HTML export
  images: {
    unoptimized: true,     // Required for static export
  },
  trailingSlash: true,     // Better compatibility with Pages
};
```

Build output will be in the `out/` folder.

---

## Deploy via Cloudflare Dashboard

### Step 1: Connect Your Repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** in the sidebar
3. Click **Create application**
4. Select **Pages** tab
5. Click **Connect to Git**
6. Authorize Cloudflare to access your repository
7. Select your repository (e.g., `HLPFLCG/HLPFL_INC`)

### Step 2: Configure Build Settings

Set the following build configuration:

| Setting | Value |
|---------|-------|
| **Production branch** | `main` (or your default branch) |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | `/` (leave empty) |
| **Node.js version** | `18` |

### Step 3: Deploy

1. Click **Save and Deploy**
2. Wait for the build to complete (usually 1-3 minutes)
3. Your site will be live at `your-project.pages.dev`

---

## Deploy via Wrangler CLI

For command-line deployments:

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

### Step 2: Authenticate

```bash
wrangler login
```

This opens a browser window for authentication.

### Step 3: Build the Project

```bash
npm install
npm run build
```

### Step 4: Deploy

```bash
# First deployment (creates the project)
wrangler pages deploy out --project-name hlpfl-inc

# Subsequent deployments
wrangler pages deploy out --project-name hlpfl-inc
```

### Optional: Add to package.json

```json
{
  "scripts": {
    "deploy": "npm run build && wrangler pages deploy out --project-name hlpfl-inc"
  }
}
```

Then deploy with:
```bash
npm run deploy
```

---

## Custom Domain Setup

### Step 1: Add Custom Domain in Cloudflare

1. Go to your Pages project in Cloudflare Dashboard
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `hlpfl.com` or `www.hlpfl.com`)
5. Click **Continue**

### Step 2: Configure DNS

**If domain is already on Cloudflare:**
- Cloudflare automatically adds the required CNAME record
- Wait for SSL certificate provisioning (usually instant)

**If domain is external:**
Add a CNAME record at your DNS provider:

| Type | Name | Target |
|------|------|--------|
| CNAME | `@` or `www` | `your-project.pages.dev` |

### Step 3: Verify

After DNS propagation (can take up to 24 hours, usually faster):
- Visit your custom domain
- Verify SSL certificate is active (https://)

### Recommended: Setup Both Root and WWW

1. Add both `hlpfl.com` and `www.hlpfl.com` as custom domains
2. Configure redirect rules if you prefer one over the other:

```
# In Cloudflare Dashboard > Rules > Redirect Rules
# Redirect www to non-www (or vice versa)
```

---

## Environment Variables

If you need environment variables:

### In Cloudflare Dashboard

1. Go to your Pages project
2. Click **Settings** > **Environment variables**
3. Add variables for Production and/or Preview environments

### Common Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Your production URL | `https://hlpfl.com` |
| `NEXT_PUBLIC_API_URL` | API endpoint (if any) | `https://api.hlpfl.com` |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Continuous Deployment

Once connected via the Cloudflare Dashboard:

### Automatic Deployments

- **Production:** Every push to `main` triggers a production deployment
- **Preview:** Every push to other branches creates a preview deployment

Preview URLs follow the pattern: `<branch-name>.<project>.pages.dev`

### Branch Deploy Controls

Configure which branches trigger deployments:

1. Go to **Settings** > **Builds & deployments**
2. Under **Branch deployments**, configure:
   - Production branch
   - Preview branches (all or specific patterns)

### Build Caching

Cloudflare Pages caches `node_modules` between builds automatically.

---

## Troubleshooting

### Build Fails: "Cannot find module"

**Solution:** Ensure all dependencies are in `package.json`:
```bash
npm install
```

### Build Fails: Node Version Error

**Solution:** Specify Node version in Cloudflare Dashboard:
- Go to Settings > Environment variables
- Add `NODE_VERSION` = `18`

### Pages Not Updating

**Check:**
1. Build completed successfully in dashboard
2. Cache cleared (hard refresh: Ctrl+Shift+R)
3. Wait for edge propagation (1-2 minutes)

### 404 on Page Refresh

This project uses static export with `trailingSlash: true`, which should prevent this. If issues persist:

1. Verify `trailingSlash: true` in `next.config.ts`
2. Check that `output: "export"` is set

### Images Not Loading

Ensure `images.unoptimized: true` is set in `next.config.ts` (already configured).

### Custom Domain SSL Issues

1. Wait up to 24 hours for certificate provisioning
2. Ensure DNS is correctly pointed to Pages
3. Check domain isn't using another Cloudflare proxy

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Local development
npm run dev

# Build for production
npm run build

# Preview production build locally
npx serve out

# Deploy with Wrangler
wrangler pages deploy out --project-name hlpfl-inc

# Check deployment status
wrangler pages deployment list --project-name hlpfl-inc
```

---

## Deployment Checklist

Before deploying to production:

- [ ] Test locally with `npm run build && npx serve out`
- [ ] Check all links work correctly
- [ ] Verify meta tags and SEO
- [ ] Test on mobile devices
- [ ] Review environment variables
- [ ] Check custom domain DNS settings

---

## Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Pages Git Integration](https://developers.cloudflare.com/pages/get-started/git-integration/)

---

## Support

- **Cloudflare Community:** https://community.cloudflare.com/
- **Cloudflare Discord:** https://discord.gg/cloudflaredev
- **Status Page:** https://www.cloudflarestatus.com/
