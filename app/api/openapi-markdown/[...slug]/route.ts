import { type NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

interface EndpointMapping {
  [urlPath: string]: {
    apiName: string;
    method: string;
    endpoint: string;
    generatedFile: string;
  };
}

/**
 * Load the API endpoint mappings
 */
async function loadMappings(): Promise<EndpointMapping> {
  try {
    const mappingPath = join(process.cwd(), "generated", "api-mappings.json");
    if (existsSync(mappingPath)) {
      const content = await readFile(mappingPath, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error loading mappings:", error);
  }
  return {};
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug = [] } = await params;
    const urlPath = "/" + slug.join("/");
    
    // Load mappings
    const mappings = await loadMappings();
    
    // Check if this is a mapped API endpoint
    if (mappings[urlPath]) {
      const mapping = mappings[urlPath];
      const generatedPath = join(
        process.cwd(),
        "generated",
        "apis",
        mapping.apiName,
        mapping.generatedFile
      );
      
      if (existsSync(generatedPath)) {
        const content = await readFile(generatedPath, "utf-8");
        return new NextResponse(content, {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600", // Cache for 1 hour
          },
        });
      }
    }
    
    // For non-mapped API reference pages, check if it's an MDX file that uses APIPage
    if (urlPath.match(/^\/apis\/[^\/]+\/reference\//)) {
      const mdxPath = join(process.cwd(), "content", "docs", ...slug) + ".mdx";
      
      if (existsSync(mdxPath)) {
        const mdxContent = await readFile(mdxPath, "utf-8");
        
        // Check if it contains APIPage component
        if (mdxContent.includes("<APIPage")) {
          // Return a message indicating this is an API page but no generated content
          return new NextResponse(
            "# API Reference\n\nThis is an API reference page. The generated documentation is being processed.\n\n" +
            "If you're seeing this message, it means the OpenAPI markdown generation hasn't completed yet.\n\n" +
            "Please run `bun run generate-openapi` to generate the markdown documentation.",
            {
              headers: {
                "Content-Type": "text/markdown; charset=utf-8",
              },
            }
          );
        }
      }
    }
    
    // Fallback to content/docs for non-API pages
    const contentPath = join(process.cwd(), "content", "docs", ...slug) + ".mdx";
    if (existsSync(contentPath)) {
      const content = await readFile(contentPath, "utf-8");
      return new NextResponse(content, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
        },
      });
    }
    
    return new NextResponse("Markdown file not found", { status: 404 });
  } catch (error) {
    console.error("Error serving markdown:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}