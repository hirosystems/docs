"use client";

import { Copy, Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils/cn";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      className={cn(
        copied && "!bg-[#A6E3A1] hover:bg-[#A6E3A1] !text-dark/70",
        `hover:bg-accent -m-1 p-1 rounded hidden sm:block`,
        className
      )}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
