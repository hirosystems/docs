"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TerminalIcon } from "lucide-react";
import { useStateOrLocalStorage } from "./hooks/local-storage";
import React from "react";
import { CODEBLOCK, TITLEBAR } from "./code-group";
import { cn } from "@/utils/cn";

export function TerminalClient({
  tabs,
  storeKey,
}: {
  storeKey?: string;
  tabs: { name: string; pre: React.ReactNode }[];
}) {
  const [currentName, setCurrentName] = useStateOrLocalStorage(
    storeKey && "terminal-picker-" + storeKey,
    tabs[0]?.name
  );

  const current = tabs.find((tab) => tab.name === currentName) || tabs[0];
  return (
    <div className={CODEBLOCK}>
      <div
        className={cn(
          TITLEBAR,
          "flex items-center gap-2",
          "text-ch-tab-active-foreground text-sm font-mono"
        )}
      >
        <TerminalIcon size={16} className="ml-2 mr-1" />
        <div>Terminal</div>
        {tabs.length > 1 && (
          <div className="ml-auto">
            <ToggleGroup
              type="single"
              className="rounded-md inline-flex px-1 bg-ch-background"
              variant="outline"
              value={currentName}
              onValueChange={setCurrentName}
            >
              {tabs.map((tab, index) => (
                <ToggleGroupItem
                  key={index}
                  value={tab.name}
                  aria-label={`Toggle ${tab.name}`}
                  className="py-0 px-0.5 h-6 !bg-transparent border-none text-ch-tab-inactive-foreground data-[state=on]:text-ch-tab-active-foreground"
                >
                  {tab.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}
      </div>
      {current.pre}
    </div>
  );
}
