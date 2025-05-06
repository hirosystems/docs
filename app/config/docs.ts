import type { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Cookbook",
      href: "/cookbook",
    },
    {
      title: "GitHub",
      href: "https://github.com/example/repo", // Example external link
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/introduction",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        {
          title: "Concept A",
          href: "/docs/concepts/a",
        },
        {
          title: "Concept B",
          href: "/docs/concepts/b",
        },
      ],
    },
    // Add more sidebar groups as needed
  ],
};
