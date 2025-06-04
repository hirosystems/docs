"use client";

import { Badge } from "@/components/ui/badge";

interface InteractiveBadgeProps {
  href: string;
  label: string;
}

export function InteractiveBadge({ href, label }: InteractiveBadgeProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = href;
      }}
      type="button"
      className="hover:no-underline"
    >
      <Badge className="bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300 hover:bg-neutral-200 hover:text-primary dark:hover:text-primary dark:hover:bg-neutral-950 cursor-pointer transition-colors">
        {label}
      </Badge>
    </button>
  );
}
