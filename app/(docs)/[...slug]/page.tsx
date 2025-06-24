import fs from "fs/promises";
import matter from "gray-matter";
import { source } from "@/lib/source";
import { openapi } from "@/lib/source";
import { notFound } from "next/navigation";
import type { HeadingProps } from "@/types";
import { API } from "@/components/reference/api-page";
import { APIPage } from "fumadocs-openapi/ui";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "@/components/layouts/page";
import { CustomTable as Table, type TableProps } from "@/components/table";
import { OrderedList, UnorderedList } from "@/components/lists";
import { Callout } from "@/components/callout";
import { Cards, Card, SecondaryCard } from "@/components/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { docskit } from "@/components/docskit/components";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { LLMShare } from "@/components/llm-share";
import { CheckIcon } from "lucide-react";
import { TagFilterSystem } from "@/components/ui/tag-filter-system";
import { getAllFilterablePages } from "@/lib/source";
import { Mermaid } from "@/components/mdx/mermaid";

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
    .join("\n")
    .trim();

  const MDX = page.data.body;

  // Get all filterable pages for tag filtering
  const allFilterablePages = getAllFilterablePages();

  // Extract section from current page URL for scoped filtering
  const currentSection = page.url.split("/").filter(Boolean)[1] || "general";

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <DocsTitle className="mt-0">{page.data.title}</DocsTitle>
          {page.data.isRpc && (
            <Badge
              variant="outline"
              className="cursor-pointer font-normal text-xs uppercase bg-orange-500 text-neutral-950 dark:bg-brand-orange border-none"
            >
              RPC node
            </Badge>
          )}
        </div>
        {page.data.llm !== false && <LLMShare content={LLMContent} />}
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>

      {/* Render TagFilterSystem if tags are present in frontmatter */}
      {page.data.tags && page.data.tags.length > 0 && (
        <TagFilterSystem
          tags={page.data.tags}
          pages={allFilterablePages}
          section={currentSection}
        />
      )}

      <hr className="border-t border-border/50" />
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            Accordion,
            AccordionItem,
            AccordionTrigger,
            AccordionContent,
            API: (props) => <API {...props} />,
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
            Badge,
            blockquote: (props) => <Callout>{props.children}</Callout>,
            Callout,
            Cards,
            Card,
            SecondaryCard,
            code: (props: React.PropsWithChildren) => (
              <code
                {...props}
                className="border border-border rounded-md p-1 bg-code text-sm text-muted-foreground [h1_&]:text-xl [&_code]:text-sm"
              />
            ),
            hr: (props: React.PropsWithChildren) => (
              <hr {...props} className="border-t border-border/50 mt-0" />
            ),
            input: (props: React.InputHTMLAttributes<HTMLInputElement>) => {
              if (props.type === "checkbox") {
                return (
                  <div className="relative inline-flex items-center mr-2">
                    <input {...props} className="sr-only" />
                    <div
                      className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
                        props.checked
                          ? "bg-brand-orange border-brand-orange text-white"
                          : "border-border bg-background"
                      }`}
                    >
                      {props.checked && <CheckIcon className="w-3 h-3" />}
                    </div>
                  </div>
                );
              }
              return <input {...props} />;
            },
            Mermaid,
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
  return source.generateParams().filter(
    (params) =>
      // Filter out empty slug arrays (root path)
      params.slug && params.slug.length > 0
  );
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
