import { ExternalLink, X, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { APIExport, APIParameter } from './types';
import React from 'react';
import { Code } from '@/components/docskit/code';
import { APICollapsibleClient } from './api-collapsible.client';

interface APISectionProps {
  apiExport: APIExport;
  hasSource?: boolean;
}

export async function APISection({ apiExport, hasSource = true }: APISectionProps) {
  const renderParameters = (parameters: APIParameter[]) => (
    <div className="space-y-6">
      <h3 className="text-lg font-normal text-foreground">Parameters</h3>
      <div className="space-y-4">
        {parameters.map((param, index) => (
          <div key={param.name} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <code className="px-2 py-0.5 bg-neutral-150 dark:bg-neutral-700 rounded text-sm font-mono font-medium">
                {param.name}
              </code>
              {!param.optional && (
                <Badge className="font-fono text-sm px-2 py-0.5 bg-[#F7E7E7] text-[#714B4B] border-[#EBC2C2] dark:bg-background dark:text-[#EBC2C2] dark:border-[#EBC2C2]">
                  REQUIRED
                </Badge>
              )}
              <span className="text-sm text-muted-foreground font-mono">{param.type}</span>
            </div>

            {param.description && (
              <div className="text-sm text-muted-foreground">{param.description}</div>
            )}

            {/* <div className="text-sm">
              <span className="text-muted-foreground">Example: </span>
              <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
                counter
              </code>
            </div> */}

            {param.name === 'options' && <APICollapsibleClient />}
          </div>
        ))}
      </div>
    </div>
  );

  // Get the primary signature (first one) for the main content
  const primarySignature = apiExport.signatures?.[0];

  // Prepare all examples from all signatures
  const allExamples = apiExport.signatures?.flatMap((sig) => sig.examples || []) || [];

  // Pre-render all code examples on the server
  const renderedExamples = await Promise.all(
    allExamples.map(async (example) => {
      return await Code({
        codeblocks: [
          {
            value: example.code.replace(/```\w*\n?/g, '').replace(/```$/g, ''),
            lang: 'typescript',
            meta: '',
          },
        ],
        flags: 'c',
      });
    }),
  );

  return (
    <section
      id={apiExport.name.toLowerCase()}
      className="scroll-mt-[calc(var(--header-height,4rem)+4rem)]"
    >
      {/* Header */}
      <div className="sticky top-[var(--header-height,4rem)] z-10 flex items-center justify-between py-4 bg-gradient-to-b from-background from-85% to-transparent to-100%">
        <div className="flex items-center gap-4">
          <Badge className="px-1.5 py-0.5 bg-neutral-100 border-border dark:bg-neutral-800 font-medium">
            <h2 className="text-lg font-normal text-foreground font-fono !m-0">{apiExport.name}</h2>
          </Badge>
          <span className="text-sm text-muted-foreground font-mono">{apiExport.kind}</span>
        </div>
        {hasSource && apiExport.source && (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary no-underline hover:underline hover:bg-transparent"
          >
            <a href={apiExport.source.url} target="_blank" rel="noopener noreferrer">
              View source
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </Button>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Description and Parameters */}
        <div className="space-y-8">
          {/* Description */}
          <div className="text-sm text-muted-foreground">
            {primarySignature?.description ? (
              <p>{primarySignature.description}</p>
            ) : (
              <p>{apiExport.description || `${apiExport.kind} ${apiExport.name}`}</p>
            )}
          </div>

          {/* Parameters */}
          {primarySignature?.parameters &&
            primarySignature.parameters.length > 0 &&
            renderParameters(primarySignature.parameters)}

          {/* Returns */}
          {primarySignature?.returns && (
            <div className="space-y-3">
              <h3 className="text-lg font-normal text-foreground">Returns</h3>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-mono">
                  {primarySignature.returns.type}
                </div>
                {primarySignature.returns.description && (
                  <div className="text-sm text-muted-foreground">
                    <p>{primarySignature.returns.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Code Examples and Expandable Sections */}
        <div className="space-y-6">
          {/* Code Examples */}
          {renderedExamples.length > 0 && (
            <div>
              <Tabs defaultValue="0" className="w-full">
                <TabsList className="flex items-center flex-wrap gap-2 border-0 bg-transparent h-auto p-0 mb-4">
                  {renderedExamples.map((_, index) => (
                    <TabsTrigger
                      key={index}
                      value={index.toString()}
                      className="font-fono px-2.5 py-1 rounded-full border-0 bg-inverted hover:bg-muted/80 text-sm text-muted-foreground data-[state=active]:bg-inverted data-[state=active]:text-background transition"
                    >
                      {index === 0
                        ? 'Basic usage'
                        : index === 1
                          ? 'With custom domain'
                          : index === 2
                            ? 'With additional parameters'
                            : index === 3
                              ? 'With custom schemas'
                              : index === 4
                                ? 'Custom fetch implementation'
                                : index === 5
                                  ? 'React Native with AsyncStorage'
                                  : index === 6
                                    ? 'React Native with Expo SecureStore'
                                    : `Example ${index + 1}`}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {renderedExamples.map((renderedExample, index) => (
                  <TabsContent key={index} value={index.toString()} className="mt-4">
                    {renderedExample}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {/* Expandable Sections */}
          <div className="space-y-4">
            {/* Source Code */}
            {/* <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-foreground transition-colors group w-full justify-start">
                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                Source code
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-6">
                <div className="text-sm text-muted-foreground">
                  View the source code for this function
                </div>
              </CollapsibleContent>
            </Collapsible> */}

            {/* Response */}
            {/* <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-foreground transition-colors group w-full justify-start">
                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                Response
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-6">
                <div className="text-sm text-muted-foreground">
                  Response format and structure
                </div>
              </CollapsibleContent>
            </Collapsible> */}

            {/* Schema */}
            {/* <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-foreground transition-colors group w-full justify-start">
                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                Schema
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 pl-6">
                <div className="text-sm text-muted-foreground">
                  Data schema and validation rules
                </div>
              </CollapsibleContent>
            </Collapsible> */}
          </div>
        </div>
      </div>
    </section>
  );
}
