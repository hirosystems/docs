"use client";
import React, { ButtonHTMLAttributes } from "react";
import type { PageTree } from "fumadocs-core/server";
import { type ReactNode, useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TreeContextProvider, useTreeContext } from "fumadocs-ui/contexts/tree";
import Link from "fumadocs-core/link";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useSidebar } from "fumadocs-ui/contexts/sidebar";
import { cva } from "class-variance-authority";
import { usePathname } from "fumadocs-core/framework";
import { Button } from "../ui/button";
import { ThemeToggle } from "../layout/theme-toggle";
import { Kbd } from "../ui/kbd";
import {
  ArrowUpRight,
  SidebarIcon,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import { useKeyboardShortcuts } from "@/lib/hooks/use-keyboard-shortcuts";
import { DocsLogo } from "../ui/icon";
import { SearchToggle } from "../layout/search-toggle";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../ui/navigation-menu";

export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}

const toolsItems = [
  {
    title: "Clarinet",
    href: "/tools/clarinet",
    description:
      "Development environment and testing framework for Clarity smart contracts.",
  },
  {
    title: "Chainhook",
    href: "/tools/chainhook",
    description: "Monitor and analyze Clarity smart contract activity.",
  },
  {
    title: "Bitcoin indexer",
    href: "/tools/bitcoin-indexer",
    description: "Indexer for Bitcoin blockchain data.",
  },
];

const apisItems = [
  {
    title: "Stacks API",
    href: "/apis/stacks-blockchain",
    description:
      "RESTful API for accessing Stacks blockchain data and functionality.",
  },
  {
    title: "Token Metadata API",
    href: "/apis/token-metadata",
    description: "API for retrieving NFT and fungible token metadata.",
  },
  {
    title: "Ordinals API",
    href: "/apis/ordinals",
    description: "API for Bitcoin Ordinals and inscriptions data.",
  },
  {
    title: "Runes API",
    href: "/apis/runes",
    description: "API for Bitcoin Runes data.",
  },
];

const librariesItems = [
  {
    title: "Stacks.js",
    href: "/libraries/stacks-js",
    description:
      "JavaScript/TypeScript library for building Stacks applications.",
  },
  {
    title: "Clarity SDK",
    href: "/libraries/clarity-sdk",
    description:
      "Software development kit for Clarity smart contract development.",
  },
  {
    title: "Connect",
    href: "/libraries/connect",
    description: "Library for connecting web applications to Stacks wallets.",
  },
  {
    title: "Auth",
    href: "/libraries/auth",
    description: "Authentication library for Stacks-based applications.",
  },
];

