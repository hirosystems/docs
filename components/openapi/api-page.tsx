import React from "react";
import { readFile } from "fs/promises";
import { join } from "path";
import type { OpenAPIDocument, OpenAPIOperation } from "./types";
import { OperationSection } from "./operation-section";
import {
  processOpenAPIDocument,
  processRequestBody,
} from "./utils/openapi-processor";

interface APIPageProps {
  document: string | OpenAPIDocument;
  operations?: Array<{ path: string; method: string }>;
  hasHead?: boolean;
  enablePlayground?: boolean;
  clarityConversion?: boolean;
  playgroundOptions?: {
    proxyUrl?: string;
    defaultAuth?: {
      type: "bearer" | "api-key";
      value: string;
      headerName?: string;
    };
  };
  baseUrl?: string;
}

export async function APIPage({
  document,
  operations,
  hasHead = false,
  enablePlayground = true,
  clarityConversion = false,
  playgroundOptions,
  baseUrl,
}: APIPageProps) {
  let apiDoc: OpenAPIDocument;

  if (typeof document === "string") {
    try {
      let filePath = document;

      if (document.startsWith("./")) {
        filePath = join(process.cwd(), document.replace("./", ""));
      }

      const fileContent = await readFile(filePath, "utf-8");
      apiDoc = JSON.parse(fileContent);
    } catch (error) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-destructive">
            Error loading OpenAPI document:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </div>
        </div>
      );
    }
  } else {
    apiDoc = document;
  }

  const selectedOperations = extractOperations(apiDoc, operations);

  return (
    <main className="space-y-8">
      {selectedOperations.map((operation, index) => (
        <React.Fragment key={`${operation.method}-${operation.path}-${index}`}>
          <OperationSection
            operation={operation}
            servers={apiDoc.servers}
            enablePlayground={enablePlayground}
            clarityConversion={clarityConversion}
            hasHead={hasHead}
            playgroundOptions={playgroundOptions}
            baseUrl={baseUrl}
          />
        </React.Fragment>
      ))}
    </main>
  );
}

function extractOperations(
  doc: OpenAPIDocument,
  filter?: Array<{ path: string; method: string }>
): OpenAPIOperation[] {
  const operations: OpenAPIOperation[] = [];

  if (filter && filter.length > 0) {
    for (const { path, method } of filter) {
      const pathItem = doc.paths[path];
      if (pathItem?.[method.toLowerCase()]) {
        const operation = pathItem[method.toLowerCase()];
        const processedOperation = {
          path,
          method: method.toUpperCase(),
          ...operation,
          requestBody: operation.requestBody
            ? processRequestBody(operation.requestBody)
            : undefined,
        };
        operations.push(processedOperation);
      }
    }
  } else {
    for (const [path, pathItem] of Object.entries(doc.paths)) {
      const methods = [
        "get",
        "post",
        "put",
        "delete",
        "patch",
        "options",
        "head",
      ];
      for (const method of methods) {
        if (pathItem[method]) {
          const operation = pathItem[method];
          const processedOperation = {
            path,
            method: method.toUpperCase(),
            ...operation,
            requestBody: operation.requestBody
              ? processRequestBody(operation.requestBody)
              : undefined,
          };
          operations.push(processedOperation);
        }
      }
    }
  }

  return operations;
}
