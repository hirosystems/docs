import * as Base from "fumadocs-ui/components/codeblock";
import type { HTMLAttributes } from "react";
import { useMemo } from "react";
import { getHighlighter } from "shiki";

const highlighter = await getHighlighter({
  langs: ["bash", "console", "ts", "tsx"],
  themes: [
    "github-light",
    "github-dark",
    "catppuccin-latte",
    "catppuccin-mocha",
  ],
});

export type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  code: string;
  wrapper?: Base.CodeBlockProps;
  lang: "bash" | "console" | "ts" | "tsx";
};

export function CodeBlock({
  code,
  lang,
  wrapper,
  ...props
}: CodeBlockProps): React.ReactElement {
  const html = useMemo(
    () =>
      highlighter.codeToHtml(code, {
        lang,
        defaultColor: false,
        themes: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha",
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
      }),
    [code, lang]
  );

  return (
    <Base.CodeBlock {...wrapper} className="my-0 mt-2">
      <Base.Pre {...props} dangerouslySetInnerHTML={{ __html: html }} />
    </Base.CodeBlock>
  );
}
