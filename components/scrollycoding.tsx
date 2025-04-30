import { z } from "zod";
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection";
import { Block, CodeBlock, parseProps } from "codehike/blocks";
import { docskit } from "./docskit/components";

const { DocsKitCode } = docskit;

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
});

export function Scrollycoding(props: unknown) {
  const { steps } = parseProps(props, Schema);
  return (
    <SelectionProvider className="flex gap-4">
      <div className="flex-1 mt-4 mb-[90vh] ml-2 prose min-w-60">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click", "scroll"]}
            className="border-l-4 data-[selected=true]:border-blue-400 px-5 py-2 mb-24 rounded bg-card"
          >
            <h2 className="mt-4 text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Selectable>
        ))}
      </div>
      <div className="w-1/2">
        <div className="top-16 sticky overflow-auto">
          <Selection
            from={steps.map((step, index) => (
              <DocsKitCode key={index} codeblock={step.code} />
            ))}
          />
        </div>
      </div>
    </SelectionProvider>
  );
}

// async function Code({ codeblock }: { codeblock: RawCode }) {
//   const highlighted = await highlight(codeblock, theme);
//   return (
//     <Pre
//       code={highlighted}
//       handlers={[tokenTransitions, wordWrap]}
//       className="min-h-[40rem]"
//     />
//   );
// }
