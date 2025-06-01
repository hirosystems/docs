#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import SwaggerParser from "@apidevtools/swagger-parser";

interface ApiSpec {
  name: string;
  url: string;
}

interface GitHubApiSpec {
  name: string;
  type: "github";
  repo: string;
  branch: string;
  filePath: string;
}

const API_SPECS: ApiSpec[] = [
  {
    name: "stacks-blockchain",
    url: "https://stacks-blockchain-api.vercel.app/openapi.json",
  },
  {
    name: "token-metadata",
    url: "https://token-metadata-api.vercel.app/openapi.json",
  },
  {
    name: "signer-metrics",
    url: "https://signer-metrics-api.vercel.app/openapi.json",
  },
  {
    name: "ordinals",
    url: "https://ordinals-api.vercel.app/openapi.json",
  },
  {
    name: "runes",
    url: "https://runes-api.vercel.app/openapi.json",
  },
];

const GITHUB_API_SPECS: GitHubApiSpec[] = [
  {
    name: "stacks-node-rpc",
    type: "github",
    repo: "stacks-network/stacks-core",
    branch: "develop",
    filePath: "docs/rpc/openapi.yaml",
  },
];

async function fetchApiSpec(spec: ApiSpec): Promise<void> {
  try {
    console.log(`Fetching ${spec.name} from ${spec.url}...`);

    const response = await fetch(spec.url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();

    // Validate that the response is valid JSON
    let jsonData;
    try {
      jsonData = JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Invalid JSON response from ${spec.url}: ${parseError}`);
    }

    // Ensure openapi directory exists
    const openApiDir = path.join(process.cwd(), "openapi");
    await fs.mkdir(openApiDir, { recursive: true });

    // Write the file with proper naming convention
    const filename = `${spec.name}-api.json`;
    const filepath = path.join(openApiDir, filename);

    await fs.writeFile(filepath, JSON.stringify(jsonData, null, 2));

    console.log(`✅ Successfully saved ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to fetch ${spec.name}:`, error);
  }
}

async function fetchGitHubApiSpec(spec: GitHubApiSpec): Promise<void> {
  try {
    console.log(`Fetching ${spec.name} from GitHub repo ${spec.repo}...`);

    // Construct the raw GitHub URL
    const rawUrl = `https://raw.githubusercontent.com/${spec.repo}/${spec.branch}/${spec.filePath}`;

    console.log(`  → Downloading YAML from: ${rawUrl}`);
    const response = await fetch(rawUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const yamlText = await response.text();

    // Parse YAML to check if it's valid
    let yamlData;
    try {
      yamlData = yaml.load(yamlText);
    } catch (parseError) {
      throw new Error(`Invalid YAML from ${rawUrl}: ${parseError}`);
    }

    console.log(`  → Bundling and resolving $ref dependencies...`);

    // Use swagger-parser to dereference and bundle the spec
    // Pass the raw URL as the base URL so $ref resolution works correctly
    const bundledSpec = await SwaggerParser.dereference(
      rawUrl,
      yamlData as any
    );

    // Ensure openapi directory exists
    const openApiDir = path.join(process.cwd(), "openapi");
    await fs.mkdir(openApiDir, { recursive: true });

    // Write the file with proper naming convention
    const filename = `${spec.name}-api.json`;
    const filepath = path.join(openApiDir, filename);

    await fs.writeFile(filepath, JSON.stringify(bundledSpec, null, 2));

    console.log(`✅ Successfully saved ${filename} (bundled from YAML)`);
  } catch (error) {
    console.error(`❌ Failed to fetch ${spec.name}:`, error);
  }
}

async function fetchAllSpecs(): Promise<void> {
  console.log("Starting to fetch OpenAPI specifications...\n");

  // Fetch regular API specs and GitHub specs concurrently
  const allPromises = [
    ...API_SPECS.map((spec) => fetchApiSpec(spec)),
    ...GITHUB_API_SPECS.map((spec) => fetchGitHubApiSpec(spec)),
  ];

  await Promise.all(allPromises);

  console.log("\n🎉 Finished fetching all OpenAPI specifications!");
}

// Run the script if this file is executed directly
if (require.main === module) {
  fetchAllSpecs().catch(console.error);
}

export { fetchAllSpecs, fetchApiSpec, fetchGitHubApiSpec };
