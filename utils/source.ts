import { writeFileSync } from "node:fs";
import path from "node:path";
import { createMDXSource, defaultSchemas } from "fumadocs-mdx";
import type { StructuredData } from "fumadocs-core/mdx-plugins";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { z } from "zod";
import type { InferMetaType, InferPageType } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { icons as lucideIcons } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { map } from "@/.map";
import { create } from "@/components/ui/icon";
import { StacksIcon, BitcoinIcon } from "@/components/ui/icon";

const customIcons = {
  StacksIcon,
  BitcoinIcon,
};

const icons = { ...lucideIcons, ...customIcons } as any;

export function icon(iconName: string) {
  if (iconName in icons) {
    return create({ icon: icons[iconName as keyof typeof icons] });
  }
}

const frontmatterSchema = defaultSchemas.frontmatter.extend({
  preview: z.string().optional() as any,
  toc: z.boolean().default(true) as any,
  index: z.boolean().default(false) as any,
});

export const utils = loader({
  baseUrl: "/",
  rootDir: "docs",
  icon(icon) {
    if (icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
  source: createMDXSource(map, { schema: { frontmatter: frontmatterSchema } }),
});

export type Page = InferPageType<typeof utils>;
export type Meta = InferMetaType<typeof utils>;

export interface Index {
  id: string;
  title: string;
  description?: string;
  url: string;
  structuredData: StructuredData;
}

// Access and export MDX pages data to json file
// So that we can update search indexes after the build
const g = globalThis as unknown as {
  __NEXT_DOCS_INDEX_UPDATED?: boolean;
};

if (
  process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD &&
  !g.__NEXT_DOCS_INDEX_UPDATED
) {
  const mapPath = path.resolve("./.next/_map_indexes.json");
  const indexes: Index[] = utils.files.flatMap((file) => {
    if (file.type !== "page") return [];

    return {
      id: file.url,
      title: file.data.title,
      description: file.data.description,
      url: file.url,
      structuredData: file.data.exports.structuredData,
    };
  });

  writeFileSync(mapPath, JSON.stringify(indexes));

  g.__NEXT_DOCS_INDEX_UPDATED = true;
}
