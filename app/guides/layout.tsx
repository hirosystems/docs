import { Layout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { layoutOptions } from "../(docs)/layout";

export default function ExampleLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <Layout {...layoutOptions}>{children}</Layout>;
}
