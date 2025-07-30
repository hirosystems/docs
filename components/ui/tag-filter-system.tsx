'use client';

import React from 'react';
import { InteractiveTags } from './interactive-tags';
import { useTagFiltering } from '@/hooks/use-tag-filtering';
import type { FilterablePage } from '@/lib/utils/tag-filtering';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface TagFilterSystemProps {
  tags: string[];
  pages: FilterablePage[];
  section?: string;
  className?: string;
}

export function TagFilterSystem({ tags, pages, section, className }: TagFilterSystemProps) {
  const { selectedTag, isDialogOpen, filterResult, selectTag, closeDialog } = useTagFiltering({
    pages,
    section,
  });

  const dialogContent =
    filterResult && filterResult.matchingPages.length > 0 ? (
      <div className="space-y-0">
        {filterResult.matchingPages.map((page, index) => (
          <React.Fragment key={page.id}>
            <a href={page.url} className="block p-4 rounded-lg group">
              <h3 className="font-medium text-foreground mb-2 group-hover:underline transition-all">
                {page.title}
              </h3>
              {page.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{page.description}</p>
              )}
              <div className="flex items-center gap-2 mt-3">
                {page.type && (
                  <Badge className="text-xs font-regular uppercase tracking-wide">
                    {page.type}
                  </Badge>
                )}
              </div>
            </a>
            {index < filterResult.matchingPages.length - 1 && <hr className="border-border my-2" />}
          </React.Fragment>
        ))}
      </div>
    ) : (
      <EmptyState selectedTag={selectedTag} />
    );

  return (
    <InteractiveTags
      tags={tags}
      onTagClick={selectTag}
      selectedTag={selectedTag}
      className={className}
      dialogContent={dialogContent}
      isDialogOpen={isDialogOpen}
      onDialogClose={closeDialog}
    />
  );
}

function EmptyState({ selectedTag }: { selectedTag?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">🔍</span>
      </div>
      <h3 className="text-lg font-medium mb-2">No results found</h3>
      <p className="text-muted-foreground max-w-sm">
        {selectedTag ? (
          <>
            No pages found with the label selectedTag. Try selecting a different tag or check back
            later.
          </>
        ) : (
          'No pages match your current filter. Try selecting a different tag.'
        )}
      </p>
    </div>
  );
}
