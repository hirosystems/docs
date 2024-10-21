import {
  AnnotationHandler,
  highlight,
  Inline,
  Pre,
  RawCode,
} from "codehike/code";
import { cn } from "@/utils/cn";
import { CodeIcon } from "./code-icon";
import theme from "./theme.mjs";
import { CopyButton } from "./copy-button";
import React from "react";
import { CodeClient } from "./code.client";
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
import { CodeGroup, flagsToOptions, TITLEBAR } from "./code-group";

const CODEBLOCK =
  "border rounded selection:bg-ch-selection border-ch-border overflow-hidden my-4 relative";

export async function InlineCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, theme);
  return (
    <Inline
      code={highlighted}
      className="selection:bg-ch-selection rounded border border-ch-border px-1 py-0.5 whitespace-nowrap !bg-ch-background"
      style={highlighted.style}
    />
  );
}

export async function Code(props: {
  codeblocks: RawCode[];
  flags?: string;
  storage?: string;
}) {
  const options = flagsToOptions(props.flags);
  const { codeblocks } = props;

  const tabs = await Promise.all(
    props.codeblocks.map(async (tab) => {
      const { flags, title } = extractFlags(tab);
      const tabOptions = flagsToOptions(flags);
      const mergedOptions = { ...options, ...tabOptions };

      const highlighted = await highlight(tab, theme);
      const handlers = [
        mark,
        tooltip,
        fold,
        link,
        mergedOptions.animate && tokenTransitions,
        mergedOptions.lineNumbers && lineNumbers,
        diff,
        ...collapse,
        mergedOptions.wordWrap && wordWrap,
        callout,
      ].filter(Boolean) as AnnotationHandler[];
      return {
        options: mergedOptions,
        highlighted: { ...highlighted, meta: title },
        element: (
          <Pre
            code={highlighted}
            className="overflow-auto px-0 py-2 m-0 rounded-none !bg-ch-background font-mono font-sm"
            style={highlighted.style}
            handlers={handlers}
          />
        ),
        icon: <CodeIcon title={title} />,
      };
    })
  );

  const group: CodeGroup = {
    storage: props.storage,
    type:
      codeblocks.length > 1
        ? "TABS"
        : tabs[0].highlighted.meta?.trim()
          ? "SINGLE"
          : "TITLELESS",
    options,
    tabs,
  };

  if (group.type !== "TABS") {
    const mergedOptions = { ...options, ...group.tabs[0].options };
    const { element, highlighted } = group.tabs[0];
    const { style, code, meta } = highlighted;
    return (
      <div className={CODEBLOCK} style={style}>
        {group.type === "SINGLE" && (
          <div
            className={cn(
              TITLEBAR,
              "flex items-center gap-2",
              "text-ch-tab-active-foreground text-sm font-mono"
            )}
          >
            <CodeIcon title={meta} className="pl-2 pr-1" />
            {meta}
            {mergedOptions.copyButton && (
              <div className={cn("ml-auto mr-1 items-center")}>
                <CopyButton
                  text={code}
                  className="text-ch-tab-inactive-foreground"
                />
              </div>
            )}
          </div>
        )}
        {mergedOptions.copyButton && group.type === "TITLELESS" && (
          <CopyButton
            text={code}
            className="absolute right-4 my-0 top-2 text-ch-tab-inactive-foreground"
          />
        )}
        {element}
      </div>
    );
  }

  return <CodeClient className={CODEBLOCK} group={group} key={group.storage} />;
}

function extractFlags(codeblock: RawCode) {
  const flags =
    codeblock.meta.split(" ").filter((flag) => flag.startsWith("-"))[0] ?? "";
  const title =
    codeblock.meta === flags
      ? ""
      : codeblock.meta.replace(" " + flags, "").trim();
  return { title, flags: flags.slice(1) };
}
