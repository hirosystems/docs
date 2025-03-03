import { loadRecipes } from "@/utils/loader";
import { CookbookUI } from "./components/cookbook-ui";
import { Code } from "@/components/docskit/code";
import { Recipe } from "@/types/recipes";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/docskit/copy-button";
import { Metadata } from "next/types";
import { getRouteMetadata, createMetadata } from "@/utils/metadata";

function RecipeCard({
  recipe,
  codeElement,
}: {
  recipe: Recipe;
  codeElement: React.ReactNode;
}) {
  return (
    <div className="relative w-full max-h-[300px] rounded-lg border bg-[#EBE9E6] dark:bg-[#2a2726] overflow-hidden [&:has(a:hover)]:shadow-[0_2px_12px_rgba(89,86,80,0.15)] dark:[&:has(a:hover)]:shadow-[0_2px_20px_rgba(56,52,50,0.4)] [&:has(a:hover)]:scale-[1.005] transition-all duration-200">
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-regular text-card-foreground">
              {recipe.title}
            </h3>
            {/* <p className="text-sm text-muted-foreground mt-1">
              {recipe.description}
            </p> */}
          </div>
          <CopyButton text={recipe.files[0].content} />
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {recipe.categories.map((category) => (
            <Badge
              key={category}
              className="bg-[#f6f5f3] dark:bg-[#181717] text-primary dark:text-[#8c877d]"
            >
              {category.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      <Link href={`/cookbook/${recipe.id}`} className="group relative block">
        <div className="recipe-preview max-h-[200px] overflow-hidden border-t border-border bg-[hsl(var(--code))] relative z-0">
          {codeElement}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[hsl(var(--code))] to-transparent" />
        </div>
      </Link>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const routeMetadata = getRouteMetadata("/cookbook");
  console.log({ routeMetadata });
  return createMetadata(routeMetadata);
}

export default async function Page() {
  // Pre-render the recipe cards with Code components on the server
  const recipes = await loadRecipes();
  const recipeCards = await Promise.all(
    recipes.map(async (recipe) => {
      const codeElement = await Code({
        codeblocks: [
          {
            lang: recipe.files[0].type,
            value: recipe.files[0].content,
            meta: "",
          },
        ],
      });

      return (
        <RecipeCard key={recipe.id} recipe={recipe} codeElement={codeElement} />
      );
    })
  );
  return <CookbookUI initialRecipes={recipes} recipeCards={recipeCards} />;
}
