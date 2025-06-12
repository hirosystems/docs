import React, { JSX } from "react";
import { Code } from "@/components/docskit/code";
import { loadRecipes } from "@/lib/loader";
import { Badge } from "@/components/ui/badge";
import { HoverProvider } from "@/context/hover";
import { docskit } from "@/components/docskit/components";
import { HoverLink } from "@/components/docskit/annotations/hover";
import { Terminal } from "@/components/docskit/terminal";
import { InlineCode } from "@/components/docskit/inline-code";
import { SnippetResult } from "../components/snippet-result";
import Link from "next/link";
import { RecipeCarousel } from "@/components/recipe-carousel";
import { MoveLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { getRouteMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export default async function Page(props: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  const { id } = await props.params;

  const recipes = await loadRecipes();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const Content = await import(`@/content/_recipes/${id}.mdx`).catch(() => {
    console.error(`Failed to load MDX content for recipe: ${id}`);
    return { default: () => <div>Content not found</div> };
  });

  return (
    <>
      <HoverProvider>
        <div className="min-h-screen flex flex-col">
          <div className="space-y-2 flex-grow">
            <div className="px-4">
              <Link
                href="/cookbook"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <MoveLeft size={32} />
              </Link>
            </div>
            <div className="px-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="col-span-full lg:col-span-6 lg:order-1">
                  <div className="block lg:hidden">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="content">
                        <AccordionTrigger className="text-xl font-semibold">
                          {recipe.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2 uppercase">
                              {recipe.categories.map((category) => (
                                <Badge key={category} variant="secondary">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                            <div className="prose max-w-none">
                              <Content.default
                                components={{
                                  HoverLink,
                                  Terminal,
                                  Code,
                                  InlineCode,
                                  ...docskit,
                                }}
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="hidden lg:block space-y-3">
                    <div className="flex flex-wrap gap-2 uppercase">
                      {recipe.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <div className="content prose max-w-none">
                      <Content.default
                        components={{
                          HoverLink,
                          Terminal,
                          Code,
                          InlineCode,
                          ...docskit,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full lg:col-span-6 lg:order-2">
                  <div className="lg:sticky lg:top-20 space-y-4">
                    <div className="recipe group relative w-full overflow-hidden">
                      <Code
                        codeblocks={[
                          {
                            lang: recipe.files[0].type,
                            value: recipe.files[0].content,
                            meta: `${recipe.files[0].name} -cn`,
                          },
                        ]}
                      />
                    </div>
                    <SnippetResult
                      recipe={recipe}
                      code={recipe.files[0].content as string}
                      type={recipe.files[0].type}
                      dependencies={{}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <RecipeCarousel currentRecipeId={id} data={recipes.slice(0, 6)} />
          </div>
        </div>
      </HoverProvider>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const routeMetadata = getRouteMetadata(`/cookbook/${id}`);
  return createMetadata(routeMetadata);
}
