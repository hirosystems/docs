"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Code } from "@/components/docskit/code";
import { initSimnet } from "@hirosystems/clarinet-sdk-browser";
import { Cl } from "@stacks/transactions";

interface SnippetResultProps {
  code: string;
}

export function SnippetResult({ code }: SnippetResultProps) {
  const [result, setResult] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  console.log({ result });

  async function runCode() {
    setIsLoading(true);
    setResult(null);

    try {
      const simnet = await initSimnet();
      await simnet.initEmtpySession();
      simnet.setEpoch("3.0");

      const result = simnet.runSnippet(code) as string;
      const deserializedResult = Cl.deserialize(result);
      const prettyResult = Cl.prettyPrint(deserializedResult, 2);

      // Add a 2-second delay before updating the result
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setResult(prettyResult);
    } catch (error) {
      console.error("Error running code snippet:", error);
      setResult("An error occurred while running the code snippet.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="gap-2"
          size="sm"
          onClick={runCode}
          disabled={isLoading}
        >
          <Play className="w-4 h-4" />
          {isLoading ? "Running..." : "Run code snippet"}
        </Button>
        <Button className="gap-2" size="sm" asChild>
          <Link
            href={`https://play.hiro.so/?epoch=3.0&snippet=KGRlZmluZS1yZWFkLW9ubHkgKGdldC10ZW51cmUtaGVpZ2h0IChibG9jayB1aW50KSkKICAob2sKICAgIChhdC1ibG9jawogICAgICAodW53cmFwIQogICAgICAgIChnZXQtc3RhY2tzLWJsb2NrLWluZm8_IGlkLWhlYWRlci1oYXNoIGJsb2NrKQogICAgICAgIChlcnIgdTQwNCkKICAgICAgKQogICAgICB0ZW51cmUtaGVpZ2h0CiAgICApCiAgKQop`}
            target="_blank"
          >
            Open in Clarity Playground <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      {result && (
        <div
          className="flex bg-ch-code p-2 rounded text-sm leading-6 font-mono whitespace-pre-wrap"
          data-active="false"
        >
          <span className="ch-terminal-content break-all">
            <div>
              <div className="indent-0 ml-0">
                <span className="indent-0 text-[var(--ch-4)]">{result}</span>
              </div>
            </div>
          </span>
        </div>
      )}
    </div>
  );
}
