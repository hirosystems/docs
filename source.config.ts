import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { remarkCodeHike, recmaCodeHike, CodeHikeConfig } from "codehike/mdx";
import remarkDirective from "remark-directive";
import { remarkCustomDirectives } from "./lib/remark-custom-directives";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      llm: z.boolean().optional(),
      isNew: z.boolean().optional(),
      publishedAt: z.string().optional(),
      sidebarTitle: z.string().optional(),
      root: z.boolean().optional(),
    }),
  },
  meta: {
    // options for `meta` collection
  },
});

const chConfig: CodeHikeConfig = {
  components: {
    code: "DocsKitCode",
    inlineCode: "DocsKitInlineCode",
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
