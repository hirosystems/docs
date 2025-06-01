"use client";
import React, { ButtonHTMLAttributes } from "react";
import type { PageTree } from "fumadocs-core/server";
import { type ComponentProps, type ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import { TreeContextProvider, useTreeContext } from "fumadocs-ui/contexts/tree";
import Link from "fumadocs-core/link";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useSidebar } from "fumadocs-ui/contexts/sidebar";
import { cva } from "class-variance-authority";
import { usePathname } from "fumadocs-core/framework";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "../layout/theme-toggle";
import { Kbd } from "../ui/kbd";
import { SidebarIcon } from "lucide-react";

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
    title: "Stacks CLI",
    href: "/tools/stacks-cli",
    description:
      "Command-line interface for interacting with the Stacks blockchain.",
  },
  {
    title: "Clarinet",
    href: "/tools/clarinet",
    description:
      "Development environment and testing framework for Clarity smart contracts.",
  },
  {
    title: "Stacks Explorer",
    href: "/tools/explorer",
    description:
      "Block explorer for viewing transactions and blocks on Stacks.",
  },
  {
    title: "Hiro Wallet",
    href: "/tools/wallet",
    description:
      "Web wallet for managing STX tokens and interacting with dApps.",
  },
];

const apisItems = [
  {
    title: "Stacks API",
    href: "/apis/stacks-api",
    description:
      "RESTful API for accessing Stacks blockchain data and functionality.",
  },
  {
    title: "Token Metadata API",
    href: "/apis/token-metadata",
    description: "API for retrieving NFT and fungible token metadata.",
  },
  {
    title: "BNS API",
    href: "/apis/bns",
    description: "Bitcoin Name System API for domain name resolution.",
  },
  {
    title: "Ordinals API",
    href: "/apis/ordinals",
    description: "API for Bitcoin Ordinals and inscriptions data.",
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
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#f6f5f3] hover:text-[#141312] focus:bg-[#f6f5f3] focus:text-[#141312]",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-[#141312]">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-[#8c877d]">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

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
          <SidebarCollapseTrigger />
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <DocsLogo className="hidden sm:block" />
          </Link>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row items-center gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/get-started"
                    className={cn(
                      "font-fono text-sm px-4 py-2 text-[#595650] hover:text-[#141312] hover:bg-[#f6f5f3] bg-transparent rounded-md"
                    )}
                  >
                    Get Started
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-fono text-sm px-4 py-2 text-[#595650] hover:text-[#141312] hover:bg-[#f6f5f3] bg-transparent rounded-md">
                    Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-12 bg-white">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#f6f5f3] to-[#ebe9e6] p-6 no-underline outline-none focus:shadow-md hover:from-[#ebe9e6] hover:to-[#cfc9c2]"
                            href="/tools"
                          >
                            <div className="w-6 h-6 bg-[#ff5500] rounded-sm mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-[#141312]">
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
                  <NavigationMenuTrigger className="font-fono text-sm px-4 py-2 text-[#595650] hover:text-[#141312] hover:bg-[#f6f5f3] bg-transparent rounded-md">
                    APIs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-12 bg-white">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#f6f5f3] to-[#ebe9e6] p-6 no-underline outline-none focus:shadow-md hover:from-[#ebe9e6] hover:to-[#cfc9c2]"
                            href="/apis"
                          >
                            <div className="w-6 h-6 bg-[#ff5500] rounded-sm mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-[#141312]">
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
                  <NavigationMenuTrigger className="font-fono text-sm px-4 py-2 text-[#595650] hover:text-[#141312] hover:bg-[#f6f5f3] bg-transparent rounded-md">
                    Libraries & SDKs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-12 bg-white">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#f6f5f3] to-[#ebe9e6] p-6 no-underline outline-none focus:shadow-md hover:from-[#ebe9e6] hover:to-[#cfc9c2]"
                            href="/libraries"
                          >
                            <div className="w-6 h-6 bg-[#ff5500] rounded-sm mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-[#141312]">
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
                  <NavigationMenuTrigger className="font-fono text-sm px-4 py-2 text-[#595650] hover:text-[#141312] hover:bg-[#f6f5f3] bg-transparent rounded-md">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-12 bg-white">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#f6f5f3] to-[#ebe9e6] p-6 no-underline outline-none focus:shadow-md hover:from-[#ebe9e6] hover:to-[#cfc9c2]"
                            href="/resources"
                          >
                            <div className="w-6 h-6 bg-[#ff5500] rounded-sm mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-[#141312]">
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
        "fixed flex flex-col shrink-0 p-4 top-14 z-20 text-sm overflow-auto md:sticky md:h-[calc(100dvh-56px)] md:w-[275px]",
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

export function SidebarCollapseTrigger(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Collapse Sidebar"
      data-collapsed={collapsed}
      {...props}
      onClick={() => {
        setCollapsed((prev) => !prev);
      }}
    >
      {props.children ?? <SidebarIcon />}
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
