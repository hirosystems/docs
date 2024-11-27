import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { recmaCodeHike, remarkCodeHike } from "codehike/mdx";

export const { docs, meta } = defineDocs({
  dir: "content/docs",
});

const chConfig = {
  components: {
    code: "DocsKitCode",
    inlineCode: "DocsKitInlineCode",
  },
  ignoreCode: ({ meta }: { meta: string }) => meta?.startsWith("title"),
};

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [[remarkCodeHike, chConfig], ...v],
    recmaPlugins: [[recmaCodeHike, chConfig]],
  },
});
