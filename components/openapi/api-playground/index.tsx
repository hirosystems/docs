'use client';

import { cvToJSON, cvToString, hexToCV } from '@stacks/transactions';
import { ChevronDown, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { CodeSync } from '@/components/docskit/code';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { OpenAPIOperation } from '../types';
import { RequestBuilder } from './request-builder';
import { executeRequest } from './request-executor';

interface APIPlaygroundProps {
  operation: OpenAPIOperation;
  baseUrl?: string;
  clarityConversion?: boolean;
  playgroundOptions?: {
    proxyUrl?: string;
    defaultAuth?: {
      type: 'bearer' | 'api-key';
      value: string;
      headerName?: string;
    };
  };
}

interface APIResponse {
  status: number;
  statusText?: string;
  headers?: Record<string, any>;
  data?: any;
  time?: number;
  error?: string;
}

export function APIPlayground({
  operation,
  baseUrl = '',
  clarityConversion = false,
  playgroundOptions,
}: APIPlaygroundProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<APIResponse | null>(null);

  const getInitialFormData = () => {
    const initialData: Record<string, any> = {};

    // Add example values for parameters
    if (operation.parameters) {
      for (const param of operation.parameters) {
        if (param.example !== undefined) {
          initialData[param.name] = param.example.toString();
        }
      }
    }

    // Add example values for request body
    if (operation.requestBody) {
      const bodySchema = operation.requestBody.content?.['application/json']?.schema;
      if (bodySchema?.type === 'object' && bodySchema.properties) {
        const exampleBody = operation.requestBody.content?.['application/json']?.example;
        if (exampleBody && typeof exampleBody === 'object') {
          for (const [key, value] of Object.entries(exampleBody)) {
            initialData[`body.${key}`] = typeof value === 'string' ? value : JSON.stringify(value);
          }
        }
      }
    }

    return initialData;
  };

  const [formData, setFormData] = useState<Record<string, any>>(getInitialFormData());
  const [openSections, setOpenSections] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const pathParams = operation.parameters?.filter((p) => p.in === 'path') || [];
  const queryParams = operation.parameters?.filter((p) => p.in === 'query') || [];
  const headerParams = operation.parameters?.filter((p) => p.in === 'header') || [];
  const hasRequestBody = !!operation.requestBody;

  const buildDisplayUrl = () => {
    let path = operation.path;

    if (operation.parameters) {
      for (const param of operation.parameters) {
        if (param.in === 'path' && formData[param.name]) {
          path = path.replace(`{${param.name}}`, formData[param.name]);
        }
      }
    }

    const queryParams = operation.parameters?.filter(
      (p) => p.in === 'query' && formData[p.name] && formData[p.name].trim() !== '',
    );
    const queryString =
      queryParams && queryParams.length > 0
        ? `?${queryParams
            .map((p) => `${p.name}=${encodeURIComponent(formData[p.name])}`)
            .join('&')}`
        : '';

    return `${path}${queryString}`;
  };

  const buildUrl = () => {
    const displayUrl = buildDisplayUrl();
    return `${baseUrl || 'https://api.hiro.so'}${displayUrl}`;
  };

  const fullUrl = buildUrl();
  const displayUrl = buildDisplayUrl();
  const hasParameters =
    pathParams.length > 0 || queryParams.length > 0 || headerParams.length > 0 || hasRequestBody;

  const isFormValid = () => {
    // Check required path parameters
    if (pathParams.some((p) => p.required && !formData[p.name])) {
      return false;
    }

    if (queryParams.some((p) => p.required && !formData[p.name])) {
      return false;
    }

    if (headerParams.some((p) => p.required && !formData[p.name])) {
      return false;
    }

    if (operation.requestBody?.required) {
      const bodySchema = operation.requestBody.content?.['application/json']?.schema;
      if (bodySchema?.type === 'object' && bodySchema.properties) {
        const hasRequiredBodyFields = Object.entries(bodySchema.properties).some(
          ([propName, propSchema]: [string, any]) =>
            bodySchema.required?.includes(propName) && !formData[`body.${propName}`],
        );
        if (hasRequiredBodyFields) {
          return false;
        }
      }
    }

    return true;
  };

  const handleSend = async () => {
    const requiredSections = [];
    if (pathParams.some((p) => p.required && !formData[p.name])) requiredSections.push('path');
    if (queryParams.some((p) => p.required && !formData[p.name])) requiredSections.push('query');
    if (headerParams.some((p) => p.required && !formData[p.name])) requiredSections.push('header');

    if (operation.requestBody?.required) {
      const bodySchema = operation.requestBody.content?.['application/json']?.schema;
      if (bodySchema?.type === 'object' && bodySchema.properties) {
        const hasRequiredBodyFields = Object.entries(bodySchema.properties).some(
          ([propName, propSchema]: [string, any]) =>
            bodySchema.required?.includes(propName) && !formData[`body.${propName}`],
        );
        if (hasRequiredBodyFields) {
          requiredSections.push('body');
        }
      }
    }

    if (requiredSections.length > 0 && openSections.length === 0) {
      setOpenSections(requiredSections);
      return;
    }

    let finalFormData = { ...formData };
    if (operation.requestBody) {
      const bodySchema = operation.requestBody.content?.['application/json']?.schema;
      if (bodySchema?.type === 'object' && bodySchema.properties) {
        const bodyObject: Record<string, any> = {};

        for (const [propName, propSchema] of Object.entries(bodySchema.properties) as [
          string,
          any,
        ][]) {
          const fieldValue = formData[`body.${propName}`];
          if (fieldValue !== undefined && fieldValue !== '') {
            // Special handling for arguments array
            if (propName === 'arguments' && propSchema.type === 'array' && clarityConversion) {
              try {
                // Import needed functions inline
                const { Cl, cvToHex } = await import('@stacks/transactions');

                // Parse arguments helper
                const parseArgs = (input: string): any[] => {
                  const trimmed = input.trim();
                  if (!trimmed) return [];

                  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                    try {
                      return JSON.parse(trimmed);
                    } catch {
                      const content = trimmed.slice(1, -1).trim();
                      return content ? [content] : [];
                    }
                  }
                  return [trimmed];
                };

                // Convert argument helper
                const convertArg = (arg: any): any => {
                  if (Array.isArray(arg)) {
                    return Cl.list(arg.map((item) => convertArg(item)));
                  }
                  if (typeof arg === 'number') {
                    return arg < 0 ? Cl.int(arg) : Cl.uint(arg);
                  }
                  if (typeof arg === 'boolean') {
                    return Cl.bool(arg);
                  }
                  if (typeof arg === 'string') {
                    if (/^(SP|ST)[A-Z0-9]{38,39}/.test(arg)) {
                      if (arg.includes('.')) {
                        const [address, contract] = arg.split('.');
                        return Cl.contractPrincipal(address, contract);
                      }
                      return Cl.standardPrincipal(arg);
                    }
                    return Cl.stringAscii(arg);
                  }
                  return Cl.stringAscii(String(arg));
                };

                const argValues = parseArgs(fieldValue);
                bodyObject[propName] = argValues.map((arg) => {
                  const cv = convertArg(arg);
                  return cvToHex(cv);
                });
              } catch (error) {
                console.error('Failed to convert arguments:', error);
                bodyObject[propName] = fieldValue;
              }
            } else if (propName === 'sender') {
              // Sender stays as string
              bodyObject[propName] = fieldValue;
            } else {
              // Other fields - no conversion for now
              bodyObject[propName] = fieldValue;
            }
          }
        }

        finalFormData = {
          ...finalFormData,
          body: JSON.stringify(bodyObject, null, 2),
        };

        // Remove individual body fields
        for (const key of Object.keys(formData)) {
          if (key.startsWith('body.')) {
            delete finalFormData[key];
          }
        }
      }
    }

    handleSubmit(finalFormData);
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    try {
      const result = await executeRequest(
        operation,
        formData,
        baseUrl || 'https://api.hiro.so',
        clarityConversion,
        {
          proxyUrl: playgroundOptions?.proxyUrl,
          auth: playgroundOptions?.defaultAuth,
        },
      );
      setResponse(result);
    } catch (error) {
      setResponse({
        error: error instanceof Error ? error.message : 'Request failed',
        status: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded bg-background border border-border overflow-hidden">
      <div
        className={cn('px-3 py-2 bg-card border-b border-border', !hasParameters && 'border-b-0')}
      >
        <div className="flex items-center gap-2">
          <MethodBadge method={operation.method} />
          <input
            type="text"
            value={displayUrl}
            readOnly
            className="flex-1 bg-transparent text-sm font-mono text-muted-foreground outline-none"
          />
          <Button
            onClick={handleSend}
            disabled={loading || !isFormValid()}
            className="h-8 px-3 bg-white dark:bg-neutral-700 border text-primary-foreground font-medium text-sm hover:enabled:bg-white/25 dark:hover:enabled:bg-neutral-800 hover:disabled:bg-white/50 dark:hover:disabled:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto"
          >
            {loading ? (
              <span className="flex items-center gap-2 pointer-events-none">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2 pointer-events-none">
                <Play className="h-3 w-3 fill-current" />
                Send
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Parameters sections - integrated into the same component */}
      {hasParameters && (
        <div>
          {/* Path Parameters */}
          {pathParams.length > 0 && (
            <Collapsible
              open={openSections.includes('path')}
              onOpenChange={(open) => {
                setOpenSections((prev) =>
                  open ? [...prev, 'path'] : prev.filter((s) => s !== 'path'),
                );
              }}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 transition-colors last:rounded-b">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  <span className="font-fono text-sm font-medium">Path Parameters</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-4">
                <RequestBuilder
                  operation={{ parameters: pathParams } as any}
                  onSubmit={() => {}}
                  clarityConversion={clarityConversion}
                  loading={false}
                  formData={formData}
                  setFormData={setFormData}
                  isPartial={true}
                />
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Query Parameters */}
          {queryParams.length > 0 && (
            <Collapsible
              open={openSections.includes('query')}
              onOpenChange={(open) => {
                setOpenSections((prev) =>
                  open ? [...prev, 'query'] : prev.filter((s) => s !== 'query'),
                );
              }}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 transition-colors last:rounded-b">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  <span className="font-fono text-sm font-medium">Query Parameters</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 pt-0">
                <RequestBuilder
                  operation={{ parameters: queryParams } as any}
                  onSubmit={() => {}}
                  clarityConversion={clarityConversion}
                  loading={false}
                  formData={formData}
                  setFormData={setFormData}
                  isPartial={true}
                />
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Headers */}
          {headerParams.length > 0 && (
            <Collapsible
              open={openSections.includes('header')}
              onOpenChange={(open) => {
                setOpenSections((prev) =>
                  open ? [...prev, 'header'] : prev.filter((s) => s !== 'header'),
                );
              }}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 transition-colors last:rounded-b">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  <span className="font-fono text-sm font-medium">Headers</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 pt-0">
                <RequestBuilder
                  operation={{ parameters: headerParams } as any}
                  onSubmit={() => {}}
                  clarityConversion={clarityConversion}
                  loading={false}
                  formData={formData}
                  setFormData={setFormData}
                  isPartial={true}
                />
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Request Body */}
          {hasRequestBody && (
            <Collapsible
              open={openSections.includes('body')}
              onOpenChange={(open) => {
                setOpenSections((prev) =>
                  open ? [...prev, 'body'] : prev.filter((s) => s !== 'body'),
                );
              }}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 transition-colors last:rounded-b">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  <span className="font-fono text-sm font-medium">Request Body</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 pt-0">
                <RequestBuilder
                  operation={{ requestBody: operation.requestBody } as any}
                  onSubmit={() => {}}
                  clarityConversion={clarityConversion}
                  loading={false}
                  formData={formData}
                  setFormData={setFormData}
                  isPartial={true}
                />
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Response section */}
          {response && (
            <div className="border-t border-border px-4 py-4">
              {response.status && (
                <Badge
                  className={cn(
                    'inline-flex items-center rounded border transition-colors font-fono text-xs px-1.5 py-0 h-5',
                    response.status >= 200 && response.status < 300
                      ? 'bg-[#e7f7e7] text-[#4B714D] border-[#c2ebc4] dark:bg-background dark:text-[#c2ebc4] dark:border-[#c2ebc4]'
                      : 'bg-[#ffe7e7] text-[#8A4B4B] border-[#ffc2c2] dark:bg-background dark:text-[#ffc2c2] dark:border-[#ffc2c2]',
                  )}
                >
                  {response.status} {response.statusText || ''}
                </Badge>
              )}
              {response.error ? (
                <div className="text-sm text-red-600 dark:text-red-400">{response.error}</div>
              ) : response.data ? (
                <ResponseBody data={response.data} clarityConversion={clarityConversion} />
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResponseBody({ data, clarityConversion }: { data: any; clarityConversion?: boolean }) {
  // Check if this is a Clarity response
  const isClarityResponse =
    clarityConversion &&
    data &&
    typeof data === 'object' &&
    'okay' in data &&
    'result' in data &&
    typeof data.result === 'string' &&
    data.result.startsWith('0x');

  if (isClarityResponse) {
    try {
      const clarityValue = hexToCV(data.result);
      const jsonValue = cvToJSON(clarityValue);

      return (
        <CodeSync
          codeblocks={[
            {
              value: JSON.stringify(jsonValue, null, 2),
              lang: 'json',
              meta: '',
            },
          ]}
          flags="c"
          preClassName="max-h-[250px] overflow-y-auto"
        />
      );
    } catch (error) {
      console.error('Failed to parse Clarity value:', error);
    }
  }

  // Regular response
  const displayData = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  return (
    <CodeSync
      codeblocks={[
        {
          value: displayData,
          lang: 'json',
          meta: '',
        },
      ]}
      flags="c"
      preClassName="max-h-[250px] overflow-y-auto"
    />
  );
}

function MethodBadge({ method }: { method: string }) {
  const upperMethod = method.toUpperCase();

  const getMethodClasses = () => {
    const colors = {
      GET: 'bg-[#e7f7e7] text-[#4B714D] border-[#c2ebc4] dark:bg-background dark:text-[#c2ebc4] dark:border-[#c2ebc4]',
      POST: 'bg-[#e7f0ff] text-[#4B5F8A] border-[#c2d9ff] dark:bg-background dark:text-[#c2d9ff] dark:border-[#c2d9ff]',
      PUT: 'bg-[#fff4e7] text-[#8A6B4B] border-[#ffd9c2] dark:bg-background dark:text-[#ffd9c2] dark:border-[#ffd9c2]',
      PATCH:
        'bg-[#fffce7] text-[#8A864B] border-[#fff9c2] dark:bg-background dark:text-[#fff9c2] dark:border-[#fff9c2]',
      DELETE:
        'bg-[#ffe7e7] text-[#8A4B4B] border-[#ffc2c2] dark:bg-background dark:text-[#ffc2c2] dark:border-[#ffc2c2]',
    };

    return (
      colors[upperMethod as keyof typeof colors] ||
      'bg-[#f5f5f5] text-[#666666] border-[#d4d4d4] dark:bg-background dark:text-[#d4d4d4] dark:border-[#d4d4d4]'
    );
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded px-2 py-1 text-xs font-semibold border',
        getMethodClasses(),
      )}
    >
      {upperMethod}
    </span>
  );
}
