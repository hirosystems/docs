"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import * as Base from "fumadocs-ui/components/codeblock";

import { initSimnet } from "@hirosystems/clarinet-sdk-browser";
import { Cl } from "@stacks/transactions";

import { getHighlighter } from "shiki";

// TODO: WIP: testing out new Clarinet JS SDK browser lib
export const ClarinetSDK: React.FC = () => {
  const [simnet, setSimnet] = React.useState<any>();
  const [html, setHtml] = React.useState<any>();
  const [evaluatedResponse, setEvaluatedResponse] = React.useState<any>();

  async function showMe() {
    const simnet = await initSimnet();
    await simnet.initEmtpySession();

    simnet.setEpoch("2.5");
    const result =
      simnet.runSnippet(`(define-map Users uint {address: principal})
    (map-insert Users u1 { address: tx-sender })
    (map-get? Users u1)
    `) as any;

    const highlighter = await getHighlighter({
      langs: ["bash", "ts", "tsx", "clarity"],
      themes: ["github-light", "github-dark"],
    });
    const res = highlighter.codeToHtml(Cl.prettyPrint(result, 2), {
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
    setEvaluatedResponse(res);
  }

  async function run() {
    const simnet = await initSimnet();
    await simnet.initEmtpySession();

    simnet.setEpoch("2.5");
    const result =
      simnet.runSnippet(`(define-map Users uint {address: principal})
    (map-insert Users u1 { address: tx-sender })
    (map-get? Users u1)
    `) as any;
    console.log(Cl.prettyPrint(result, 2));
    setSimnet(simnet);

    const codeResponse = await fetch("/scripts/hello-world.clar");
    const code = await codeResponse.text();

    const highlighter = await getHighlighter({
      langs: ["bash", "ts", "tsx", "clarity"],
      themes: ["github-light", "github-dark"],
    });

    const html = highlighter.codeToHtml(code, {
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
    setHtml(html);
  }

  React.useEffect(() => {
    run();
  }, []);

  return (
    <>
      <Button
        className={cn(
          "px-5 py-2 text-sm leading-5 rounded-full font-semibold z-10",
          "bg-neutral-900 text-white",
          "dark:bg-white dark:text-neutral-900",
          "hover:bg-neutral-900/90 dark:hover:bg-gray-100/90"
        )}
        onClick={showMe}
      >
        Run
      </Button>
      <Base.CodeBlock>
        <Base.Pre dangerouslySetInnerHTML={{ __html: html }} />
      </Base.CodeBlock>
      {evaluatedResponse ? (
        <Base.CodeBlock allowCopy={false}>
          <Base.Pre dangerouslySetInnerHTML={{ __html: evaluatedResponse }} />
        </Base.CodeBlock>
      ) : null}
    </>
  );
};
