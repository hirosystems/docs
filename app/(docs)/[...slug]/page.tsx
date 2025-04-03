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

  const pathParts = path.split("/").filter(Boolean);

  const genericTitles = [
    "Overview",
    "Installation",
    "Quickstart",
    "Concepts",
    "Getting Started",
  ];

  let title = page.data.title;

  if (page.file.name === "index" || genericTitles.includes(title)) {
    let sectionName =
      page.file.name === "index"
        ? pathParts[pathParts.length - 1]
        : pathParts[pathParts.length - 2] || pathParts[pathParts.length - 1];

    if (sectionName === "api" && pathParts.length >= 2) {
      const parentSection = pathParts[pathParts.length - 2];
      if (parentSection === "runes" || parentSection === "ordinals") {
        const capitalizedParent =
          parentSection.charAt(0).toUpperCase() + parentSection.slice(1);
        sectionName = `${capitalizedParent} API`;
      }
    }

    const sectionTitle = sectionName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace("Api", "API")
      .replace("Js", "JS")
      .replace("Sdk", "SDK");

    if (page.file.name === "index") {
      title = `${sectionTitle} Overview`;
    } else {
      title = `${sectionTitle} ${title}`;
    }
  }

  const pageMetadata: Partial<Metadata> = {
    title,
    description: page.data.description,
  };

  return createMetadata({
    ...routeMetadata,
    ...pageMetadata,
  });
}
