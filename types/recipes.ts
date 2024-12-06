export type RecipeType = "typescript" | "bash" | "clarity";
export type RecipeTag =
  | "api"
  | "bitcoin"
  | "stacks.js"
  | "clarity"
  | "clarinet"
  | "chainhook";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: RecipeTag[];
  files: {
    name: string;
    path: string;
    type: RecipeType;
    content: string;
    snippet?: string;
    preview?: any;
  }[];
}
