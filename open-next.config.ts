import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No R2 bucket required. ISR pages use per-worker in-memory caching,
// which is sufficient for this low-traffic site.
export default defineCloudflareConfig({});
