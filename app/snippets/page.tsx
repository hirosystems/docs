import React from "react";
import { Code } from "@/components/docskit/code";
import { ChevronDown, ChevronUp, Copy, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeGistProps {
  filename: string;
  code: string;
  language?: string;
  unmodifiedLines?: number;
}

interface RawCode {
  value: string;
  lang: string;
  meta: string;
}

const sampleCode: RawCode = {
  value: `(define-public (main)
  (print "Hello, World!"))`,
  lang: "clarity",
  meta: "-cnw",
};

function CodeGist({
  filename,
  code,
  language = "typescript",
  unmodifiedLines = 0,
}: CodeGistProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const lines = code.split("\n");
  const displayedLines = isExpanded ? lines : lines.slice(0, 8);

  return (
    <div className="w-full max-w-4xl rounded-lg border bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b bg-gray-50/50 px-4 py-2">
        <File className="h-4 w-4 text-amber-500" />
        <span className="flex-1 text-sm font-medium text-gray-700">
          {filename}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 text-xs"
          onClick={copyToClipboard}
        >
          <Copy className="h-3 w-3" />
          {isCopied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto bg-white p-4 font-mono">
        <div className="flex flex-col">
          {displayedLines.map((line, index) => (
            <div key={index} className="flex items-start hover:bg-gray-50">
              <div className="mr-4 select-none text-right text-sm text-gray-400 w-12">
                {index + 1}
              </div>
              <pre className="flex-1 text-sm">
                <code className={cn("language-" + language)}>{line}</code>
              </pre>
            </div>
          ))}
        </div>

        {lines.length > 8 && (
          <Button
            variant="ghost"
            className="mt-2 h-8 w-full gap-2 border text-xs"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                Show more ({unmodifiedLines} unmodified lines)
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function SnippetsPage(): JSX.Element {
  return (
    <main className="container max-w-7xl mx-auto my-12 space-y-10">
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <Code codeblocks={[sampleCode]} />
      </div>
    </main>
  );
}
