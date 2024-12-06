import type { MDXComponents } from "mdx/types";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "@/components/callout";
import { Cards, Card, SecondaryCard } from "@/components/card";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultComponents from "fumadocs-ui/mdx";
import { docskit } from "@/components/docskit/components";
import { CustomTable as Table, TableProps } from "@/components/table";
import { OrderedList, UnorderedList } from "@/components/lists";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    h1: (props) => {
      const H1 = defaultComponents.h1 as React.ComponentType<any>;

      const id =
        typeof props.children === "string"
          ? props.children
          : (props.children as React.ReactElement)?.props?.children;

      return (
        <H1 id={id} {...props}>
          {props.children}
        </H1>
      );
    },
    Accordion,
    Accordions,
    blockquote: (props) => <Callout>{props.children}</Callout>,
    Callout,
    Cards,
    Card,
    SecondaryCard,
    code: (props: React.PropsWithChildren) => (
      <code
        {...props}
        className={`border border-border rounded-md p-1 bg-code text-sm text-muted-foreground [h1_&]:text-xl`}
      />
    ),
    hr: (props: React.PropsWithChildren) => (
      <hr {...props} className="border-t border-border/50 mt-0 mb-6" />
    ),
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
