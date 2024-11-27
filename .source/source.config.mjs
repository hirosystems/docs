// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { recmaCodeHike, remarkCodeHike } from "codehike/mdx";
var { docs, meta } = defineDocs({
  dir: "content/docs"
});
var chConfig = {
  components: {
    code: "DocsKitCode",
    inlineCode: "DocsKitInlineCode"
  },
  ignoreCode: ({ meta: meta2 }) => meta2?.startsWith("title")
};
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [[remarkCodeHike, chConfig], ...v],
    recmaPlugins: [[recmaCodeHike, chConfig]]
  }
});
export {
  source_config_default as default,
  docs,
  meta
};
