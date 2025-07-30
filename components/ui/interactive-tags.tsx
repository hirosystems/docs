'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export interface InteractiveTagsProps {
  tags: string[];
  onTagClick: (tag: string) => void;
  selectedTag?: string;
  className?: string;
  dialogContent?: React.ReactNode;
  isDialogOpen?: boolean;
  onDialogClose?: () => void;
}

export function InteractiveTags({
  tags,
  onTagClick,
  selectedTag,
  className,
  dialogContent,
  isDialogOpen,
  onDialogClose,
}: InteractiveTagsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <>
      <div className={cn('flex flex-wrap gap-2', className)}>
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="default"
            onClick={() => onTagClick(tag)}
            className={cn(
              'cursor-pointer transition-colors duration-200 rounded-md',
              'bg-neutral-150 dark:bg-neutral-600 text-neutral-400 dark:text-neutral-300',
              'hover:bg-orange-500 hover:text-neutral-950',
              'dark:hover:bg-brand-orange dark:hover:text-neutral-900',
              'text-xs font-regular uppercase tracking-wide',
              'px-2 py-1',
              // selectedTag === tag && [
              //   "bg-orange-500 text-neutral-950",
              //   "dark:bg-brand-orange dark:text-neutral-900",
              // ]
            )}
            role="button"
            tabIndex={0}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogTitle className="sr-only">
            {selectedTag ? `Pages tagged with ${selectedTag}` : 'Tagged pages'}
          </DialogTitle>
          <div className="flex-1 flex flex-col p-8">
            <div className="w-full space-y-8">
              {selectedTag && (
                <div className="text-left space-y-3">
                  <Badge
                    variant="default"
                    className="bg-orange-500 text-neutral-950 dark:bg-brand-orange dark:text-neutral-900 text-sm font-regular uppercase tracking-wide px-3 py-1"
                  >
                    {selectedTag}
                  </Badge>
                  <p className="text-muted-foreground text-sm">
                    List of pages tagged with {selectedTag}.
                  </p>
                </div>
              )}
              <div className="max-h-[55vh] overflow-y-auto text-left">{dialogContent}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
