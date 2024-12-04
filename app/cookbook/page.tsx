import { recipes } from "@/data/recipes";
import { CookbookUI } from "./components/cookbook-ui";
import { Code } from "@/components/docskit/code";
import { Recipe } from "@/types/recipes";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

// Server Components for Recipe Display
function RecipeCard({
  recipe,
  codeElement,
}: {
  recipe: Recipe;
  codeElement: React.ReactNode;
}) {
  return (
    <div className="group relative w-full rounded-lg border border-border bg-card overflow-hidden">
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-card-foreground">
              {recipe.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {recipe.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              className="bg-code dark:bg-background hover:bg-accent h-8 w-8"
              aria-label="Copy to clipboard"
            >
              <Copy className="h-3.5 w-3.5 text-primary" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="recipe-preview max-h-[200px] overflow-hidden border-t border-border">
          {codeElement}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-code via-code/100 to-transparent" />
        </div>
        <Link
          href={`/cookbook/${recipe.id}`}
          className="absolute inset-0 flex h-[185px] items-center top-12 justify-center opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-background/25"
        >
          <Button
            variant="outline"
            className="bg-transparent hover:bg-transparent"
          >
            View details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default async function Page() {
  // Pre-render the recipe cards with Code components on the server
  const recipeCards = await Promise.all(
    recipes.map(async (recipe) => {
      const codeElement = await Code({
        codeblocks: [
          {
            lang: recipe.type,
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
