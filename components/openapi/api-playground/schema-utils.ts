type JSONSchema = {
  type?: string | string[];
  anyOf?: JSONSchema[];
  oneOf?: JSONSchema[];
  allOf?: JSONSchema[];
  [key: string]: any;
};

interface CoerceOptions {
  strict?: boolean;
  fieldName?: string;
}

const COMPOSITE_KEYS: Array<'anyOf' | 'oneOf' | 'allOf'> = ['anyOf', 'oneOf', 'allOf'];

const normalizeType = (schemaType?: string | string[]) => {
  if (!schemaType) return undefined;
  if (typeof schemaType === 'string') {
    return schemaType === 'null' ? undefined : schemaType;
  }
  if (Array.isArray(schemaType)) {
    return schemaType.find((type) => type !== 'null');
  }
  return undefined;
};

export const resolveEffectiveSchema = (schema?: JSONSchema): JSONSchema | undefined => {
  if (!schema) return undefined;

  const normalizedType = normalizeType(schema.type);
  if (normalizedType) {
    return { ...schema, type: normalizedType };
  }

  for (const key of COMPOSITE_KEYS) {
    const candidates = schema[key];
    if (!Array.isArray(candidates)) continue;

    for (const candidate of candidates) {
      const resolved = resolveEffectiveSchema(candidate);
      if (resolved?.type && resolved.type !== 'null') {
        return resolved;
      }
    }

    if (candidates.length > 0) {
      return candidates[0];
    }
  }

  return schema;
};

const formatErrorMessage = (fieldName: string | undefined, message: string) =>
  fieldName ? `${fieldName} ${message}` : message;

export const coerceValueForSchema = (
  rawValue: string,
  schema?: JSONSchema,
  options?: CoerceOptions,
) => {
  if (rawValue === undefined || rawValue === null) return rawValue;
  if (typeof rawValue !== 'string') return rawValue;

  const trimmed = rawValue.trim();
  if (!trimmed) return rawValue;
  if (trimmed === 'null') return null;

  const resolvedSchema = resolveEffectiveSchema(schema);
  const targetType = resolvedSchema?.type;

  if (targetType === 'object' || targetType === 'array') {
    try {
      return JSON.parse(trimmed);
    } catch {
      if (options?.strict) {
        throw new Error(
          formatErrorMessage(
            options.fieldName,
            `must be valid JSON ${targetType === 'array' ? 'array' : 'object'}`,
          ),
        );
      }
      console.warn('Failed to parse JSON body field value. Sending raw string instead.');
      return rawValue;
    }
  }

  if (targetType === 'integer' || targetType === 'number') {
    const parsed = Number(trimmed);
    if (Number.isNaN(parsed)) {
      if (options?.strict) {
        throw new Error(
          formatErrorMessage(
            options.fieldName,
            `must be a valid ${targetType === 'integer' ? 'integer' : 'number'}`,
          ),
        );
      }
      return rawValue;
    }

    if (options?.strict && targetType === 'integer' && !Number.isInteger(parsed)) {
      throw new Error(formatErrorMessage(options.fieldName, 'must be an integer'));
    }

    return parsed;
  }

  if (targetType === 'boolean') {
    if (trimmed.toLowerCase() === 'true') return true;
    if (trimmed.toLowerCase() === 'false') return false;
    if (options?.strict) {
      throw new Error(formatErrorMessage(options.fieldName, 'must be a boolean (true or false)'));
    }
    return rawValue;
  }

  return rawValue;
};
