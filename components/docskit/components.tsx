import { Code } from "./code";
import { InlineCode } from "./inline-code";
import { WithNotes } from "./notes";
import { NoteTooltip } from "./notes.tooltip";
import { z } from "zod";
import { RawCode } from "codehike/code";
import { Block, CodeBlock } from "codehike/blocks";
import { Terminal } from "./terminal";
import Link from "fumadocs-core/link";

export const docskit = {
  // components that code hike will use for codeblocks and inline code
  // as defined in the code hike config:
  DocsKitCode,
  DocsKitInlineCode: InlineCode,
  // extra components that can be used from mdx:
  WithNotes,
  CodeTabs,
  TerminalPicker,
  // overriding the link component so we can use it for tooltips
  a: DocsKitLink,
};

function DocsKitCode(props: { codeblock: RawCode }) {
  const { codeblock, ...rest } = props;

  if (codeblock.lang === "package-install") {
    return <PackageInstall codeblock={codeblock} />;
  }

  if (codeblock.lang === "terminal") {
    return <Terminal codeblocks={[codeblock]} />;
  }

  return <Code {...rest} codeblocks={[codeblock]} />;
}

function CodeTabs(props: unknown) {
  const { data, error } = Block.extend({
    code: z.array(CodeBlock),
    flags: z.string().optional(),
    storage: z.string().optional(),
  }).safeParse(props);

  if (error) {
    throw betterError(error, "CodeTabs");
  }

  const { code, flags, storage } = data;

  return <Code codeblocks={code} flags={flags} storage={storage} />;
}

function betterError(error: z.ZodError, componentName: string) {
  const { issues } = error;
  if (issues.length === 1 && issues[0].path[0] === "code") {
    return new Error(
      `<${componentName}> should contain at least one codeblock marked with \`!!\``
    );
  } else {
    return error;
  }
}

function DocsKitLink(props: any) {
  if (props.href === "tooltip") {
    return <NoteTooltip name={props.title}>{props.children}</NoteTooltip>;
  }
  return <Link {...props} />;
}

function PackageInstall({ codeblock }: { codeblock: RawCode }) {
  return (
    <Terminal
      storage="package-install"
      codeblocks={[
        {
          ...codeblock,
          value: "$ npm install " + codeblock.value,
          meta: "npm",
          lang: "terminal",
        },
        {
          ...codeblock,
          value: "$ yarn add " + codeblock.value,
          meta: "yarn",
          lang: "terminal",
        },
        {
          ...codeblock,
          value: "$ pnpm add " + codeblock.value,
          meta: "pnpm",
          lang: "terminal",
        },
        {
          ...codeblock,
          value: "$ bun add " + codeblock.value,
          meta: "bun",
          lang: "terminal",
        },
      ]}
    />
  );
}

function TerminalPicker(props: unknown) {
  const { data, error } = Block.extend({
    code: z.array(CodeBlock),
    storage: z.string().optional(),
  }).safeParse(props);

  if (error) {
    throw betterError(error, "TerminalPicker");
  }

  const { code, storage } = data;
  return <Terminal codeblocks={code} storage={storage} />;
}
