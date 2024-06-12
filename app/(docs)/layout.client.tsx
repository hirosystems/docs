"use client";

import { cva } from "class-variance-authority";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { modes } from "@/utils/modes";
import { ArrowLeft, ChevronLeft } from "lucide-react";

const itemVariants = cva(
  "rounded-md px-2 py-1 transition-colors hover:text-accent-foreground",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
      },
    },
  }
);

export function Body({ children }: { children: ReactNode }): JSX.Element {
  const mode = useMode();

  return <div className={mode}>{children}</div>;
}

export function NavChildren(): JSX.Element {
  const mode = useMode();

  const filteredModes = modes.filter((m) => m.param !== "guides");

  return (
    <div className="rounded-md border bg-secondary/50 p-1 text-sm text-muted-foreground max-md:absolute max-md:left-[50%] max-md:translate-x-[-50%]">
      {filteredModes.map((m) => (
        <Link
          key={m.param}
          href={`/${m.param}`}
          className={cn(itemVariants({ active: mode === m.param }))}
        >
          {m.name}
        </Link>
      ))}
    </div>
  );
}

export function useMode(): string | undefined {
  const { slug } = useParams();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}

export function SidebarBanner(): JSX.Element {
  const pathname = usePathname();
  const mode = useMode();
  const currentMode = modes.find((item) => item.param === mode) ?? modes[0];
  const Icon = currentMode.icon;

  if (
    pathname === "/stacks" ||
    pathname === "/stacks/getting-started" ||
    pathname === "/ordinals" ||
    pathname === "/ordinals/getting-started" ||
    pathname === "/guides"
  ) {
    return <></>;
  }

  return (
    <Link key={currentMode.param} href={`/${currentMode.param}`}>
      <div className="group flex flex-row items-center gap-2 rounded-lg px-2 transition-colors">
        <ChevronLeft className="text-muted-foreground size-4 shrink-0 rounded-md group-hover:text-primary" />
        <div>
          <p className="text-muted-foreground group-hover:text-primary">
            Back to homepage
          </p>
        </div>
      </div>
    </Link>
  );
}
