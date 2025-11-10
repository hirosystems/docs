'use client';

import { cva } from 'class-variance-authority';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import type { PageTree } from 'fumadocs-core/server';
import { useSidebar } from 'fumadocs-ui/contexts/sidebar';
import { TreeContextProvider, useTreeContext } from 'fumadocs-ui/contexts/tree';
import { ArrowUpRight, ChevronDown, ChevronRight, SidebarIcon } from 'lucide-react';
import React, { type ButtonHTMLAttributes, type ReactNode, useMemo } from 'react';
import { baseOptions } from '@/app/layout.config';
import { LanguageSwitcher } from '@/components/language-switcher';
import { MobileMenuProvider } from '@/contexts/mobile-menu';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useLocalizedNavigation } from '@/hooks/use-localized-navigation';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { MobileMenuButton } from '../layout/mobile-menu-button';
import { SearchToggle } from '../layout/search-toggle';
import { ThemeToggle } from '../layout/theme-toggle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { DocsLogo } from '../ui/icon';
import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu';
import { renderNavItem } from './links';

type SeparatorBadge = 'new' | 'beta';

const separatorBadgeStyles: Record<SeparatorBadge, string> = {
  new: 'font-regular text-[10px] px-1 py-0.5 rounded uppercase text-neutral-950 border-none bg-[var(--color-brand-mint)] dark:bg-[var(--color-brand-mint)]',
  beta: 'font-regular text-[10px] px-1 py-0.5 rounded uppercase bg-brand-orange dark:bg-brand-orange text-neutral-950 border-none',
};

function parseSeparatorMeta(name?: string): { label: string; badge?: SeparatorBadge } {
  if (!name) {
    return { label: '' };
  }
  const [rawLabel, rawBadge] = name.split('|');
  const label = rawLabel?.trim() || name;
  const normalizedBadge = rawBadge?.trim().toLowerCase();
  const badge =
    normalizedBadge === 'new' || normalizedBadge === 'beta'
      ? (normalizedBadge as SeparatorBadge)
      : undefined;
  return { label, badge };
}

export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { registerShortcut } = useKeyboardShortcuts();
  const { collapsed } = useSidebar();
  const localizedLinks = useLocalizedNavigation();
  const t = useTranslations();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    // register 'p' shortcut for platform navigation
    const platformShortcut = registerShortcut({
      key: 'p',
      callback: () => {
        window.open('https://platform.hiro.so', '_blank', 'noopener,noreferrer');
      },
      preventDefault: true,
    });

    // register 't' shortcut for calendar scheduling
    const calendarShortcut = registerShortcut({
      key: 't',
      callback: () => {
        window.open('https://cal.com/waits/15min', '_blank', 'noopener,noreferrer');
      },
      preventDefault: true,
    });

    return () => {
      platformShortcut();
      calendarShortcut();
    };
  }, [registerShortcut]);

  return (
    <MobileMenuProvider>
      <TreeContextProvider tree={tree}>
        <header
          className={cn(
            'sticky top-0 z-50 h-16 transition-all duration-200',
            'bg-background backdrop-blur-md',
            'border-b border-border/50',
          )}
        >
          <nav className="flex flex-row items-center gap-4 size-full px-2 md:px-4">
            {/* Mobile layout */}
            <div className="flex md:hidden items-center justify-between w-full">
              <MobileMenuButton tree={tree} />
              <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
                <DocsLogo />
              </Link>
              <SearchToggle />
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex flex-row items-center gap-4 w-full">
              <div className="flex flex-row items-center gap-4">
                {/* <NavbarSidebarTrigger /> */}
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <DocsLogo />
                </Link>
              </div>

              <NavigationMenu>
                <NavigationMenuList className="flex flex-row items-center">
                  {localizedLinks?.map((link) => renderNavItem(link))}
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex flex-1 items-center justify-end space-x-2 lg:space-x-3">
                <SearchToggle />
                <ThemeToggle />
                <LanguageSwitcher />
                <Button
                  asChild
                  className="bg-brand-orange font-fono text-neutral-900 flex items-baseline gap-0.5 px-3 py-2 hover:bg-brand-orange transition-colors duration-200 group hidden lg:flex"
                >
                  <Link href="https://platform.hiro.so" target="_blank">
                    {t.navigation.signIn}
                    <ArrowUpRight className="w-3.5 h-3.5 translate-y-0.5 group-hover:translate-y-0 transition-transform duration-200" />
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        </header>
        <main
          id="nd-docs-layout"
          className={cn(
            'flex flex-1 flex-row transition-all duration-100',
            collapsed && 'md:pl-[calc(var(--nav-offset)-115px)]',
          )}
        >
          <Sidebar />
          {children}
        </main>
      </TreeContextProvider>
    </MobileMenuProvider>
  );
}

