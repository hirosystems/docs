import type { OpenAPIV3_1 } from 'openapi-types';

export interface OpenAPIOperation {
  path: string;
  method: string;
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: OpenAPIParameter[];
  requestBody?: OpenAPIRequestBody;
  responses?: Record<string, OpenAPIResponse>;
  security?: Array<Record<string, string[]>>;
  tags?: string[];
}

export interface OpenAPIParameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  required?: boolean;
  schema: any; // OpenAPI schema object
  description?: string;
  example?: any;
  deprecated?: boolean;
}

export interface OpenAPIRequestBody {
  description?: string;
  required?: boolean;
  content: Record<string, OpenAPIMediaType>;
}

export interface OpenAPIMediaType {
  schema?: any;
  example?: any;
  examples?: Record<string, any>;
}

export interface OpenAPIResponse {
  description: string;
  content?: Record<string, OpenAPIMediaType>;
  headers?: Record<string, any>;
}

export interface OpenAPIDocument {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths: Record<string, Record<string, any>>;
  components?: any;
}

export interface CodeExample {
  lang: string;
  code: string;
  title?: string;
}

export interface ProcessedOperation extends OpenAPIOperation {
  parsedPath: string;
  baseUrl?: string;
}