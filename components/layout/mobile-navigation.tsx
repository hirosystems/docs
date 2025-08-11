'use client';

import type { PageTree } from 'fumadocs-core/server';
import { TreeContextProvider } from 'fumadocs-ui/contexts/tree';
import { ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { baseOptions } from '@/app/layout.config';
import { Sidebar } from '@/components/layouts/docs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DocsLogo } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { SearchToggle } from '../layout/search-toggle';

interface MobileNavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
  tree?: PageTree.Root;
}

export function MobileNavigation({ isOpen = false, onClose, tree }: MobileNavigationProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const pathname = usePathname();

  const isInDocsContext = !!tree;

  if (!isOpen) return null;

  const handleClose = () => {
    setActiveSubmenu(null);
    setShowMainMenu(false);
    onClose?.();
  };

  const getMobileBreadcrumb = () => {
    if (!tree || !pathname) return <span>Navigation</span>;

    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return <span>Navigation</span>;

    const displaySegments = [...segments];
    let firstSegmentMenu = null;

    if (segments[0] === 'reference') {
      displaySegments[0] = 'Libraries & SDKs';
      firstSegmentMenu = 'Libraries & SDKs';
    } else {
      // Check if first segment matches a menu item
      const firstSegment = segments[0];
      const menuItem = baseOptions.links?.find(
        (link) =>
          link.type === 'menu' &&
          typeof link.text === 'string' &&
          link.text.toLowerCase() === firstSegment.toLowerCase(),
      );
      if (menuItem && 'text' in menuItem && typeof menuItem.text === 'string') {
        firstSegmentMenu = menuItem.text;
        displaySegments[0] = menuItem.text; // Use the properly cased menu text
      }
    }

    // FIXME: Limit to 2 levels deep (e.g., Tools/Clarinet, not Tools/Clarinet/Quickstart)
    const maxDepth = 2;
    const limitedSegments = displaySegments.slice(0, maxDepth);

    // FIXME: Special formatting
    const formattedSegments = limitedSegments.map((segment, index) => {
      if (index === 0 && (segment === 'Libraries & SDKs' || firstSegmentMenu)) {
        return segment;
      }

      if (segment.toLowerCase() === 'stacks.js') {
        return 'Stacks.js';
      }

      if (index === 1 && displaySegments[0].toLowerCase() === 'apis') {
        const apiMappings: { [key: string]: string } = {
          'stacks-blockchain-api': 'Stacks Blockchain API',
          'token-metadata-api': 'Token Metadata API',
          'platform-api': 'Platform API',
          'ordinals-api': 'Ordinals API',
          'runes-api': 'Runes API',
          'signer-metrics-api': 'Signer Metrics API',
        };

        if (apiMappings[segment.toLowerCase()]) {
          return apiMappings[segment.toLowerCase()];
        }
      }

      if (index === 1 && displaySegments[0] === 'Tools') {
        const toolMappings: { [key: string]: string } = {
          'bitcoin-indexer': 'Bitcoin Indexer',
          'contract-monitoring': 'Contract Monitoring',
        };

        if (toolMappings[segment.toLowerCase()]) {
          return toolMappings[segment.toLowerCase()];
        }
      }

      return segment.charAt(0).toUpperCase() + segment.slice(1);
    });

    return (
      <Breadcrumb className="text-lg font-fono">
        <BreadcrumbList className="gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="text-muted-foreground hover:text-primary !font-fono !text-base"
            >
              <button
                type="button"
                onClick={() => setShowMainMenu(true)}
                onKeyDown={(e) => e.key === 'Enter' && setShowMainMenu(true)}
              >
                ..
              </button>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {formattedSegments.map((segment, index) => {
            const isLast = index === formattedSegments.length - 1;
            const displayName = segment;

            const handleClick = () => {
              if (index === 0 && firstSegmentMenu) {
                setActiveSubmenu(firstSegmentMenu);
              } else {
                handleClose();
              }
            };

            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator className="text-muted-foreground">/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-primary !font-fono !text-base">
                      {displayName}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      asChild
                      className="text-muted-foreground hover:text-primary !font-fono !text-base cursor-pointer"
                    >
                      <button
                        type="button"
                        onClick={handleClick}
                        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                      >
                        {displayName}
                      </button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-200"
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Escape' && handleClose()}
        tabIndex={-1}
      />

      <div className="fixed inset-0 bg-background transition-transform duration-200">
        <div className="flex items-center justify-between p-3 bg-background">
          <button
            type="button"
            onClick={handleClose}
            className="h-8 w-8 flex items-center justify-center"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex-1 flex justify-center">
            {activeSubmenu ? (
              <Breadcrumb className="text-lg">
                <BreadcrumbList className="gap-1">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      asChild
                      className="text-muted-foreground hover:text-primary cursor-pointer !font-fono !text-base"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSubmenu(null);
                          setShowMainMenu(true);
                        }}
                      >
                        ..
                      </button>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-muted-foreground">/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary !font-fono !text-base">
                      {activeSubmenu}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            ) : isInDocsContext && !showMainMenu ? (
              getMobileBreadcrumb()
            ) : (
              <Link href="/" onClick={handleClose}>
                <DocsLogo />
              </Link>
            )}
          </div>
          <SearchToggle />
        </div>

        <nav className="overflow-y-auto h-[calc(100vh-64px)] bg-background px-3">
          <div className="py-2">
            {activeSubmenu ? (
              (
                baseOptions.links?.find(
                  (item: any) => item.text === activeSubmenu && item.type === 'menu',
                ) as any
              )?.items?.map((subItem: any) => {
                if (subItem.type === 'custom' || !('url' in subItem) || !subItem.url) return null;

                return (
                  <Link
                    key={subItem.url}
                    href={subItem.url}
                    onClick={handleClose}
                    className={cn(
                      'flex items-center justify-between px-2 py-3 text-lg hover:bg-accent transition-colors',
                      subItem.isNew && 'gap-3 justify-start',
                    )}
                  >
                    <span className="font-fono text-muted-foreground">{subItem.text}</span>
                    {subItem.isNew && (
                      <span className="font-regular text-[10px] px-1 py-0.5 rounded uppercase bg-orange-500 dark:bg-brand-orange text-neutral-950 border-none">
                        New
                      </span>
                    )}
                  </Link>
                );
              })
            ) : isInDocsContext && !showMainMenu ? (
              <TreeContextProvider tree={tree}>
                <div className="bg-background">
                  <div className="[&_aside]:!relative [&_aside]:!top-auto [&_aside]:!w-full [&_aside]:!h-auto [&_aside]:!visible [&_aside]:!px-0 [&_aside]:!pt-0 [&_aside]:!pb-20">
                    <Sidebar />
                  </div>
                </div>
              </TreeContextProvider>
            ) : (
              // TODO: Hide get started link for now
              <>
                {/* <Link
                  href="/start"
                  onClick={handleClose}
                  className="font-fono text-muted-foreground flex items-center justify-between px-4 py-3 text-base hover:bg-accent transition-colors"
                >
                  Get Started
                </Link> */}

                {baseOptions.links?.map((item, index) => (
                  <div key={index} className="">
                    {item.type === 'menu' ? (
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-3 text-lg hover:bg-accent transition-colors text-left"
                        onClick={() => {
                          setActiveSubmenu(String(item.text));
                          setShowMainMenu(false);
                        }}
                      >
                        <span className="font-fono text-muted-foreground">{item.text}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ) : (
                      'url' in item && (
                        <Link
                          href={item.url as string}
                          onClick={handleClose}
                          className="font-fono flex items-center justify-between px-4 py-3 text-lg hover:bg-accent transition-colors"
                        >
                          {item.text}
                        </Link>
                      )
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
