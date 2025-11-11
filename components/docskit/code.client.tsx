'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CODEBLOCK, type CodeGroup, TITLEBAR } from './code-group';
import { CopyButton } from './copy-button';
import { useStateOrLocalStorage } from './hooks/local-storage';

export function MultiCode({ group, className }: { group: CodeGroup; className?: string }) {
  const [currentTitle, setCurrentTitle] = useStateOrLocalStorage(
    group.storage,
    group.tabs[0].title,
  );
  const current = group.tabs.find((tab) => tab.title === currentTitle) || group.tabs[0];

  const { style, code } = current;

  return (
    <Tabs
      value={currentTitle}
      onValueChange={setCurrentTitle}
      className={cn(CODEBLOCK, className)}
      style={style}
    >
      <TabsList
        className={cn(
          TITLEBAR,
          'rounded-none p-0 m-0 justify-start items-stretch !pt-0 gap-1 border-b border-border/60',
        )}
      >
        {group.tabs.map(({ icon, title }) => {
          const isActive = currentTitle === title;

          return (
            <TabsTrigger
              key={title}
              value={title}
              className={cn(
                'relative gap-2 rounded-md px-3 py-2 font-mono text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border',
                isActive
                  ? 'text-foreground bg-ch-tabs-background shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] dark:shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]'
                  : 'text-ch-tab-inactive-foreground hover:text-muted-foreground',
              )}
            >
              {icon}
              {title}
              <div
                className={cn(
                  'absolute top-full left-0 right-0 h-[2px] rounded-full transition-colors duration-200',
                  isActive ? 'bg-primary' : 'bg-transparent',
                )}
              />
            </TabsTrigger>
          );
        })}
        {group.options.copyButton && (
          <div className={cn('ml-auto mr-3 items-center flex')}>
            <CopyButton text={code} />
          </div>
        )}
      </TabsList>
      <TabsContent
        // key={meta}
        value={current.title}
        className="mt-0 bg-background"
      >
        {current.pre}
      </TabsContent>
    </Tabs>
  );
}
