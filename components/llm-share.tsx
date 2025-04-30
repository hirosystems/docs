"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Copy, ExternalLink, Check, FileText } from "lucide-react";
import { OpenAIIcon, ClaudeIcon } from "@/components/ui/icon";

interface LLMShareProps {
  content: string;
}

const LLM_PROVIDERS = [
  {
    name: "ChatGPT",
    url: "https://chat.openai.com",
    icon: OpenAIIcon,
    description: "Ask questions about this page",
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    icon: ClaudeIcon,
    description: "Ask questions about this page",
  },
];

export function LLMShare({ content }: LLMShareProps) {
  const [isCopied, setIsCopied] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Function to open the raw markdown view (browser-compatible)
  const handleViewRawMarkdown = () => {
    if (!pathname) return;

    // Assuming paths start like /docs/...
    let basePath = pathname;
    if (basePath.startsWith("/docs")) {
      basePath = basePath.substring(5); // Remove '/docs' prefix
    }

    // Construct the /raw path
    let rawPath =
      "/raw" + (basePath.startsWith("/") ? basePath : "/" + basePath);

    // Append .mdx or /index.mdx
    if (rawPath === "/raw" || rawPath.endsWith("/")) {
      // Handle root case (e.g. /docs/ -> /raw/index.mdx) or trailing slash (/docs/section/ -> /raw/section/index.mdx)
      rawPath = rawPath.endsWith("/")
        ? rawPath + "index.mdx"
        : "/raw/index.mdx";
    } else {
      // Append .mdx to non-index paths
      rawPath += ".mdx";
    }

    // Clean up potential double slashes
    rawPath = rawPath.replace(/\/+/g, "/");

    window.open(rawPath, "_blank");
  };

  const handleShare = async (
    provider: Omit<(typeof LLM_PROVIDERS)[number], "prepend">
  ) => {
    let llmsApiPath = "/api/llms/llms.txt"; // Default to root

    if (pathname) {
      const pathSegments = pathname.split("/").filter(Boolean); // e.g., ['docs', 'stacks', 'clarinet', 'quickstart']

      // Check if it's a docs path and has section/page info
      if (pathSegments[0] === "docs" && pathSegments.length > 1) {
        // Get path segments *after* 'docs'
        const pagePathSegments = pathSegments.slice(1);

        // Get segments for the parent directory (all except the last one)
        const parentDirSegments = pagePathSegments.slice(0, -1);

        if (parentDirSegments.length > 0) {
          // If there are parent directory segments, construct the section path
          llmsApiPath = `/api/llms/${parentDirSegments.join("/")}/llms.txt`;
        } else {
          // If only one segment after 'docs' (e.g., /docs/intro), it belongs to the root context
          llmsApiPath = "/api/llms/llms.txt";
        }
      }
      // else: If path is just '/docs' or doesn't start with '/docs', the default root path is used

      // Clean up potential double slashes
      llmsApiPath = llmsApiPath.replace(/\/+/g, "/");
    }

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const llmsTxtUrl = `${baseUrl}${llmsApiPath}`;

    try {
      const response = await fetch(llmsTxtUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch LLM context (${response.status}) from ${llmsTxtUrl}`
        );
      }
      const llmsTxtContent = await response.text();

      const instruction = `Please use the following documentation context (list of relevant pages) to answer my questions:\n\n${llmsTxtContent}\n\nBe ready to answer my questions about it.`;
      const encodedInstruction = encodeURIComponent(instruction);
      let shareUrl = `${provider.url}`;
      if (provider.name === "ChatGPT") {
        shareUrl += `?q=${encodedInstruction}`;
      } else if (provider.name === "Claude") {
        shareUrl += `?q=${encodedInstruction}`;
      } else {
        shareUrl += `?q=${encodedInstruction}`;
      }

      window.open(shareUrl, "_blank");
    } catch (error) {
      console.error("[LLMShare] Failed to fetch or share LLM context:", error);
    }
  };

  return (
    <div className="inline-flex rounded-md border border-border">
      <Button
        variant="outline"
        onClick={handleCopy}
        className="relative inline-flex items-center gap-2 rounded-l-md rounded-r-none px-3 py-1.5 text-sm font-medium focus:z-10 border-0 shadow-none transition-all duration-150"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        {isCopied ? "Copied!" : "Copy page"}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-label="Share options"
            className="relative inline-flex items-center rounded-r-md rounded-l-none p-1.5 focus:z-10 border-0 border-l border-border shadow-none"
          >
            <span className="sr-only">Open options</span>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuItem onSelect={handleCopy} className="cursor-pointer">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Copy className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Copy page</span>
              </div>
              <span className="text-xs text-muted-foreground ml-6">
                Copy this page as Markdown for LLMs
              </span>
            </div>
          </DropdownMenuItem>
          {/* View as Markdown item - Uncommented and logic added */}
          <DropdownMenuItem
            onSelect={handleViewRawMarkdown}
            className="cursor-pointer"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">View as Markdown</span>
              </div>
              <span className="text-xs text-muted-foreground ml-6">
                View this page as plain text
              </span>
            </div>
            <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {LLM_PROVIDERS.map((provider) => (
            <DropdownMenuItem
              key={provider.name}
              onSelect={() => handleShare(provider)}
              className="cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <provider.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Open in {provider.name}</span>
                </div>
                <span className="text-xs text-muted-foreground ml-6">
                  {provider.description}
                </span>
              </div>
              <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
