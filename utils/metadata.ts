import type { Metadata } from "next/types";

const defaultMetadata: Metadata = {
  title: "Hiro Docs",
  description:
    "All the developer docs, guides and resources you need to build on Bitcoin layers.",
  openGraph: {
    title: "Hiro Docs",
    description:
      "All the developer docs, guides and resources you need to build on Bitcoin layers.",
    url: "https://docs.hiro.so",
    siteName: "Hiro Docs",
    images: [
      {
        url: "/og.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiro Docs",
    description:
      "All the developer docs, guides and resources you need to build on Bitcoin layers.",
    creator: "@hirosystems",
    images: ["/og.jpg"],
  },
};

const hiroHacksMetadata: Partial<Metadata> = {
  title: "Hiro Hacks - Season 1",
  description:
    "Join Hiro Hacks Season 1 and build on Bitcoin layers with our monthly themed challenges.",
  openGraph: {
    title: "Hiro Hacks - Season 1",
    description:
      "Join Hiro Hacks Season 1 and build on Bitcoin layers with our monthly themed challenges.",
    images: [
      {
        url: "/images/hiro-hacks-season-one.png",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    title: "Hiro Hacks - Season 1",
    description:
      "Join Hiro Hacks Season 1 and build on Bitcoin layers with our monthly themed challenges.",
    images: ["/images/hiro-hacks-season-one.png"],
  },
};

export function createMetadata(override: Partial<Metadata>): Metadata {
  return {
    ...defaultMetadata,
    ...override,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...override.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`);

export function getRouteMetadata(path: string): Partial<Metadata> {
  if (path.startsWith("/stacks/hacks")) {
    return hiroHacksMetadata;
  }
  return {};
}
