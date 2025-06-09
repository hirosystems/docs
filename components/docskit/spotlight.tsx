import { z } from "zod";
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection";
import { Block, CodeBlock, parseProps } from "codehike/blocks";
import { Code } from "./code";
import { cn } from "@/lib/utils";

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
});
type Steps = z.infer<typeof Schema>["steps"];

export default function Spotlight(props: unknown) {
  const { steps } = parseProps(props, Schema);
  return (
    <div className="@container">
      <OneColumnLayout steps={steps} className="@2xl:hidden" />
      <TwoColumnLayout steps={steps} className="@max-2xl:hidden" />
    </div>
  );
}

function OneColumnLayout(props: { steps: Steps; className?: string }) {
  const { steps, className } = props;
  return (
    <div className={className}>
      {steps.map((step, i) => (
        <div key={i}>
          <h2 className="mt-8 text-xl">{step.title}</h2>
          <div>{step.children}</div>
          <Code codeblocks={[step.code]} />
        </div>
      ))}
    </div>
  );
}

function TwoColumnLayout(props: { steps: Steps; className?: string }) {
  const { steps, className } = props;
  return (
    <SelectionProvider className={cn("flex gap-4", className)}>
      <div className="flex-1 min-w-64 mt-4 prose-h2:mt-4">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click"]}
            className="border data-[selected=true]:bg-border/80 px-5 py-2 mb-4 rounded bg-card cursor-pointer hover:bg-border/60 transition-colors duration-200 ease-in-out"
          >
            <h2 className="text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Selectable>
        ))}
      </div>
      <div className="min-w-96 w-[28rem]">
        <div className="top-28 xl:top-16 sticky overflow-auto">
          <Selection
            from={steps.map((step) => (
              <Code key={step.code.value} codeblocks={[step.code]} flags="a" />
            ))}
          />
        </div>
      </div>
    </SelectionProvider>
  );
}
