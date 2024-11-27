import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DocsLogo } from "@/components/ui/icon";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <DocsLogo />,
  },
  githubUrl: "https://github.com/hirosystems/docs",
  links: [
    {
      type: "main",
      text: "Guides",
      url: "/guides",
    },
    {
      type: "main",
      text: "Cookbook",
      url: "/cookbook",
    },
    {
      type: "menu",
      text: "API Reference",
      items: [
        {
          text: "Stacks Blockchain API",
          url: "/stacks/api",
        },
        {
          text: "Stacks Node RPC",
          url: "/stacks/rpc-api",
        },
        {
          text: "Token Metadata API",
          url: "/stacks/token-metadata-api",
        },
        {
          text: "Ordinals API",
          url: "/bitcoin/ordinals/api",
        },
        {
          text: "Runes API",
          url: "/bitcoin/runes/api",
        },
      ],
    },
    {
      type: "menu",
      text: "Client Libraries",
      items: [
        {
          text: "Stacks.js",
          url: "/stacks/stacks-js",
        },
        {
          text: "Stacks API Client SDK",
          url: "/stacks/api-client-sdk",
        },
        {
          text: "Clarinet JS SDK",
          url: "/stacks/clarinet-js-sdk",
        },
      ],
    },
    {
      text: "",
      type: "icon",
      url: "https://platform.hiro.so/",
      icon: (
        <Button
          variant="secondary"
          className="group h-8 gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-primary hover:bg-secondary/80"
        >
          Hiro Platform
          <ArrowUpRight className="!size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      ),
    },
  ],
};
