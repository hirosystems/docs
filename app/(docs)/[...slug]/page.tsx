import { ExternalLinkIcon } from "lucide-react";
import type { Metadata } from "next";
import { Card, Cards } from "fumadocs-ui/components/card";
import { RollButton } from "fumadocs-ui/components/roll-button";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { utils, type Page } from "@/utils/source";
import { createMetadata } from "@/utils/metadata";

interface Param {
  slug: string[];
}

export const dynamicParams = false;

export default function Page({ params }: { params: Param }): JSX.Element {
  const page = utils.getPage(params.slug);

  if (!page) notFound();

  // TODO: this is a less than ideal solution for creating different titles between sidebar and page
  const generatePrefix = (page: any) => {
    // Mapping of words to their desired capitalization forms
    const specialCases = {
      api: "API",
      sdk: "SDK",
      connect: "Stacks Connect",
      platform: "Hiro Platform",
      hacks: "Hiro Hacks",
      "clarinet-js-sdk": "Clarinet JS SDK",
      "platform-api": "Platform API",
      "rpc-api": "Stacks Node RPC",
    };

    if (page.file?.name === "index" && page.slugs[1]) {
      const segment = page.slugs[1];
      let prefix =
        specialCases[segment.toLowerCase() as keyof typeof specialCases] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);

      // Check if there is a second segment and append it
      if (page.slugs[2] && page.slugs[1].toLowerCase() !== "api") {
        const secondSegment = page.slugs[2];
        prefix +=
          " " +
          (specialCases[
            secondSegment.toLowerCase() as keyof typeof specialCases
          ] || secondSegment.charAt(0).toUpperCase() + secondSegment.slice(1));
      }

      if (page.slugs[1].toLowerCase() === "platform-api") {
        prefix = "Platform API";
      }

      if (page.slugs[1].toLowerCase() === "token-metadata-api") {
        prefix = "Token Metadata API";
      }

      if (page.slugs[1].toLowerCase() === "rpc-api") {
        prefix = "Stacks Node RPC API";
      }

      return prefix;
    } else if (["overview", "index"].includes(page.file?.name)) {
      const pathSegments = page.file.dirname.split("/");
      if (pathSegments.length >= 2) {
        const relevantSegments = pathSegments.slice(-2); // Get the last two segments

        return relevantSegments
          .map(
            (segment: string) =>
              specialCases[
                segment.toLowerCase() as keyof typeof specialCases
              ] || segment.charAt(0).toUpperCase() + segment.slice(1) // Capitalize the first letter
          )
          .join(" "); // Join them with a space
      }
    }
    return "";
  };

  const prefix = generatePrefix(page);

  return (
    <DocsPage
      toc={page.data.exports.toc}
      tableOfContent={{
        enabled: page.data.toc,
      }}
    >
      <RollButton />
      {page.data.title !== "Home" && (
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          {prefix} {page.data.title}
        </h1>
      )}
      {page.data.title !== "Home" && (
        <p className="mb-8 text-lg text-muted-foreground">
          {page.data.description}
        </p>
      )}
      <DocsBody>
        {page.data.index ? (
          <Category page={page} />
        ) : (
          <page.data.exports.default />
        )}
      </DocsBody>
    </DocsPage>
  );
}

function Category({ page }: { page: Page }): JSX.Element {
  const filtered = utils.files.filter(
    (docs) =>
      docs.type === "page" &&
      docs.file.dirname === page.file.dirname &&
      docs.file.name !== "index"
  ) as Page[];

  return (
    <Cards>
      {filtered.map((item) => (
        <Card
          key={item.url}
          title={item.data.title}
          description={item.data.description ?? "No Description"}
          href={item.url}
        />
      ))}
    </Cards>
  );
}

const metadata: Metadata = {
  metadataBase: new URL(
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || "https://docs.hiro.so"
  ),
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
    images: ["/og.jpg"], // Must be an absolute URL
  },
};

function generateCustomTitle(file: {
  flattenedPath: string;
  name: string;
}): string {
  const segments = file.flattenedPath.split("/");
  const isRootLevelSegment = segments.length === 3;
  let relevantSegments: string[] = [];

  if (isRootLevelSegment) {
    relevantSegments = [segments[1]];
  }

  return (
    relevantSegments[0]?.charAt(0)?.toUpperCase() +
    relevantSegments[0]?.slice(1)
  );
}

export function generateMetadata({ params }: { params: Param }): Metadata {
  const page = utils.getPage(params.slug);

  if (!page) notFound();

  const description =
    page.data.description ??
    "All the developer docs, guides and resources you need to build on Bitcoin layers.";

  const imageParams = new URLSearchParams();
  imageParams.set("title", page.data.title);
  imageParams.set("description", description);

  const customTitle = generateCustomTitle(page.file);

  return createMetadata({
    ...metadata,
    title: customTitle.length
      ? `${customTitle} ${page.data.title}`
      : page.data.title,
    description,
  });
}

export function generateStaticParams(): Param[] {
  return utils.getPages().map<Param>((page) => ({
    slug: page.slugs,
  }));
}
