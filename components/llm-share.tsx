"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Copy, ExternalLink, Check, FileText } from "lucide-react";
import { OpenAIIcon, ClaudeIcon } from "@/components/ui/icon";
import { useLLMsTxt, useCurrentPageMarkdown } from "@/hooks/use-llms-txt";
import { processMarkdownLinks } from "@/utils/process-markdown-links";

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
  const markdownUrl = useCurrentPageMarkdown();
  const { data: llmsTxtContent, refetch } = useLLMsTxt();

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
      // Process the markdown to convert relative links to absolute URLs
      const processedContent = processMarkdownLinks(content);
      await navigator.clipboard.writeText(processedContent);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleViewRawMarkdown = () => {
    if (!pathname) return;

    // Construct the markdown path
    let mdPath = pathname;
    if (mdPath.startsWith("/docs")) {
      mdPath = mdPath.substring(5);
    }

    if (!mdPath || mdPath === "/") {
      mdPath = "/index";
    }

    // Open the .md version
    window.open(`${mdPath}.md`, "_blank");
  };

  const handleShare = async (provider: (typeof LLM_PROVIDERS)[number]) => {
    try {
      // Create simple instruction with just the current page
      const instruction = `Read from ${markdownUrl} so I can ask questions about it.`;

      const encodedInstruction = encodeURIComponent(instruction);
      const shareUrl = `${provider.url}?q=${encodedInstruction}`;

      window.open(shareUrl, "_blank");

      // Optionally prefetch the section-specific llms.txt for next time
      refetch();
    } catch (error) {
      console.error("[LLMShare] Failed to share:", error);
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
