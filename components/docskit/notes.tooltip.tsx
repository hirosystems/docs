"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNotesContext } from "./notes.client";
import { cn } from "@/utils/cn";

export function NoteTooltip({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const note = useNotesContext(name);
  if (!note) {
    console.warn(`Missing note "${name}" for tooltip`);
    return <>{children}</>;
  }
  const className = {
    code: "p-0 [&>*]:my-0 border-none overflow-auto rounded-none bg-transparent",
    prose:
      "[&>*]:first-child:mt-0 [&>*]:last-child:mb-0 p-4 prose dark:prose-invert",
    image: "p-0 [&>*]:first:mt-0 [&>*]:last:mb-0 border-none bg-transparent",
  }[note.type || "prose"];

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted underline-offset-4 cursor-help">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent
          className={cn("min-w-44 max-w-96 whitespace-normal", className)}
        >
          {note?.children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
