import { Code } from "./code";
import { WithClientNotes } from "./notes.client";

export function WithNotes({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  const notes = Object.entries(rest)
    .filter(([name]) => name !== "title" && name !== "_data")
    .map(([name, block]: any) => {
      if (block.hasOwnProperty("children")) {
        return {
          name,
          type: block.type || "prose",
          children: block.children,
        };
      } else if (
        block.hasOwnProperty("value") &&
        block.hasOwnProperty("lang")
      ) {
        return {
          name,
          type: "code",
          // @ts-ignore
          children: <Code codeblocks={[block as any]} />,
        };
      } else if (block.hasOwnProperty("url") && block.hasOwnProperty("alt")) {
        return {
          name,
          type: "image",
          children: <img src={block.url} alt={block.alt} />,
        };
      } else {
        throw new Error("Invalid block");
      }
    });
  return <WithClientNotes notes={notes}>{children}</WithClientNotes>;
}