const resourcesItems = [
  {
    title: "Tutorials",
    href: "/resources/tutorials",
    description: "Step-by-step guides for building on Stacks.",
  },
  {
    title: "Examples",
    href: "/resources/examples",
    description: "Sample applications and code snippets.",
  },
  {
    title: "Community",
    href: "/resources/community",
    description: "Join the Stacks developer community.",
  },
  {
    title: "Support",
    href: "/resources/support",
    description: "Get help and support for your development needs.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted-foreground hover:text-primary focus:bg-[#f6f5f3] focus:text-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-primary">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-[#8c877d]">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { registerShortcut } = useKeyboardShortcuts();
  const { open, collapsed } = useSidebar();

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
          <div className="flex flex-row items-center gap-4">
            <NavbarSidebarTrigger />
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <DocsLogo className="hidden sm:block" />
            </Link>
          </div>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row items-center gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/start"
                    className={cn("font-fono text-sm px-4 py-2 rounded-md")}
                  >
                    Get Started
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-fono text-sm px-4 py-2 rounded-md">
                    Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-12 bg-background border">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-neutral-100 dark:bg-neutral-950 p-6 no-underline outline-none focus:shadow-md hover:muted-foreground"
                            href="/tools"
                          >
                            <div className="w-6 h-6 bg-[#ff5500] rounded-sm mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-primary">
                              Developer Tools
                            </div>
                            <p className="text-sm leading-tight text-[#8c877d]">
                              Essential tools for building on Stacks blockchain.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {toolsItems.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-fono text-sm px-4 py-2 rounded-md">
                    APIs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-12 bg-background border">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-neutral-100 dark:bg-neutral-950 bg-neutral-100 dark:bg-neutral-950 p-6 no-underline outline-none focus:shadow-md hover:muted-foreground"
                            href="/apis"
                          >
                            <div className="w-6 h-6 bg-[#ff5500] rounded-sm mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-primary">
                              APIs
                            </div>
                            <p className="text-sm leading-tight text-[#8c877d]">
                              RESTful APIs for accessing Stacks blockchain data.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {apisItems.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-fono text-sm px-4 py-2 rounded-md">
                    Libraries & SDKs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-12 bg-background border">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-neutral-100 dark:bg-neutral-950 p-6 no-underline outline-none focus:shadow-md hover:muted-foreground"
                            href="/libraries"
                          >
                            <div className="w-6 h-6 bg-[#ff5500] rounded-sm mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-primary">
                              Libraries & SDKs
                            </div>
                            <p className="text-sm leading-tight text-[#8c877d]">
                              Software development kits and libraries for
                              Stacks.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {librariesItems.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-fono text-sm px-4 py-2 rounded-md">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-12 bg-background border">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-neutral-100 dark:bg-neutral-950 p-6 no-underline outline-none focus:shadow-md hover:muted-foreground"
                            href="/resources"
                          >
                            <div className="w-6 h-6 bg-[#ff5500] rounded-sm mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-primary">
                              Resources
                            </div>
                            <p className="text-sm leading-tight text-[#8c877d]">
                              Tutorials, examples, and community resources.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {resourcesItems.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-3">
            <SearchToggle />
            <ThemeToggle />
            <Button className="bg-brand-orange font-fono text-neutral-900 flex items-baseline gap-0.5 px-3 py-2 hover:bg-brand-orange transition-colors duration-200 group">
              Sign in
              <ArrowUpRight className="w-3.5 h-3.5 translate-y-0.5 group-hover:translate-y-0 transition-transform duration-200" />
            </Button>
          </div>
        </nav>
      </header>
      <main
        id="nd-docs-layout"
        className={cn(
          "flex flex-1 flex-row transition-all duration-100",
          collapsed && "md:pl-[calc(var(--nav-offset)-115px)]"
        )}
      >
        <Sidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </main>
    </TreeContextProvider>
  );
}

function Sidebar() {
  const { root } = useTreeContext();
  const { open, collapsed } = useSidebar();
  const pathname = usePathname();

  const children = useMemo(() => {
    const filterCriteria = ["tools", "apis", "reference", "resources"];

    const shouldFilterItem = (item: PageTree.Node): boolean => {
      const isCurrentSection = filterCriteria.some(
        (criteria) =>
          pathname?.includes(`/${criteria}/`) || pathname === `/${criteria}`
      );

      if (isCurrentSection) {
        const currentSectionFilter = filterCriteria.find(
          (criteria) =>
            pathname?.includes(`/${criteria}/`) || pathname === `/${criteria}`
        );
        return (
          !item.$id?.includes(currentSectionFilter ?? "") &&
          filterCriteria.some(
            (criteria) => item.$id?.includes(criteria) ?? false
          )
        );
      }

      // If not in a sub section, filter out all the specified sections
      return filterCriteria.some(
        (criteria) => item.$id?.includes(criteria) ?? false
      );
    };

    function renderItems(items: PageTree.Node[]) {
      const filteredItems = items.filter((item) => !shouldFilterItem(item));

      return filteredItems.map((item) => (
        <SidebarItem key={item.$id} item={item}>
          {item.type === "folder" ? renderItems(item.children) : null}
        </SidebarItem>
      ));
    }

    return renderItems(root.children);
  }, [root, pathname]);

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "fixed flex flex-col shrink-0 py-10 px-2 top-14 z-20 text-sm overflow-auto md:sticky md:h-[calc(100dvh-56px)]",
        "max-md:inset-x-0 max-md:bottom-0 max-md:bg-fd-background",
        !open && "max-md:invisible",
        "md:w-[250px] md:transition-all md:duration-100 ease-linear",
        collapsed && "md:w-0 md:p-0 md:overflow-hidden md:invisible"
      )}
    >
      {children}
    </aside>
  );
}

const linkVariants = cva(
  "flex items-center gap-2 w-full py-1.5 px-2 rounded-lg text-muted-foreground [&_svg]:size-4",
  {
    variants: {
      active: {
        true: "text-primary bg-neutral-150 dark:bg-neutral-700",
        false: "hover:text-fd-accent-foreground hover:bg-card",
      },
    },
  }
);

export function NavbarSidebarTrigger(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Collapse Sidebar"
      data-collapsed={collapsed}
      {...props}
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-md border border-border hover:bg-neutral-200 dark:bg-neutral-700 transition-colors cursor-pointer",
        "hidden md:flex",
        props.className
      )}
      onClick={() => {
        setCollapsed((prev) => !prev);
      }}
    >
      <SidebarIcon className="w-4 h-4" />
    </button>
  );
}

function SidebarItem({
  item,
  children,
}: {
  item: PageTree.Node;
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Helper function to check if the current pathname is within this folder's children
  const isPathInFolder = (
    folderItem: PageTree.Node,
    currentPath: string
  ): boolean => {
    if (folderItem.type !== "folder") return false;

    // Check if current path matches folder index page
    if (folderItem.index?.url === currentPath) return true;

    // Recursively check children
    const checkChildren = (children: PageTree.Node[]): boolean => {
      return children.some((child) => {
        if (child.type === "page" && child.url === currentPath) return true;
        if (child.type === "folder") {
          if (child.index?.url === currentPath) return true;
          return checkChildren(child.children);
        }
        return false;
      });
    };

    return checkChildren(folderItem.children);
  };

  // Determine if folder should be expanded
  const shouldExpand =
    item.type === "folder" &&
    (isPathInFolder(item, pathname) || (item as any).defaultOpen === true);

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
      <p className="text-primary font-fono uppercase mt-6 mb-2 first:mt-0 px-2">
        {item.icon}
        {item.name}
      </p>
    );
  }

  // Folder type with minimal accordion styling
  const getStringValue = (value: any): string => {
    if (typeof value === "string") return value;
    if (typeof value === "number") return value.toString();
    return "folder";
  };

  const accordionValue =
    getStringValue(item.$id) || getStringValue(item.name) || "folder";

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultValue={shouldExpand ? accordionValue : undefined}
        className="space-y-0 bg-transparent border-none"
      >
        <AccordionItem value={accordionValue} className="border-0">
          <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden h-auto">
            <div
              className={cn(
                linkVariants({
                  active: item.index ? pathname === item.index.url : false,
                }),
                "justify-between w-full"
              )}
            >
              <div className="flex items-center gap-2 flex-1">
                {item.index ? (
                  <Link
                    href={item.index.url}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 hover:underline"
                  >
                    {item.index.icon}
                    {item.index.name}
                  </Link>
                ) : (
                  <>
                    {item.icon}
                    {item.name}
                  </>
                )}
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 pt-0">
            <div className="pl-4 border-l flex flex-col">{children}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
