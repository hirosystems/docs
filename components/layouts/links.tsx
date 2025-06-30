"use client";
import Link from "fumadocs-core/link";
import { usePathname } from "fumadocs-core/framework";
import React, {
  type AnchorHTMLAttributes,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useState,
  useRef,
  useEffect,
} from "react";
import { isActive } from "../../lib/is-active";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface BaseItem {
  /**
   * Restrict where the item is displayed
   *
   * @defaultValue 'all'
   */
  on?: "menu" | "nav" | "all";
}

export interface BaseLinkType extends BaseItem {
  url: string;
  /**
   * When the item is marked as active
   *
   * @defaultValue 'url'
   */
  active?: "url" | "nested-url" | "none";
  external?: boolean;
}

export interface MainItemType extends BaseLinkType {
  type?: "main";
  icon?: ReactNode;
  text: ReactNode;
  description?: ReactNode;
}

export interface IconItemType extends BaseLinkType {
  type: "icon";
  /**
   * `aria-label` of icon button
   */
  label?: string;
  icon: ReactNode;
  text: ReactNode;
  /**
   * @defaultValue true
   */
  secondary?: boolean;
}

interface ButtonItem extends BaseLinkType {
  type: "button";
  icon?: ReactNode;
  text: ReactNode;
  /**
   * @defaultValue false
   */
  secondary?: boolean;
}

export interface MenuItemType extends BaseItem {
  type: "menu";
  icon?: ReactNode;
  text: ReactNode;

  url?: string;
  items: (
    | (MainItemType & {
        /**
         * Options when displayed on navigation menu
         */
        menu?: HTMLAttributes<HTMLElement> & {
          banner?: ReactNode;
        };
      })
    | CustomItem
  )[];

  /**
   * @defaultValue false
   */
  secondary?: boolean;
}

export interface DropdownItemType extends BaseItem {
  type: "dropdown";
  icon?: ReactNode;
  text: ReactNode;
  url?: string; // Optional URL for main item click navigation
  items: (
    | (MainItemType & {
        /**
         * Options when displayed on dropdown menu
         */
        dropdown?: HTMLAttributes<HTMLElement>;
      })
    | CustomItem
  )[];
  /**
   * @defaultValue false
   */
  secondary?: boolean;
}

interface CustomItem extends BaseItem {
  type: "custom";
  /**
   * @defaultValue false
   */
  secondary?: boolean;
  children: ReactNode;
}

export type LinkItemType =
  | MainItemType
  | IconItemType
  | ButtonItem
  | MenuItemType
  | DropdownItemType
  | CustomItem;

export const BaseLinkItem = forwardRef<
  HTMLAnchorElement,
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { item: BaseLinkType }
>(({ item, ...props }, ref) => {
  const pathname = usePathname();
  const activeType = item.active ?? "url";
  const active =
    activeType !== "none" &&
    isActive(item.url, pathname, activeType === "nested-url");

  return (
    <Link
      ref={ref}
      href={item.url}
      external={item.external}
      {...props}
      data-active={active}
    >
      {props.children}
    </Link>
  );
});

BaseLinkItem.displayName = "BaseLinkItem";

// Helper function to determine if a navigation item should be active
function isNavItemActive(item: LinkItemType, pathname: string): boolean {
  if (!("url" in item) || !item.url) return false;

  // Check if item has active property (only certain types have it)
  // For menu items, default to "nested-url" behavior since they should match child routes
  const activeType =
    "active" in item
      ? (item.active ?? "url")
      : item.type === "menu"
        ? "nested-url"
        : "url";
  if (activeType === "none") return false;

  // Special handling for "Get started" link
  if (item.url === "/start") {
    // Define the main sections that should override "Get started"
    const mainSections = ["/tools", "/apis", "/reference", "/resources"];

    // Check if current path is in any main section
    const isInMainSection = mainSections.some(
      (section) => pathname === section || pathname.startsWith(`${section}/`)
    );

    // "Get started" is active if:
    // 1. We're exactly on the start page, OR
    // 2. We're on any path that's not root ("/") AND not in the main sections
    return pathname === "/start" || (pathname !== "/" && !isInMainSection);
  }

  // For other items, use the standard isActive logic
  return isActive(item.url, pathname, activeType === "nested-url");
}

