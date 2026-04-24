import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "output: export" removed — booking platform requires API routes and SSR.
  // Deploy to Vercel, or use @cloudflare/next-on-pages for Cloudflare Workers.
  // See SETUP.md → Deployment section.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
