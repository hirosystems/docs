"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";
import { CopyButton } from "./copy-button";
import React from "react";
import { useLocalStorage } from "./hooks/local-storage";
import { CodeGroup, TITLEBAR } from "./code-group";

export function CodeClient(props: { group: CodeGroup; className?: string }) {
  const { group, className } = props;

  const [currentTitle, setCurrentTitle] = useLocalStorage(
    group.storage,
    group.tabs[0].highlighted.meta
  );
  const current = group.tabs.find(
    (tab) => tab.highlighted.meta === currentTitle
  )!;

  const { style, meta, code } = current.highlighted;

  return (
    <Tabs
      value={currentTitle}
      onValueChange={setCurrentTitle}
      className={className}
      style={style}
    >
      <TabsList
        className={cn(
          TITLEBAR,
          "rounded-none p-0 m-0 justify-start items-stretch !pt-0"
        )}
      >
        {group.tabs.map(({ icon, highlighted }) => (
          <TabsTrigger
            key={highlighted.meta}
            value={highlighted.meta}
            className={cn(
              "rounded-none relative transition-colors duration-200 gap-2 px-3 font-mono",
              "[&[data-state=active]>.absolute]:bg-code-background", // bottom border
              "border-transparent border-x data-[state=active]:border-x-code-border first:border-l-0", // x-border
              "border-t data-[state=active]:border-t-code-active-border", // top border
              "text-code-tab-inactive-foreground data-[state=active]:text-code-tab-active-foreground hover:text-code-tab-active-foreground", // text
              "data-[state=active]:bg-code-background"
            )}
          >
            {icon}
            {highlighted.meta}
            <div className="absolute h-[1px] top-full left-0 right-0 transition-colors duration-200" />
          </TabsTrigger>
        ))}
        {group.options.copyButton && (
          <div className={cn("ml-auto mr-3 items-center flex")}>
            <CopyButton text={code} />
          </div>
        )}
      </TabsList>
      <TabsContent
        // key={meta}
        value={meta}
        className="mt-0"
      >
        {current.element}
      </TabsContent>
    </Tabs>
  );
}
