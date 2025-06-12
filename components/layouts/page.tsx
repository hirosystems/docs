"use client";
import {
  type PageTree,
  type TableOfContents,
  type TOCItemType,
} from "fumadocs-core/server";
import {
  type ComponentProps,
  type ReactNode,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { AnchorProvider, useActiveAnchors } from "fumadocs-core/toc";
import * as Primitive from "fumadocs-core/toc";
import { cn } from "@/lib/utils";
import { useTreeContext } from "fumadocs-ui/contexts/tree";
import { Link, usePathname } from "fumadocs-core/framework";
import { TocThumb } from "@/components/layout/toc-thumb";

export interface DocsPageProps {
  toc?: TableOfContents;
  full?: boolean;
  children: ReactNode;
}

export function DocsPage({ toc = [], full, ...props }: DocsPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <AnchorProvider toc={toc}>
      <div className="flex w-full min-w-0">
        <main className="flex flex-1 flex-col">
          <article
            className={cn(
              "flex flex-1 flex-col w-full gap-6 px-4 py-6 md:px-6 md:mx-auto",
              full ? "max-w-[1120px]" : "max-w-[860px]"
            )}
          >
            {props.children}
            <Footer />
          </article>
        </main>
        {toc.length > 0 && !full && (
          <div className="sticky top-(--fd-nav-height) w-[275px] shrink-0 h-[calc(100dvh-var(--fd-nav-height))] p-4 max-xl:hidden overflow-auto">
            <p className="text-xs font-fono uppercase text-muted-foreground mb-4 ps-3">
              On this page
            </p>
            <div className="relative">
              <TocThumb
                containerRef={containerRef}
                className="absolute left-0 mt-(--fd-top) h-(--fd-height) w-px bg-primary transition-all"
              />
              <div
                ref={containerRef}
                className="flex flex-col border-l border-border/25 pl-px"
              >
                {toc.map((item) => (
                  <TocItem key={item.url} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AnchorProvider>
  );
}

export function DocsBody(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "prose text-neutral-400 dark:text-neutral-300",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

export function DocsDescription(props: ComponentProps<"p">) {
  // don't render if no description provided
  if (props.children === undefined) return null;

  return (
    <p {...props} className={cn("text-md", props.className)}>
      {props.children}
    </p>
  );
}

export function DocsTitle(props: ComponentProps<"h1">) {
  return (
    <h1 {...props} className={cn("text-3xl font-semibold", props.className)}>
      {props.children}
    </h1>
  );
}

function TocItem({ item }: { item: TOCItemType }) {
  return (
    <Primitive.TOCItem
      href={item.url}
      className={cn(
        "prose py-1.5 text-xs text-muted-foreground transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0 data-[active=true]:text-fd-primary",
        item.depth <= 2 && "ps-3",
        item.depth === 3 && "ps-6",
        item.depth >= 4 && "ps-8"
      )}
    >
      {item.title}
    </Primitive.TOCItem>
  );
}

function Footer() {
  const { root } = useTreeContext();
  const pathname = usePathname();
  const flatten = useMemo(() => {
    const result: PageTree.Item[] = [];

    function scan(items: PageTree.Node[]) {
      for (const item of items) {
        if (item.type === "page") result.push(item);
        else if (item.type === "folder") {
          if (item.index) result.push(item.index);
          scan(item.children);
        }
      }
    }

    scan(root.children);
    return result;
  }, [root]);

  const { previous, next } = useMemo(() => {
    const idx = flatten.findIndex((item) => item.url === pathname);

    if (idx === -1) return {};
    return {
      previous: flatten[idx - 1],
      next: flatten[idx + 1],
    };
  }, [flatten, pathname]);

  return (
    <div className="flex flex-row justify-between gap-4 items-stretch">
      {previous ? (
        <Link
          href={previous.url}
          className="flex flex-col gap-1 px-4 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors flex-1 max-w-sm"
        >
          <span className="text-sm text-muted-foreground">← Previous</span>
          <span className="font-medium">{previous.name}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.url}
          className="flex flex-col gap-1 px-4 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors flex-1 max-w-sm text-right"
        >
          <span className="text-sm text-muted-foreground">Next →</span>
          <span className="font-medium">{next.name}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
