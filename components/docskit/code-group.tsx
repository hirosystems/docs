export const TITLEBAR = "px-2 py-1 w-full h-10 font-inter";
export const CODEBLOCK =
  "border rounded selection:bg-ch-selection border-ch-border overflow-x-auto my-4 relative grid";

type CodeOptions = {
  copyButton?: boolean;
  lineNumbers?: boolean;
  wordWrap?: boolean;
  animate?: boolean;
};

export type CodeGroup = {
  storage?: string;
  options: CodeOptions;
  tabs: {
    options: CodeOptions;
    title: string;
    style: React.CSSProperties;
    code: string;
    pre: React.ReactNode;
    icon: React.ReactNode;
  }[];
};

/**
 * Convert flags string to options object.
 *
 * @example
 * flagsToOptions("na") // { lineNumbers: true, animate: true }
 * flagsToOptions("c") // { copyButton: true }
 */
export function flagsToOptions(flags: string = "") {
  const options: CodeOptions = {};
  const map = {
    c: "copyButton",
    n: "lineNumbers",
    w: "wordWrap",
    a: "animate",
  } as const;
  flags.split("").forEach((flag) => {
    if (flag in map) {
      const key = map[flag as keyof typeof map];
      options[key] = true;
    } else {
      console.warn(`Unknown flag: ${flag}`);
    }
  });
  return options;
}
