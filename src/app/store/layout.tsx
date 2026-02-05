import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Official HLPFL INC merchandise. 100% of profits support creative entrepreneurs.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
