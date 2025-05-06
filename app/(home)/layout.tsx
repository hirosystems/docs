import type { ReactNode } from "react";
import { HomeLayout } from "@/components/home";
import { TopNav } from "@/components/top-nav";
import { baseOptions } from "@/app/layout.config";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav />
      <HomeLayout {...baseOptions}>{children}</HomeLayout>
    </>
  );
}
