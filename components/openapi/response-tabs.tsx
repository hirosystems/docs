import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/docskit/code";
import { CollapsibleSchema } from "./collapsible-schema";
import type { OpenAPIResponse } from "./types";
import { buildExampleFromSchema } from "./utils/openapi-processor";

interface ResponseTabsProps {
  responses: Record<string, OpenAPIResponse>;
}

export function ResponseTabs({ responses }: ResponseTabsProps) {
  const responseCodes = Object.keys(responses);

  if (responseCodes.length === 0) {
    return null;
  }

  return (
    <Tabs defaultValue={responseCodes[0]} className="w-full">
      <TabsList className="font-fono h-auto p-0 bg-transparent border-b text-md rounded-none w-full justify-start">
        {responseCodes.map((code) => (
          <TabsTrigger
            key={code}
            value={code}
            className="w-[50px] rounded-none border-b-2 border-transparent px-0 pb-2 mr-6 text-md font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {code}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(responses).map(([code, response]) => (
        <TabsContent key={code} value={code} className="mt-4 space-y-4">
          <ResponseContent response={response} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

async function ResponseContent({ response }: { response: OpenAPIResponse }) {
  const jsonContent = response.content?.["application/json"];
  let example = jsonContent?.example || jsonContent?.examples?.default?.value;
  const schema = jsonContent?.schema;

  if (!example && schema) {
    example = buildExampleFromSchema(schema);
  }

  return (
    <div className="space-y-4">
      {example && <ResponseExample example={example} />}
      {schema && <CollapsibleSchema schema={schema} />}
    </div>
  );
}

async function ResponseExample({ example }: { example: any }) {
  const codeBlock = await Code({
    codeblocks: [
      {
        value: JSON.stringify(example, null, 2),
        lang: "json",
        meta: "Response",
      },
    ],
    flags: "c",
    preClassName: "max-h-[250px] overflow-y-auto",
  });

  return codeBlock;
}
