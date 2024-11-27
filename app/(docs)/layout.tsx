import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { RootToggle } from "fumadocs-ui/components/layout/root-toggle";
import { StacksIcon } from "@/components/ui/icon";
import { Statuspage } from "statuspage.io";

const statuspage = new Statuspage("3111l89394q4");
console.log({ status: await statuspage.api.getStatus() });

function DocsToggle() {
  return (
    <div className="flex items-center gap-2 py-4 pl-2 border-b border-border">
      <div className="rounded-md border bg-gradient-to-b from-secondary p-1 shadow-sm">
        <StacksIcon size={16} />
      </div>
      <RootToggle
        className="w-full flex justify-between p-0"
        options={[
          { title: "Stacks Docs", url: "/stacks" },
          { title: "Bitcoin Docs", url: "/bitcoin" },
        ]}
      />
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        tabs: false,
        banner: <DocsToggle />,
      }}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
