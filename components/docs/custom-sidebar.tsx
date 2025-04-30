"use client";

import React, { Fragment, ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SidebarPageTree,
  SidebarItem,
  SidebarFolder,
  SidebarFolderTrigger,
  SidebarFolderContent,
} from "./sidebar";
import { isActive } from "@/lib/is-active";
import type { SidebarComponents } from "./shared";
import { useTreeContext } from "fumadocs-ui/provider";
import Link from "next/link";
import { API, BitcoinIcon, Clarity, StacksIcon } from "@/components/ui/icon";
import { Code, Play } from "lucide-react";

// URLs for both sections to filter out duplicates
const STACKS_NAV_URLS = [
  "/stacks",
  "/stacks/quickstarts",
  "/stacks/api",
  "/stacks/reference",
  "/stacks/clarity",
];

const BITCOIN_NAV_URLS = ["/bitcoin", "/bitcoin/quickstarts", "/bitcoin/api"];

// Names for both sections to filter by name as well
const STACKS_NAV_NAMES = [
  "Home",
  "Quickstarts",
  "APIs",
  "SDKs & Libraries",
  "Clarity",
];

const BITCOIN_NAV_NAMES = ["Home", "Quickstarts", "APIs"];

export function EnhancedSidebarPageTree(props: {
  components?: Partial<SidebarComponents>;
}) {
  const pathname = usePathname();

  // Determine which section we're in (bitcoin or stacks)
  const isInBitcoinSection = pathname.startsWith("/bitcoin");

  // Get the relevant filter arrays based on current section
  const PERSISTENT_NAV_URLS = isInBitcoinSection
    ? BITCOIN_NAV_URLS
    : STACKS_NAV_URLS;
  const PERSISTENT_NAV_NAMES = isInBitcoinSection
    ? BITCOIN_NAV_NAMES
    : STACKS_NAV_NAMES;

  // Define the stacks persistent navigation items with updated styling
  const stacksNavItems = [
    {
      name: "Home",
      url: "/stacks",
      icon: (props: { active?: boolean }) => (
        <div
          className={cn(
            "icons rounded-md border border-border p-1 shadow-sm",
            props.active && "bg-inverted text-background border-none"
          )}
        >
          <StacksIcon />
        </div>
      ),
    },
    {
      name: "Quickstarts",
      url: "/stacks/quickstarts",
      icon: (props: { active?: boolean }) => (
        <div
          className={cn(
            "icons rounded-md border border-border p-1 shadow-sm",
            props.active && "bg-inverted text-background border-none"
          )}
        >
          <Play />
        </div>
      ),
    },
    {
      name: "APIs",
      url: "/stacks/api",
      icon: (props: { active?: boolean }) => (
        <div
          className={cn(
            "icons rounded-md border border-border p-1 shadow-sm",
            props.active && "bg-inverted text-background border-none"
          )}
        >
          <API />
        </div>
      ),
    },
    {
      name: "SDKs & Libraries",
      url: "/stacks/reference",
      icon: (props: { active?: boolean }) => (
        <div
          className={cn(
            "icons rounded-md border border-border p-1 shadow-sm",
            props.active && "bg-inverted text-background border-none"
          )}
        >
          <Code />
        </div>
      ),
    },
    {
      name: "Clarity",
      url: "/stacks/clarity",
      icon: (props: { active?: boolean }) => (
        <div
          className={cn(
            "icons rounded-md border border-border p-1 shadow-sm",
            props.active && "bg-inverted text-background border-none"
          )}
        >
          <Clarity />
        </div>
      ),
    },
  ];

  // Define the bitcoin persistent navigation items with the provided styling
  const bitcoinNavItems = [
    {
      name: "Home",
      url: "/bitcoin",
      icon: (props: { active?: boolean }) => (
        <div
          className={cn(
            "icons rounded-md border border-border p-1 shadow-sm",
            props.active && "bg-hiro text-inverted border-none"
          )}
        >
          <BitcoinIcon />
        </div>
      ),
    },
    {
      name: "Quickstarts",
      url: "/bitcoin/quickstarts",
      icon: (props: { active?: boolean }) => (
        <div
          className={cn(
            "icons rounded-md border border-border p-1 shadow-sm",
            props.active && "bg-hiro text-inverted border-none"
          )}
        >
          <Play />
        </div>
      ),
    },
    {
      name: "APIs",
      url: "/bitcoin/api",
      icon: (props: { active?: boolean }) => (
        <div
          className={cn(
            "icons rounded-md border border-border p-1 shadow-sm",
            props.active && "bg-hiro text-inverted border-none"
          )}
        >
          <API />
        </div>
      ),
    },
  ];

  // Get the current section's navigation items
  const persistentNavItems = isInBitcoinSection
    ? bitcoinNavItems
    : stacksNavItems;

  // Create our modified version of SidebarPageTree that filters out duplicates
  function CustomFilteredPageTree({
    components,
  }: {
    components?: Partial<SidebarComponents>;
  }) {
    // Create custom components object with our filtering logic
    const filteredComponents: Partial<SidebarComponents> = {
      // Custom Item component that filters duplicates
      Item: (itemProps) => {
        // Skip rendering if this item matches our persistent nav URLs or names
        if (
          PERSISTENT_NAV_URLS.includes(itemProps.item.url) ||
          (typeof itemProps.item.name === "string" &&
            PERSISTENT_NAV_NAMES.includes(itemProps.item.name))
        ) {
          return null;
        }

        // Use the original Item component if provided
        if (components?.Item) {
          return <components.Item {...itemProps} />;
        }

        return (
          <SidebarItem
            key={itemProps.item.url}
            href={itemProps.item.url}
            external={itemProps.item.external}
            icon={itemProps.item.icon}
          >
            {itemProps.item.name}
          </SidebarItem>
        );
      },

      // Custom Folder component that filters folders by name
      Folder: (folderProps) => {
        // Skip rendering if this folder matches our persistent nav names
        if (
          typeof folderProps.item.name === "string" &&
          PERSISTENT_NAV_NAMES.includes(folderProps.item.name)
        ) {
          return null;
        }

        // Use the original Folder component if provided
        if (components?.Folder) {
          return <components.Folder {...folderProps} />;
        }

        // Get the folder item
        const item = folderProps.item;

        // Generate a unique identifier for this folder by including its full path context
        // This ensures different "Examples" folders don't interfere with each other
        const currentSection = isInBitcoinSection ? "bitcoin" : "stacks";
        const folderUniqueId = `${currentSection}-${item.name}`;

        // Check if this path or a child path is active
        const folderName = typeof item.name === "string" ? item.name : "";
        const folderNameSlug = folderName.toLowerCase().replace(/\s+/g, "-");

        // Get current path segments to determine if we're in this folder's section
        const pathSegments = pathname.split("/").filter(Boolean);
        const currentSectionPath = pathSegments[0] || ""; // First segment determines the section

        // Only consider the folder as potentially active if we're in its section
        let pathInFolder = false;

        if (currentSectionPath === currentSection) {
          // If we have an index page for this folder, use its URL to determine the folder path
          if (item.index?.url) {
            // Only match if the URL is in the current section
            pathInFolder = pathname.startsWith(item.index.url);
          } else {
            // Create a more specific pattern that requires the section prefix
            const folderPathPattern = new RegExp(
              `/${currentSection}/.*/${folderNameSlug}(/|$)`
            );
            pathInFolder = folderPathPattern.test(pathname);
          }
        }

        const isIndexActive = item.index && pathname === item.index.url;

        // Make sure we respect the defaultOpen property in meta.json
        const shouldBeOpen = item.defaultOpen || isIndexActive || pathInFolder;

        return (
          <SidebarFolder
            defaultOpen={shouldBeOpen}
            data-folder-id={folderUniqueId} // Add this for debugging
          >
            <SidebarFolderTrigger>
              {item.icon}
              {item.name}
              {/* The ChevronDown is added automatically by SidebarFolderTrigger */}
            </SidebarFolderTrigger>
            <SidebarFolderContent>{folderProps.children}</SidebarFolderContent>
          </SidebarFolder>
        );
      },

      // Pass through Separator from original props
      Separator: components?.Separator,
    };

    // Use the standard SidebarPageTree with our filtered components
    return <SidebarPageTree components={filteredComponents} />;
  }

  // Render custom sidebar tree with persistent navigation
  return useMemo(() => {
    // Function to render our persistent navigation items
    function renderPersistentItems(): ReactNode[] {
      return persistentNavItems.map((item, i) => {
        const active = isActive(item.url, pathname, false);

        if (isInBitcoinSection) {
          return (
            <Link
              key={`persistent-${i}`}
              href={item.url}
              shallow={true} // Add shallow prop to improve navigation
              className={cn(
                "flex flex-row items-center gap-2 rounded-md px-2 py-1.5 [&_svg]:size-4",
                active
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {typeof item.icon === "function"
                ? item.icon({ active })
                : item.icon}
              {item.name}
            </Link>
          );
        }

        return (
          <SidebarItem
            key={`persistent-${i}`}
            href={item.url}
            icon={
              typeof item.icon === "function"
                ? item.icon({ active })
                : item.icon
            }
          >
            {item.name}
          </SidebarItem>
        );
      });
    }

    return (
      <Fragment>
        {/* Always render the persistent navigation items */}
        {renderPersistentItems()}

        {/* Use our custom filtered page tree */}
        <CustomFilteredPageTree components={props.components} />
      </Fragment>
    );
  }, [pathname, persistentNavItems, props.components, isInBitcoinSection]);
}

// Helper Link component
// function Link({
//   href,
//   className,
//   children,
// }: {
//   href: string;
//   className?: string;
//   children: ReactNode;
// }) {
//   return (
//     <a href={href} className={className}>
//       {children}
//     </a>
//   );
// }
