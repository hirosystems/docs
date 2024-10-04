"use client";

import React, { useEffect } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import * as Base from "fumadocs-ui/components/codeblock";

import { initSimnet } from "@hirosystems/clarinet-sdk-browser";
import { Cl } from "@stacks/transactions";

import {
  BundledLanguage,
  BundledTheme,
  getSingletonHighlighter,
  HighlighterGeneric,
} from "shiki";

type ClarityPlaygroundProps = {
  snippet: string;
};

let memoizedHighlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
async function getHighlighter() {
  if (memoizedHighlighter) return memoizedHighlighter;

  memoizedHighlighter = await getSingletonHighlighter({
    langs: ["clarity"],
    themes: ["github-light", "github-dark"],
  });
  return memoizedHighlighter;
}

async function highlight(snippet: string) {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(snippet, {
    lang: "clarity",
    defaultColor: false,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    transformers: [
      {
        name: "remove-pre",
        root: (root) => {
          if (root.children[0].type !== "element") return;
          return {
            type: "root",
            children: root.children[0].children,
          };
        },
      },
    ],
  });
}

// TODO: WIP: testing out new Clarinet JS SDK browser lib
export const ClarityPlayground: React.FC<ClarityPlaygroundProps> = ({
  snippet,
}) => {
  const [snippetValue, setSnippetValue] = React.useState<string>(snippet);
  const [snippetRows, setSnippetRows] = React.useState<number>(
    snippetValue.split("\n").length,
  );
  const [snippetHTML, setSnippetHTML] = React.useState<string>("");
  const [resultHTML, setResultHTML] = React.useState<string>();

  useEffect(() => {
    highlight(snippetValue).then(setSnippetHTML);
    setSnippetRows(snippetValue.split("\n").length);
  }, [snippetValue]);

  async function run() {
    const simnet = await initSimnet();
    await simnet.initEmtpySession();

    simnet.setEpoch("2.5");
    const { result } = simnet.execute(snippetValue);
    const resultString = Cl.prettyPrint(result, 2);

    highlight(resultString).then(setResultHTML);
  }

  return (
    <>
      <div className="w-full relative clarity-playground">
        <Base.CodeBlock>
          <Base.Pre
            style={{ height: `${21 * snippetRows + 16 * 2}px` }}
            dangerouslySetInnerHTML={{ __html: snippetHTML }}
          ></Base.Pre>
        </Base.CodeBlock>
        <pre className="w-full m-0 absolute nd-codeblock" style={{ top: 0 }}>
          <code className="w-full" style={{ height: `${21 * snippetRows}px` }}>
            <textarea
              tabIndex={-1}
              rows={snippetRows}
              value={snippetValue}
              onChange={(e) => setSnippetValue(e.target.value)}
              autoComplete="off"
            />
          </code>
        </pre>
      </div>

      <Button
        className={cn(
          "px-5 py-2 text-sm leading-5 rounded-full font-semibold z-10",
          "bg-neutral-900 text-white",
          "dark:bg-white dark:text-neutral-900",
          "hover:bg-neutral-900/90 dark:hover:bg-gray-100/90",
        )}
        onClick={run}
      >
        Run
      </Button>

      {resultHTML ? (
        <Base.CodeBlock>
          <Base.Pre dangerouslySetInnerHTML={{ __html: resultHTML }} />
        </Base.CodeBlock>
      ) : null}
    </>
  );
};
