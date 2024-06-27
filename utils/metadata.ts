import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: "https://docs.hiro.so",
      images: "/og.png",
      siteName: "Hiro Docs",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@hirosystems",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/og.png",
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.VERCEL_URL!}`);
