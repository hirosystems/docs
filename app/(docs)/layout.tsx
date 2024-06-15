import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { LayoutTemplateIcon } from "lucide-react";
import { utils } from "@/utils/source";
import { create } from "@/components/ui/icon";
import { HiroIcon, HiroSVG } from "../(home)/icons";
import { Body, NavChildren, SidebarBanner } from "./layout.client";

export const layoutOptions: Omit<DocsLayoutProps, "children"> = {
  tree: utils.pageTree,
  nav: {
    transparentMode: "top",
    title: (
      <div className="text-md flex gap-3 items-center">
        <HiroIcon className="size-11 shrink-0 rounded-md" fill="currentColor" />
        <span className="max-md:hidden text-gray-500">|</span>
        <span className="max-md:hidden text-gray-500">Documentation</span>
      </div>
    ),
    children: <NavChildren />,
    links: [
      {
        label: "Hiro Platform",
        href: "https://platform.hiro.so/",
        icon: (
          <>
            <HiroSVG
              className="size-5 shrink-0 rounded-md dark:bg-neutral/90 dark:text-neutral-900 bg-primary text-white"
              fill="currentColor"
            />
            <span className="ml-2 font-semibold max-md:hidden">
              Hiro Platform
            </span>
          </>
        ),
        external: true,
      },
    ],
  },
  links: [
    {
      text: "Guides",
      url: "/guides",
      icon: create({ icon: LayoutTemplateIcon }),
    },
  ],
  sidebar: {
    defaultOpenLevel: 0,
    banner: <SidebarBanner />,
  },
};

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <Body>
      <DocsLayout {...layoutOptions}>{children}</DocsLayout>
    </Body>
  );
}
