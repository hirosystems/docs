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

async function generatePlatformApiSpec(): Promise<void> {
  try {
    const openApiDir = path.join(process.cwd(), "openapi");
    await fs.mkdir(openApiDir, { recursive: true });

    const platformApiPath = path.join(openApiDir, "platform-api.json");

    // Check if file already exists (skip if it does)
    try {
      await fs.access(platformApiPath);
      return;
    } catch {
      // File doesn't exist, generate it
      console.log("Generating platform-api.json...");
    }

    // Hardcoded Platform API spec - copied from existing platform-api.json
    const platformApiSpec = {
      openapi: "3.0.0",
      info: {
        title: "Hiro Platform API",
        version: "1.0.0",
        description:
          "API for managing devnets and chainhooks on the Hiro Platform",
      },
      servers: [
        {
          url: "https://api.platform.hiro.so",
          description: "Production server",
        },
      ],
      paths: {
        "/v1/ext/{apiKey}/devnet/{projectName}": {
          put: {
            summary: "Start devnet",
            description: "Start a development network (devnet)",
            operationId: "startDevnet",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
              {
                name: "projectName",
                in: "path",
                required: true,
                description: "Project name",
                schema: {
                  type: "string",
                  example: "clarity-bitcoin-197s",
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    required: ["file"],
                    properties: {
                      file: {
                        type: "string",
                        format: "binary",
                        description:
                          "JSON file containing the devnet plan. The file can be created using clarinet devnet package",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                    },
                  },
                },
              },
            },
          },
        },
        "/v1/ext/{apiKey}/devnet": {
          delete: {
            summary: "Stop devnet",
            description: "Stop a development network (devnet)",
            operationId: "stopDevnet",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "text/plain": {
                    schema: {
                      type: "string",
                      example: "Ok",
                    },
                  },
                },
              },
            },
          },
        },
        "/v1/ext/{apiKey}/stacks-blockchain-api/{*}": {
          get: {
            summary: "Stacks Blockchain API Proxy (GET)",
            description:
              "Proxy for the Stacks Blockchain API on a development network (devnet)",
            operationId: "stacksBlockchainApiProxyGet",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description:
                  "The path (endpoint) for the Stacks Blockchain API",
                schema: {
                  type: "string",
                  example: "extended/v1/tx",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: "Stacks Blockchain API Proxy (POST)",
            description:
              "Proxy for the Stacks Blockchain API on a development network (devnet)",
            operationId: "stacksBlockchainApiProxyPost",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description:
                  "The path (endpoint) for the Stacks Blockchain API",
                schema: {
                  type: "string",
                  example: "v2/transactions",
                },
              },
            ],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                    },
                  },
                },
              },
            },
          },
          put: {
            summary: "Stacks Blockchain API Proxy (PUT)",
            description:
              "Proxy for the Stacks Blockchain API on a development network (devnet)",
            operationId: "stacksBlockchainApiProxyPut",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description:
                  "The path (endpoint) for the Stacks Blockchain API",
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
              },
            },
          },
          delete: {
            summary: "Stacks Blockchain API Proxy (DELETE)",
            description:
              "Proxy for the Stacks Blockchain API on a development network (devnet)",
            operationId: "stacksBlockchainApiProxyDelete",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description:
                  "The path (endpoint) for the Stacks Blockchain API",
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
              },
            },
          },
          patch: {
            summary: "Stacks Blockchain API Proxy (PATCH)",
            description:
              "Proxy for the Stacks Blockchain API on a development network (devnet)",
            operationId: "stacksBlockchainApiProxyPatch",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description:
                  "The path (endpoint) for the Stacks Blockchain API",
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
              },
            },
          },
          options: {
            summary: "Stacks Blockchain API Proxy (OPTIONS)",
            description:
              "Proxy for the Stacks Blockchain API on a development network (devnet)",
            operationId: "stacksBlockchainApiProxyOptions",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description:
                  "The path (endpoint) for the Stacks Blockchain API",
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
              },
            },
          },
        },
        "/v1/ext/{apiKey}/bitcoin-node/{*}": {
          get: {
            summary: "Bitcoin node Proxy (GET)",
            description:
              "Proxy for the Bitcoin node on a development network (devnet)",
            operationId: "bitcoinNodeProxyGet",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description: "The path (endpoint) for the Bitcoin node RPC",
                schema: {
                  type: "string",
                  example: "rest/chaininfo",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: "Bitcoin node Proxy (POST)",
            description:
              "Proxy for the Bitcoin node on a development network (devnet)",
            operationId: "bitcoinNodeProxyPost",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description: "The path (endpoint) for the Bitcoin node RPC",
                schema: {
                  type: "string",
                  example: "rest/chaininfo",
                },
              },
            ],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                    },
                  },
                },
              },
            },
          },
          put: {
            summary: "Bitcoin node Proxy (PUT)",
            description:
              "Proxy for the Bitcoin node on a development network (devnet)",
            operationId: "bitcoinNodeProxyPut",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description: "The path (endpoint) for the Bitcoin node RPC",
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
              },
            },
          },
          delete: {
            summary: "Bitcoin node Proxy (DELETE)",
            description:
              "Proxy for the Bitcoin node on a development network (devnet)",
            operationId: "bitcoinNodeProxyDelete",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description: "The path (endpoint) for the Bitcoin node RPC",
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
              },
            },
          },
          patch: {
            summary: "Bitcoin node Proxy (PATCH)",
            description:
              "Proxy for the Bitcoin node on a development network (devnet)",
            operationId: "bitcoinNodeProxyPatch",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description: "The path (endpoint) for the Bitcoin node RPC",
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
              },
            },
          },
          options: {
            summary: "Bitcoin node Proxy (OPTIONS)",
            description:
              "Proxy for the Bitcoin node on a development network (devnet)",
            operationId: "bitcoinNodeProxyOptions",
            tags: ["Devnet"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                },
              },
              {
                name: "*",
                in: "path",
                required: true,
                description: "The path (endpoint) for the Bitcoin node RPC",
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
              },
            },
          },
        },
        "/v1/ext/{apiKey}/chainhooks": {
          get: {
            summary: "Get all chainhooks",
            description: "Get all of your chainhooks through the Hiro Platform",
            operationId: "listAllChainhooks",
            tags: ["Chainhooks"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: "Create a chainhook",
            description: "Create a chainhook through the Hiro Platform",
            operationId: "createChainhook",
            tags: ["Chainhooks"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
            ],
            requestBody: {
              required: true,
              description: "Chainhook predicate configuration",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: {
                          type: "string",
                        },
                        chainhookUuid: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/v1/ext/{apiKey}/chainhooks/{chainhookUuid}": {
          get: {
            summary: "Get a specific chainhook",
            description: "Get a specific chainhook through the Hiro Platform",
            operationId: "retrieveChainhook",
            tags: ["Chainhooks"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
              {
                name: "chainhookUuid",
                in: "path",
                required: true,
                description: "Chainhook UUID",
                schema: {
                  type: "string",
                  example: "aa3626dc-2090-49cd-8f1e-8f9994393aed",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
              },
              "404": {
                description: "Default Response",
              },
            },
          },
          put: {
            summary: "Update a chainhook",
            description: "Update a chainhook through the Hiro Platform",
            operationId: "updateChainhook",
            tags: ["Chainhooks"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
              {
                name: "chainhookUuid",
                in: "path",
                required: true,
                description: "Chainhook UUID",
                schema: {
                  type: "string",
                  example: "aa3626dc-2090-49cd-8f1e-8f9994393aed",
                },
              },
            ],
            requestBody: {
              description: "Chainhook predicate configuration",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: {
                          type: "string",
                        },
                        chainhookUuid: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              "404": {
                description: "Default Response",
              },
              "500": {
                description: "Default Response",
              },
            },
          },
          delete: {
            summary: "Delete a chainhook",
            description: "Delete a chainhook through the Hiro Platform",
            operationId: "deleteChainhook",
            tags: ["Chainhooks"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
              {
                name: "chainhookUuid",
                in: "path",
                required: true,
                description: "Chainhook UUID",
                schema: {
                  type: "string",
                  example: "aa3626dc-2090-49cd-8f1e-8f9994393aed",
                },
              },
            ],
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: {
                          type: "string",
                        },
                        chainhookUuid: {
                          type: "string",
                        },
                        message: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/v1/ext/{apiKey}/chainhooks/{chainhookUuid}/status": {
          get: {
            summary: "Get a chainhook status",
            description:
              "Retrieve the status of a specific chainhook through the Hiro Platform",
            operationId: "retrieveChainhookStatus",
            tags: ["Chainhooks"],
            parameters: [
              {
                name: "apiKey",
                in: "path",
                required: true,
                description: "Hiro API key",
                schema: {
                  type: "string",
                  example: "0941f307fd270ace19a5bfed67fbd3bc",
                },
              },
              {
                name: "chainhookUuid",
                in: "path",
                required: true,
                description: "Chainhook UUID",
                schema: {
                  type: "string",
                  example: "aa3626dc-2090-49cd-8f1e-8f9994393aed",
                },
              },
            ],
            responses: {
              "200": {
                description: "Successfully retrieved chainhook status",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        status: {
                          type: "object",
                          properties: {
                            info: {
                              type: "object",
                              properties: {
                                expired_at_block_height: {
                                  type: "integer",
                                },
                                last_evaluated_block_height: {
                                  type: "integer",
                                },
                                last_occurrence: {
                                  type: "integer",
                                },
                                number_of_blocks_evaluated: {
                                  type: "integer",
                                },
                                number_of_times_triggered: {
                                  type: "integer",
                                },
                              },
                            },
                            type: {
                              type: "string",
                            },
                          },
                        },
                        enabled: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                },
              },
              "404": {
                description: "Chainhook not found",
              },
            },
          },
        },
      },
      components: {
        securitySchemes: {
          ApiKeyAuth: {
            type: "apiKey",
            in: "path",
            name: "apiKey",
          },
        },
      },
      tags: [
        {
          name: "Devnet",
          description: "Development network management endpoints",
        },
        {
          name: "Chainhooks",
          description: "Chainhook management endpoints",
        },
      ],
    };

    await fs.writeFile(
      platformApiPath,
      JSON.stringify(platformApiSpec, null, 2)
    );
  } catch (error) {
    console.error("❌ Failed to generate platform-api.json:", error);
  }
}

async function fetchApiSpec(spec: ApiSpec): Promise<void> {
  try {
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
    let yamlData;
    try {
      yamlData = yaml.load(yamlText);
    } catch (parseError) {
      throw new Error(`Invalid YAML from ${rawUrl}: ${parseError}`);
    }

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
  } catch (error) {
    console.error(`❌ Failed to fetch ${spec.name}:`, error);
  }
}

async function fetchAllSpecs(): Promise<void> {
  console.log("Fetching OpenAPI specs...");

  // Generate platform API spec and fetch other specs concurrently
  const allPromises = [
    generatePlatformApiSpec(),
    ...API_SPECS.map((spec) => fetchApiSpec(spec)),
    ...GITHUB_API_SPECS.map((spec) => fetchGitHubApiSpec(spec)),
  ];

  await Promise.all(allPromises);

  console.log("✔️ Generated OpenAPI specs");
}

// Run the script if this file is executed directly
if (require.main === module) {
  fetchAllSpecs().catch(console.error);
}

export {
  fetchAllSpecs,
  fetchApiSpec,
  fetchGitHubApiSpec,
  generatePlatformApiSpec,
};
