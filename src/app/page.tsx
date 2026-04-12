import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeatureCards from "@/components/sections/FeatureCards";
import RegionTeaser from "@/components/sections/RegionTeaser";
import FeaturedBusinesses from "@/components/sections/FeaturedBusinesses";
import MapEmbed from "@/components/sections/MapEmbed";

export const metadata: Metadata = {
  title: "Caribe Sur CR | Costa Rica Caribbean Coast Travel Guide",
  description:
    "Discover the wild southern Caribbean coast of Costa Rica — from Cahuita National Park to Manzanillo. Find hotels, tours, restaurants, and travel guides for Limón Province.",
  alternates: {
    canonical: "https://hlpfl.org",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <RegionTeaser />
      <FeaturedBusinesses />
      <MapEmbed />
    </>
  );
}
