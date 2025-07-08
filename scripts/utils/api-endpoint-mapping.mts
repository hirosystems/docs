#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { glob } from "glob";

interface EndpointMapping {
  // URL path -> generated file mapping
  [urlPath: string]: {
    apiName: string;
    method: string;
    endpoint: string;
    generatedFile: string;
  };
}

/**
 * Load all MDX files and extract APIPage usage to build URL mappings
 */
export async function buildEndpointMappings(): Promise<EndpointMapping> {
  const contentDir = path.join(process.cwd(), "content", "docs");
  const pattern = path.join(contentDir, "apis", "**/*.mdx");
  
  const files = await glob(pattern, {
    ignore: ["**/node_modules/**", "**/dist/**"]
  });
  
  const mappings: EndpointMapping = {};
  
  for (const file of files) {
    try {
      const content = await fs.readFile(file, "utf-8");
      
      // Extract APIPage component
      const apiPageMatch = content.match(/<APIPage\s+([^>]+)>/);
      if (!apiPageMatch) continue;
      
      const propsString = apiPageMatch[1];
      
      // Extract document
      const documentMatch = propsString.match(/document=["']([^"']+)["']/);
      if (!documentMatch) continue;
      
      // Extract API name from document path
      const apiNameMatch = documentMatch[1].match(/\/([^/]+)\.json$/);
      if (!apiNameMatch) continue;
      
      const apiName = apiNameMatch[1].replace("-api", "");
      
      // Extract operations
      const operationsMatch = propsString.match(/operations=\{(\[[^\]]+\])\}/);
      if (!operationsMatch) continue;
      
      // Parse operations
      const operationsStr = operationsMatch[1];
      const operationRegex = /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*method:\s*['"`]([^'"`]+)['"`]\s*\}/g;
      
      let opMatch;
      while ((opMatch = operationRegex.exec(operationsStr)) !== null) {
        const endpoint = opMatch[1];
        const method = opMatch[2].toUpperCase();
        
        // Calculate URL path from file path
        const relativePath = path.relative(contentDir, file);
        const urlPath = "/" + relativePath.replace(/\.mdx?$/, "");
        
        // Generate the expected markdown filename
        const generatedFile = `${method} ${endpoint}`
          .toLowerCase()
          .replace(/[{}]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") + ".md";
        
        mappings[urlPath] = {
          apiName,
          method,
          endpoint,
          generatedFile
        };
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  return mappings;
}

/**
 * Save the mapping to a JSON file
 */
export async function saveMappings(mappings: EndpointMapping): Promise<void> {
  const mappingPath = path.join(process.cwd(), "generated", "api-mappings.json");
  await fs.writeFile(mappingPath, JSON.stringify(mappings, null, 2));
  console.log(`✔️ Saved API endpoint mappings to ${mappingPath}`);
}

/**
 * Load saved mappings
 */
export async function loadMappings(): Promise<EndpointMapping> {
  try {
    const mappingPath = path.join(process.cwd(), "generated", "api-mappings.json");
    const content = await fs.readFile(mappingPath, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}