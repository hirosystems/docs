import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Code } from '@/components/docskit/code';

interface CollapsibleSchemaProps {
  schema: any;
}

export function CollapsibleSchema({ schema }: CollapsibleSchemaProps) {
  return (
    <div className="rounded-lg border border-border p-4">
      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-2 font-fono text-md font-medium hover:text-foreground transition-colors">
          <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
          Schema
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SchemaContent schema={schema} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

async function SchemaContent({ schema }: { schema: any }) {
  const formattedSchema = formatSchema(schema);

  const codeBlock = await Code({
    codeblocks: [
      {
        value: JSON.stringify(formattedSchema, null, 2),
        lang: 'json',
        meta: '',
      },
    ],
    flags: '',
  });

  return codeBlock;
}

function formatSchema(schema: any): any {
  if (typeof schema !== 'object' || schema === null) {
    return schema;
  }

  const result: any = {};

  for (const [key, value] of Object.entries(schema)) {
    if (key === '$ref') {
      return `Reference: ${value}`;
    }

    if (key === 'properties' && typeof value === 'object') {
      result[key] = {};
      for (const [propKey, propValue] of Object.entries(value as any)) {
        result[key][propKey] = formatSchema(propValue);
      }
      continue;
    }

    if (Array.isArray(value)) {
      result[key] = value.map((item) => formatSchema(item));
      continue;
    }

    if (typeof value === 'object') {
      result[key] = formatSchema(value);
      continue;
    }

    result[key] = value;
  }

  return result;
}
