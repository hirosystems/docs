"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Recipe, RecipeTag } from "@/types/recipes";
import { cn } from "@/lib/utils";
import { CustomTable } from "@/components/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, LayoutGrid, List } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

// Internal components
function ViewToggle({
  view,
  onChange,
}: {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg p-1 border border-code bg-code">
      <Button
        size="sm"
        onClick={() => onChange("grid")}
        className={cn(
          "px-2",
          view === "grid"
            ? "bg-card hover:bg-card text-primary"
            : "bg-code text-muted-foreground hover:bg-card"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        onClick={() => onChange("list")}
        className={cn(
          "px-2",
          view === "list"
            ? "bg-card hover:bg-card text-primary"
            : "bg-code text-muted-foreground hover:bg-card"
        )}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}

const ALL_TAGS: RecipeTag[] = [
  "api",
  "bitcoin",
  "clarity",
  "clarinet",
  "chainhook",
  "stacks.js",
];

function RecipeFilters({
  selectedTags,
  onTagToggle,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  selectedTags: RecipeTag[];
  onTagToggle: (tag: RecipeTag) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {ALL_TAGS.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onTagToggle(tag)}
          >
            {tag.toUpperCase()}
          </Badge>
        ))}
      </div>
    </div>
  );
}

interface CookbookProps {
  initialRecipes: Recipe[];
  recipeCards: React.ReactNode[];
}

function CookbookContent({ initialRecipes, recipeCards }: CookbookProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Initialize state from URL params
  const [view, setView] = useState<"grid" | "list">(() => {
    return (searchParams.get("view") as "grid" | "list") || "grid";
  });
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<RecipeTag[]>(() => {
    const tagParam = searchParams.get("tags");
    return tagParam ? (tagParam.split(",") as RecipeTag[]) : [];
  });

  // Update URL when filters change
  const updateURL = (newView?: "grid" | "list", newTags?: RecipeTag[]) => {
    const params = new URLSearchParams();

    // Only add view param if it's list (grid is default)
    if (newView === "list") {
      params.set("view", newView);
    }

    // Only add tags if there are any selected
    if (newTags && newTags.length > 0) {
      params.set("tags", newTags.join(","));
    }

    // Create the new URL
    const newURL = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;

    router.push(newURL, { scroll: false });
  };

  // Handle view changes
  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    updateURL(newView, selectedTags);
  };

  // Handle tag changes
  const handleTagToggle = (tag: RecipeTag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    updateURL(view, newTags);
  };

  // Create a map of recipe IDs to their corresponding rendered cards
  const recipeCardMap = useMemo(() => {
    return initialRecipes.reduce(
      (map, recipe, index) => {
        map[recipe.id] = recipeCards[index];
        return map;
      },
      {} as Record<string, React.ReactNode>
    );
  }, [initialRecipes, recipeCards]);

  // Filter recipes and get their corresponding cards
  const filteredRecipeCards = useMemo(() => {
    const filteredRecipes = initialRecipes.filter((recipe) => {
      const matchesSearch =
        search === "" ||
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => recipe.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

    // Return the cards for the filtered recipes
    return filteredRecipes.map((recipe) => recipeCardMap[recipe.id]);
  }, [search, selectedTags, initialRecipes, recipeCardMap]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col gap-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold">Cookbook</h1>
            <p className="text-lg text-muted-foreground w-2/3">
              An open-source collection of copy &amp; paste code recipes for
              building on Stacks and Bitcoin.
            </p>
          </div>
          <ViewToggle view={view} onChange={handleViewChange} />
        </div>

        <div className="space-y-6">
          <RecipeFilters
            search={search}
            onSearchChange={setSearch}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />

          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecipeCards}
            </div>
          ) : (
            <Table>
              <TableBody>
                {initialRecipes
                  .filter((recipe) => {
                    const matchesSearch =
                      search === "" ||
                      recipe.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      recipe.description
                        .toLowerCase()
                        .includes(search.toLowerCase());

                    const matchesTags =
                      selectedTags.length === 0 ||
                      selectedTags.some((tag) => recipe.tags.includes(tag));

                    return matchesSearch && matchesTags;
                  })
                  .map((recipe) => (
                    <TableRow
                      key={recipe.id}
                      className="cursor-pointer group hover:bg-transparent"
                      onClick={() => router.push(`/cookbook/${recipe.id}`)}
                    >
                      <TableCell className="py-4 text-primary font-aeonikFono whitespace-normal break-words text-base">
                        <span className="group-hover:underline decoration-primary/50">
                          {recipe.title}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {recipe.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

export function CookbookUI({ initialRecipes, recipeCards }: CookbookProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CookbookContent
        initialRecipes={initialRecipes}
        recipeCards={recipeCards}
      />
    </Suspense>
  );
}
