import theme from "./theme.mjs";
import {
  AnnotationHandler,
  highlight,
  HighlightedCode,
  Pre,
  RawCode,
} from "codehike/code";
import { TerminalChrome, Line, OutputBlock } from "./terminal.client";
import { Block, CodeBlock, parseProps } from "codehike/blocks";
import { z } from "zod";
import { tokenTransitions } from "./annotations/token-transitions";
import { wordWrap } from "./annotations/word-wrap";

export async function Terminal({ codeblock }: { codeblock: RawCode }) {
  const { annotations, value } = extractAnnotations(codeblock.value);
  const highlighted = await highlight({ ...codeblock, value }, theme);
  highlighted.annotations = [...annotations, ...highlighted.annotations];

  return (
    <TerminalChrome
      options={[
        {
          name: "npm",
          children: (
            <Pre
              code={highlighted}
              handlers={[output, wordWrap, command]}
              className="bg-ch-background py-3 px-2 m-0 leading-6 font-mono"
              style={{ color: highlighted.style.color }}
            />
          ),
        },
      ]}
    />
  );
}

const output: AnnotationHandler = {
  name: "output",
  Block: OutputBlock,
};

const command: AnnotationHandler = {
  name: "command",
  AnnotatedLine: Line,
};

export async function TerminalPicker(props: any) {
  const { code, store } = parseProps(
    props,
    Block.extend({ code: z.array(CodeBlock), store: z.string().optional() })
  );

  const options = await Promise.all(
    code.map(async (codeblock) => {
      const { annotations, value } = extractAnnotations(codeblock.value);
      const highlighted = await highlight({ ...codeblock, value }, theme);
      highlighted.annotations = [...annotations, ...highlighted.annotations];
      return {
        name: codeblock.meta,
        children: (
          <Pre
            code={highlighted}
            handlers={[output, command, tokenTransitions]}
            className="bg-ch-background py-3 px-2 m-0 leading-6 font-mono"
            style={{ color: highlighted.style.color }}
          />
        ),
      };
    })
  );

  return (
    <TerminalChrome options={options} storeKey={store} key={store || ""} />
  );
}

function extractAnnotations(code: string) {
  const lines = code.split(/\r?\n/);
  const annotations = [] as HighlightedCode["annotations"];
  lines.forEach((line, index) => {
    if (line.startsWith("$ ")) {
      annotations.push({
        name: "command",
        query: line.slice(2),
        fromLineNumber: index + 1,
        toLineNumber: index + 1,
      });
    } else {
      let last = annotations[annotations.length - 1];
      if (!last || last.name !== "output") {
        annotations.push({
          name: "output",
          query: "",
          fromLineNumber: index + 1,
          toLineNumber: index + 1,
        });
      } else if ("toLineNumber" in last) {
        last.toLineNumber = index + 1;
      }
    }
  });
  const codeWithoutPrompt = lines
    .map((line) => line.replace(/^\$ /, ""))
    .join("\n");
  return { annotations, value: codeWithoutPrompt };
}
