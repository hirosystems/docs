'use client';

import type { TableOfContents, TOCItemType } from 'fumadocs-core/server';
import * as Primitive from 'fumadocs-core/toc';
import { AnchorProvider } from 'fumadocs-core/toc';
import { AlignLeft } from 'lucide-react';
import React, {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useRef,
} from 'react';
import { BreadcrumbNav as OriginalBreadcrumb } from '@/components/breadcrumb-nav';
import { TocThumb } from '@/components/layout/toc-thumb';
import { cn } from '@/lib/utils';

export interface PageData {
  toc?: TableOfContents;
  full?: boolean;
  interactive?: boolean;
  title?: string;
  description?: string;
  interactiveFeatures?: string[];
  interactiveLinks?: Array<{
    title: string;
    href: string;
    icon?: ReactNode;
  }>;
}

export const PageContext = createContext<PageData>({});

export function usePageData() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePageData must be used within a Page component');
  }
  return context;
}

interface DocsPageProps {
  data: PageData;
  children: ReactNode;
}

export function DocsPage({ data, children }: DocsPageProps) {
  return (
    <PageContext.Provider value={data}>
      <AnchorProvider toc={data.toc || []}>{children}</AnchorProvider>
    </PageContext.Provider>
  );
}

type LayoutVariant = 'standard' | 'interactive' | 'hero' | 'minimal';

interface PageLayoutProps {
  children: ReactNode;
  variant?: LayoutVariant;
  className?: string;
}

function PageLayout({ children, variant = 'standard', className }: PageLayoutProps) {
  return (
    <div
      className={cn('flex flex-col w-full', variant === 'interactive' && 'min-h-screen', className)}
    >
      {children}
    </div>
  );
}

// Internal wrapper component for content + TOC
interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

function ContentWrapper({ children, className }: ContentWrapperProps) {
  const { toc = [], full } = usePageData();
  const shouldShowTOC = toc.length > 0 && !full;

  return shouldShowTOC ? (
    <div className={cn('sm:flex w-full min-w-0', className)}>
      {children}
      <PageTOC />
    </div>
  ) : (
    children
  );
}

interface PageHeaderProps {
  children: ReactNode;
  className?: string;
}

function PageHeader({ children, className }: PageHeaderProps) {
  const { interactive } = usePageData();

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'w-full px-4 py-4 md:px-10',
          interactive ? 'max-w-[1135px] mx-auto' : 'max-w-[860px] mx-auto',
        )}
      >
        <div className={cn(interactive && 'space-y-6')}>{children}</div>
      </div>
    </div>
  );
}

interface PageContentProps extends ComponentProps<'div'> {
  children: ReactNode;
  className?: string;
}

function PageContent({ children, className, ...props }: PageContentProps) {
  const { full, interactive } = usePageData();

  return (
    <main className="flex flex-1 flex-col pb-16">
      <article
        className={cn(
          'flex flex-1 flex-col w-full gap-6 px-4 md:px-10 mx-auto',
          interactive ? 'pt-8' : 'py-4',
          full ? 'md:max-w-[1120px]' : 'md:max-w-[860px]',
        )}
        {...props}
      >
        {children}
      </article>
    </main>
  );
}

function TocItem({ item }: { item: TOCItemType }) {
  return (
    <Primitive.TOCItem
      href={item.url}
      className={cn(
        'prose py-1.5 text-sm text-muted-foreground transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0 data-[active=true]:text-primary',
        item.depth <= 2 && 'ps-3',
        item.depth === 3 && 'ps-6',
        item.depth >= 4 && 'ps-8',
      )}
    >
      {item.title}
    </Primitive.TOCItem>
  );
}

function PageTOC() {
  const { toc = [], full } = usePageData();
  const containerRef = useRef<HTMLDivElement>(null);

  if (toc.length === 0 || full) return null;

  return (
    <div className="sticky top-[var(--fd-nav-height)] w-[275px] shrink-0 h-[calc(100dvh-var(--fd-nav-height))] px-4 py-3 max-xl:hidden overflow-auto">
      <div className="flex items-center mb-4">
        <AlignLeft className="w-4 h-4 mr-2 text-muted-foreground" />
        <p className="text-sm font-fono text-muted-foreground">Contents</p>
      </div>
      <div className="relative">
        <TocThumb
          containerRef={containerRef}
          className="absolute left-0 mt-[var(--fd-top)] h-[var(--fd-height)] w-px bg-primary transition-all"
        />
        <div ref={containerRef} className="flex flex-col border-l border-border/25 pl-px">
          {toc.map((item) => (
            <TocItem key={item.url} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PageBreadcrumb() {
  return <OriginalBreadcrumb />;
}

function PageTitle(props: ComponentProps<'h1'>) {
  const { title } = usePageData();
  if (!title && !props.children) return null;

  return (
    <h1 {...props} className={cn('text-2xl md:text-3xl font-regular', props.className)}>
      {props.children || title}
    </h1>
  );
}

function PageDescription(props: ComponentProps<'p'>) {
  const { description } = usePageData();
  if (!description && !props.children) return null;

  return (
    <p {...props} className={cn('text-md text-primary', props.className)}>
      {props.children || description}
    </p>
  );
}

interface PageProseProps {
  children: ReactNode;
  className?: string;
}

function PageProse({ children, className }: PageProseProps) {
  return (
    <div
      className={cn(
        'prose prose-sm md:prose-base text-muted-foreground',
        'max-w-none',
        'prose-pre:overflow-x-auto prose-pre:max-w-full',
        'prose-img:max-w-full prose-img:h-auto',
        'prose-table:overflow-x-auto prose-table:block prose-table:max-w-full',
        className,
      )}
    >
      {children}
    </div>
  );
}

export {
  PageLayout as DocsPageLayout,
  PageHeader as DocsPageHeader,
  PageContent as DocsPageContent,
  ContentWrapper as DocsPageContentWrapper,
  PageTOC as DocsPageTOC,
  PageBreadcrumb as DocsPageBreadcrumb,
  PageTitle as DocsPageTitle,
  PageDescription as DocsPageDescription,
  PageProse as DocsPageProse,
};

export { PageTitle as DocsTitle, PageDescription as DocsDescription, PageProse as DocsBody };

// DocsPage.Layout = PageLayout;
// DocsPage.Header = PageHeader;
// DocsPage.Content = PageContent;
// DocsPage.ContentWrapper = ContentWrapper;
// DocsPage.TOC = PageTOC;
// DocsPage.Breadcrumb = PageBreadcrumb;
// DocsPage.Title = PageTitle;
// DocsPage.Description = PageDescription;
// DocsPage.Prose = PageProse;
