"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";
import React from "react";
import { useStateOrLocalStorage } from "./hooks/local-storage";
import { CODEBLOCK, type CodeGroup, TITLEBAR } from "./code-group";

export function MultiCode({
  group,
  className,
}: {
  group: CodeGroup;
  className?: string;
}) {
  const [currentTitle, setCurrentTitle] = useStateOrLocalStorage(
    group.storage,
    group.tabs[0].title
  );
  const current =
    group.tabs.find((tab) => tab.title === currentTitle) || group.tabs[0];

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
          "rounded-none p-0 m-0 justify-start items-stretch !pt-0"
        )}
      >
        {group.tabs.map(({ icon, title }) => (
          <TabsTrigger
            key={title}
            value={title}
            className={cn(
              "rounded-none relative transition-colors duration-200 gap-2 px-3 font-mono",
              "text-ch-tab-inactive-foreground data-[state=active]:text-muted-foreground hover:text-muted-foreground" // text
            )}
          >
            {icon}
            {title}
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
        value={current.title}
        className="mt-0 bg-background"
      >
        {current.pre}
      </TabsContent>
    </Tabs>
  );
}
