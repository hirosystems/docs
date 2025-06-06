import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { attachFile, createOpenAPI } from "fumadocs-openapi/server";
import type { ThemeRegistrationResolved } from "shiki";
import { icons as lucideIcons } from "lucide-react";
import {
  API,
  BitcoinIcon,
  Clarity,
  create,
  Hiro,
  StacksIcon,
} from "@/components/ui/icon";

const customIcons = {
  API,
  BitcoinIcon,
  Clarity,
  StacksIcon,
  Hiro,
};

const icons = { ...lucideIcons, ...customIcons } as any;

export function icon(iconName: string) {
  if (iconName in icons) {
    return create({ icon: icons[iconName as keyof typeof icons] });
  }
}

// Extract OpenAPI operations from MDX content
function extractOperationsFromContent(
  content: string
): Array<{ path: string; method: string }> {
  const operations: Array<{ path: string; method: string }> = [];

  // Regex to match APIPage components with operations (handle multi-line)
  const apiPageRegex = /<APIPage[^>]*operations=\{(\[[^\]]+\])\}[^>]*\/>/gs;

  let match;
  while ((match = apiPageRegex.exec(content)) !== null) {
    try {
      // Extract the operations array string
      const operationsStr = match[1];

      // Updated regex to handle the actual format: { path: '/path', method: 'method' }
      const pathMethodRegex =
        /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*method:\s*['"`]([^'"`]+)['"`]\s*\}/g;

      let opMatch;
      while ((opMatch = pathMethodRegex.exec(operationsStr)) !== null) {
        operations.push({
          path: opMatch[1],
          method: opMatch[2].toUpperCase(),
        });
      }
    } catch (error) {
      console.warn("Failed to parse operations from APIPage component:", error);
    }
  }

  return operations;
}

// Create dark theme matching global.css --ch-* variables
const hiroThemeDark: ThemeRegistrationResolved = {
  name: "hiro-dark",
  displayName: "Hiro Dark",
  type: "dark",
  fg: "#8c877d", // --ch-1
  bg: "#1e1e2e", // --ch-18
  settings: [
    {
      settings: {
        foreground: "#8c877d", // --ch-1
        background: "#1e1e2e", // --ch-18
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#595650", // --ch-3
        fontStyle: "italic",
      },
    },
    {
      scope: ["string", "punctuation.definition.string"],
      settings: {
        foreground: "#c2ebc4", // --ch-4
      },
    },
    {
      scope: ["constant.character.escape"],
      settings: {
        foreground: "#f5c2e7", // --ch-5
      },
    },
    {
      scope: [
        "constant.numeric",
        "variable.other.constant",
        "entity.name.constant",
        "constant.language.boolean",
        "constant.language.false",
        "constant.language.true",
      ],
      settings: {
        foreground: "#ff5500", // --ch-6
      },
    },
    {
      scope: [
        "keyword",
        "keyword.operator.word",
        "keyword.operator.new",
        "variable.language.super",
        "support.type.primitive",
        "storage.type",
        "storage.modifier",
        "punctuation.definition.keyword",
      ],
      settings: {
        foreground: "#ff9ecf", // --ch-7
      },
    },
    {
      scope: [
        "keyword.operator",
        "punctuation.accessor",
        "punctuation.definition.generic",
        "punctuation.definition.tag",
        "punctuation.separator.key-value",
      ],
      settings: {
        foreground: "#94e2d5", // --ch-8
      },
    },
    {
      scope: [
        "entity.name.function",
        "meta.function-call.method",
        "support.function",
        "support.function.misc",
        "variable.function",
      ],
      settings: {
        foreground: "#b3d9ff", // --ch-9
      },
    },
    {
      scope: [
        "entity.name.class",
        "entity.other.inherited-class",
        "support.class",
        "meta.function-call.constructor",
        "entity.name.struct",
        "entity.name.type",
        "support.type",
      ],
      settings: {
        foreground: "#ff9ecf", // --ch-10
      },
    },
    {
      scope: ["variable.parameter", "meta.function.parameters"],
      settings: {
        foreground: "#8c877d", // --ch-11
      },
    },
    {
      scope: ["constant.language", "support.function.builtin"],
      settings: {
        foreground: "#ff9ecf", // --ch-12
      },
    },
    {
      scope: [
        "support.type.property-name",
        "entity.name.tag",
        "entity.other.attribute-name",
      ],
      settings: {
        foreground: "#b3d9ff", // --ch-9
      },
    },
    {
      scope: ["variable", "variable.other.readwrite"],
      settings: {
        foreground: "#f2cdcd", // --ch-14
      },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: {
        foreground: "#a6adc8", // --ch-15
      },
    },
    {
      scope: ["invalid"],
      settings: {
        foreground: "#f2cdcd", // --ch-14
      },
    },
    {
      scope: ["invalid.deprecated"],
      settings: {
        foreground: "#585b70", // --ch-24
      },
    },
  ],
  colors: {
    "editor.background": "#1e1e2e", // --ch-18
    "editor.foreground": "#8c877d", // --ch-1
    "editorCursor.foreground": "#b3d9ff", // --ch-9
    "editorIndentGuide.background": "#585b70", // --ch-24
    "editorIndentGuide.activeBackground": "#7f849c", // --ch-26
    "editor.lineHighlightBackground": "#cdd6f412", // --ch-19
    "editor.selectionBackground": "#9399b240", // --ch-22
    "editorBracketMatch.border": "#585b70", // --ch-24
    "editorError.foreground": "#f2cdcd", // --ch-14
    "editorWarning.foreground": "#b3d9ff", // --ch-9
    "editorInfo.foreground": "#b3d9ff", // --ch-9
    "editorHint.foreground": "#a6adc8", // --ch-15
  },
};

// Create light theme matching global.css --ch-* variables
const hiroThemeLight: ThemeRegistrationResolved = {
  name: "hiro-light",
  displayName: "Hiro Light",
  type: "light",
  fg: "#7a756b", // --ch-1
  bg: "#eff1f5", // --ch-18
  settings: [
    {
      settings: {
        foreground: "#7a756b", // --ch-1
        background: "#eff1f5", // --ch-18
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#b5aca1", // --ch-3
        fontStyle: "italic",
      },
    },
    {
      scope: ["string", "punctuation.definition.string"],
      settings: {
        foreground: "#48944c", // --ch-4
      },
    },
    {
      scope: ["constant.character.escape"],
      settings: {
        foreground: "#ea76cb", // --ch-5
      },
    },
    {
      scope: [
        "constant.numeric",
        "variable.other.constant",
        "entity.name.constant",
        "constant.language.boolean",
        "constant.language.false",
        "constant.language.true",
      ],
      settings: {
        foreground: "#ff5500", // --ch-6
      },
    },
    {
      scope: [
        "keyword",
        "keyword.operator.word",
        "keyword.operator.new",
        "variable.language.super",
        "support.type.primitive",
        "storage.type",
        "storage.modifier",
        "punctuation.definition.keyword",
      ],
      settings: {
        foreground: "#bc812e", // --ch-7
      },
    },
    {
      scope: [
        "keyword.operator",
        "punctuation.accessor",
        "punctuation.definition.generic",
        "punctuation.definition.tag",
        "punctuation.separator.key-value",
      ],
      settings: {
        foreground: "#179299", // --ch-8
      },
    },
    {
      scope: [
        "entity.name.function",
        "meta.function-call.method",
        "support.function",
        "support.function.misc",
        "variable.function",
      ],
      settings: {
        foreground: "#3676b7", // --ch-9
      },
    },
    {
      scope: [
        "entity.name.class",
        "entity.other.inherited-class",
        "support.class",
        "meta.function-call.constructor",
        "entity.name.struct",
        "entity.name.type",
        "support.type",
      ],
      settings: {
        foreground: "#bc812e", // --ch-10
      },
    },
    {
      scope: ["variable.parameter", "meta.function.parameters"],
      settings: {
        foreground: "#7a756b", // --ch-11
      },
    },
    {
      scope: ["constant.language", "support.function.builtin"],
      settings: {
        foreground: "#bc812e", // --ch-12
      },
    },
    {
      scope: [
        "support.type.property-name",
        "entity.name.tag",
        "entity.other.attribute-name",
      ],
      settings: {
        foreground: "#3676b7", // --ch-9
      },
    },
    {
      scope: ["variable", "variable.other.readwrite"],
      settings: {
        foreground: "#dd7878", // --ch-14
      },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: {
        foreground: "#6c6f85", // --ch-15
      },
    },
    {
      scope: ["invalid"],
      settings: {
        foreground: "#dd7878", // --ch-14
      },
    },
    {
      scope: ["invalid.deprecated"],
      settings: {
        foreground: "#acb0be", // --ch-24 equivalent
      },
    },
  ],
  colors: {
    "editor.background": "#eff1f5", // --ch-18
    "editor.foreground": "#7a756b", // --ch-1
    "editorCursor.foreground": "#3676b7", // --ch-9
    "editorIndentGuide.background": "#acb0be", // --ch-24 equivalent
    "editorIndentGuide.activeBackground": "#8c8fa1", // --ch-26
    "editor.lineHighlightBackground": "#4c4f6912", // --ch-19
    "editor.selectionBackground": "#7c7f934d", // --ch-22
    "editorBracketMatch.border": "#acb0be", // --ch-24 equivalent
    "editorError.foreground": "#dd7878", // --ch-14
    "editorWarning.foreground": "#3676b7", // --ch-9
    "editorInfo.foreground": "#3676b7", // --ch-9
    "editorHint.foreground": "#6c6f85", // --ch-15
  },
};

// `loader()` also assign a URL to your pages
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  pageTree: {
    attachFile: (node, file) => {
      // Call the original attachFile first (in case it does something else useful)
      let processedNode = attachFile(node, file);

      // If it's an API page, extract OpenAPI operations ourselves
      if (node.type === "page" && node.url?.includes("/apis/")) {
        const fileData = (file as any)?.data?.data;
        if (fileData?.content) {
          const content = fileData.content;

          // Extract operations from APIPage components
          const operations = extractOperationsFromContent(content);

          if (operations.length > 0) {
            // Attach the operations to the node
            processedNode = {
              ...processedNode,
              data: {
                ...(processedNode as any).data,
                openapi: {
                  operations,
                },
              },
            } as any;
          }
        }
      }

      return processedNode;
    },
  },
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon && icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
});

export const openapi = createOpenAPI({
  // proxyUrl: "https://api.hiro.so",
  shikiOptions: {
    themes: {
      dark: hiroThemeDark,
      light: hiroThemeLight,
    },
  },
});