export function Sidebar() {
  const { root } = useTreeContext();
  const { open, collapsed } = useSidebar();
  const pathname = usePathname();

  const children = useMemo(() => {
    const filterCriteria = ['tools', 'apis', 'reference', 'resources'];

    const shouldFilterItem = (item: PageTree.Node): boolean => {
      const isCurrentSection = filterCriteria.some(
        (criteria) => pathname?.includes(`/${criteria}/`) || pathname === `/${criteria}`,
      );

      if (isCurrentSection) {
        const matchingCriteria = filterCriteria.filter(
          (criteria) => pathname?.includes(`/${criteria}/`) || pathname === `/${criteria}`,
        );

        const belongsToCurrentSection = matchingCriteria.some((criteria) =>
          item.$id?.includes(criteria),
        );

        if (belongsToCurrentSection) {
          return false; // Don't filter out items that belong to current section
        }

        return filterCriteria.some((criteria) => {
          const itemPath = item.$id || '';
          return (
            itemPath === criteria ||
            itemPath.startsWith(`${criteria}/`) ||
            itemPath.includes(`/${criteria}/`) ||
            itemPath.endsWith(`/${criteria}`)
          );
        });
      }

      return filterCriteria.some((criteria) => {
        // Check if item.$id matches the exact criteria as a path segment
        const itemPath = item.$id || '';
        return (
          itemPath === criteria ||
          itemPath.startsWith(`${criteria}/`) ||
          itemPath.includes(`/${criteria}/`) ||
          itemPath.endsWith(`/${criteria}`)
        );
      });
    };

    function renderItems(items: PageTree.Node[]) {
      const filteredItems = items.filter((item) => !shouldFilterItem(item));

      return filteredItems.map((item) => (
        <SidebarItem key={item.$id} item={item}>
          {item.type === 'folder' ? renderItems(item.children) : null}
        </SidebarItem>
      ));
    }

    return renderItems(root.children);
  }, [root, pathname]);

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        'fixed flex flex-col shrink-0 pt-4 px-2 pb-10 top-16 z-20 text-base md:text-sm overflow-auto md:sticky md:h-[calc(100dvh-64px)]',
        'max-md:inset-x-0 max-md:bottom-0',
        !open && 'max-md:invisible',
        'md:w-[250px] md:transition-all md:duration-100 ease-linear',
        collapsed && 'md:w-0 md:p-0 md:overflow-hidden md:invisible',
      )}
    >
      {children}
    </aside>
  );
}

export const linkVariants = cva(
  'flex items-center gap-3 w-full py-1.5 px-2 rounded-lg text-muted-foreground !font-sans [&_svg]:size-3',
  {
    variants: {
      active: {
        true: 'text-primary bg-neutral-150 dark:bg-neutral-700 font-medium',
        false: 'hover:text-muted-foreground hover:bg-card',
      },
    },
  },
);

export function NavbarSidebarTrigger(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Collapse Sidebar"
      data-collapsed={collapsed}
      {...props}
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-md border border-border hover:bg-neutral-200 dark:bg-neutral-700 transition-colors cursor-pointer',
        'hidden md:flex',
        props.className,
      )}
      onClick={() => {
        setCollapsed((prev) => !prev);
      }}
    >
      <SidebarIcon className="w-4 h-4" />
    </button>
  );
}

