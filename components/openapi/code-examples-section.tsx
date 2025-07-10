import React from "react";
import { Code } from "@/components/docskit/code";
import type { OpenAPIOperation } from "./types";
import { generateCodeExamples } from "./utils/code-generator";

interface CodeExamplesSectionProps {
  operation: OpenAPIOperation;
  baseUrl?: string;
}

export async function CodeExamplesSection({
  operation,
  baseUrl = "",
}: CodeExamplesSectionProps) {
  const examples = await generateCodeExamples(operation, baseUrl);

  const curlExample = examples.find((ex) => ex.lang === "bash") || examples[0];

  if (!curlExample) {
    return null;
  }

  const renderedExample = await Code({
    codeblocks: [
      {
        value: curlExample.code,
        lang: curlExample.lang,
        meta: curlExample.title || "",
      },
    ],
    flags: "c", // Copy button
    className: "mt-0",
  });

  return <div className="space-y-2">{renderedExample}</div>;
}
