import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";
import { MultiCode } from "./code.client";
import { AnnotationHandler, highlight, Pre, RawCode } from "codehike/code";
import { CodeIcon } from "./code-icon";
import theme from "./theme.mjs";
import React from "react";
import { lineNumbers } from "./annotations/line-numbers";
import { mark } from "./annotations/mark";
import { wordWrap } from "./annotations/word-wrap";
import { diff } from "./annotations/diff";
import { collapse } from "./annotations/collapse";
import { fold } from "./annotations/fold";
import { link } from "./annotations/link";
import { tokenTransitions } from "./annotations/token-transitions";
import { tooltip } from "./annotations/tooltip";
import { callout } from "./annotations/callout";
import { CODEBLOCK, CodeGroup, flagsToOptions, TITLEBAR } from "./code-group";

export async function Code(props: {
  codeblocks: RawCode[];
  flags?: string;
  storage?: string;
}) {
  const group = await toCodeGroup(props);
  return group.tabs.length === 1 ? (
    <SingleCode group={group} />
  ) : (
    <MultiCode group={group} key={group.storage} />
  );
}

function SingleCode({ group }: { group: CodeGroup }) {
  const tab = group.tabs[0];
  const { pre, style, code, title, icon, options } = tab;
  const hasTitle = title?.trim() !== "";
  return (
    <div className={cn(CODEBLOCK, !hasTitle && "border-none")} style={style}>
      {hasTitle && (
        <div
          className={cn(
            TITLEBAR,
            "flex items-center gap-2",
            "text-ch-tab-active-foreground text-sm font-mono"
          )}
        >
          <span className="pl-2 pr-1">{icon}</span>
          {title}
          {options.copyButton && (
            <div className={cn("ml-auto mr-1 items-center")}>
              <CopyButton
                text={code}
                className="text-ch-tab-inactive-foreground"
              />
            </div>
          )}
        </div>
      )}
      {options.copyButton && !hasTitle && (
        <CopyButton
          text={code}
          className="absolute right-4 my-0 top-2 text-ch-tab-inactive-foreground"
        />
      )}
      {pre}
    </div>
  );
}

export async function toCodeGroup(props: {
  codeblocks: RawCode[];
  flags?: string;
  storage?: string;
}): Promise<CodeGroup> {
  const groupOptions = flagsToOptions(props.flags);

  const tabs = await Promise.all(
    props.codeblocks.map(async (tab) => {
      const { flags, title } = extractFlags(tab);
      const tabOptions = flagsToOptions(flags);
      const options = { ...groupOptions, ...tabOptions };
      const highlighted = await highlight(tab, theme);
      const handlers = getHandlers(options);
      return {
        options,
        title,
        style: highlighted.style,
        code: highlighted.code,
        icon: <CodeIcon title={title} lang={tab.lang} />,
        pre: (
          <Pre
            code={highlighted}
            className={cn(
              !title && "!m-0",
              "overflow-auto px-0 py-2 m-3 rounded !bg-ch-code font-mono font-sm"
            )}
            style={highlighted.style}
            handlers={handlers}
          />
        ),
      };
    })
  );

  return {
    storage: props.storage,
    options: groupOptions,
    tabs,
  };
}

function getHandlers(options: CodeGroup["options"]) {
  return [
    mark,
    tooltip,
    fold,
    link,
    options.animate && tokenTransitions,
    options.lineNumbers && lineNumbers,
    diff,
    ...collapse,
    options.wordWrap && wordWrap,
    callout,
  ].filter(Boolean) as AnnotationHandler[];
}

/**
 * Extracts flags and title from the metadata of a code block.
 *
 * @example
 * ```typescript
 * const codeblock = { meta: "foo.js -abc" };
 * const { title, flags } = extractFlags(codeblock);
 * console.log(title); // "foo.js"
 * console.log(flags); // "abc"
 * ```
 */
function extractFlags(codeblock: RawCode) {
  const flags =
    codeblock.meta.split(" ").filter((flag) => flag.startsWith("-"))[0] ?? "";
  const title =
    codeblock.meta === flags
      ? ""
      : codeblock.meta.replace(" " + flags, "").trim();
  return { title, flags: flags.slice(1) };
}