export function SidebarItem({ item, children }: { item: PageTree.Node; children: ReactNode }) {
  const pathname = usePathname();

  const isPathInFolder = (folderItem: PageTree.Node, currentPath: string): boolean => {
    if (folderItem.type !== 'folder') return false;

    if (folderItem.index?.url === currentPath) return true;
    const checkChildren = (children: PageTree.Node[]): boolean => {
      return children.some((child) => {
        if (child.type === 'page' && child.url === currentPath) return true;
        if (child.type === 'folder') {
          if (child.index?.url === currentPath) return true;
          return checkChildren(child.children);
        }
        return false;
      });
    };

    return checkChildren(folderItem.children);
  };

  const shouldExpand =
    item.type === 'folder' &&
    (isPathInFolder(item, pathname) || (item as any).defaultOpen === true);

  const [isOpen, setIsOpen] = React.useState(shouldExpand);

  if (item.type === 'page') {
    const sidebarTitle = (item as any).data?.sidebarTitle;
    const displayName = sidebarTitle || item.name;
    const isRootPage = (item as any).data?.root === true;

    return (
      <Link
        href={item.url}
        className={cn(
          linkVariants({
            active: pathname === item.url,
          }),
          // Special styling for root pages - applies on top of linkVariants
          isRootPage && ['font-normal font-sans text-sm'],
          // Style the icon when root page is active
          isRootPage &&
            pathname === item.url && [
              '[&_.icons]:bg-primary [&_.icons]:border-primary [&_.icons]:text-white dark:[&_.icons]:text-neutral-950',
            ],
        )}
      >
        <div className="!font-normal flex items-center gap-2 flex-1">
          {item.icon}
          {displayName}
          <PageBadges item={item} />
        </div>
      </Link>
    );
  }

  if (item.type === 'separator') {
    const { label, badge } = parseSeparatorMeta(item.name);
    return (
      <div className="flex items-center gap-2 mt-6 mb-2 first:mt-0 px-2">
        <p className="text-primary font-fono font-semibold mb-0">{label || item.name}</p>
        {badge ? (
          <span className={separatorBadgeStyles[badge]}>{badge.toUpperCase()}</span>
        ) : null}
      </div>
    );
  }

  const getStringValue = (value: any): string => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    return 'folder';
  };

  const accordionValue = getStringValue(item.$id) || getStringValue(item.name) || 'folder';

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultValue={shouldExpand ? accordionValue : undefined}
        className="space-y-0 bg-transparent border-none"
        onValueChange={(value) => setIsOpen(value === accordionValue)}
      >
        <AccordionItem value={accordionValue} className="border-0">
          <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden h-auto">
            <div
              className={cn(
                linkVariants({
                  active: item.index ? pathname === item.index.url : false,
                }),
                'justify-between w-full',
                '!font-normal',
              )}
            >
              <div className="!font-normal flex items-center gap-2 flex-1">
                {item.index ? (
                  <Link
                    href={item.index.url}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      'flex items-center gap-2 font-sans hover:no-underline',
                      pathname === item.index.url
                        ? 'font-normal text-primary'
                        : 'font-normal text-muted-foreground',
                    )}
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
                {isOpen ? (
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                ) : (
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
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

export function PageBadges({ item }: { item: PageTree.Node }) {
  if (item.type !== 'page') return null;

  const badges: React.ReactNode[] = [];

  const isNew = (item as any).data?.isNew;

  if (isNew) {
    badges.push(
      <span
        key="new"
        className="font-regular text-[10px] px-1 py-0.5 rounded uppercase text-neutral-950 border-none bg-[var(--color-brand-mint)] dark:bg-[var(--color-brand-mint)]"
      >
        New
      </span>,
    );
  }

  const openapi = (item as any).data?.openapi;
  const operations = openapi?.operations || [];

  const methods = new Set(operations.map((op: any) => op.method.toUpperCase()));

  for (const method of methods) {
    const colors = {
      GET: 'bg-[#e7f7e7] text-[#4B714D] border-[#c2ebc4] dark:bg-background dark:text-[#c2ebc4] dark:border-[#c2ebc4]',
      POST: 'bg-[#e7f0ff] text-[#4B5F8A] border-[#c2d9ff] dark:bg-background dark:text-[#c2d9ff] dark:border-[#c2d9ff]',
      PUT: 'bg-[#fff4e7] text-[#8A6B4B] border-[#ffd9c2] dark:bg-background dark:text-[#ffd9c2] dark:border-[#ffd9c2]',
      PATCH:
        'bg-[#fffce7] text-[#8A864B] border-[#fff9c2] dark:bg-background dark:text-[#fff9c2] dark:border-[#fff9c2]',
      DELETE:
        'bg-[#ffe7e7] text-[#8A4B4B] border-[#ffc2c2] dark:bg-background dark:text-[#ffc2c2] dark:border-[#ffc2c2]',
    };

    badges.push(
      <span
        key={String(method)}
        className={`font-mono font-medium text-[10px] py-0.25 px-0.75 rounded border ${colors[String(method) as keyof typeof colors] || 'bg-[#f5f5f5] text-[#666666] border-[#d4d4d4] dark:bg-background dark:text-[#d4d4d4] dark:border-[#d4d4d4]'}`}
      >
        {String(method)}
      </span>,
    );
  }

  if (badges.length === 0) return null;

  return <div className="flex items-center gap-1 ml-auto">{badges}</div>;
}
