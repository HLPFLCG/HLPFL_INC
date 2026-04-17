#!/usr/bin/env bash
# copy-to-new-repo.sh
#
# Copies all essential HLPFL site files to a new repository.
# This preserves the exact folder structure needed to build and deploy.
#
# Usage:
#   ./scripts/copy-to-new-repo.sh /path/to/hlpfl1
#
# Example:
#   git clone https://github.com/HLPFLCG/hlpfl1.git ../hlpfl1
#   ./scripts/copy-to-new-repo.sh ../hlpfl1
#   cd ../hlpfl1 && npm install && npx next build

set -euo pipefail

TARGET="${1:?Usage: $0 /path/to/target-repo}"

if [ ! -d "$TARGET" ]; then
  echo "Error: Target directory '$TARGET' does not exist."
  echo "Clone the target repo first: git clone https://github.com/HLPFLCG/hlpfl1.git $TARGET"
  exit 1
fi

# Get this script's directory to find the source repo root
SOURCE="$(cd "$(dirname "$0")/.." && pwd)"

echo "Source: $SOURCE"
echo "Target: $TARGET"
echo ""

# ── Root config files ──────────────────────────────────────────────────
echo "Copying root config files..."
for f in \
  package.json \
  package-lock.json \
  next.config.ts \
  tailwind.config.ts \
  tsconfig.json \
  postcss.config.mjs \
  .eslintrc.json \
  wrangler.toml \
  .gitignore \
  README.md \
  FILE_MANIFEST.md; do
  cp "$SOURCE/$f" "$TARGET/$f"
done

# ── Public assets ──────────────────────────────────────────────────────
echo "Copying public/ assets..."
mkdir -p "$TARGET/public"
cp "$SOURCE/public/logo.svg" "$TARGET/public/"
cp "$SOURCE/public/og-image.png" "$TARGET/public/"
cp "$SOURCE/public/robots.txt" "$TARGET/public/"
cp "$SOURCE/public/sitemap.xml" "$TARGET/public/"
cp "$SOURCE/public/sw.js" "$TARGET/public/"

# ── Source code ────────────────────────────────────────────────────────
echo "Copying src/ directory..."

# App pages
mkdir -p "$TARGET/src/app/about"
mkdir -p "$TARGET/src/app/blog/how-to-get-direct-bookings-puerto-viejo"
mkdir -p "$TARGET/src/app/blog/ict-registration-guide-tour-operators-costa-rica"
mkdir -p "$TARGET/src/app/blog/low-season-marketing-cahuita-hotels"
mkdir -p "$TARGET/src/app/blog/sinpe-movil-setup-vacation-rentals"
mkdir -p "$TARGET/src/app/blog/whatsapp-booking-automation-caribbean-coast"
mkdir -p "$TARGET/src/app/contact"
mkdir -p "$TARGET/src/app/faq"
mkdir -p "$TARGET/src/app/services"
mkdir -p "$TARGET/src/app/privacy"
mkdir -p "$TARGET/src/app/terms"

cp "$SOURCE/src/app/layout.tsx" "$TARGET/src/app/"
cp "$SOURCE/src/app/globals.css" "$TARGET/src/app/"
cp "$SOURCE/src/app/page.tsx" "$TARGET/src/app/"
cp "$SOURCE/src/app/not-found.tsx" "$TARGET/src/app/"

cp "$SOURCE/src/app/about/page.tsx" "$TARGET/src/app/about/"
cp "$SOURCE/src/app/about/AboutPageClient.tsx" "$TARGET/src/app/about/"

cp "$SOURCE/src/app/services/page.tsx" "$TARGET/src/app/services/"
cp "$SOURCE/src/app/services/ServicesPageClient.tsx" "$TARGET/src/app/services/"

cp "$SOURCE/src/app/contact/page.tsx" "$TARGET/src/app/contact/"
cp "$SOURCE/src/app/contact/ContactPageClient.tsx" "$TARGET/src/app/contact/"

cp "$SOURCE/src/app/faq/page.tsx" "$TARGET/src/app/faq/"
cp "$SOURCE/src/app/faq/FAQPageClient.tsx" "$TARGET/src/app/faq/"

