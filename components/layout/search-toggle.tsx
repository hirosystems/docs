"use client";
import type { ComponentProps } from "react";
import { Search, SearchIcon } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { cn } from "@/lib/utils";
import { Kbd } from "../ui/kbd";

export function SearchToggle(props: ComponentProps<"button">) {
  const { enabled, setOpenSearch } = useSearchContext();
  if (!enabled) return;

  return (
    <div
      className="w-full max-w-[221px] h-9 bg-white dark:bg-neutral-950 rounded-md flex items-center px-2 cursor-pointer group"
      onClick={() => setOpenSearch(true)}
    >
      <div className="flex items-center flex-1 gap-2">
        <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
          Search
        </span>
      </div>
      <div className="flex items-center gap-1 group">
        <Kbd className="flex items-center justify-center rounded text-md bg-card text-muted-foreground group-hover:text-primary transition-colors">
          ⌘
        </Kbd>
        <Kbd className="flex items-center justify-center rounded text-sm bg-card text-muted-foreground group-hover:text-primary transition-colors">
          K
        </Kbd>
      </div>
    </div>
  );
}
