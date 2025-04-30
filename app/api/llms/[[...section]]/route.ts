import * as fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { NextRequest } from "next/server";

const DOCS_CONTENT_PATH = path.join(process.cwd(), "content/docs");
const BASE_URL = "https://docs.hiro.so";

function generateTitle(section: string[] = []): string {
  if (section.length === 0) {
    return "# Hiro Documentation";
  }
  return `# ${section
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")} Documentation`;
}

function getRawWebPath(filePath: string): string {
  const relativePath = path.relative(DOCS_CONTENT_PATH, filePath);
  const parsedPath = path.parse(relativePath);
  let webPath = path.join("/raw", parsedPath.dir, parsedPath.name);
  if (parsedPath.name === "index") {
    webPath = path.dirname(webPath);

    return webPath.replace(/\\/g, "/") + "/index.mdx";
  }

  return webPath.replace(/\\/g, "/") + ".mdx";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section?: string[] }> }
) {
  const awaitedParams = await params;
  let sectionSegments = awaitedParams.section || [];

  if (
    sectionSegments.length > 0 &&
    sectionSegments[sectionSegments.length - 1] === "llms.txt"
  ) {
    sectionSegments = sectionSegments.slice(0, -1);
  }

  const sectionPath = path.join(DOCS_CONTENT_PATH, ...sectionSegments);

  try {
    // Check if the directory exists
    try {
      await fs.access(sectionPath);
    } catch (e) {
      // Directory doesn't exist, return 404
      return new Response("Not Found", { status: 404 });
    }

    // Find MDX files directly within the target directory (not recursive)
    const files = await fg(`${sectionPath}/*.mdx`, {
      cwd: process.cwd(),
      absolute: true,
      onlyFiles: true,
    });

    const markdownOutput: string[] = [
      generateTitle(sectionSegments),
      "\n## Pages\n",
    ];

    if (files.length === 0) {
      markdownOutput.push("No pages found in this section.");
    } else {
      const fileDataPromises = files.map(async (file) => {
        try {
          const fileContent = await fs.readFile(file, "utf-8");
          const { data } = matter(fileContent);
          const title = data.title || path.basename(file, ".mdx"); // Fallback title
          const description = data.description || "";
          // Use the new function to get the /raw/ path
          const rawWebPath = getRawWebPath(file);
          const absoluteRawWebPath = `${BASE_URL}${rawWebPath}`; // Create absolute URL
          return `- [${title}](${absoluteRawWebPath})${description ? `: ${description}` : ""}`;
        } catch (readError) {
          console.error(`Error processing file ${file}:`, readError);
          return null; // Skip files that cause errors
        }
      });

      const formattedFiles = (await Promise.all(fileDataPromises)).filter(
        Boolean
      ) as string[];
      formattedFiles.sort(); // Sort alphabetically by title/path
      markdownOutput.push(...formattedFiles);
    }

    return new Response(markdownOutput.join("\n"), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error(
      `Error generating llms.txt for /${sectionSegments.join("/")}:`,
      error
    );
    return new Response("Internal Server Error", { status: 500 });
  }
}
