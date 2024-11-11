import type { MDXComponents } from "mdx/types";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "@/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultComponents from "fumadocs-ui/mdx";
import { docskit } from "@/components/docskit/components";
import { CustomTable as Table, TableProps } from "@/components/table";
import { OrderedList, UnorderedList } from "@/components/lists";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    Accordion,
    Accordions,
    blockquote: (props) => <Callout>{props.children}</Callout>,
    Callout,
    code: (props) => (
      <code
        {...props}
        className="bg-accent border border-border p-1 text-muted-foreground"
      />
    ),
    hr: (props) => <hr className="border-t border-border/50 mt-0 mb-6" />,
    Tab,
    Tabs,
    table: (props: TableProps) => <Table {...props} />,
    TypeTable,
    ol: OrderedList,
    ul: UnorderedList,
    ...components,
    ...docskit,
  };
}
