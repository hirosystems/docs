import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { utils } from "@/utils/source";
import { create } from "@/components/ui/icon";
import { HiroIcon, HiroSVG } from "../(home)/icons";
import { Body, NavChildren, SidebarBanner } from "./layout.client";

export const layoutOptions: Omit<DocsLayoutProps, "children"> = {
  tree: utils.pageTree,
  nav: {
    transparentMode: "top",
    title: (
      <div className="text-md flex gap-3 items-center group">
        <HiroIcon className="size-11 shrink-0 rounded-md" />
        <span className="max-lg:hidden text-gray-500">|</span>
        <span className="max-lg:hidden text-gray-500 group-hover:text-primary">
          Documentation
        </span>
      </div>
    ),
    children: <NavChildren />,
    links: [
      {
        label: "Hiro Platform",
        href: "https://platform.hiro.so/",
        icon: (
          <div className="flex items-center gap-1 bg-secondary p-1.5 rounded-md">
            <span className="ml-2 font-semibold max-md:hidden">
              Hiro Platform
            </span>
            <ArrowUpRight />
          </div>
        ),
        external: true,
      },
    ],
  },
  links: [
    // {
    //   text: "Guides",
    //   url: "/guides",
    // },
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
