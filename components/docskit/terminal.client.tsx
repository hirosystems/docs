"use client";
import "./terminal.css";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TerminalIcon } from "lucide-react";
import { useLocalStorage } from "./hooks/local-storage";
import {
  AnnotationHandler,
  CustomLine,
  CustomLineWithAnnotation,
  InnerLine,
} from "codehike/code";
import React from "react";
import { CODEBLOCK, TITLEBAR } from "./code-group";
import { cn } from "@/utils/cn";

export function TerminalChrome({
  options,
  storeKey,
}: {
  storeKey?: string;
  options: { name: string; children: React.ReactNode }[];
}) {
  const [currentName, setCurrentName] = storeKey
    ? useLocalStorage("terminal-picker-" + storeKey, options[0]?.name)
    : React.useState(options[0]?.name);

  const current =
    options.find((option) => option.name === currentName) || options[0];
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
        {options.length > 1 && (
          <div className="ml-auto">
            <ToggleGroup
              type="single"
              className="rounded-md inline-flex px-1 bg-ch-background"
              variant="outline"
              value={currentName}
              onValueChange={setCurrentName}
            >
              {options.map((option, index) => (
                <ToggleGroupItem
                  key={index}
                  value={option.name}
                  aria-label={`Toggle ${option.name}`}
                  className="py-0 px-0.5 h-6 !bg-transparent border-none text-ch-tab-inactive-foreground data-[state=on]:text-ch-tab-active-foreground"
                >
                  {option.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}
      </div>
      {current.children}
    </div>
  );
}

export const Line: CustomLineWithAnnotation = ({ annotation, ...props }) => {
  const [active, setActive] = React.useState(false);
  return (
    <InnerLine
      merge={props}
      className="px-1 flex ch-terminal-line"
      data-active={active}
    >
      <span className="select-none text-ch-line-number shrink-0">$ </span>
      <span className="ch-terminal-content break-all">{props.children}</span>
      <span
        className="ch-terminal-button select-none self-start"
        onClick={() => {
          navigator.clipboard.writeText(annotation?.query || "");
          setActive(true);
          setTimeout(() => setActive(false), 350);
        }}
      >
        Copy
      </span>
    </InnerLine>
  );
};

export const CommandBlock: AnnotationHandler["Block"] = ({
  children,
  annotation,
}) => {
  const [active, setActive] = React.useState(false);
  return (
    <div className="px-1 flex ch-terminal-line" data-active={active}>
      <span className="select-none text-ch-line-number shrink-0">$ </span>
      <span className="ch-terminal-content break-all">{children}</span>
      <span
        className="ch-terminal-button select-none self-start"
        onClick={() => {
          navigator.clipboard.writeText(annotation?.query || "");
          setActive(true);
          setTimeout(() => setActive(false), 350);
        }}
      >
        Copy
      </span>
    </div>
  );
};

export const OutputBlock: AnnotationHandler["Block"] = ({ children }) => {
  const [hidden, setHidden] = React.useState(true);
  return hidden ? (
    <div className="px-1">
      <span
        className="opacity-70 cursor-pointer hover:opacity-90 select-none transition-opacity"
        onClick={() => setHidden(false)}
      >
        {"[show output]"}
      </span>
    </div>
  ) : (
    <div className="px-1 pt-1 pb-2">{children}</div>
  );
};
