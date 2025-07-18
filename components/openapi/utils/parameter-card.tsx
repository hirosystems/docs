import React from "react";
import { RequiredBadge } from "./required-badge";
import { cn } from "@/lib/utils";

interface ParameterCardProps {
  name: string;
  description?: string;
  required?: boolean;
  example?: string;
  type?: string;
}

export function ParameterCard({
  name,
  description,
  required,
  example,
  type,
}: ParameterCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg",
        "bg-neutral-50 dark:bg-neutral-900",
        "border border-neutral-200 dark:border-neutral-800"
      )}
    >
      <div className="flex items-start gap-2 mb-2">
        <code className="font-semibold font-mono text-sm">{name}</code>
        {required && <RequiredBadge />}
      </div>

      {description && (
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
      )}

      {example && (
        <div className="mt-2">
          <span className="text-xs text-muted-foreground">Example: </span>
          <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
            {example}
          </code>
        </div>
      )}
    </div>
  );
}
