import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { utils } from "@/utils/source";
import { DocsLogo } from "@/components/ui/icon";
import { Body, NavChildren, SidebarBanner } from "./layout.client";
import { Statuspage } from "statuspage.io";

const statuspage = new Statuspage("3111l89394q4");
console.log({ status: await statuspage.api.getStatus() });

export const layoutOptions: Omit<DocsLayoutProps, "children"> = {
  tree: utils.pageTree,
  nav: {
    transparentMode: "top",
    title: <DocsLogo className="size-28 hidden sm:block" />,
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
    {
      text: "Guides",
      url: "/guides",
    },
    // {
    //   text: "Cookbook",
    //   url: "/cookbook",
    // },
  ],
  sidebar: {
    defaultOpenLevel: 0,
    banner: <SidebarBanner />,
  },
};

export const homeLayoutOptions: Omit<DocsLayoutProps, "children"> = {
  tree: utils.pageTree,
  nav: {
    transparentMode: "top",
    title: <DocsLogo className="size-28 hidden sm:block" />,
    children: null,
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
    {
      text: "Guides",
      url: "/guides",
    },
    {
      text: "Cookbook",
      url: "/cookbook",
    },
  ],
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
