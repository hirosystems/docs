"use client";

import { useState, useMemo, Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Recipe } from "@/types/recipes";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import * as timeago from "timeago.js";
// import { FilterPopover } from "@/components/filter-popover";

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

function RecipeFilters({
  search,
  onSearchChange,
  // selectedCategories,
  // onCategoriesChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}) {
  return (
    <div className="flex flex-row gap-2 flex-wrap items-start justify-between">
      <div className="relative w-2/3">
        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by title, description, or keywords..."
          className="font-aeonikFono text-md pl-8"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {/* <FilterPopover
        selectedCategories={selectedCategories}
        onCategoriesChange={onCategoriesChange}
      /> */}
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

  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const [view, setView] = useState<"grid" | "list">(() => {
    return (searchParams.get("view") as "grid" | "list") || "list";
  });
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const categories = searchParams.get("categories");
    return categories ? categories.split(",") : [];
  });

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
    setCurrentPage(1);
    setSelectedCategories(categories);
    updateURL(view, categories);
  };

  const handleSearchChange = (value: string) => {
    setCurrentPage(1);
    setSearch(value);
  };

  const recipeCardMap = useMemo(() => {
    return initialRecipes.reduce(
      (map, recipe, index) => {
        map[recipe.id] = recipeCards[index];
        return map;
      },
      {} as Record<string, React.ReactNode>
    );
  }, [initialRecipes, recipeCards]);

  const filteredRecipeCards = useMemo(() => {
    const sortedRecipes = [...initialRecipes].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Filter all recipes without pagination
    const filteredRecipes = sortedRecipes.filter((recipe) => {
      const searchText = search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      const titleMatch = recipe.title.toLowerCase().includes(searchText);
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(searchText);
      const categoryMatch = recipe.categories.some((category) =>
        category.toLowerCase().includes(searchText)
      );
      const tagMatch = recipe.tags.some((tag) =>
        tag.toLowerCase().includes(searchText)
      );

      const matchesSearch =
        titleMatch || descriptionMatch || categoryMatch || tagMatch;

      const matchesCategories =
        selectedCategories.length === 0 ||
        recipe.categories.some((category) =>
          selectedCategories.includes(category.toLowerCase())
        );

      const shouldInclude = matchesSearch && matchesCategories;

      return shouldInclude;
    });

    const startIndex = 0;
    const endIndex = currentPage * ITEMS_PER_PAGE;

    const displayedRecipes = filteredRecipes.slice(startIndex, endIndex);

    return displayedRecipes.map((recipe) => ({
      recipe,
      card: recipeCardMap[recipe.id],
    }));
  }, [search, selectedCategories, initialRecipes, recipeCardMap, currentPage]);

  const totalPages = useMemo(() => {
    const filteredLength = initialRecipes.filter((recipe) => {
      const searchText = search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      const titleMatch = recipe.title.toLowerCase().includes(searchText);
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(searchText);
      const categoryMatch = recipe.categories.some((category) =>
        category.toLowerCase().includes(searchText)
      );
      const tagMatch = recipe.tags.some((tag) =>
        tag.toLowerCase().includes(searchText)
      );

      const matchesSearch =
        titleMatch || descriptionMatch || categoryMatch || tagMatch;

      const matchesCategories =
        selectedCategories.length === 0 ||
        recipe.categories.some((category) =>
          selectedCategories.includes(category.toLowerCase())
        );

      return matchesSearch && matchesCategories;
    }).length;

    return Math.ceil(filteredLength / ITEMS_PER_PAGE);
  }, [initialRecipes, search, selectedCategories]);

  const [isLoading, setIsLoading] = useState(false);

  const lastItemRef = useRef<HTMLTableRowElement>(null);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && !isLoading && hasScrolled) {
          if (currentPage < totalPages) {
            setIsLoading(true);
            setTimeout(() => {
              setCurrentPage((prev) => prev + 1);
              setIsLoading(false);
            }, 500);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = lastItemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [currentPage, totalPages, isLoading, hasScrolled]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col gap-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-semibold">Cookbook</h1>
            <p className="text-lg text-muted-foreground w-full">
              Explore common blockchain recipes with ready-to-copy examples for
              building applications on Stacks and Bitcoin.
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
                {filteredRecipeCards.map(({ recipe, card }, index) => {
                  const isLastItem = index === filteredRecipeCards.length - 1;

                  return (
                    <TableRow
                      key={recipe.id}
                      className="cursor-pointer group hover:bg-transparent"
                      onClick={() => router.push(`/cookbook/${recipe.id}`)}
                      ref={isLastItem ? lastItemRef : null}
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
                      <TableCell className="text-muted-foreground font-aeonikFono">
                        {timeago.format(new Date(recipe.date))}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecipeCards.map(({ recipe, card }, index) => (
                <div
                  key={recipe.id}
                  ref={
                    index === filteredRecipeCards.length - 1
                      ? lastItemRef
                      : null
                  }
                >
                  {card}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <p className="w-full text-center font-aeonikFono py-4">
          Loading more recipes...
        </p>
      )}
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
