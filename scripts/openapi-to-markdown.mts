#!/usr/bin/env node

import type { OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import fs from "fs/promises";
import path from "path";

// Type guard for OpenAPI 3.x documents
type OpenAPIDocument = OpenAPIV3.Document | OpenAPIV3_1.Document;
type OperationObject = OpenAPIV3.OperationObject | OpenAPIV3_1.OperationObject;
type ParameterObject = OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;
type ReferenceObject = OpenAPIV3.ReferenceObject | OpenAPIV3_1.ReferenceObject;
type SchemaObject = OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject;
type ResponseObject = OpenAPIV3.ResponseObject | OpenAPIV3_1.ResponseObject;
type RequestBodyObject = OpenAPIV3.RequestBodyObject | OpenAPIV3_1.RequestBodyObject;
type MediaTypeObject = OpenAPIV3.MediaTypeObject | OpenAPIV3_1.MediaTypeObject;

interface EndpointInfo {
  path: string;
  method: string;
  operation: OperationObject;
}

interface GeneratedMarkdown {
  endpoint: string;
  method: string;
  content: string;
}

/**
 * Utility class for generating markdown documentation from OpenAPI specifications
 */
export class OpenAPIMarkdownGenerator {
  private spec: OpenAPIDocument;
  private serverUrl: string;

  constructor(spec: OpenAPIDocument) {
    this.spec = spec;
    // Extract base server URL
    this.serverUrl = this.getServerUrl();
  }

  /**
   * Get the base server URL from the OpenAPI spec
   */
  private getServerUrl(): string {
    if ("servers" in this.spec && this.spec.servers && this.spec.servers.length > 0) {
      return this.spec.servers[0].url;
    }
    return "https://api.example.com";
  }

  /**
   * Generate markdown for a specific endpoint operation
   */
  public async generateEndpointMarkdown(
    path: string,
    method: string,
    operation: OperationObject
  ): Promise<string> {
    const sections: string[] = [];

    // Title
    sections.push(`# ${operation.summary || this.generateTitle(path, method)}`);
    sections.push("");

    // Description
    if (operation.description) {
      sections.push(operation.description);
      sections.push("");
    }

    // Endpoint
    sections.push("## Endpoint");
    sections.push("");
    sections.push("```");
    sections.push(`${method.toUpperCase()} ${path}`);
    sections.push("```");
    sections.push("");

    // Parameters
    const parameters = await this.generateParametersSection(operation.parameters);
    if (parameters) {
      sections.push(parameters);
      sections.push("");
    }

    // Request Body
    const requestBody = await this.generateRequestBodySection(operation.requestBody);
    if (requestBody) {
      sections.push(requestBody);
      sections.push("");
    }

    // Request Example
    const requestExample = this.generateRequestExample(path, method, operation);
    if (requestExample) {
      sections.push(requestExample);
      sections.push("");
    }

    // Responses
    const responses = await this.generateResponsesSection(operation.responses);
    if (responses) {
      sections.push(responses);
      sections.push("");
    }

    // Authentication
    const authentication = this.generateAuthenticationSection(operation);
    sections.push(authentication);
    sections.push("");

    // Rate Limiting (if mentioned in description or x-rate-limit extension)
    const rateLimiting = this.generateRateLimitingSection(operation);
    if (rateLimiting) {
      sections.push(rateLimiting);
      sections.push("");
    }

    return sections.join("\n").trim();
  }

  /**
   * Generate a title from path and method if summary is not provided
   */
  private generateTitle(path: string, method: string): string {
    // Extract meaningful parts from the path
    const pathParts = path.split("/").filter(part => part && !part.startsWith("{"));
    const resource = pathParts[pathParts.length - 1] || "resource";
    
    // Convert to title case
    const titleCase = (str: string) => 
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    
    const methodTitles: Record<string, string> = {
      get: "Get",
      post: "Create",
      put: "Update",
      patch: "Patch",
      delete: "Delete",
      head: "Check",
      options: "Options for"
    };

    return `${methodTitles[method.toLowerCase()] || titleCase(method)} ${titleCase(resource)}`;
  }

  /**
   * Generate parameters section
   */
  private async generateParametersSection(
    parameters?: (ParameterObject | ReferenceObject)[]
  ): Promise<string | null> {
    if (!parameters || parameters.length === 0) {
      return null;
    }

    const sections: string[] = ["## Parameters"];
    
    // Group parameters by location
    const pathParams: ParameterObject[] = [];
    const queryParams: ParameterObject[] = [];
    const headerParams: ParameterObject[] = [];

    for (const param of parameters) {
      const resolved = this.resolveReference(param) as ParameterObject;
      if (!resolved) continue;

      switch (resolved.in) {
        case "path":
          pathParams.push(resolved);
          break;
        case "query":
          queryParams.push(resolved);
          break;
        case "header":
          headerParams.push(resolved);
          break;
      }
    }

    // Path Parameters
    if (pathParams.length > 0) {
      sections.push("");
      sections.push("### Path Parameters");
      sections.push("");
      sections.push("| Name | Type | Required | Description |");
      sections.push("|------|------|----------|-------------|");
      
      for (const param of pathParams) {
        const type = this.getParameterType(param);
        const required = param.required ? "Yes" : "No";
        const description = param.description || "-";
        sections.push(`| ${param.name} | ${type} | ${required} | ${description} |`);
      }
    }

    // Query Parameters
    if (queryParams.length > 0) {
      sections.push("");
      sections.push("### Query Parameters");
      sections.push("");
      sections.push("| Name | Type | Required | Default | Description |");
      sections.push("|------|------|----------|---------|-------------|");
      
      for (const param of queryParams) {
        const type = this.getParameterType(param);
        const required = param.required ? "Yes" : "No";
        const defaultValue = this.getDefaultValue(param);
        const description = param.description || "-";
        sections.push(`| ${param.name} | ${type} | ${required} | ${defaultValue} | ${description} |`);
      }
    }

    // Header Parameters
    if (headerParams.length > 0) {
      sections.push("");
      sections.push("### Header Parameters");
      sections.push("");
      sections.push("| Name | Type | Required | Description |");
      sections.push("|------|------|----------|-------------|");
      
      for (const param of headerParams) {
        const type = this.getParameterType(param);
        const required = param.required ? "Yes" : "No";
        const description = param.description || "-";
        sections.push(`| ${param.name} | ${type} | ${required} | ${description} |`);
      }
    }

    return sections.join("\n");
  }

  /**
   * Get parameter type from schema
   */
  private getParameterType(param: ParameterObject): string {
    if (!param.schema) return "string";
    
    const schema = this.resolveReference(param.schema) as SchemaObject;
    if (!schema) return "string";

    if ("type" in schema) {
      if (schema.type === "array" && "items" in schema) {
        const itemsSchema = this.resolveReference(schema.items) as SchemaObject;
        const itemType = itemsSchema && "type" in itemsSchema ? itemsSchema.type : "any";
        return `${itemType}[]`;
      }
      return schema.type as string;
    }

    return "object";
  }

  /**
   * Get default value from parameter
   */
  private getDefaultValue(param: ParameterObject): string {
    if (!param.schema) return "-";
    
    const schema = this.resolveReference(param.schema) as SchemaObject;
    if (!schema || !("default" in schema)) return "-";

    if (schema.default === null) return "null";
    if (typeof schema.default === "string") return `"${schema.default}"`;
    return String(schema.default);
  }

  /**
   * Generate request body section
   */
  private async generateRequestBodySection(
    requestBody?: RequestBodyObject | ReferenceObject
  ): Promise<string | null> {
    if (!requestBody) return null;

    const resolved = this.resolveReference(requestBody) as RequestBodyObject;
    if (!resolved || !resolved.content) return null;

    const sections: string[] = ["## Request Body"];
    
    if (resolved.description) {
      sections.push("");
      sections.push(resolved.description);
    }

    sections.push("");
    sections.push(`**Required**: ${resolved.required ? "Yes" : "No"}`);

    // Get the first content type (usually application/json)
    const contentTypes = Object.keys(resolved.content);
    for (const contentType of contentTypes) {
      const mediaType = resolved.content[contentType];
      
      sections.push("");
      sections.push(`### Content Type: \`${contentType}\``);
      
      if (mediaType.schema) {
        const schema = this.resolveReference(mediaType.schema) as SchemaObject;
        const schemaExample = this.generateSchemaExample(schema);
        
        if (schemaExample) {
          sections.push("");
          sections.push("```json");
          sections.push(schemaExample);
          sections.push("```");
        }
      }

      // Add example if provided
      if (mediaType.example) {
        sections.push("");
        sections.push("#### Example");
        sections.push("");
        sections.push("```json");
        sections.push(JSON.stringify(mediaType.example, null, 2));
        sections.push("```");
      }
    }

    return sections.join("\n");
  }

  /**
   * Generate request example
   */
  private generateRequestExample(
    path: string,
    method: string,
    operation: OperationObject
  ): string | null {
    const sections: string[] = ["## Request Example"];
    sections.push("");

    // Build example URL with sample parameter values
    let examplePath = path;
    if (operation.parameters) {
      for (const param of operation.parameters) {
        const resolved = this.resolveReference(param) as ParameterObject;
        if (resolved && resolved.in === "path") {
          const exampleValue = this.getExampleValue(resolved);
          examplePath = examplePath.replace(`{${resolved.name}}`, exampleValue);
        }
      }
    }

    const fullUrl = `${this.serverUrl}${examplePath}`;
    
    sections.push("```bash");
    sections.push(`curl -X ${method.toUpperCase()} "${fullUrl}"`);
    
    // Add headers if needed
    if (operation.parameters) {
      for (const param of operation.parameters) {
        const resolved = this.resolveReference(param) as ParameterObject;
        if (resolved && resolved.in === "header") {
          sections.push(`  -H "${resolved.name}: ${this.getExampleValue(resolved)}"`);
        }
      }
    }

    // Add request body if present
    if (operation.requestBody) {
      const requestBody = this.resolveReference(operation.requestBody) as RequestBodyObject;
      if (requestBody && requestBody.content) {
        const jsonContent = requestBody.content["application/json"];
        if (jsonContent && jsonContent.example) {
          sections.push(`  -H "Content-Type: application/json"`);
          sections.push(`  -d '${JSON.stringify(jsonContent.example)}'`);
        }
      }
    }

    sections.push("```");
    
    return sections.join(" \\\n");
  }

  /**
   * Get example value for a parameter
   */
  private getExampleValue(param: ParameterObject): string {
    if (param.example) return String(param.example);
    
    if (param.schema) {
      const schema = this.resolveReference(param.schema) as SchemaObject;
      
      // Check for examples array
      if (schema && "examples" in schema && schema.examples && schema.examples.length > 0) {
        return String(schema.examples[0]);
      }
      
      // Check for example
      if (schema && "example" in schema) return String(schema.example);
      
      // Generate based on type
      if (schema && "type" in schema) {
        switch (schema.type) {
          case "integer":
            return "1";
          case "boolean":
            return "true";
          case "array":
            return "item1,item2";
          default:
            // Smart defaults based on parameter name
            if (param.name.includes("address") || param.name === "principal") {
              return "SP2X0TZ59D5SZ8ACQ6YMCHHNR2ZN51Z32E2CJ173";
            }
            if (param.name.includes("hash")) {
              return "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
            }
            if (param.name.includes("height")) {
              return "100000";
            }
            if (param.name.includes("id")) {
              return "123e4567-e89b-12d3-a456-426614174000";
            }
            return "example";
        }
      }
    }
    
    return "example";
  }

  /**
   * Generate responses section
   */
  private async generateResponsesSection(
    responses?: OpenAPIV3.ResponsesObject | OpenAPIV3_1.ResponsesObject
  ): Promise<string | null> {
    if (!responses) return null;

    const sections: string[] = ["## Response"];

    // Sort response codes
    const responseCodes = Object.keys(responses).sort();

    for (const code of responseCodes) {
      const response = this.resolveReference(responses[code]) as ResponseObject;
      if (!response) continue;

      sections.push("");
      sections.push(`### ${code} ${this.getStatusText(code)}`);
      sections.push("");

      if (response.description) {
        sections.push(response.description);
      }

      if (response.content) {
        for (const [contentType, mediaType] of Object.entries(response.content)) {
          if (mediaType.schema) {
            const schema = this.resolveReference(mediaType.schema) as SchemaObject;
            const example = mediaType.example || this.generateSchemaExample(schema);
            
            if (example) {
              sections.push("");
              sections.push("```json");
              sections.push(typeof example === "string" ? example : JSON.stringify(example, null, 2));
              sections.push("```");
            }
          }
        }
      }
    }

    // Add error responses table if there are multiple error codes
    const errorCodes = responseCodes.filter(code => code.startsWith("4") || code.startsWith("5"));
    if (errorCodes.length > 1) {
      sections.push("");
      sections.push("### Error Responses");
      sections.push("");
      sections.push("| Status | Description |");
      sections.push("|--------|-------------|");
      
      for (const code of errorCodes) {
        const response = this.resolveReference(responses[code]) as ResponseObject;
        if (response && response.description) {
          sections.push(`| ${code} | ${response.description} |`);
        }
      }
    }

    return sections.join("\n");
  }

  /**
   * Get status text for HTTP status code
   */
  private getStatusText(code: string): string {
    const statusTexts: Record<string, string> = {
      "200": "OK",
      "201": "Created",
      "204": "No Content",
      "400": "Bad Request",
      "401": "Unauthorized",
      "403": "Forbidden",
      "404": "Not Found",
      "500": "Internal Server Error",
      "502": "Bad Gateway",
      "503": "Service Unavailable"
    };
    
    return statusTexts[code] || "";
  }

  /**
   * Generate authentication section
   */
  private generateAuthenticationSection(operation: OperationObject): string {
    const sections: string[] = ["## Authentication"];
    sections.push("");

    // Check for security requirements
    const security = operation.security || this.spec.security;
    
    if (!security || security.length === 0) {
      sections.push("This endpoint does not require authentication.");
    } else {
      sections.push("This endpoint requires authentication:");
      sections.push("");
      
      for (const requirement of security) {
        for (const [scheme, scopes] of Object.entries(requirement)) {
          // Look up the security scheme
          if ("components" in this.spec && this.spec.components?.securitySchemes) {
            const securityScheme = this.spec.components.securitySchemes[scheme];
            if (securityScheme && "type" in securityScheme) {
              sections.push(`- **${scheme}**: ${securityScheme.type}`);
              if (securityScheme.description) {
                sections.push(`  - ${securityScheme.description}`);
              }
              if (scopes && scopes.length > 0) {
                sections.push(`  - Required scopes: ${scopes.join(", ")}`);
              }
            }
          }
        }
      }
    }

    return sections.join("\n");
  }

  /**
   * Generate rate limiting section
   */
  private generateRateLimitingSection(operation: OperationObject): string | null {
    // Check for x-rate-limit extension or mention in description
    const hasRateLimit = operation.description?.toLowerCase().includes("rate limit") ||
                        ("x-rate-limit" in operation);
    
    if (!hasRateLimit) return null;

    const sections: string[] = ["## Rate Limiting"];
    sections.push("");
    
    // Default rate limiting info
    sections.push("- **Rate Limit**: Standard API rate limits apply");
    sections.push("- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`");
    
    return sections.join("\n");
  }

  /**
   * Generate schema example
   */
  private generateSchemaExample(schema?: SchemaObject | ReferenceObject): string | null {
    if (!schema) return null;
    
    const resolved = this.resolveReference(schema) as SchemaObject;
    if (!resolved) return null;

    // If there's an example, use it
    if ("example" in resolved && resolved.example) {
      return JSON.stringify(resolved.example, null, 2);
    }

    // Generate based on schema type
    return this.generateExampleFromSchema(resolved);
  }

  /**
   * Generate example from schema definition
   */
  private generateExampleFromSchema(schema: SchemaObject, depth: number = 0): any {
    // Prevent infinite recursion
    if (depth > 5) return "...";

    // Check for examples in the schema
    if ("examples" in schema && schema.examples && schema.examples.length > 0) {
      return schema.examples[0];
    }

    // Check for example (singular) in the schema
    if ("example" in schema && schema.example !== undefined) {
      return schema.example;
    }

    // Handle anyOf/oneOf schemas
    if ("anyOf" in schema && schema.anyOf && schema.anyOf.length > 0) {
      return this.generateExampleFromSchema(
        this.resolveReference(schema.anyOf[0]) as SchemaObject, 
        depth
      );
    }

    if ("oneOf" in schema && schema.oneOf && schema.oneOf.length > 0) {
      return this.generateExampleFromSchema(
        this.resolveReference(schema.oneOf[0]) as SchemaObject, 
        depth
      );
    }

    if ("type" in schema) {
      switch (schema.type) {
        case "string":
          if ("enum" in schema && schema.enum) {
            return schema.enum[0];
          }
          // Check for format hints
          if ("format" in schema) {
            switch (schema.format) {
              case "date-time":
                return "2024-01-01T00:00:00Z";
              case "date":
                return "2024-01-01";
              case "email":
                return "user@example.com";
              case "uri":
                return "https://example.com";
              default:
                return "string";
            }
          }
          return "string";
          
        case "number":
        case "integer":
          if ("minimum" in schema) {
            return schema.minimum;
          }
          if ("maximum" in schema) {
            return schema.maximum;
          }
          return schema.type === "integer" ? 1 : 1.0;
          
        case "boolean":
          return true;
          
        case "array":
          if ("items" in schema) {
            const itemExample = this.generateExampleFromSchema(
              this.resolveReference(schema.items) as SchemaObject, 
              depth + 1
            );
            return [itemExample];
          }
          return [];
          
        case "object":
          const obj: any = {};
          if ("properties" in schema && schema.properties) {
            for (const [key, propSchema] of Object.entries(schema.properties)) {
              const resolvedProp = this.resolveReference(propSchema) as SchemaObject;
              obj[key] = this.generateExampleFromSchema(resolvedProp, depth + 1);
            }
          }
          return obj;
          
        case "null":
          return null;
          
        default:
          return null;
      }
    }

    // If no type but has properties, treat as object
    if ("properties" in schema && schema.properties) {
      const obj: any = {};
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        const resolvedProp = this.resolveReference(propSchema) as SchemaObject;
        obj[key] = this.generateExampleFromSchema(resolvedProp, depth + 1);
      }
      return obj;
    }

    return {};
  }

  /**
   * Resolve $ref references
   */
  private resolveReference<T>(obj: T | ReferenceObject): T | null {
    if (!obj || typeof obj !== "object") return obj;
    
    if ("$ref" in obj) {
      // Simple reference resolution - assumes local references
      const refPath = obj.$ref.replace("#/", "").split("/");
      let resolved: any = this.spec;
      
      for (const part of refPath) {
        resolved = resolved[part];
        if (!resolved) return null;
      }
      
      return resolved as T;
    }
    
    return obj;
  }

  /**
   * Process all operations in the OpenAPI spec
   */
  public async generateAllEndpoints(): Promise<Map<string, GeneratedMarkdown>> {
    const results = new Map<string, GeneratedMarkdown>();

    if (!this.spec.paths) {
      return results;
    }

    for (const [path, pathItem] of Object.entries(this.spec.paths)) {
      if (!pathItem) continue;

      // Process each HTTP method
      const methods = ["get", "post", "put", "patch", "delete", "head", "options"] as const;
      
      for (const method of methods) {
        const operation = pathItem[method];
        if (operation && typeof operation === "object" && "responses" in operation) {
          const markdown = await this.generateEndpointMarkdown(path, method, operation);
          const key = `${method.toUpperCase()} ${path}`;
          
          results.set(key, {
            endpoint: path,
            method: method.toUpperCase(),
            content: markdown
          });
        }
      }
    }

    return results;
  }
}

