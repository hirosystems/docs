import { Code } from "@/components/docskit/code";
import { loadRecipes } from "@/utils/loader";
import { ArrowUpRight, Play, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverProvider } from "@/context/hover";
import { HoverLink } from "@/components/docskit/annotations/hover";
import Link from "next/link";
import { Terminal } from "@/components/docskit/terminal";
import { InlineCode } from "@/components/docskit/inline-code";
import { Github } from "@/components/ui/icon";
import { WithNotes } from "@/components/docskit/notes";
import { SnippetResult } from "../components/snippet-result";

interface Param {
  id: string;
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Param;
}): Promise<JSX.Element> {
  const { id } = params;
  const recipes = await loadRecipes();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  // Dynamically import MDX content based on recipe id
  const Content = await import(`@/content/_recipes/${id}.mdx`).catch(() => {
    console.error(`Failed to load MDX content for recipe: ${id}`);
    return { default: () => <div>Content not found</div> };
  });

  return (
    <HoverProvider>
      <div className="min-h-screen">
        <div className="px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="hidden lg:block lg:col-span-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag.toUpperCase()}
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
                      WithNotes,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sticky sidebar */}
            <div className="col-span-full lg:col-span-6">
              <div className="lg:sticky lg:top-20 space-y-4">
                <div className="recipe group relative w-full overflow-hidden">
                  <Code
                    codeblocks={[
                      {
                        lang: recipe.files[0].type,
                        value: recipe.files[0].content,
                        meta: `${recipe.files[0].name} -cn`, // filename + flags
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
    </HoverProvider>
  );
}
