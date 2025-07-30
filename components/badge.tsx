import React from 'react';
import { CircleDot, HalfCircle, Flame } from './ui/icon';
import { cn } from '@/lib/utils';

type BadgeVariant = 'starter' | 'intermediate' | 'advanced';

interface BadgeProps {
  variant: BadgeVariant;
}

const variantStyles = {
  starter:
    'bg-[#e7f7e7] text-[#4B714D] border-[#c2ebc4] dark:bg-background dark:text-[#c2ebc4] dark:border-[#c2ebc4]',
  intermediate:
    'bg-[#F7F4E7] text-[#716B4B] border-[#EBDDC2] dark:bg-background dark:text-[#EBDDC2] dark:border-[#EBDDC2]',
  advanced:
    'bg-[#F7E7E7] text-[#714B4B] border-[#EBC2C2] dark:bg-background dark:text-[#EBC2C2] dark:border-[#EBC2C2]',
};

const icons = {
  starter: CircleDot,
  intermediate: HalfCircle,
  advanced: Flame,
};

export function HackBadge({ variant }: BadgeProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md border',
        variantStyles[variant],
        'text-sm font-aeonik-fono',
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="uppercase">{variant}</span>
    </div>
  );
}
