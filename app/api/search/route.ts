import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

// Cache forever for static export
export const revalidate = 0; // Use 0 instead of false for Next.js 15+

// Export the static GET handler
export const { staticGET: GET } = createFromSource(source);
