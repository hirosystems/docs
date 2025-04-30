// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";
import { z } from "zod";
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      llm: z.boolean().optional()
    })
  },
  meta: {
    // options for `meta` collection
  }
});
var chConfig = {
  components: {
    code: "DocsKitCode",
    inlineCode: "DocsKitInlineCode"
  }
};
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [[remarkCodeHike, chConfig], ...v],
    recmaPlugins: [[recmaCodeHike, chConfig]]
  }
});
export {
  source_config_default as default,
  docs
};
