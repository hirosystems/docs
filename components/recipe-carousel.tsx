"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Recipe } from "@/types/recipes";
import { truncate } from "@/lib/utils";

interface RecipeCarouselProps {
  currentRecipeId: string; // To exclude current recipe from carousel
  data: Recipe[];
}

function RecipeCarousel({ currentRecipeId, data }: RecipeCarouselProps) {
  const recipes = data.filter((recipe) => recipe.id !== currentRecipeId);

  return (
    <div className="w-full p-4 rounded-lg">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-mono text-muted-foreground">
            More recipes
          </h2>
          <div className="flex gap-2">
            <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-7 w-7 border-border bg-background hover:bg-code" />
            <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-7 w-7 border-border bg-background hover:bg-code" />
          </div>
        </div>

        <CarouselContent className="w-[1100px] -ml-4">
          {recipes.map((recipe, index) => (
            <CarouselItem key={index} className="pl-4 basis-[75%]">
              <Link href={`/cookbook/${recipe.id}`} className="group">
                <Card className="bg-code border-0 h-[150px]">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="space-y-4 flex flex-col h-full">
                      <div className="flex items-baseline gap-4 flex-wrap">
                        <h3 className="text-xl font-mono text-primary group-hover:underline decoration-2 underline-offset-4 line-clamp-1">
                          {recipe.title}
                        </h3>
                        <div className="flex gap-2 flex-wrap uppercase">
                          {recipe.categories.map((category, i) => (
                            <Badge key={category} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-md text-muted-foreground leading-relaxed line-clamp-3">
                        {truncate(recipe.description)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export { RecipeCarousel };
