'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function APICollapsibleClient() {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  return (
    <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="group w-fit rounded-full px-5 py-1 border border-border flex items-center gap-2 text-left text-sm text-muted-foreground hover:bg-muted transition data-[state=open]:w-full data-[state=open]:rounded-b-none data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground group-data-[state=closed]:rotate-45 transition-transform" />
          Details
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="p-4 border border-border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Additional configuration options for the Supabase client.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
