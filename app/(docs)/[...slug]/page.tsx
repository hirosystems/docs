import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "@/components/callout";
import { Cards, Card, SecondaryCard } from "@/components/card";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { docskit } from "@/components/docskit/components";
import { CustomTable as Table, TableProps } from "@/components/table";
import { OrderedList, UnorderedList } from "@/components/lists";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const customComponents = {
    ...defaultMdxComponents,
    // APIPage: openapi.APIPage, // TODO: add openapi support in v5
    Accordion,
    Accordions,
    blockquote: (props: React.PropsWithChildren) => (
      <Callout>{props.children}</Callout>
    ),
    Callout,
    Cards,
    Card,
    SecondaryCard,
    code: (props: React.PropsWithChildren) => (
      <code
        {...props}
        className={`border border-border p-1 bg-code text-sm text-muted-foreground [h1_&]:text-xl`}
      />
    ),
    hr: (props: React.PropsWithChildren) => (
      <hr {...props} className="border-t border-border/50 mt-0 mb-6" />
    ),
    Tab,
    Tabs: (props: React.PropsWithChildren) => (
      <Tabs {...props} className="border-none" />
    ),
    table: (props: TableProps) => <Table {...props} />,
    TypeTable,
    ol: OrderedList,
    ul: UnorderedList,
    ...docskit,
  };

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
        single: false,
      }}
      footer={{
        enabled: false,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...customComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
