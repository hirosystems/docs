import React from 'react';
import { cn } from '@/lib/utils';

interface RequiredBadgeProps {
  className?: string;
}

export function RequiredBadge({ className }: RequiredBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
        'bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400',
        'rounded',
        className,
      )}
    >
      Required
    </span>
  );
}
