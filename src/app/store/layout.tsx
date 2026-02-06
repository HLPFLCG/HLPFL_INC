import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Official HLPFL INC merchandise. 100% of profits support creative entrepreneurs.",
  openGraph: {
    title: "Store | HLPFL INC",
    description: "Official HLPFL INC merchandise. 100% of profits support creative entrepreneurs.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HLPFL INC" }],
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
