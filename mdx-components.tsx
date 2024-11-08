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
    Tabs,
    Tab,
    Callout,
    TypeTable,
    Accordion,
    Accordions,
    table: (props: TableProps) => <Table {...props} />,
    blockquote: (props) => <Callout>{props.children}</Callout>,
    ol: OrderedList,
    ul: UnorderedList,
    ...components,
    ...docskit,
  };
}
