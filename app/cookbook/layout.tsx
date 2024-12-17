import { Layout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { homeLayoutOptions } from "../(docs)/layout";

export default function CookbookLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="px-10 *:border-none">
      <Layout {...homeLayoutOptions}>
        <div className="min-h-screen py-8">
          <div className="space-y-6">{children}</div>
        </div>
      </Layout>
    </div>
  );
}
