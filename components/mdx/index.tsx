import * as FilesComponents from 'fumadocs-ui/components/files';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import * as StepsComponents from 'fumadocs-ui/components/steps';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as icons from 'lucide-react';
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/callout';
import * as CardComponents from '@/components/card';
import { docskit } from '@/components/docskit/components';
import { OrderedList, UnorderedList } from '@/components/lists';
import { CustomTable as Table, type TableProps } from '@/components/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import * as customIcons from '@/components/ui/icon';
import * as TabsComponents from '@/components/ui/tabs';

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
    img: (props) => (
      <span className="block my-6 rounded-xl bg-gradient-to-br from-neutral-300 via-neutral-200 to-orange-200/30 dark:from-neutral-600 dark:via-neutral-700 dark:to-orange-900/20">
        <span className="block rounded-xl bg-white dark:bg-neutral-950 px-4 py-2">
          <ImageZoom className="!h-[350px] mx-auto rounded-lg" {...(props as any)} />
        </span>
      </span>
    ),
    table: Table as unknown as typeof Table,
    ol: OrderedList,
    ul: UnorderedList,
    ...docskit,
    ...components,
  };
}
