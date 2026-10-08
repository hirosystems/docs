#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';
import stringify from 'json-stringify-safe';
import type { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { OpenAPIMarkdownGenerator } from './openapi-to-markdown.mts';
import { buildEndpointMappings, saveMappings } from './utils/api-endpoint-mapping.mts';

interface ApiSpec {
  name: string;
  url: string;
}

interface GitHubApiSpec {
  name: string;
  type: 'github';
  repo: string;
  branch: string;
  filePath: string;
}

const API_SPECS: ApiSpec[] = [];

// Specs that can't be fetched at build time (private source / no public URL) are
// vendored in the repo and copied into the generated `openapi/` dir before markdown
// generation. The Chainhooks API spec lives in the private repo stx-labs/chainhooks
// (packages/api/openapi.yaml); to refresh it, regenerate the JSON below from that
// repo's openapi.yaml.
interface VendoredSpec {
  name: string;
  file: string;
}

const VENDORED_SPECS: VendoredSpec[] = [
  {
    name: 'chainhook',
    file: 'vendored-specs/chainhook-api.json',
  },
];

const GITHUB_API_SPECS: GitHubApiSpec[] = [
  {
    name: 'stacks-node-rpc',
    type: 'github',
    repo: 'stacks-network/stacks-core',
    branch: 'main',
    filePath: 'docs/rpc/openapi.yaml',
  },
  {
    name: 'stacks-blockchain',
    type: 'github',
    repo: 'stx-labs/stacks-blockchain-api',
    branch: 'master',
    filePath: 'openapi.yaml',
  },
  {
    name: 'token-metadata',
    type: 'github',
    repo: 'stx-labs/token-metadata-api',
    branch: 'master',
    filePath: 'openapi.yaml',
  },
  {
    name: 'signer-metrics',
    type: 'github',
    repo: 'stx-labs/signer-metrics-api',
    branch: 'main',
    filePath: 'openapi.yaml',
  },
];

async function fetchApiSpec(spec: ApiSpec): Promise<void> {
  try {
    const response = await fetch(spec.url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();

    // Validate that the response is valid JSON
    let jsonData: unknown;
    try {
      jsonData = JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Invalid JSON response from ${spec.url}: ${parseError}`);
    }

    // Ensure openapi directory exists
    const openApiDir = path.join(process.cwd(), 'openapi');
    await fs.mkdir(openApiDir, { recursive: true });

    // Write the file with proper naming convention
    const filename = `${spec.name}-api.json`;
    const filepath = path.join(openApiDir, filename);

    await fs.writeFile(filepath, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error(`❌ Failed to fetch ${spec.name}:`, error);
  }
}

async function fetchGitHubApiSpec(spec: GitHubApiSpec): Promise<void> {
  try {
    // Construct the raw GitHub URL
    const rawUrl = `https://raw.githubusercontent.com/${spec.repo}/${spec.branch}/${spec.filePath}`;

    const response = await fetch(rawUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const yamlText = await response.text();

    // Parse YAML to check if it's valid
    let yamlData: unknown;
    try {
      yamlData = yaml.load(yamlText);
    } catch (parseError) {
      throw new Error(`Invalid YAML from ${rawUrl}: ${parseError}`);
    }

    // Use swagger-parser to dereference and bundle the spec
    // Pass the raw URL as the base URL so $ref resolution works correctly
    const bundledSpec = await SwaggerParser.dereference(rawUrl, yamlData as any);

    // Ensure openapi directory exists
    const openApiDir = path.join(process.cwd(), 'openapi');
    await fs.mkdir(openApiDir, { recursive: true });

    // Write the file with proper naming convention
    const filename = `${spec.name}-api.json`;
    const filepath = path.join(openApiDir, filename);

    await fs.writeFile(filepath, stringify(bundledSpec, null, 2));
  } catch (error) {
    console.error(`❌ Failed to fetch ${spec.name}:`, error);
  }
}

async function generateMarkdownForSpec(specPath: string, specName: string): Promise<void> {
  try {
    console.log(`📝 Generating markdown for ${specName}...`);

    // Read the OpenAPI spec
    const specContent = await fs.readFile(specPath, 'utf-8');
    const spec = JSON.parse(specContent) as OpenAPIV3.Document | OpenAPIV3_1.Document;

    // Create markdown generator
    const generator = new OpenAPIMarkdownGenerator(spec);

    // Generate markdown for all endpoints
    const markdownMap = await generator.generateAllEndpoints();

    // Create output directory
    const outputDir = path.join(process.cwd(), 'generated', 'apis', specName);
    await fs.mkdir(outputDir, { recursive: true });

    // Create mapping for URL to file lookup
    const urlMapping: Record<string, { method: string; path: string; file: string }> = {};

    // Save each endpoint's markdown
    let count = 0;
    for (const [key, markdown] of markdownMap) {
      // Create a filename from the endpoint key
      // e.g., "GET /v1/users/{id}" -> "get-v1-users-id.md"
      const filename = `${key
        .toLowerCase()
        .replace(/[{}]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}.md`;

      const filePath = path.join(outputDir, filename);
      await fs.writeFile(filePath, markdown.content);

      // Add to mapping
      urlMapping[key] = {
        method: markdown.method,
        path: markdown.endpoint,
        file: filename,
      };

      count++;
    }

    // Save the mapping file
    const mappingPath = path.join(outputDir, '_mapping.json');
    await fs.writeFile(mappingPath, JSON.stringify(urlMapping, null, 2));

    console.log(`✔️ Generated ${count} markdown files for ${specName}`);
  } catch (error) {
    console.error(`❌ Failed to generate markdown for ${specName}:`, error);
  }
}

async function generateAllMarkdown(): Promise<void> {
  console.log('\n📚 Generating markdown documentation...\n');

  const openApiDir = path.join(process.cwd(), 'openapi');

  // Get all OpenAPI spec files
  const specFiles = await fs.readdir(openApiDir);
  const jsonFiles = specFiles.filter((file) => file.endsWith('.json'));

  // Generate markdown for each spec
  const markdownPromises = jsonFiles.map((file) => {
    const specPath = path.join(openApiDir, file);
    const specName = file.replace('-api.json', '');
    return generateMarkdownForSpec(specPath, specName);
  });

  await Promise.all(markdownPromises);

  // Build and save endpoint mappings
  console.log('\n📍 Building endpoint mappings...');
  const mappings = await buildEndpointMappings();
  await saveMappings(mappings);

  console.log('\n✔️ Markdown generation complete!');
}

async function copyVendoredSpec(spec: VendoredSpec): Promise<void> {
  try {
    const openApiDir = path.join(process.cwd(), 'openapi');
    await fs.mkdir(openApiDir, { recursive: true });

    const source = path.join(import.meta.dirname, spec.file);
    const dest = path.join(openApiDir, `${spec.name}-api.json`);

    await fs.copyFile(source, dest);
  } catch (error) {
    console.error(`❌ Failed to copy vendored spec ${spec.name}:`, error);
  }
}

async function fetchAllSpecs(): Promise<void> {
  console.log('Fetching OpenAPI specs...');

  // Remove cached artifacts from the retired Platform API.
  await fs.rm(path.join(process.cwd(), 'openapi', 'platform-api.json'), { force: true });
  await fs.rm(path.join(process.cwd(), 'generated', 'apis', 'platform'), {
    recursive: true,
    force: true,
  });

  // Fetch current specs concurrently
  const allPromises = [
    ...API_SPECS.map((spec) => fetchApiSpec(spec)),
    ...GITHUB_API_SPECS.map((spec) => fetchGitHubApiSpec(spec)),
    ...VENDORED_SPECS.map((spec) => copyVendoredSpec(spec)),
  ];

  await Promise.all(allPromises);

  console.log('✔️ Generated OpenAPI specs');

  // Generate markdown for all specs
  await generateAllMarkdown();
}

// Run the script if this file is executed directly
if (require.main === module) {
  fetchAllSpecs().catch(console.error);
}

export { fetchAllSpecs, fetchApiSpec, fetchGitHubApiSpec };