cp "$SOURCE/src/app/blog/page.tsx" "$TARGET/src/app/blog/"
cp "$SOURCE/src/app/blog/how-to-get-direct-bookings-puerto-viejo/page.tsx" "$TARGET/src/app/blog/how-to-get-direct-bookings-puerto-viejo/"
cp "$SOURCE/src/app/blog/ict-registration-guide-tour-operators-costa-rica/page.tsx" "$TARGET/src/app/blog/ict-registration-guide-tour-operators-costa-rica/"
cp "$SOURCE/src/app/blog/low-season-marketing-cahuita-hotels/page.tsx" "$TARGET/src/app/blog/low-season-marketing-cahuita-hotels/"
cp "$SOURCE/src/app/blog/sinpe-movil-setup-vacation-rentals/page.tsx" "$TARGET/src/app/blog/sinpe-movil-setup-vacation-rentals/"
cp "$SOURCE/src/app/blog/whatsapp-booking-automation-caribbean-coast/page.tsx" "$TARGET/src/app/blog/whatsapp-booking-automation-caribbean-coast/"

cp "$SOURCE/src/app/privacy/page.tsx" "$TARGET/src/app/privacy/"
cp "$SOURCE/src/app/terms/page.tsx" "$TARGET/src/app/terms/"

# Components
mkdir -p "$TARGET/src/components/common"
mkdir -p "$TARGET/src/components/layout"
mkdir -p "$TARGET/src/components/sections"
mkdir -p "$TARGET/src/components/ui"

for f in index.ts Logo.tsx LoadingScreen.tsx WhatsAppSticky.tsx CookieBanner.tsx LanguageToggle.tsx ClientEffects.tsx; do
  cp "$SOURCE/src/components/common/$f" "$TARGET/src/components/common/"
done

for f in Header.tsx Footer.tsx MobileBottomNav.tsx SocialLinks.tsx; do
  cp "$SOURCE/src/components/layout/$f" "$TARGET/src/components/layout/"
done

for f in index.ts HeroSection.tsx TrustBar.tsx PainSection.tsx HowItWorks.tsx ServicesSection.tsx CompetitorSection.tsx ResultsSection.tsx TestimonialsSection.tsx ValueStack.tsx AboutSection.tsx CTASection.tsx; do
  cp "$SOURCE/src/components/sections/$f" "$TARGET/src/components/sections/"
done

for f in index.ts Button.tsx Card.tsx ScrollReveal.tsx; do
  cp "$SOURCE/src/components/ui/$f" "$TARGET/src/components/ui/"
done

# Contexts
mkdir -p "$TARGET/src/contexts"
cp "$SOURCE/src/contexts/LanguageContext.tsx" "$TARGET/src/contexts/"

# Lib
mkdir -p "$TARGET/src/lib"
cp "$SOURCE/src/lib/translations.ts" "$TARGET/src/lib/"
cp "$SOURCE/src/lib/data.ts" "$TARGET/src/lib/"
cp "$SOURCE/src/lib/whatsapp.ts" "$TARGET/src/lib/"
cp "$SOURCE/src/lib/web3forms.ts" "$TARGET/src/lib/"

# ── Documentation (optional) ──────────────────────────────────────────
echo "Copying docs/..."
mkdir -p "$TARGET/docs"
cp "$SOURCE/docs/EDITING_GUIDE.md" "$TARGET/docs/"
cp "$SOURCE/docs/API_INTEGRATION.md" "$TARGET/docs/"
cp "$SOURCE/docs/NEWSLETTER_BLOG.md" "$TARGET/docs/"
cp "$SOURCE/docs/SEO_GUIDE.md" "$TARGET/docs/"

# ── GitHub config (optional) ──────────────────────────────────────────
echo "Copying .github/..."
mkdir -p "$TARGET/.github"
cp "$SOURCE/.github/copilot-instructions.md" "$TARGET/.github/"

# ── Copy script itself ────────────────────────────────────────────────
mkdir -p "$TARGET/scripts"
cp "$SOURCE/scripts/copy-to-new-repo.sh" "$TARGET/scripts/"

# ── Done ───────────────────────────────────────────────────────────────
echo ""
echo "✅ All 66 files copied to $TARGET"
echo ""
echo "Next steps:"
echo "  cd $TARGET"
echo "  npm install"
echo "  npx next build     # Verify static export builds to out/"
echo "  git add -A"
echo "  git commit -m 'Initial site from HLPFL_INC'"
echo "  git push"
echo ""
echo "Then connect to Cloudflare Pages:"
echo "  Build command:    npm run build"
echo "  Output directory: out"
echo "  Node version:     18"
