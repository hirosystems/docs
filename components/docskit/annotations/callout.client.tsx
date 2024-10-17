"use client";

import { useNotesContext } from "../notes.client";

export function CalloutContent({ query }: { query: string }) {
  const note = useNotesContext(query);

  if (!note) {
    return <div className="px-2">{query}</div>;
  }

  const className =
    note.type === "code"
      ? "p-0 [&>*]:my-0 [&>*]:border-none overflow-auto rounded-none"
      : "[&>*]:first:mt-0 p-2 prose dark:prose-invert prose-sm";
  return (
    <div
      className={className}
      style={
        {
          // editorBackground
          "--ch-16": "trasparent",
        } as any
      }
    >
      {note.children}
    </div>
  );
}
