import { Block, CodeBlock, parseProps } from "codehike/blocks";
import { z } from "zod";
import { Selection, SelectionProvider } from "codehike/utils/selection";
import { Controls } from "./slideshow.controls";
import { Code } from "./code";

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
});

export default function Slideshow(props: unknown) {
  const { steps } = parseProps(props, Schema);
  return (
    <SelectionProvider>
      <div className="min-h-52 bg-ch-code">
        <Selection
          from={steps.map((step) => (
            <Code key={step.title} codeblocks={[step.code]} flags="a" />
          ))}
        />
      </div>
      <Controls length={steps.length} />
      <div className="px-4">
        <Selection from={steps.map((step) => step.children)} />
      </div>
    </SelectionProvider>
  );
}
