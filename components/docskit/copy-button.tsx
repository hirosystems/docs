'use client';

import { Check, Copy } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      type="button"
      className={cn(
        copied && '!bg-[#A6E3A1] hover:bg-[#A6E3A1] !text-[hsl(var(--dark))]/70',
        'bg-card/80 -m-1 p-1 rounded hidden sm:block backdrop-blur',
        'opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
        'pointer-events-none group-hover:pointer-events-auto focus-visible:pointer-events-auto',
        'transition-opacity duration-200',
        className,
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
