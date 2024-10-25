import { Layout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { homeLayoutOptions } from "../(docs)/layout";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto *:border-none">
      <Layout {...homeLayoutOptions}>{children}</Layout>
    </div>
  );
}
