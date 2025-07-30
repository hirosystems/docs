import type { OpenAPIDocument } from '../types';

/**
 * Process an OpenAPI document for use with our custom components.
 * This is a placeholder for future enhancements like:
 * - Dereferencing $ref pointers
 * - Validating the OpenAPI schema
 * - Transforming to a normalized format
 */
export async function processOpenAPIDocument(
  input: string | OpenAPIDocument,
): Promise<OpenAPIDocument> {
  // For now, just return the document as-is
  // In the future, we can use fumadocs' processDocument for advanced processing

  if (typeof input === 'string') {
    throw new Error('String input should be handled by APIPage directly');
  }

  return input;
}

/**
 * Dereference $ref pointers in a schema
 * This is a simplified version - in production you'd want to use a library
 */
export function dereferenceSchema(schema: any, definitions: any = {}): any {
  if (!schema || typeof schema !== 'object') {
    return schema;
  }

  if (schema.$ref) {
    const refPath = schema.$ref.replace('#/components/schemas/', '');
    return definitions[refPath] || schema;
  }

  // Recursively process nested objects
  const result: any = {};
  for (const [key, value] of Object.entries(schema)) {
    if (Array.isArray(value)) {
      result[key] = value.map((item) => dereferenceSchema(item, definitions));
    } else if (typeof value === 'object') {
      result[key] = dereferenceSchema(value, definitions);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Build an example object from a schema definition by extracting example values
 * from individual properties
 */
export function buildExampleFromSchema(schema: any, propertyName?: string): any {
  if (!schema || typeof schema !== 'object') {
    return null;
  }

  // Handle schema with explicit example
  if (schema.example !== undefined) {
    return schema.example;
  }

  // Handle different schema types
  if (schema.type === 'object' && schema.properties) {
    const example: Record<string, any> = {};

    for (const [key, propSchema] of Object.entries(schema.properties)) {
      const propExample = buildExampleFromSchema(propSchema as any, key);
      if (propExample !== null) {
        example[key] = propExample;
      }
    }

    return Object.keys(example).length > 0 ? example : null;
  }

  if (schema.type === 'array' && schema.items) {
    const itemExample = buildExampleFromSchema(schema.items, propertyName);
    return itemExample !== null ? [itemExample] : null;
  }

  // Handle anyOf/oneOf/allOf
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    // Try to build example from first schema in anyOf
    for (const subSchema of schema.anyOf) {
      const example = buildExampleFromSchema(subSchema, propertyName);
      if (example !== null) return example;
    }
  }

  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    for (const subSchema of schema.oneOf) {
      const example = buildExampleFromSchema(subSchema, propertyName);
      if (example !== null) return example;
    }
  }

  if (schema.allOf && Array.isArray(schema.allOf)) {
    // Merge examples from all schemas in allOf
    let mergedExample: any = {};
    let hasExample = false;

    for (const subSchema of schema.allOf) {
      const example = buildExampleFromSchema(subSchema, propertyName);
      if (example !== null && typeof example === 'object' && !Array.isArray(example)) {
        mergedExample = { ...mergedExample, ...example };
        hasExample = true;
      }
    }

    return hasExample ? mergedExample : null;
  }

  // Generate default examples based on type and format
  if (schema.type) {
    switch (schema.type) {
      case 'string':
        if (schema.enum && schema.enum.length > 0) {
          return schema.enum[0];
        }

        // Check property name for context
        if (propertyName) {
          const propLower = propertyName.toLowerCase();
          if (
            propLower === 'principal' ||
            propLower === 'address' ||
            propLower === 'sender' ||
            propLower === 'recipient' ||
            propLower === 'locked_address'
          ) {
            return 'SP318Q55DEKHRXJK696033DQN5C54D9K2EE6DHRWP';
          }
          if (
            propLower === 'contract_id' ||
            propLower === 'asset_id' ||
            propLower.includes('contract')
          ) {
            return 'SP000000000000000000002Q6VF78.pox-3';
          }
          if (propLower === 'tx_id' || propLower === 'txid' || propLower.includes('transaction')) {
            return '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
          }
          if (
            propLower === 'block_hash' ||
            propLower === 'index_block_hash' ||
            propLower === 'microblock_hash'
          ) {
            return '0x4839a8b01cfb39ffcc0d07d3db31e848d5adf5279d529ed5062300b9f353ff79';
          }
          if (propLower === 'error' || propLower === 'message') {
            return 'Error message';
          }
          if (propLower === 'status') {
            return 'success';
          }
          if (propLower === 'event_type') {
            return 'stx_asset';
          }
          if (propLower === 'asset_event_type') {
            return 'transfer';
          }
          if (propLower === 'server_version') {
            return 'stacks-node 2.4.0.0.0 (feat/next-prod:7b89660d, release build, linux [x86_64])';
          }
          if (propLower === 'memo') {
            return '';
          }
          if (propLower === 'topic') {
            return 'print';
          }
          if (propLower === 'hex') {
            return '0x1234';
          }
          if (propLower === 'repr') {
            return 'value representation';
          }
        }

        // Check for specific field names that might give us context
        if (schema.title || schema.description) {
          const context = ((schema.title || '') + ' ' + (schema.description || '')).toLowerCase();
          if (context.includes('address') || context.includes('principal')) {
            return 'SP318Q55DEKHRXJK696033DQN5C54D9K2EE6DHRWP';
          }
          if (context.includes('contract')) {
            return 'SP000000000000000000002Q6VF78.pox-3';
          }
          if (context.includes('tx') || context.includes('transaction')) {
            return '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
          }
          if (context.includes('block') && context.includes('hash')) {
            return '0x4839a8b01cfb39ffcc0d07d3db31e848d5adf5279d529ed5062300b9f353ff79';
          }
          if (context.includes('error')) {
            return 'Error message';
          }
        }

        if (schema.format === 'date-time') return '2024-01-01T00:00:00Z';
        if (schema.format === 'date') return '2024-01-01';
        if (schema.format === 'email') return 'user@example.com';
        if (schema.format === 'uri') return 'https://example.com';
        if (schema.pattern) {
          // Try to match common patterns
          if (schema.pattern.includes('STX') || schema.pattern.includes('SP')) {
            return 'SP318Q55DEKHRXJK696033DQN5C54D9K2EE6DHRWP';
          }
          if (schema.pattern.includes('0x')) {
            return '0x1234567890abcdef';
          }
        }
        return 'string';

      case 'integer':
      case 'number':
        if (schema.example !== undefined) return schema.example;
        if (schema.default !== undefined) return schema.default;

        // Check property name for context
        if (propertyName) {
          const propLower = propertyName.toLowerCase();
          if (
            propLower.includes('height') ||
            propLower === 'block_height' ||
            propLower === 'burn_block_height' ||
            propLower === 'unlock_height'
          ) {
            return 144000;
          }
          if (
            propLower === 'amount' ||
            propLower === 'locked_amount' ||
            propLower.includes('balance')
          ) {
            return '1000000';
          }
          if (propLower === 'limit') {
            return 20;
          }
          if (propLower === 'offset') {
            return 0;
          }
          if (propLower === 'total' || propLower === 'count') {
            return 1;
          }
          if (propLower === 'event_index') {
            return 0;
          }
          if (propLower === 'microblock_sequence') {
            return 0;
          }
          if (propLower.includes('unlock') && propLower.includes('height')) {
            return 0;
          }
        }

        // Check for specific field names in schema
        if (schema.title || schema.description) {
          const context = ((schema.title || '') + ' ' + (schema.description || '')).toLowerCase();
          if (context.includes('height') || context.includes('block')) {
            return 144000;
          }
          if (context.includes('amount') || context.includes('balance')) {
            return '1000000';
          }
          if (context.includes('limit')) {
            return 20;
          }
          if (context.includes('offset')) {
            return 0;
          }
          if (context.includes('total') || context.includes('count')) {
            return 1;
          }
        }

        if (schema.minimum !== undefined) return schema.minimum;
        return schema.type === 'integer' ? 0 : 0.0;

      case 'boolean':
        return schema.default !== undefined ? schema.default : false;
    }
  }

  // If no type is specified but we have properties, treat it as an object
  if (schema.properties && typeof schema.properties === 'object') {
    const example: Record<string, any> = {};

    for (const [key, propSchema] of Object.entries(schema.properties)) {
      const propExample = buildExampleFromSchema(propSchema as any, key);
      if (propExample !== null) {
        example[key] = propExample;
      }
    }

    return Object.keys(example).length > 0 ? example : null;
  }

  return null;
}

/**
 * Infer a schema from an example value
 */
export function inferSchemaFromExample(example: any): any {
  if (example === null || example === undefined) {
    return { type: 'null' };
  }

  if (Array.isArray(example)) {
    // For arrays, infer schema from first item
    const items = example.length > 0 ? inferSchemaFromExample(example[0]) : { type: 'any' };
    return {
      type: 'array',
      items,
      example,
    };
  }

  if (typeof example === 'object') {
    const properties: Record<string, any> = {};
    const required: string[] = [];

    for (const [key, value] of Object.entries(example)) {
      properties[key] = inferSchemaFromExample(value);
      // Assume all properties in example are required
      required.push(key);
    }

    return {
      type: 'object',
      properties,
      required,
      example,
    };
  }

  // Primitive types
  const type = typeof example;

  if (type === 'number') {
    return {
      type: Number.isInteger(example) ? 'integer' : 'number',
      example,
    };
  }

  if (type === 'boolean') {
    return {
      type: 'boolean',
      example,
    };
  }

  if (type === 'string') {
    // Try to detect special string formats
    const schema: any = { type: 'string', example };

    // Check for common patterns
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(example)) {
      schema.format = 'date-time';
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(example)) {
      schema.format = 'date';
    } else if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(example)) {
      schema.format = 'email';
    } else if (/^https?:\/\//.test(example)) {
      schema.format = 'uri';
    } else if (/^0x[a-fA-F0-9]+$/.test(example)) {
      // Hex string
      schema.pattern = '^0x[a-fA-F0-9]+$';
    }

    return schema;
  }

  return { type: 'any', example };
}

/**
 * Process a request body to ensure it has a schema
 * If no schema exists but an example does, infer the schema
 */
export function processRequestBody(requestBody: any): any {
  if (!requestBody || !requestBody.content) {
    return requestBody;
  }

  const processedContent: Record<string, any> = {};

  for (const [contentType, content] of Object.entries(requestBody.content)) {
    const processedMediaType = { ...(content as any) };

    // If there's no schema but there's an example, infer the schema
    if (!processedMediaType.schema && processedMediaType.example) {
      processedMediaType.schema = inferSchemaFromExample(processedMediaType.example);
    }

    processedContent[contentType] = processedMediaType;
  }

  return {
    ...requestBody,
    content: processedContent,
  };
}
