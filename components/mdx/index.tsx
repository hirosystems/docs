import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";

import * as icons from "lucide-react";
import * as customIcons from "@/components/ui/icon";
import * as FilesComponents from "fumadocs-ui/components/files";
import * as StepsComponents from "fumadocs-ui/components/steps";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CustomTable as Table, type TableProps } from "@/components/table";
import { OrderedList, UnorderedList } from "@/components/lists";
import { Callout } from "@/components/callout";
import * as CardComponents from "@/components/card";
import * as TabsComponents from "@/components/ui/tabs";
import { docskit } from "@/components/docskit/components";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...(icons as unknown as MDXComponents),
    ...(customIcons as unknown as MDXComponents),
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Badge,
    Callout,
    ...CardComponents,
    ...FilesComponents,
    ...StepsComponents,
    ...TabsComponents,
    img: (props) => <ImageZoom className="h-[350px]" {...(props as any)} />,
    table: Table as unknown as typeof Table,
    ol: OrderedList,
    ul: UnorderedList,
    ...docskit,
    ...components,
  };
}
