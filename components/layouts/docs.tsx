"use client";
import React, { ButtonHTMLAttributes } from "react";
import type { PageTree } from "fumadocs-core/server";
import { type ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import { TreeContextProvider, useTreeContext } from "fumadocs-ui/contexts/tree";
import Link from "fumadocs-core/link";
import { useSidebar } from "fumadocs-ui/contexts/sidebar";
import { cva } from "class-variance-authority";
import { usePathname } from "fumadocs-core/framework";
import { Button } from "../ui/button";
import { ThemeToggle } from "../layout/theme-toggle";
import { ArrowUpRight, SidebarIcon, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useKeyboardShortcuts } from "@/lib/hooks/use-keyboard-shortcuts";
import { DocsLogo } from "../ui/icon";
import { SearchToggle } from "../layout/search-toggle";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { renderNavItem } from "./links";
import { baseOptions } from "@/app/layout.config";
export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { registerShortcut } = useKeyboardShortcuts();
  const { collapsed } = useSidebar();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

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
            {/* <NavbarSidebarTrigger /> */}
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <DocsLogo className="hidden sm:block" />
            </Link>
          </div>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row items-center">
                {baseOptions.links?.map((link) => renderNavItem(link))}
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
    console.log({ item });
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
        <div className="flex items-center gap-2 flex-1">
          {item.icon}
          {item.name}
        </div>
        <PageBadges item={item} />
      </Link>
    );
  }

  if (item.type === "separator") {
    return (
      <p className="text-primary font-fono mt-6 mb-2 first:mt-0 px-2">
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
              <div className="flex items-center gap-2">
                {item.index && <PageBadges item={item.index} />}
                <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
              </div>
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

// Badge component for HTTP methods and custom tags
function PageBadges({ item }: { item: PageTree.Node }) {
  if (item.type !== "page") return null;

  const badges: React.ReactNode[] = [];

  // For demonstration, let's add badges based on URL patterns
  // This can be replaced with actual badge data from a server-side source
  if (item.url === "/test-page") {
    badges.push(
      <span
        key="new"
        className="px-1.5 py-0.5 text-xs font-medium rounded bg-blue-500 text-white"
      >
        NEW
      </span>
    );
  }

  // Add HTTP method badges for API pages based on URL patterns
  if (item.url.includes("/apis/")) {
    // Demo badges for different API endpoints
    if (item.url.includes("/create")) {
      badges.push(
        <span
          key="POST"
          className="px-1.5 py-0.5 text-xs font-medium rounded bg-blue-500 text-white"
        >
          POST
        </span>
      );
    } else if (item.url.includes("/delete")) {
      badges.push(
        <span
          key="DELETE"
          className="px-1.5 py-0.5 text-xs font-medium rounded bg-red-500 text-white"
        >
          DELETE
        </span>
      );
    } else if (item.url.includes("/update")) {
      badges.push(
        <span
          key="PUT"
          className="px-1.5 py-0.5 text-xs font-medium rounded bg-orange-500 text-white"
        >
          PUT
        </span>
      );
    } else if (
      item.url.includes("/get") ||
      item.url.includes("/status") ||
      item.url.includes("/list") ||
      item.url.includes("/info")
    ) {
      badges.push(
        <span
          key="GET"
          className="px-1.5 py-0.5 text-xs font-medium rounded bg-green-500 text-white"
        >
          GET
        </span>
      );
    }
  }

  if (badges.length === 0) return null;

  return <div className="flex items-center gap-1 ml-auto">{badges}</div>;
}
