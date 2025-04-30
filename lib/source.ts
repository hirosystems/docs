import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createOpenAPI } from "fumadocs-openapi/server";
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

// Create the Sequoia Monochrome theme
const sequoiaMonochromeTheme: ThemeRegistrationResolved = {
  name: "sequoia-monochrome",
  displayName: "Sequoia Monochrome",
  type: "dark",
  fg: "#868690",
  bg: "#0F1014",
  settings: [
    {
      settings: {
        foreground: "#868690",
        background: "#0F1014",
      },
    },
    {
      scope: ["comment"],
      settings: {
        foreground: "#43444D",
        fontStyle: "italic",
      },
    },
    {
      scope: ["constant"],
      settings: {
        foreground: "#626983",
      },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.charcter.escape",
      ],
      settings: {
        foreground: "#B6BAC8",
      },
    },
    {
      scope: ["entity.name"],
      settings: {
        foreground: "#B6BAC8",
      },
    },
    {
      scope: [
        "entity.name.section",
        "entity.name.tag",
        "entity.name.namespace",
        "entity.name.type",
      ],
      settings: {
        foreground: "#7C829D",
      },
    },
    {
      scope: ["entity.other.attribute-name", "entity.other.inherited-class"],
      settings: {
        foreground: "#E2E4ED",
        fontStyle: "italic",
      },
    },
    {
      scope: ["invalid"],
      settings: {
        foreground: "#999EB2",
      },
    },
    {
      scope: ["invalid.deprecated"],
      settings: {
        foreground: "#575861",
      },
    },
    {
      scope: ["keyword"],
      settings: {
        foreground: "#626983",
      },
    },
    {
      scope: ["meta.tag", "meta.brace"],
      settings: {
        foreground: "#868690",
      },
    },
    {
      scope: ["meta.import", "meta.export"],
      settings: {
        foreground: "#626983",
      },
    },
    {
      scope: ["punctuation"],
      settings: {
        foreground: "#575861",
      },
    },
    {
      scope: ["punctuation.accessor"],
      settings: {
        foreground: "#626983",
      },
    },
    {
      scope: ["punctuation.definition.string"],
      settings: {
        foreground: "#D3D5DE",
      },
    },
    {
      scope: ["storage.type", "storage.modifier"],
      settings: {
        foreground: "#626983",
      },
    },
    {
      scope: ["string"],
      settings: {
        foreground: "#D3D5DE",
      },
    },
    {
      scope: ["support"],
      settings: {
        foreground: "#7C829D",
      },
    },
    {
      scope: ["support.constant"],
      settings: {
        foreground: "#D3D5DE",
      },
    },
    {
      scope: ["support.function"],
      settings: {
        foreground: "#999EB2",
        fontStyle: "italic",
      },
    },
    {
      scope: ["variable"],
      settings: {
        foreground: "#B6BAC8",
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "variable.other",
        "variable.language",
        "variable.function",
        "variable.argument",
      ],
      settings: {
        foreground: "#868690",
      },
    },
    {
      scope: ["variable.parameter"],
      settings: {
        foreground: "#E2E4ED",
      },
    },
  ],
  colors: {
    "editor.background": "#0F1014",
    "editor.foreground": "#868690",
    "editorCursor.foreground": "#7C829D",
    "editorIndentGuide.background": "#817c9c4d",
    "editorIndentGuide.activeBackground": "#43444D",
    "editor.lineHighlightBackground": "#817c9c14",
    "editor.selectionBackground": "#817c9c26",
    "editorBracketMatch.border": "#575861",
    "editorError.foreground": "#999EB2",
    "editorWarning.foreground": "#D3D5DE",
    "editorInfo.foreground": "#7C829D",
    "editorHint.foreground": "#575861",
  },
};

// Create a light version of the theme
const sequoiaMonochromeThemeLight: ThemeRegistrationResolved = {
  ...sequoiaMonochromeTheme,
  name: "sequoia-monochrome-light",
  displayName: "Sequoia Monochrome Light",
  type: "light",
  fg: "#333333",
  bg: "#FFFFFF",
  settings: [
    {
      settings: {
        foreground: "#333333",
        background: "#FFFFFF",
      },
    },
    ...sequoiaMonochromeTheme.settings.slice(1),
  ],
  colors: {
    ...sequoiaMonochromeTheme.colors,
    "editor.background": "#FFFFFF",
    "editor.foreground": "#333333",
  },
};

// `loader()` also assign a URL to your pages
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
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
      dark: sequoiaMonochromeTheme,
      light: sequoiaMonochromeThemeLight,
    },
  },
});
