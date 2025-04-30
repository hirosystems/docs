import { DocsLayout } from "@/components/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { TopNav } from "@/components/top-nav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
      sidebar={{
        tabs: false,
        hideSearch: true,
        collapsible: false,
      }}
      // tabMode="navbar" // Set tabMode to navbar to display tabs in the navigation bar
      nav={{
        component: <TopNav />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
