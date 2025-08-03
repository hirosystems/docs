import { type CodeHikeConfig, recmaCodeHike, remarkCodeHike } from 'codehike/mdx';
import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import remarkDirective from 'remark-directive';
import { z } from 'zod';
import { remarkCustomDirectives } from './lib/remark-custom-directives';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      llm: z.boolean().optional(),
      isNew: z.boolean().optional(),
      publishedAt: z.string().optional(),
      sidebarTitle: z.string().optional(),
      root: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      labels: z.array(z.string()).optional(),
      type: z.string().optional(),
      isRpc: z.boolean().optional(),
      // Interactive layout fields
      interactive: z.boolean().optional(),
      interactiveFeatures: z.array(z.string()).optional(),
      interactiveLinks: z
        .array(
          z.object({
            title: z.string(),
            href: z.string(),
            icon: z.string().optional(),
          }),
        )
        .optional(),
    }),
  },
  meta: {
    // options for `meta` collection
  },
});

const chConfig: CodeHikeConfig = {
  components: {
    code: 'DocsKitCode',
    inlineCode: 'DocsKitInlineCode',
  },
};

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [
      [remarkCodeHike, chConfig],
      remarkDirective,
      remarkCustomDirectives,
      ...v,
    ],
    recmaPlugins: [[recmaCodeHike, chConfig]],
  },
});
