"use client";

import React from "react";
import Link from "next/link";
import { Play, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Code } from "@/components/docskit/code";
import { initSimnet, type Simnet } from "@hirosystems/clarinet-sdk-browser";
import { Cl } from "@stacks/transactions";
import { loadSandpackClient } from "@codesandbox/sandpack-client";
import type { SandboxSetup } from "@codesandbox/sandpack-client";

import type { Recipe } from "@/types/recipes";

interface SnippetResultProps {
  recipe: Recipe;
  code: string;
  type: string;
  dependencies: {
    [key: string]: string;
  };
}

type OutputItem = {
  type: "command" | "success" | "error" | "log";
  content: string;
};

export function SnippetResult({
  recipe,
  code,
  type,
  dependencies,
}: SnippetResultProps) {
  const [result, setResult] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState<OutputItem[]>([]);
  const [simnetInstance, setSimnetInstance] = React.useState<Simnet | null>(
    null
  );
  const [codeHistory, setCodeHistory] = React.useState<string>("");
  // Add these new states near your other state declarations
  const [commandHistory, setCommandHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState<number>(-1);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const outputRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  React.useEffect(() => {
    if (isConsoleOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isConsoleOpen]);

  async function runCode() {
    if (type === "clarity") {
      if (isConsoleOpen) {
        setIsConsoleOpen(false);
        return;
      }
      setIsLoading(true);
      setResult(null);

      try {
        const simnet = await initSimnet();
        await simnet.initEmtpySession();
        simnet.deployer = "ST000000000000000000002AMW42H";
        const deployer = simnet.deployer;
        console.log("deployer", deployer);
        simnet.setEpoch("3.0");

        // Store the initialized simnet instance
        setSimnetInstance(simnet);
        // Store the initial code in history
        setCodeHistory(code);

        const contract = simnet.deployContract(
          recipe.files[0].name.split(".")[0],
          code,
          { clarityVersion: 3 },
          deployer
        );
        const result = contract.result;
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
    } else {
      const content = {
        files: {
          "/package.json": {
            code: JSON.stringify({
              main: "index.js",
              dependencies: dependencies || {},
            }),
          },
          "/index.js": {
            code: code, // This is the content from your recipe file
          },
        },
        environment: "vanilla",
      };

      const client = await loadSandpackClient(iframeRef.current!, content);
      console.log(client);
    }
  }

  // Add this function to handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      // Add command to history
      setCommandHistory((prev) => [...prev, input.trim()]);
      setHistoryIndex(-1); // Reset history index
      setOutput([...output, { type: "command", content: input }]);
      try {
        if (!simnetInstance) {
          throw new Error("Please run the code snippet first");
        }

        // Check if input is a command (starts with "::")
        if (input.startsWith("::")) {
          const commandResult = simnetInstance.executeCommand(input);

          setOutput((prev) => [
            ...prev,
            {
              type: "success",
              content: commandResult,
            },
          ]);
        } else {
          // Regular Clarity code execution
          const fullCode = `${codeHistory}\n${input}`;
          setCodeHistory(fullCode);
          const codeExecution = simnetInstance.execute(fullCode);
          const result = codeExecution.result;
          const prettyResult = Cl.prettyPrint(result, 2);

          setOutput((prev) => [
            ...prev,
            { type: "success", content: prettyResult },
          ]);
        }
      } catch (error) {
        setOutput((prev) => [
          ...prev,
          { type: "error", content: String(error) },
        ]);
      }

      setInput("");
    }
  }

  const getButtonText = () => {
    if (type === "clarity") {
      if (isLoading) return "Loading...";
      if (isConsoleOpen) return "Close terminal";
      return "Open in terminal";
    }
    return "Run code snippet";
  };

  return (
    <div className="space-y-4">
      <iframe
        ref={iframeRef}
        style={{ display: "none" }}
        title="code-sandbox"
      />
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
        <pre className="h-auto bg-ch-code p-2 rounded leading-6 font-mono whitespace-pre-wrap">
          <div
            ref={outputRef}
            className="h-auto max-h-[225px] p-2 overflow-y-auto"
          >
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
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                autoComplete="off"
                className="flex-1 bg-transparent text-[var(--ch-1)] focus:outline-none leading-6 font-mono whitespace-pre-wrap"
              />
            </form>
          </div>
        </pre>
      )}
    </div>
  );
}
