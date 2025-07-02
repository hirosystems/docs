import fs from "fs/promises";
import matter from "gray-matter";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import type { HeadingProps } from "@/types";
import { getMDXComponents } from "@/components/mdx";
import { API } from "@/components/reference/api-page";
import { APIPage } from "@/components/openapi/api-page";
import { Badge } from "@/components/ui/badge";
import {
  DocsPage,
  DocsPageLayout,
  DocsPageHeader,
  DocsPageContent,
  DocsPageContentWrapper,
  DocsPageBreadcrumb,
  DocsPageTitle,
  DocsPageDescription,
  DocsPageProse,
} from "@/components/layouts/page";
import {
  InteractiveHeader,
  InteractiveLayout,
} from "@/components/layouts/interactive";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { LLMShare } from "@/components/llm-share";
import { CheckIcon } from "lucide-react";
import { TagFilterSystem } from "@/components/ui/tag-filter-system";
import { getAllFilterablePages } from "@/lib/source";
import { Mermaid } from "@/components/mdx/mermaid";
import { Callout } from "@/components/callout";
import * as customIcons from "@/components/ui/icon";
import * as lucideIcons from "lucide-react";

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

  if (!MDX) {
    console.error("MDX component is undefined for page:", page.url);
    notFound();
  }

  // Get all filterable pages for tag filtering
  const allFilterablePages = getAllFilterablePages();

  // Extract section from current page URL for scoped filtering
  const currentSection = page.url.split("/").filter(Boolean)[1] || "general";

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    const iconProps = { className: "w-3 h-3 shrink-0" };

    // Check custom icons first
    const CustomIcon = (customIcons as any)[iconName];
    if (CustomIcon && typeof CustomIcon === "function") {
      return <CustomIcon {...iconProps} />;
    }

    // Try with "Icon" suffix for custom icons
    const CustomIconWithSuffix = (customIcons as any)[`${iconName}Icon`];
    if (CustomIconWithSuffix && typeof CustomIconWithSuffix === "function") {
      return <CustomIconWithSuffix {...iconProps} />;
    }

    // Check lucide icons - try multiple naming patterns
    const lucidePatterns = [
      iconName, // exact name
      `${iconName}Icon`, // with Icon suffix
      iconName.charAt(0).toUpperCase() + iconName.slice(1), // capitalize first letter
      `${iconName.charAt(0).toUpperCase() + iconName.slice(1)}Icon`, // capitalize + Icon
    ];

    for (const pattern of lucidePatterns) {
      const LucideIcon = (lucideIcons as any)[pattern];
      if (LucideIcon && typeof LucideIcon === "function") {
        return <LucideIcon {...iconProps} />;
      }
    }

    return null;
  };

  // Convert icon names to React components
  const interactiveLinks = page.data.interactiveLinks?.map((link) => ({
    ...link,
    icon: link.icon ? getIconComponent(link.icon) : undefined,
  }));

  // Prepare page data for context - only include serializable data
  const pageData = {
    toc: page.data.toc,
    full: page.data.full,
    interactive: page.data.interactive,
    title: page.data.title,
    description: page.data.description,
    interactiveFeatures: page.data.interactiveFeatures,
    interactiveLinks, // Use the processed links with React components
  };

  return (
    <DocsPage data={pageData}>
      {page.data.interactive ? (
        <DocsPageLayout variant="interactive">
          <DocsPageHeader>
            <DocsPageBreadcrumb />
            <InteractiveHeader>
              <InteractiveLayout />
            </InteractiveHeader>
          </DocsPageHeader>
          <DocsPageContentWrapper>
            <DocsPageContent>
              <DocsPageProse>
                <MDX
                  components={getMDXComponents({
                    // Custom overrides that need special handling
                    API: (props) => <API {...props} />,
                    APIPage: (props) => (
                      <APIPage
                        baseUrl="https://api.hiro.so"
                        enablePlayground={true}
                        clarityConversion={true}
                        {...props}
                      />
                    ),
                    h1: ({ children, ...props }: HeadingProps) => {
                      const H1 =
                        defaultMdxComponents.h1 as React.ComponentType<HeadingProps>;
                      const id =
                        typeof children === "string" ? children : undefined;
                      return (
                        <H1 id={id} {...props}>
                          {children}
                        </H1>
                      );
                    },
                    blockquote: (props) => <Callout>{props.children}</Callout>,
                    code: (props: React.PropsWithChildren) => (
                      <code
                        {...props}
                        className="border border-border rounded-md p-1 bg-code text-sm text-muted-foreground [h1_&]:text-xl [&_code]:text-sm"
                      />
                    ),
                    hr: (props: React.PropsWithChildren) => (
                      <hr
                        {...props}
                        className="border-t border-border/50 mt-0"
                      />
                    ),
                    input: (
                      props: React.InputHTMLAttributes<HTMLInputElement>
                    ) => {
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
                              {props.checked && (
                                <CheckIcon className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                        );
                      }
                      return <input {...props} />;
                    },
                    Mermaid,
                  })}
                />
              </DocsPageProse>
            </DocsPageContent>
          </DocsPageContentWrapper>
        </DocsPageLayout>
      ) : (
        <DocsPageLayout>
          <DocsPageContentWrapper>
            <DocsPageContent>
              <DocsPageBreadcrumb />
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <DocsPageTitle className="mt-0" />
                  {page.data.isRpc && (
                    <Badge
                      variant="outline"
                      className="cursor-pointer font-normal text-[10px] px-1 py-0.5 uppercase bg-orange-500 text-neutral-950 dark:bg-brand-orange border-none"
                    >
                      RPC node
                    </Badge>
                  )}
                </div>
                {page.data.llm !== false && <LLMShare content={LLMContent} />}
              </div>
              <DocsPageDescription />

              {/* Render TagFilterSystem if tags are present in frontmatter */}
              {page.data.tags && page.data.tags.length > 0 && (
                <TagFilterSystem
                  tags={page.data.tags}
                  pages={allFilterablePages}
                  section={currentSection}
                />
              )}

              <hr className="border-t border-border/50" />
              <DocsPageProse>
                <MDX
                  components={getMDXComponents({
                    // Custom overrides that need special handling
                    API: (props) => <API {...props} />,
                    APIPage: (props) => (
                      <APIPage
                        baseUrl="https://api.hiro.so"
                        enablePlayground={true}
                        clarityConversion={true}
                        {...props}
                      />
                    ),
                    h1: ({ children, ...props }: HeadingProps) => {
                      const H1 =
                        defaultMdxComponents.h1 as React.ComponentType<HeadingProps>;
                      const id =
                        typeof children === "string" ? children : undefined;
                      return (
                        <H1 id={id} {...props}>
                          {children}
                        </H1>
                      );
                    },
                    blockquote: (props) => <Callout>{props.children}</Callout>,
                    code: (props: React.PropsWithChildren) => (
                      <code
                        {...props}
                        className="border border-border rounded-md p-1 bg-code text-sm text-muted-foreground [h1_&]:text-xl [&_code]:text-sm"
                      />
                    ),
                    hr: (props: React.PropsWithChildren) => (
                      <hr
                        {...props}
                        className="border-t border-border/50 mt-0"
                      />
                    ),
                    input: (
                      props: React.InputHTMLAttributes<HTMLInputElement>
                    ) => {
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
                              {props.checked && (
                                <CheckIcon className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                        );
                      }
                      return <input {...props} />;
                    },
                    Mermaid,
                  })}
                />
              </DocsPageProse>
            </DocsPageContent>
          </DocsPageContentWrapper>
        </DocsPageLayout>
      )}
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
