"use client";
import React, { type HTMLAttributes, useMemo } from "react";
import { type NavOptions, slot } from "./shared";
import { cn } from "@/lib/utils";
import { type BaseLayoutProps, getLinks } from "./shared";
import { NavProvider } from "fumadocs-ui/contexts/layout";
import { SearchToggle } from "../layout/search-toggle";
import { ThemeToggle } from "../layout/theme-toggle";
import { ArrowUpRight } from "lucide-react";
import Link from "fumadocs-core/link";
import { Button } from "../ui/button";
import { DocsLogo } from "../ui/icon";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { renderNavItem } from "./links";
import { baseOptions } from "@/app/layout.config";

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
  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 transition-all duration-200",
        "bg-background backdrop-blur-md",
        "border-b border-transparent"
      )}
    >
      <nav className="flex flex-row items-center gap-4 size-full px-4">
        {/* <NavbarSidebarTrigger /> */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <DocsLogo className="hidden sm:block" />
        </Link>

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
  );
}
