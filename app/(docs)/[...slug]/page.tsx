import fs from "fs/promises";
import matter from "gray-matter";
import { source } from "@/lib/source";
import { openapi } from "@/lib/source";
import { notFound } from "next/navigation";
import { HeadingProps } from "@/types";
import { APIPage } from "fumadocs-openapi/ui";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "@/components/page";
import { CustomTable as Table, TableProps } from "@/components/table";
import { OrderedList, UnorderedList } from "@/components/lists";
import { Callout } from "@/components/callout";
import { Cards, Card, SecondaryCard } from "@/components/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { docskit } from "@/components/docskit/components";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { LLMShare } from "@/components/llm-share";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const fileContent = await fs.readFile(page.data._file.absolutePath, "utf-8");
  const { content: rawMarkdownContent } = matter(fileContent);

  const LLMContent = rawMarkdownContent
    .split("\n")
    .filter((line) => !line.trim().startsWith("import"))
    .join("\n");

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
      }}
    >
      <div className="mb-4">
        <div className="flex justify-between items-start gap-4">
          {(!params.slug?.includes("stacks") || params.slug?.length > 1) &&
            (!params.slug?.includes("bitcoin") || params.slug?.length > 1) && (
              <DocsTitle className="mt-0">{page.data.title}</DocsTitle>
            )}
          {page.data.llm && <LLMShare content={LLMContent} />}
        </div>
        <DocsDescription>{page.data.description}</DocsDescription>
      </div>

      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            Accordion,
            AccordionItem,
            AccordionTrigger,
            AccordionContent,
            APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
            h1: ({ children, ...props }: HeadingProps) => {
              const H1 =
                defaultMdxComponents.h1 as React.ComponentType<HeadingProps>;
              const id = typeof children === "string" ? children : undefined;
              return (
                <H1 id={id} {...props}>
                  {children}
                </H1>
              );
            },
            blockquote: (props) => <Callout>{props.children}</Callout>,
            Callout,
            Cards,
            Card,
            SecondaryCard,
            code: (props: React.PropsWithChildren) => (
              <code
                {...props}
                className={`border border-border rounded-md p-1 bg-code text-sm text-muted-foreground [h1_&]:text-xl`}
              />
            ),
            hr: (props: React.PropsWithChildren) => (
              <hr {...props} className="border-t border-border/50 mt-0 mb-6" />
            ),
            table: (props: TableProps) => <Table {...props} />,
            ol: OrderedList,
            ul: UnorderedList,
            Tabs,
            TabsList,
            TabsTrigger,
            TabsContent,
            ...docskit,
          }}
        />
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