/**
 * Utility function to generate markdown for a single endpoint
 */
export async function generateMarkdownForEndpoint(
  specPath: string,
  endpoint: string,
  method: string
): Promise<string | null> {
  try {
    const specContent = await fs.readFile(specPath, "utf-8");
    const spec = JSON.parse(specContent) as OpenAPIDocument;
    
    const generator = new OpenAPIMarkdownGenerator(spec);
    
    // Find the operation
    if (!spec.paths || !spec.paths[endpoint]) {
      console.error(`Endpoint ${endpoint} not found in spec`);
      return null;
    }
    
    const pathItem = spec.paths[endpoint];
    const operation = pathItem[method.toLowerCase() as keyof typeof pathItem];
    
    if (!operation || typeof operation !== "object" || !("responses" in operation)) {
      console.error(`Method ${method} not found for endpoint ${endpoint}`);
      return null;
    }
    
    return await generator.generateEndpointMarkdown(endpoint, method, operation);
  } catch (error) {
    console.error(`Error generating markdown for ${method} ${endpoint}:`, error);
    return null;
  }
}

/**
 * Utility function to generate markdown for all endpoints in a spec
 */
export async function generateMarkdownForAllEndpoints(
  specPath: string
): Promise<Map<string, GeneratedMarkdown>> {
  try {
    const specContent = await fs.readFile(specPath, "utf-8");
    const spec = JSON.parse(specContent) as OpenAPIDocument;
    
    const generator = new OpenAPIMarkdownGenerator(spec);
    return await generator.generateAllEndpoints();
  } catch (error) {
    console.error(`Error generating markdown for spec:`, error);
    return new Map();
  }
}