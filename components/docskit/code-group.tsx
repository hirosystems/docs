import { HighlightedCode } from "codehike/code";

export const TITLEBAR =
  "border-b-[1px] border-code-border bg-code-tabs-background px-2 py-1 w-full h-10 font-inter";

type CodeOptions = {
  copyButton?: boolean;
  lineNumbers?: boolean;
  wordWrap?: boolean;
  animate?: boolean;
};

export type CodeGroup = {
  type: "TABS" | "SINGLE" | "TITLELESS";
  storage?: string;
  options: CodeOptions;
  tabs: {
    options: CodeOptions;
    highlighted: HighlightedCode;
    element: React.ReactNode;
    icon: React.ReactNode;
  }[];
};

export function flagsToOptions(flags: string = "") {
  const options: CodeOptions = {};
  const map = {
    c: "copyButton",
    n: "lineNumbers",
    w: "wordWrap",
    a: "animate",
  };
  flags.split("").forEach((flag) => {
    // @ts-ignore
    if (map[flag]) {
      // @ts-ignore
      options[map[flag]] = true;
    }
  });
  return options;
}
