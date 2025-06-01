import React, { Fragment, type HTMLAttributes, useMemo } from "react";
import { type NavOptions, slot, slots } from "./shared";
import { cn } from "@/lib/utils";
import { type BaseLayoutProps, getLinks } from "./shared";
import { NavProvider } from "fumadocs-ui/contexts/layout";
import {
  Navbar,
  NavbarLink,
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "./home/navbar";
import { type LinkItemType } from "./links";
import { SearchToggle } from "../layout/search-toggle";
import { ThemeToggle } from "../layout/theme-toggle";
import { LanguageToggle, LanguageToggleText } from "../layout/language-toggle";
import { ChevronDown, Languages } from "lucide-react";
import Link from "fumadocs-core/link";
import { Menu, MenuContent, MenuLinkItem, MenuTrigger } from "./home/menu";
import { Button, buttonVariants } from "../ui/button";
import { Kbd } from "../ui/kbd";
import { DocsLogo } from "../ui/icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export interface HomeLayoutProps extends BaseLayoutProps {
  nav?: Partial<
    NavOptions & {
      /**
       * Open mobile menu when hovering the trigger
       */
      enableHoverToOpen?: boolean;
    }
  >;
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

export function HomeLayout(
  props: HomeLayoutProps & HTMLAttributes<HTMLElement>
) {
  const {
    nav,
    links,
    githubUrl,
    i18n,
    disableThemeSwitch = false,
    themeSwitch = { enabled: !disableThemeSwitch },
    searchToggle,
    ...rest
  } = props;

  return (
    <NavProvider transparentMode={nav?.transparentMode}>
      <main
        id="nd-home-layout"
        {...rest}
        className={cn("flex flex-1 flex-col", rest.className)}
      >
        {slot(
          nav,
          <Header
            links={links}
            nav={nav}
            themeSwitch={themeSwitch}
            searchToggle={searchToggle}
            i18n={i18n}
            githubUrl={githubUrl}
          />
        )}
        {props.children}
      </main>
    </NavProvider>
  );
}

export function Header({
  nav = {},
  i18n = false,
  links,
  githubUrl,
  themeSwitch,
  searchToggle,
}: HomeLayoutProps) {
  const finalLinks = useMemo(
    () => getLinks(links, githubUrl),
    [links, githubUrl]
  );

  const navItems = finalLinks.filter((item) =>
    ["nav", "all"].includes(item.on ?? "all")
  );
  const menuItems = finalLinks.filter((item) =>
    ["menu", "all"].includes(item.on ?? "all")
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 transition-all duration-200",
        "bg-background/50 backdrop-blur-md",
        "border-b border-transparent"
      )}
    >
      <nav className="flex flex-row items-center gap-2 size-full px-4">
        {/* <NavbarSidebarTrigger /> */}
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
                            Software development kits and libraries for Stacks.
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
  );
}

function NavbarLinkItem({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === "custom") return <div {...props}>{item.children}</div>;

  if (item.type === "menu") {
    const children = item.items.map((child, j) => {
      if (child.type === "custom")
        return <Fragment key={j}>{child.children}</Fragment>;

      const {
        banner = child.icon ? (
          <div className="w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4">
            {child.icon}
          </div>
        ) : null,
        ...rest
      } = child.menu ?? {};

      return (
        <NavbarMenuLink
          key={j}
          href={child.url}
          external={child.external}
          {...rest}
        >
          {rest.children ?? (
            <>
              {banner}
              <p className="text-[15px] font-medium">{child.text}</p>
              <p className="text-sm text-fd-muted-foreground empty:hidden">
                {child.description}
              </p>
            </>
          )}
        </NavbarMenuLink>
      );
    });

    return (
      <NavbarMenu>
        <NavbarMenuTrigger {...props}>
          {item.url ? <Link href={item.url}>{item.text}</Link> : item.text}
        </NavbarMenuTrigger>
        <NavbarMenuContent>{children}</NavbarMenuContent>
      </NavbarMenu>
    );
  }

  return (
    <NavbarLink
      {...props}
      item={item}
      variant={item.type}
      aria-label={item.type === "icon" ? item.label : undefined}
    >
      {item.type === "icon" ? item.icon : item.text}
    </NavbarLink>
  );
}

function isSecondary(item: LinkItemType): boolean {
  return (
    ("secondary" in item && item.secondary === true) || item.type === "icon"
  );
}
