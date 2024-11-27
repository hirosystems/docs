import * as fs from "node:fs";
import env from "@next/env";
import algosearch from "algoliasearch";
import { sync } from "fumadocs-core/search/algolia";

env.loadEnvConfig(process.cwd());

const content = fs.readFileSync(".next/server/chunks/fumadocs_search.json");

/** @type {import('fumadocs-core/search/algolia').DocumentRecord[]} **/
const indexes = JSON.parse(content.toString());

if (!process.env.NEXT_PUBLIC_ALGOLIA_API_KEY) {
  console.warn("Algolia API Key not found, skip updating search index.");
} else {
  const client = algosearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ""
  );

  sync(client, {
    documents: indexes, // search indexes, may be provided by your content source
  });
}
