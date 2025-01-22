import type { Metadata } from "next";
import { Card, Cards } from "fumadocs-ui/components/card";
import { RollButton } from "fumadocs-ui/components/roll-button";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { utils, type Page } from "@/utils/source";
import { createMetadata, getRouteMetadata } from "@/utils/metadata";

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

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = utils.getPage(params.slug);
  if (!page) notFound();

  const path = `/${params.slug?.join("/") || ""}`;
  const routeMetadata = getRouteMetadata(path);

  return createMetadata(routeMetadata);
}
