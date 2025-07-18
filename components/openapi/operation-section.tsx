import React from "react";
import { cn } from "@/lib/utils";
import type { OpenAPIOperation } from "./types";
import { ParametersSection } from "./parameters-section";
import { ResponseTable } from "./response-table";
import { CodeExamplesSection } from "./code-examples-section";
import { ResponseTabs } from "./response-tabs";
import { APIPlayground } from "./api-playground";

interface OperationSectionProps {
  operation: OpenAPIOperation;
  servers?: Array<{ url: string; description?: string }>;
  enablePlayground?: boolean;
  clarityConversion?: boolean;
  hasHead?: boolean;
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

export async function OperationSection({
  operation,
  servers,
  enablePlayground,
  clarityConversion,
  hasHead,
  playgroundOptions,
  baseUrl: baseUrlOverride,
}: OperationSectionProps) {
  const baseUrl = baseUrlOverride || servers?.[0]?.url || "";

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {enablePlayground && (
            <APIPlayground
              operation={operation}
              baseUrl={baseUrl}
              clarityConversion={clarityConversion}
              playgroundOptions={playgroundOptions}
            />
          )}

          {!hasHead && (
            <div className="space-y-2">
              {/* <h1 className="text-2xl font-bold">
                {operation.summary || `${operation.method} ${operation.path}`}
              </h1> */}
              {/* <p className="text-muted-foreground">{operation.description}</p> */}
            </div>
          )}

          <ParametersSection
            parameters={operation.parameters || []}
            requestBody={operation.requestBody}
          />
          <ResponseTable responses={operation.responses || {}} />
        </div>

        <div className="space-y-6">
          <CodeExamplesSection operation={operation} baseUrl={baseUrl} />
          <ResponseTabs responses={operation.responses || {}} />
        </div>
      </div>
    </section>
  );
}

function MethodBadge({ method }: { method: string }) {
  const upperMethod = method.toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold",
        upperMethod === "GET" &&
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        upperMethod === "POST" &&
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        upperMethod === "PUT" &&
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        upperMethod === "DELETE" &&
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        upperMethod === "PATCH" &&
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        !["GET", "POST", "PUT", "DELETE", "PATCH"].includes(upperMethod) &&
          "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      )}
    >
      {upperMethod}
    </span>
  );
}
