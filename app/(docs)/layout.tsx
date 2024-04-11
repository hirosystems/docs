import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { LayoutTemplateIcon } from "lucide-react";
import { utils } from "@/utils/source";
import { create } from "@/components/ui/icon";
import { FumaDocsSVG, HiroSVG } from "../(home)/icons";
import { Body, NavChildren, SidebarBanner } from "./layout.client";

export const layoutOptions: Omit<DocsLayoutProps, "children"> = {
  tree: utils.pageTree,
  nav: {
    transparentMode: "top",
    title: (
      <>
        <HiroSVG
          className="size-5 shrink-0 rounded-md dark:bg-neutral/90 dark:text-neutral-900 bg-primary text-white"
          fill="currentColor"
        />
        <span className="ml-2 font-semibold max-md:hidden">Hiro Docs</span>
      </>
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
      text: "Examples",
      url: "/examples",
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
