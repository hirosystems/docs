import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { OpenAPIParameter, OpenAPIRequestBody } from './types';

interface ParametersSectionProps {
  parameters: OpenAPIParameter[];
  requestBody?: OpenAPIRequestBody;
}

export function ParametersSection({ parameters, requestBody }: ParametersSectionProps) {
  const pathParams = parameters.filter((p) => p.in === 'path');
  const queryParams = parameters.filter((p) => p.in === 'query');
  const headerParams = parameters.filter((p) => p.in === 'header');
  const cookieParams = parameters.filter((p) => p.in === 'cookie');

  const hasAnyParams = parameters.length > 0 || requestBody;
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-normal text-primary">Parameters</h2>

      {!hasAnyParams ? (
        <p className="text-muted-foreground">No parameters.</p>
      ) : (
        <div className="space-y-6">
          {pathParams.length > 0 && <ParameterGroup title="Path" parameters={pathParams} />}

          {queryParams.length > 0 && <ParameterGroup title="Query" parameters={queryParams} />}

          {headerParams.length > 0 && <ParameterGroup title="Headers" parameters={headerParams} />}

          {cookieParams.length > 0 && <ParameterGroup title="Cookies" parameters={cookieParams} />}

          {requestBody && <RequestBodySection requestBody={requestBody} />}
        </div>
      )}
    </div>
  );
}

function ParameterGroup({ title, parameters }: { title: string; parameters: OpenAPIParameter[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-normal text-neutral-800 dark:text-neutral-200">
        {title} Parameters
      </h3>
      <div className="space-y-3">
        {parameters.map((param) => (
          <div key={param.name} className="rounded-lg bg-background border border-border p-4">
            <ParameterItem parameter={param} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ParameterItem({ parameter }: { parameter: OpenAPIParameter }) {
  const type = parameter.schema?.type || 'string';
  const format = parameter.schema?.format;
  const description = parameter.description || parameter.schema?.description;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm text-neutral-800 dark:text-neutral-300">
          {parameter.name}
        </span>
        {parameter.required && (
          <Badge className="font-fono text-xs px-2 py-0.5 bg-[#F7E7E7] text-[#714B4B] border-[#EBC2C2] dark:bg-background dark:text-[#EBC2C2] dark:border-[#EBC2C2]">
            REQUIRED
          </Badge>
        )}
      </div>
      <div className="font-mono text-sm text-muted-foreground">
        {type}
        {format && ` ${format}`}
        {description && ` ${description}`}
      </div>
    </div>
  );
}

function RequestBodySection({ requestBody }: { requestBody: OpenAPIRequestBody }) {
  const contentType = Object.keys(requestBody.content)[0];
  const content = requestBody.content[contentType];
  const schema = content?.schema;
  const hasExample = content?.example !== undefined;

  if (!schema) return null;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-normal text-neutral-800 dark:text-neutral-200 !m-0">Body</h3>
        <span className="text-sm text-muted-foreground font-fono">{contentType}</span>
      </div>
      <div className="space-y-3">
        {schema.type === 'object' && schema.properties ? (
          Object.entries(schema.properties).map(([name, propSchema]: [string, any]) => {
            const constraints = [];
            if (propSchema.format) constraints.push(propSchema.format);
            if (propSchema.minLength) constraints.push(`min: ${propSchema.minLength}`);
            if (propSchema.maxLength) constraints.push(`max: ${propSchema.maxLength}`);
            if (propSchema.minimum !== undefined) constraints.push(`min: ${propSchema.minimum}`);
            if (propSchema.maximum !== undefined) constraints.push(`max: ${propSchema.maximum}`);
            if (propSchema.pattern) constraints.push('pattern');
            if (propSchema.enum) constraints.push(`enum: ${propSchema.enum.join(', ')}`);

            return (
              <div key={name} className="rounded-lg bg-background border border-border p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-neutral-800 dark:text-neutral-300">
                      {name}
                    </span>
                    {schema.required?.includes(name) && (
                      <Badge className="font-fono text-xs px-2 py-0.5 bg-[#F7E7E7] text-[#714B4B] border-[#EBC2C2] dark:bg-background dark:text-[#EBC2C2] dark:border-[#EBC2C2]">
                        REQUIRED
                      </Badge>
                    )}
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">
                    {propSchema.type || 'string'}
                    {constraints.length > 0 && ` ${constraints.join(' ')}`}
                    {propSchema.description && (
                      <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        {propSchema.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg bg-background border border-border p-4">
            <div className="space-y-1">
              <div className="font-mono text-sm text-muted-foreground">
                {schema.type || 'any'}
                {schema.format && ` (${schema.format})`}
              </div>
              {schema.description && (
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {schema.description}
                </div>
              )}
              {hasExample && schema.example && (
                <div className="mt-2">
                  <span className="text-xs text-muted-foreground">Example:</span>
                  <pre className="mt-1 text-xs font-mono bg-muted/30 p-2 rounded">
                    {typeof schema.example === 'object'
                      ? JSON.stringify(schema.example, null, 2)
                      : String(schema.example)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
