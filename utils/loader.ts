import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { Recipe } from "@/types/recipes";

function extractCodeAndContent(content: string) {
  // Match code blocks with their language
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/;
  const match = content.match(codeBlockRegex);

  if (!match) {
    return { code: null, remainingContent: content };
  }

  // Extract the code block
  const [fullMatch, lang, code] = match;

  // Remove the code block from content
  const remainingContent = content.replace(fullMatch, "").trim();

  return {
    code: code.trim(),
    remainingContent,
  };
}

export async function loadRecipes(): Promise<Recipe[]> {
  const recipesDir = path.join(process.cwd(), "data/recipes");
  const files = await fs.readdir(recipesDir);

  const recipes = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(recipesDir, filename);
      const source = await fs.readFile(filePath, "utf8");

      const { data, content } = matter(source);
      const { code, remainingContent } = extractCodeAndContent(content);

      // Create the file object from the extracted code
      const files = code
        ? [
            {
              name: data.files?.[0]?.name || "example.clar",
              path: data.files?.[0]?.path || "contracts/example.clar",
              type: data.files?.[0]?.type || "clarity",
              content: code,
            },
          ]
        : [];

      return {
        ...(data as Recipe),
        content: remainingContent,
        files,
      };
    })
  );

  return recipes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
