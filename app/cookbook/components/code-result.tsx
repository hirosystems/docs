import { Code } from "@/components/docskit/code";

interface CodeResultProps {
  result: string;
}

export function CodeResult({ result }: CodeResultProps) {
  return (
    <Code
      codeblocks={[
        {
          lang: "bash",
          value: result,
          meta: `-nw`,
        },
      ]}
    />
  );
}
