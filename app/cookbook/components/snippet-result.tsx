"use client";

import React from "react";
import Link from "next/link";
import { Play, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Code } from "@/components/docskit/code";
import { initSimnet } from "@hirosystems/clarinet-sdk-browser";
import { Cl } from "@stacks/transactions";

interface SnippetResultProps {
  code: string;
  type: string;
}

type OutputItem = {
  type: "command" | "success" | "error" | "log";
  content: string;
};

export function SnippetResult({ code, type }: SnippetResultProps) {
  const [result, setResult] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState<OutputItem[]>([]);
  const outputRef = React.useRef<HTMLDivElement>(null);

  async function runCode() {
    if (isConsoleOpen) {
      setIsConsoleOpen(false);
      return;
    }
    setIsLoading(true);
    setResult(null);

    try {
      const simnet = await initSimnet();
      await simnet.initEmtpySession();
      simnet.setEpoch("3.0");

      const codeExecution = simnet.execute(code);
      const result = codeExecution.result;
      const prettyResult = Cl.prettyPrint(result, 2);
      // console.log("before :", simnet.execute("stacks-block-height"));
      // simnet.executeCommand("::advance_chain_tip 2");
      // console.log("after: ", simnet.execute("stacks-block-height"));

      // Add a 1-second delay before updating the result
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      setResult(prettyResult);
      setIsConsoleOpen(true);
    } catch (error) {
      console.error("Error running code snippet:", error);
      setResult("An error occurred while running the code snippet.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      setOutput([...output, { type: "command", content: input }]);
      setOutput((prev) => [...prev, { type: "success", content: `u1` }]);
      setInput("");
    }
  }

  const getButtonText = () => {
    if (type === "clarity") {
      if (isLoading) return "Loading...";
      if (isConsoleOpen) return "Hide terminal";
      return "Open in terminal";
    }
    return "Run code snippet";
  };

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
          {type === "clarity" ? (
            <Terminal className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {getButtonText()}
        </Button>
        {type === "clarity" && (
          <Button className="gap-2" size="sm" asChild>
            <Link
              href={`https://play.hiro.so/?epoch=3.0&snippet=KGRlZmluZS1yZWFkLW9ubHkgKGdldC10ZW51cmUtaGVpZ2h0IChibG9jayB1aW50KSkKICAob2sKICAgIChhdC1ibG9jawogICAgICAodW53cmFwIQogICAgICAgIChnZXQtc3RhY2tzLWJsb2NrLWluZm8_IGlkLWhlYWRlci1oYXNoIGJsb2NrKQogICAgICAgIChlcnIgdTQwNCkogICAgICApCiAgICAgIHRlbnVyZS1oZWlnaHQKICAgICkKICApCik=`}
              target="_blank"
            >
              Open in Clarity Playground <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
      {result && type !== "clarity" && (
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
      {result && isConsoleOpen && (
        <pre className="min-h-auto bg-ch-code p-2 rounded leading-6 font-mono whitespace-pre-wrap">
          <div ref={outputRef} className="h-full p-2 overflow-y-auto">
            {output.map((item, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {item.type === "command" ? (
                  <div className="flex items-start space-x-2 text-[var(--ch-26)]">
                    <span>$</span>
                    <span className="text-[var(--ch-1)]">{item.content}</span>
                  </div>
                ) : (
                  <div className="pl-0 text-[var(--ch-4)]">{item.content}</div>
                )}
              </div>
            ))}
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2 text-[var(--ch-26)]"
            >
              <span>$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-[var(--ch-1)] focus:outline-none leading-6 font-mono whitespace-pre-wrap"
              />
            </form>
          </div>
        </pre>
      )}
    </div>
  );
}
