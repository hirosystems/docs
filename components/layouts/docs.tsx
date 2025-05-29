"use client";
import React from "react";
import type { PageTree } from "fumadocs-core/server";
import { type ComponentProps, type ReactNode, useMemo } from "react";
import { cn } from "@/lib/cn";
import { TreeContextProvider, useTreeContext } from "fumadocs-ui/contexts/tree";
import Link from "fumadocs-core/link";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useSidebar } from "fumadocs-ui/contexts/sidebar";
import { cva } from "class-variance-authority";
import { usePathname } from "fumadocs-core/framework";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "../layout/theme-toggle";
import { Kbd } from "../ui/kbd";
import { SearchIcon, SidebarIcon } from "lucide-react";

import { useKeyboardShortcuts } from "@/lib/hooks/use-keyboard-shortcuts";
import { DocsLogo } from "../ui/icon";

export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { registerShortcut } = useKeyboardShortcuts();
  const { open } = useSidebar();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    // Register 'p' shortcut for platform navigation
    const platformShortcut = registerShortcut({
      key: "p",
      callback: () => {
        window.open(
          "https://platform.hiro.so",
          "_blank",
          "noopener,noreferrer"
        );
      },
      preventDefault: true,
    });

    // Register 't' shortcut for calendar scheduling
    const calendarShortcut = registerShortcut({
      key: "t",
      callback: () => {
        window.open(
          "https://cal.com/waits/15min",
          "_blank",
          "noopener,noreferrer"
        );
      },
      preventDefault: true,
    });

    // Clean up both shortcuts
    return () => {
      platformShortcut();
      calendarShortcut();
    };
  }, [registerShortcut]);

  return (
    <TreeContextProvider tree={tree}>
      <header
        className={cn(
          "sticky top-0 z-50 h-16 transition-all duration-200",
          "bg-background/50 backdrop-blur-md",
          isScrolled ? "border-b border-border" : "border-b border-transparent"
        )}
      >
        <nav className="flex flex-row items-center gap-2 size-full px-4">
          {/* <NavbarSidebarTrigger /> */}
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <DocsLogo className="hidden sm:block" />
          </Link>

          <div className="flex flex-1 items-center justify-end space-x-3">
            <SearchToggle />
            <Button className="cursor-pointer bg-neutral-150 dark:bg-neutral-700 flex items-center gap-2 px-2.5 py-1.5 text-primary hover:bg-neutral-200 dark:hover:bg-neutral-800">
              Hiro Platform
              <Kbd className="flex items-center justify-center rounded text-sm border border-border bg-neutral-100 dark:bg-neutral-500">
                P
              </Kbd>
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main
        id="nd-docs-layout"
        className="flex flex-1 flex-row pe-(--fd-layout-offset) [--fd-tocnav-height:36px] md:[--fd-sidebar-width:268px] lg:[--fd-sidebar-width:286px] xl:[--fd-toc-width:286px] xl:[--fd-tocnav-height:0px] [--fd-nav-height:56px] md:[--fd-nav-height:0px]"
      >
        <Sidebar />
        {children}
      </main>
    </TreeContextProvider>
  );
}

function SearchToggle(props: ComponentProps<"button">) {
  const { enabled, setOpenSearch } = useSearchContext();
  if (!enabled) return;

  return (
    <div
      className="w-full max-w-[221px] h-8 bg-white dark:bg-neutral-950 rounded-md flex items-center px-2 cursor-pointer group"
      onClick={() => setOpenSearch(true)}
    >
      <div className="flex items-center flex-1 gap-2">
        <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
          Search
        </span>
      </div>
      <div className="flex items-center gap-1 group">
        <Kbd className="flex items-center justify-center rounded text-md bg-card text-muted-foreground group-hover:text-primary transition-colors">
          ⌘
        </Kbd>
        <Kbd className="flex items-center justify-center rounded text-sm bg-card text-muted-foreground group-hover:text-primary transition-colors">
          K
        </Kbd>
      </div>
    </div>
  );
}

function NavbarSidebarTrigger({
  className,
  ...props
}: ComponentProps<"button">) {
  const { setOpen, open } = useSidebar();
  console.log(open);

  return (
    <button
      {...props}
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "icon-sm",
          className,
        })
      )}
      onClick={() => setOpen((prev) => !prev)}
    >
      <SidebarIcon />
    </button>
  );
}

function Sidebar() {
  const { root } = useTreeContext();
  const { open } = useSidebar();

  const children = useMemo(() => {
    function renderItems(items: PageTree.Node[]) {
      return items.map((item) => (
        <SidebarItem key={item.$id} item={item}>
          {item.type === "folder" ? renderItems(item.children) : null}
        </SidebarItem>
      ));
    }

    return renderItems(root.children);
  }, [root]);

  return (
    <aside
      className={cn(
        "fixed flex flex-col shrink-0 p-4 top-14 z-20 text-sm overflow-auto md:sticky md:h-[calc(100dvh-56px)] md:w-[300px]",
        "max-md:inset-x-0 max-md:bottom-0 max-md:bg-fd-background",
        !open && "max-md:invisible"
      )}
    >
      {children}
    </aside>
  );
}

const linkVariants = cva(
  "flex items-center gap-2 w-full py-1.5 rounded-lg text-fd-foreground/80 [&_svg]:size-4",
  {
    variants: {
      active: {
        true: "text-fd-primary font-medium",
        false: "hover:text-fd-accent-foreground",
      },
    },
  }
);

function SidebarItem({
  item,
  children,
}: {
  item: PageTree.Node;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (item.type === "page") {
    return (
      <Link
        href={item.url}
        className={linkVariants({
          active: pathname === item.url,
        })}
      >
        {item.icon}
        {item.name}
      </Link>
    );
  }

  if (item.type === "separator") {
    return (
      <p className="text-fd-muted-foreground mt-6 mb-2 first:mt-0">
        {item.icon}
        {item.name}
      </p>
    );
  }

  return (
    <div>
      {item.index ? (
        <Link
          className={linkVariants({
            active: pathname === item.index.url,
          })}
          href={item.index.url}
        >
          {item.index.icon}
          {item.index.name}
        </Link>
      ) : (
        <p className={cn(linkVariants(), "text-start")}>
          {item.icon}
          {item.name}
        </p>
      )}
      <div className="pl-4 border-l flex flex-col">{children}</div>
    </div>
  );
}
