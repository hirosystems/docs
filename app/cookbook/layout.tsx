import React, { JSX } from "react";
import type { ReactNode } from "react";
import { TopNav } from "@/components/top-nav";

export default function CookbookLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="px-10 *:border-none">
      <TopNav />
      <div className="min-h-screen py-8">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
