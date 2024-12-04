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

  return (
    <DocsPage
      toc={page.data.exports.toc}
      tableOfContent={{
        enabled: page.data.toc,
      }}
    >
      <RollButton />
      {page.data.title !== "Home" && (
        <h1 className="text-2xl text-foreground sm:text-3xl">
          {page.data.title}
        </h1>
      )}
      {page.data.title !== "Home" && (
        <p className="mb-8 text-lg text-muted-foreground">
          {page.data.description}
        </p>
      )}
      {page.data.title !== "Home" && (
        <hr className="border-t border-border/50" />
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

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = utils.getPage(params.slug);
  if (!page) notFound();

  return metadata;
}
