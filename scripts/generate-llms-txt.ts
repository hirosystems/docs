#!/usr/bin/env bun
import * as fs from "node:fs/promises";
import * as path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/docs");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const BASE_URL = process.env.LLMS_BASE_URL || "https://docs.hiro.so";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  url: string;
  section: string[];
}

// Get all MDX files and their metadata
async function getAllPages(): Promise<PageMetadata[]> {
  const files = await fg(`${CONTENT_DIR}/**/*.mdx`, {
    cwd: process.cwd(),
    absolute: true,
    onlyFiles: true,
  });

  const pages: PageMetadata[] = [];

  for (const file of files) {
    try {
      const content = await fs.readFile(file, "utf-8");
      const { data } = matter(content);

      const relativePath = path.relative(CONTENT_DIR, file);
      const pathParts = relativePath.split(path.sep);
      const isIndex = path.basename(file) === "index.mdx";

      // Create URL path
      let urlPath = pathParts
        .map((part, idx) => {
          if (idx === pathParts.length - 1) {
            return isIndex ? "" : part.replace(".mdx", "");
          }
          return part;
        })
        .filter(Boolean)
        .join("/");

      pages.push({
        title: data.title || path.basename(file, ".mdx"),
        description: data.description || "",
        path: file,
        url: urlPath ? `/${urlPath}` : "/",
        section: pathParts.slice(0, -1),
      });
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  return pages.sort((a, b) => a.url.localeCompare(b.url));
}

// Generate llms.txt content for a set of pages
function generateLLMsContent(
  pages: PageMetadata[],
  title: string,
  currentSection: string[] = []
): string {
  const lines = [`# ${title}`, "", "## Pages", ""];

  // For deep sections (like /tools), we want to group by the next level
  const groupDepth = currentSection.length;
  const groupedBySections = new Map<string, PageMetadata[]>();

  // Group pages by their section at the appropriate depth
  for (const page of pages) {
    let sectionKey = "root";

    if (page.section.length > groupDepth) {
      // Group by the next level after current section
      sectionKey = page.section[groupDepth];
    } else if (page.section.length === groupDepth && groupDepth > 0) {
      // This is a page at the current level (like tools/clarinet.md)
      sectionKey = "_overview";
    }

    const sectionArray = groupedBySections.get(sectionKey) ?? [];
    sectionArray.push(page);
    groupedBySections.set(sectionKey, sectionArray);
  }

  // Sort sections, but put _overview first if it exists
  const sortedSections = Array.from(groupedBySections.keys()).sort((a, b) => {
    if (a === "_overview") return -1;
    if (b === "_overview") return 1;
    if (a === "root") return -1;
    if (b === "root") return 1;
    return a.localeCompare(b);
  });

  // Add subsection headers when we have multiple sections
  const needsSubsectionHeaders =
    sortedSections.length > 2 ||
    (currentSection.length === 0 && sortedSections.length > 1);

  for (const section of sortedSections) {
    const sectionPages = (groupedBySections.get(section) ?? []).sort((a, b) => {
      // Sort overview pages first
      if (a.url.endsWith(`/${section}`)) return -1;
      if (b.url.endsWith(`/${section}`)) return 1;
      return a.title.localeCompare(b.title);
    });

    if (section === "_overview") {
      // These are overview pages at the current level
      for (const page of sectionPages) {
        const mdUrl = `${BASE_URL}${page.url}.md`;
        lines.push(
          `- [${page.title}](${mdUrl})${page.description ? `: ${page.description}` : ""}`
        );
      }
      if (sectionPages.length > 0) lines.push("");
    } else if (section !== "root") {
      // Add subsection header for better organization
      if (needsSubsectionHeaders) {
        lines.push(
          `#### ${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ")}`
        );
        lines.push("");
      } else {
        lines.push(
          `### ${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ")}`
        );
        lines.push("");
      }

      for (const page of sectionPages) {
        const mdUrl = `${BASE_URL}${page.url}.md`;
        lines.push(
          `- [${page.title}](${mdUrl})${page.description ? `: ${page.description}` : ""}`
        );
      }
      lines.push("");
    } else {
      // Root level pages
      for (const page of sectionPages) {
        const mdUrl = `${BASE_URL}${page.url}.md`;
        lines.push(
          `- [${page.title}](${mdUrl})${page.description ? `: ${page.description}` : ""}`
        );
      }
      if (sectionPages.length > 0) lines.push("");
    }
  }

  return lines.join("\n").trim();
}

// Create directory if it doesn't exist
async function ensureDir(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Main generation function
async function generateAllLLMsTxt() {
  console.log("🤖 Generating llms.txt files...");

  const allPages = await getAllPages();
  console.log(`📄 Found ${allPages.length} pages`);

  // Generate root llms.txt with empty currentSection array to trigger better formatting
  const rootContent = generateLLMsContent(allPages, "Hiro Documentation", []);
  await fs.writeFile(path.join(PUBLIC_DIR, "llms.txt"), rootContent);

  // Generate section-level llms.txt files
  const sections = new Map<string, PageMetadata[]>();

  for (const page of allPages) {
    // Generate for each directory level
    for (let i = 1; i <= page.section.length; i++) {
      const sectionPath = page.section.slice(0, i).join("/");
      const sectionArray = sections.get(sectionPath) ?? [];
      sectionArray.push(page);
      sections.set(sectionPath, sectionArray);
    }
  }

  // Create llms.txt for each section
  for (const [sectionPath, sectionPages] of sections) {
    const sectionParts = sectionPath.split("/");
    const sectionTitle = `${sectionParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")} Documentation`;

    const sectionContent = generateLLMsContent(
      sectionPages,
      sectionTitle,
      sectionParts
    );
    const outputPath = path.join(PUBLIC_DIR, sectionPath);

    await ensureDir(outputPath);
    await fs.writeFile(path.join(outputPath, "llms.txt"), sectionContent);
  }

  console.log("✔️ Generated llms.txt files");
}

// Run the generation
generateAllLLMsTxt().catch(console.error);
