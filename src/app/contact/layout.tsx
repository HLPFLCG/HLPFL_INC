import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with HLPFL INC. Apply for creative entrepreneur support or ask questions.",
  openGraph: {
    title: "Contact | HLPFL INC",
    description: "Get in touch with HLPFL INC for creative entrepreneur support.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HLPFL INC" }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
