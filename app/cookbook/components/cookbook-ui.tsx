"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Recipe, RecipeSubTag } from "@/types/recipes";
import { cn } from "@/lib/utils";
import { CustomTable } from "@/components/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, LayoutGrid, List } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const TAG_CATEGORIES = {
  "stacks-js": {
    label: "Stacks.js",
    subTags: [
      "web",
      "authentication",
      "transactions",
      "signing",
      "smart-contracts",
      "utils",
    ],
  },
  clarity: {
    label: "Clarity",
    subTags: [
      "hashing",
      "lists",
      "arithmetic",
      "sequences",
      "iterators",
      "tokens",
    ],
  },
  bitcoin: {
    label: "Bitcoin",
    subTags: ["transactions", "signing"],
  },
  chainhook: {
    label: "Chainhook",
    subTags: [],
  },
  api: {
    label: "API",
    subTags: [
      "token-metadata",
      "signer-metrics",
      "rpc",
      "platform",
      "ordinals",
      "runes",
    ],
  },
  clarinet: {
    label: "Clarinet",
    subTags: ["testing", "deployment"],
  },
} as const;

// Type for our category keys
type CategoryKey = keyof typeof TAG_CATEGORIES;

function RecipeFilters({
  search,
  onSearchChange,
  selectedCategory,
  selectedSubTags,
  onCategoryChange,
  onSubTagToggle,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: CategoryKey | null;
  selectedSubTags: string[];
  onCategoryChange: (category: CategoryKey) => void;
  onSubTagToggle: (tag: string) => void;
}) {
  return (
    <div className="flex flex-row gap-2 flex-wrap items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="outline-none">
            <Badge
              variant={selectedCategory ? "default" : "outline"}
              className={cn(
                "cursor-pointer inline-flex items-center",
                selectedCategory &&
                  "hover:bg-[#aea498] dark:hover:bg-[#595650] dark:hover:text-[#dcd1d6]"
              )}
            >
              {selectedCategory
                ? TAG_CATEGORIES[selectedCategory].label.toUpperCase()
                : "FILTER"}
              <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
            </Badge>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {Object.entries(TAG_CATEGORIES).map(([key, category]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => onCategoryChange(key as CategoryKey)}
            >
              {category.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedCategory && <div className="w-px bg-border h-4" />}
      <div className="contents flex-wrap items-center gap-2">
        {selectedCategory &&
          TAG_CATEGORIES[selectedCategory].subTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedSubTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onSubTagToggle(tag)}
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
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    () => {
      const category = searchParams.get("category") as CategoryKey | null;
      return category && TAG_CATEGORIES[category] ? category : "clarity";
    }
  );

  const [selectedSubTags, setSelectedSubTags] = useState<string[]>(() => {
    const tagParam = searchParams.get("tags");
    return tagParam ? tagParam.split(",") : [];
  });

  // Update URL when filters change
  const updateURL = (
    newView?: "grid" | "list",
    newCategory?: CategoryKey | null,
    newSubTags?: string[]
  ) => {
    const params = new URLSearchParams();

    if (newView === "list") {
      params.set("view", newView);
    }

    if (newCategory) {
      params.set("category", newCategory);
    }

    if (newSubTags && newSubTags.length > 0) {
      params.set("tags", newSubTags.join(","));
    }

    const newURL = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;

    router.push(newURL, { scroll: false });
  };

  // Handle view changes
  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    updateURL(newView, selectedCategory, selectedSubTags);
  };

  // Handle tag changes
  const handleCategoryChange = (category: CategoryKey) => {
    setSelectedCategory(category);
    setSelectedSubTags([]); // Clear sub-tags when category changes
    updateURL(view, category, []);
  };

  // Handle sub-tag toggle
  const handleSubTagToggle = (tag: string) => {
    const newSubTags = selectedSubTags.includes(tag)
      ? selectedSubTags.filter((t) => t !== tag)
      : [...selectedSubTags, tag];

    setSelectedSubTags(newSubTags);
    updateURL(view, selectedCategory, newSubTags);
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

      const matchesCategory =
        !selectedCategory || recipe.categories.includes(selectedCategory);
      const matchesTags =
        selectedSubTags.length === 0 ||
        selectedSubTags.some((tag) =>
          recipe.tags.includes(tag as RecipeSubTag)
        );

      return matchesSearch && matchesCategory && matchesTags;
    });

    return filteredRecipes.map((recipe) => recipeCardMap[recipe.id]);
  }, [
    search,
    selectedCategory,
    selectedSubTags,
    initialRecipes,
    recipeCardMap,
  ]);

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
            selectedCategory={selectedCategory}
            selectedSubTags={selectedSubTags}
            onCategoryChange={handleCategoryChange}
            onSubTagToggle={handleSubTagToggle}
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

                    const matchesCategory =
                      !selectedCategory ||
                      recipe.categories.includes(selectedCategory);

                    const matchesTags =
                      selectedSubTags.length === 0 ||
                      selectedSubTags.some((tag) =>
                        recipe.tags.includes(tag as RecipeSubTag)
                      );

                    return matchesSearch && matchesCategory && matchesTags;
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
