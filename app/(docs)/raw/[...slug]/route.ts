import * as fs from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";

// Base directory for documentation content (same as in the llms API route)
const DOCS_CONTENT_PATH = path.join(process.cwd(), "content/docs");

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  if (slug.length === 0) {
    return new Response("Not Found", { status: 404 });
  }

  const filePath = path.join(DOCS_CONTENT_PATH, ...slug);

  try {
    await fs.access(filePath);

    const fileContent = await fs.readFile(filePath, "utf-8");

    return new Response(fileContent, {
      status: 200,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return new Response("Not Found", { status: 404 });
    } else {
      return new Response("Internal Server Error", { status: 500 });
    }
  }
}
