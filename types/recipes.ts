export type RecipeType = "typescript" | "curl" | "clarity";
export type RecipeTag = "api" | "stacks.js" | "clarity" | "clarinet";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  type: RecipeType;
  date: string;
  tags: RecipeTag[];
  files: {
    name: string;
    path: string;
    content: string;
    snippet?: string;
    preview?: any;
  }[];
}
