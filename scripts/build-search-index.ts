import { Orama, create, insertMultiple, save } from "@orama/orama";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cwd } from "node:process";

// --- Configuration ---
const docsDir = path.join(cwd(), "content/docs"); // Your MDX content directory
const outputPath = path.join(cwd(), "public/orama.json"); // Output for Orama index

// --- Orama Schema Definition ---
// Define the fields you want to index and search.
// 'id' is recommended for uniqueness.
// Use 'string' for searchable text fields.
const searchSchema = {
  id: "string", // Unique identifier (we'll use the slug)
  title: "string",
  description: "string",
  content: "string", // The raw markdown body
  url: "string", // The slug/path for linking
} as const; // Use 'as const' for stricter typing

// --- Data Extraction Function (Similar to your previous script) ---
interface DocData {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
}

function getAllDocsData(dir: string): DocData[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let docs: DocData[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      docs = docs.concat(getAllDocsData(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      try {
        const fileContent = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContent); // Extract frontmatter and content

        // Generate slug relative to docsDir
        const slug =
          fullPath
            .replace(docsDir, "")
            .replace(/\\/g, "/") // Normalize slashes
            .replace(/\.mdx$/, "") // Remove extension
            .replace(/\/index$/, "") || // Remove trailing /index
          "/"; // Handle root index file

        const url = `/docs${slug}`; // Construct URL path (adjust base path if needed)

        docs.push({
          id: url, // Use URL as the unique ID
          title: data.title || path.basename(entry.name, ".mdx"), // Fallback title
          description: data.description || "",
          content: content || "", // Ensure content is always a string
          url: url,
        });
      } catch (error) {
        console.warn(`⚠️ Failed to process file: ${fullPath}`, error);
      }
    }
  }
  return docs;
}

// --- Main Indexing Function ---
async function buildOramaIndex() {
  console.log("🚀 Starting Orama index build...");

  // 1. Extract data from MDX files
  console.log(`🔍 Reading documents from: ${docsDir}`);
  const allDocsData = getAllDocsData(docsDir); // Get all potential docs
  if (allDocsData.length === 0) {
    console.warn("⚠️ No documents found. Exiting.");
    return;
  }
  console.log(`📄 Found ${allDocsData.length} documents initially.`);

  // --- ADD FILTERING LOGIC ---
  const uniqueDocsDataMap = new Map<string, DocData>();
  for (const doc of allDocsData) {
    if (!uniqueDocsDataMap.has(doc.id)) {
      // If ID is not seen yet, add it to the map
      uniqueDocsDataMap.set(doc.id, doc);
    } else {
      // If ID exists, log a warning (optional but helpful)
      console.warn(
        `   ⚠️ Duplicate ID detected: "${doc.id}". Skipping subsequent entry.`
      );
      // You could add logic here to decide which version to keep,
      // but keeping the first encountered is usually simplest.
    }
  }
  // Convert the map values back to an array of unique documents
  const uniqueDocsData = Array.from(uniqueDocsDataMap.values());
  console.log(`✔️ Filtered down to ${uniqueDocsData.length} unique documents.`);
  // --- END FILTERING LOGIC ---

  // 2. Create Orama instance with the defined schema using 'create'
  console.log("🛠️ Creating Orama database instance...");
  const db = await create({
    schema: searchSchema,
  });

  // 3. Populate the Orama database with the UNIQUE data
  console.log("✍️ Populating Orama database with unique documents...");
  try {
    // Use the filtered array here
    await insertMultiple(db, uniqueDocsData, 500);
    console.log("✅ Database populated successfully.");
  } catch (error) {
    console.error("❌ Error populating Orama database:", error);
    process.exit(1);
  }

  // 4. Save the database state manually
  console.log(`💾 Saving index to: ${outputPath}`);
  try {
    const dbState = await save(db); // Get the serializable state from Orama
    // Manually write the state to a JSON file
    fs.writeFileSync(outputPath, JSON.stringify(dbState));
    console.log("🎉 Orama index built successfully!");
  } catch (error) {
    console.error("❌ Error saving Orama index manually:", error);
    process.exit(1);
  }
}

// --- Run the build ---
buildOramaIndex();
