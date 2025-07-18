import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

// Cache the search API responses at runtime for optimal performance
export const revalidate = false;

export const { GET } = createFromSource(source);