export function renderNavItem(item: LinkItemType): ReactNode {
  const itemType = item.type ?? "main";
  const pathname = usePathname();

  switch (itemType) {
    case "main":
      if (!("url" in item)) return null;

      const isActive = isNavItemActive(item, pathname);

      return (
        <NavigationMenuItem key={item.url}>
          <NavigationMenuLink asChild>
            <Link
              href={item.url}
              className={cn(
                "font-fono text-sm px-4 py-2 rounded-md hover:bg-fd-accent/50 transition-colors",
                isActive && "underline underline-offset-4 text-primary"
              )}
            >
              {item.text}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      );

    case "menu":
      if (!("items" in item)) return null;

      return (
        <NavigationMenuItem
          key={"text" in item ? String(item.text) : undefined}
        >
          {item.url ? (
            <NavigationMenuTrigger asChild>
              <div className="font-fono text-sm px-4 py-2 rounded-md group flex items-center gap-1 cursor-pointer">
                <Link href={item.url} className="flex items-center gap-1">
                  {item.text}
                </Link>
                <ChevronDown className="relative h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </NavigationMenuTrigger>
          ) : (
            // When no URL, use default button behavior
            <NavigationMenuTrigger className="font-fono text-sm px-4 py-2 rounded-md group flex items-center gap-1">
              {item.text}
              <ChevronDown className="relative h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </NavigationMenuTrigger>
          )}
          <NavigationMenuContent className="mt-12 bg-background border rounded-lg shadow-lg w-auto left-auto right-auto">
            {/* DEMO: Grid layout with banner
            <ul className="grid gap-3 p-4 lg:grid-cols-[.5fr_1fr] w-max">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-neutral-100 dark:bg-neutral-950 p-6 no-underline outline-none focus:shadow-md hover:muted-foreground"
                    href={item.url || "#"}
                  >
                    <div className="w-6 h-6 bg-[#ff5500] rounded-sm mb-2" />
                    <div className="mb-2 mt-4 text-lg font-medium text-primary">
                      {item.text}
                    </div>
                    <p className="text-sm leading-tight text-[#8c877d]">
                      Explore our {String(item.text).toLowerCase()} for building
                      on Stacks.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {item.items.map((menuItem, index) => {
                if (menuItem.type === "custom") {
                  return <li key={index}>{menuItem.children}</li>;
                }

                if (!("url" in menuItem)) return null;

                return (
                  <li key={menuItem.url}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={menuItem.url}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted-foreground hover:text-primary focus:bg-[#f6f5f3] focus:text-primary"
                      >
                        <div className="text-sm font-medium leading-none text-primary">
                          {menuItem.text}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-[#8c877d]">
                          {menuItem.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
            */}

            {/* Simple two-column layout */}
            <div className="grid grid-cols-1 gap-x-5 px-2 py-1 w-max">
              {item.items.map((menuItem, index) => {
                if (menuItem.type === "custom") {
                  return <div key={index}>{menuItem.children}</div>;
                }

                if (!("url" in menuItem)) return null;

                const isMenuItemActive = isNavItemActive(menuItem, pathname);

                return (
                  <NavigationMenuLink key={menuItem.url} asChild>
                    <Link
                      href={menuItem.url}
                      className={cn(
                        "block py-2 text-sm font-fono text-muted-foreground hover:text-primary transition-colors",
                        isMenuItemActive &&
                          "underline underline-offset-4 text-primary"
                      )}
                    >
                      {menuItem.text}
                    </Link>
                  </NavigationMenuLink>
                );
              })}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );

    case "dropdown":
      if (!("items" in item)) return null;
      return (
        <DropdownNavItem
          key={"text" in item ? String(item.text) : undefined}
          item={item as DropdownItemType}
        />
      );

    case "icon":
    case "button":
    case "custom":
      // These types are not part of the current PRD scope
      return null;

    default:
      return null;
  }
}

// Separate component for dropdown
function DropdownNavItem({ item }: { item: DropdownItemType }) {
  return (
    <NavigationMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="font-fono text-sm px-4 py-2 rounded-md hover:bg-accent data-[state=open]:bg-accent transition-colors flex items-center gap-1">
            {item.text}
            <ChevronDown className="relative h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={8} className="w-[400px]">
          {item.items.map((dropdownItem, index) => {
            if (dropdownItem.type === "custom") {
              return (
                <div key={index} className="p-2">
                  {dropdownItem.children}
                </div>
              );
            }

            if (!("url" in dropdownItem)) return null;

            return (
              <DropdownMenuItem key={dropdownItem.url} asChild>
                <Link
                  href={dropdownItem.url}
                  className="flex flex-col gap-1 cursor-pointer p-3"
                >
                  <div className="font-medium text-sm">{dropdownItem.text}</div>
                  {dropdownItem.description && (
                    <div className="text-sm text-muted-foreground">
                      {dropdownItem.description}
                    </div>
                  )}
                </Link>
              </DropdownMenuItem>
            );
          })}
          {/* If dropdown has a main URL, add a footer link */}
          {item.url && (
            <>
              <div className="h-px bg-border my-2" />
              <DropdownMenuItem asChild>
                <Link
                  href={item.url}
                  className="flex items-center justify-between p-3 text-sm font-medium"
                >
                  View all {item.text}
                  <span className="text-muted-foreground">→</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </NavigationMenuItem>
  );
}
