"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Recipe, RecipeSubTag } from "@/types/recipes";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MultiSelect } from "@/components/multi-select";

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
    </div>
  );
}

const CATEGORIES = [
  { label: "Stacks.js", value: "stacks-js" },
  { label: "Clarity", value: "clarity" },
  { label: "Bitcoin", value: "bitcoin" },
  { label: "Chainhook", value: "chainhook" },
  { label: "API", value: "api" },
  { label: "Clarinet", value: "clarinet" },
];

type CategoryKey = (typeof CATEGORIES)[number]["value"];

function RecipeFilters({
  search,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}) {
  return (
    <div className="flex flex-row gap-2 flex-wrap items-start">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search recipes..."
          className="pl-8"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="min-w-[315px]">
        <MultiSelect
          options={CATEGORIES}
          placeholder="Filter by product"
          onValueChange={onCategoriesChange}
          defaultValue={selectedCategories}
          className="h-10"
          maxCount={2}
        />
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
    return (searchParams.get("view") as "grid" | "list") || "list";
  });
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const categories = searchParams.get("categories");
    return categories ? categories.split(",") : [];
  });

  // Update URL when filters change
  const updateURL = (newView?: "grid" | "list", newCategories?: string[]) => {
    const params = new URLSearchParams();

    if (newView === "list") {
      params.set("view", newView);
    }

    if (newCategories && newCategories.length > 0) {
      params.set("categories", newCategories.join(","));
    }

    const newURL = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;

    router.push(newURL, { scroll: false });
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    updateURL(newView, selectedCategories);
  };

  const handleCategoriesChange = (categories: string[]) => {
    setSelectedCategories(categories);
    updateURL(view, categories);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
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

      const matchesCategories =
        selectedCategories.length === 0 ||
        recipe.categories.some((category) =>
          selectedCategories.includes(category)
        );

      return matchesSearch && matchesCategories;
    });

    return filteredRecipes.map((recipe) => recipeCardMap[recipe.id]);
  }, [search, selectedCategories, initialRecipes, recipeCardMap]);

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
            onSearchChange={handleSearchChange}
            selectedCategories={selectedCategories}
            onCategoriesChange={handleCategoriesChange}
          />

          {view === "list" ? (
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

                    const matchesCategories =
                      selectedCategories.length === 0 ||
                      recipe.categories.some((category) =>
                        selectedCategories.includes(category)
                      );

                    return matchesSearch && matchesCategories;
                  })
                  .map((recipe) => (
                    <TableRow
                      key={recipe.id}
                      className="cursor-pointer group hover:bg-transparent"
                      onClick={() => router.push(`/cookbook/${recipe.id}`)}
                    >
                      <TableCell className="py-4 text-primary font-aeonikFono whitespace-normal break-words text-base">
                        <span className="group-hover:underline decoration-primary/70">
                          {recipe.title}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {recipe.categories.map((category) => (
                            <Badge key={category}>
                              {category.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecipeCards}
            </div>
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
