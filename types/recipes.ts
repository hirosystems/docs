export type RecipeType = "typescript" | "bash" | "clarity";

export type RecipeCategory =
  | "stacks-js"
  | "clarity"
  | "bitcoin"
  | "chainhook"
  | "api"
  | "clarinet";

export const CategorySubTags = {
  "stacks-js": [
    "web",
    "authentication",
    "transactions",
    "signing",
    "smart-contracts",
    "utils",
  ] as const,

  clarity: [] as const,

  bitcoin: ["transactions", "signing"] as const,

  chainhook: [] as const,

  api: [
    "token-metadata",
    "signer-metrics",
    "rpc",
    "platform",
    "ordinals",
    "runes",
  ] as const,

  clarinet: ["testing", "deployment"] as const,
} as const;

export type SubTagsForCategory = {
  [K in RecipeCategory]: (typeof CategorySubTags)[K][number];
};

export type RecipeSubTag = SubTagsForCategory[RecipeCategory];

// Base metadata from front matter
export interface RecipeMetadata {
  id: string;
  title: string;
  description: string;
  date: string;
  categories: RecipeCategory[];
  tags: SubTagsForCategory[RecipeCategory][];
  dependencies?: Record<string, string>;
}

// Code blocks extracted from markdown content
export interface RecipeFile {
  name: string;
  path: string;
  type: RecipeType;
  content: string;
  snippet?: string;
  preview?: any;
}

// Complete recipe with content and extracted files
export interface Recipe extends RecipeMetadata {
  content: string; // The full markdown content
  files: RecipeFile[]; // Extracted code blocks
}
