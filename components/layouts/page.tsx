"use client";
import {
  type PageTree,
  type TableOfContents,
  type TOCItemType,
} from "fumadocs-core/server";
import { type ComponentProps, type ReactNode, useMemo } from "react";
import { AnchorProvider, useActiveAnchors } from "fumadocs-core/toc";
import { cn } from "@/lib/utils";
import { useTreeContext } from "fumadocs-ui/contexts/tree";
import { Link, usePathname } from "fumadocs-core/framework";

export interface DocsPageProps {
  toc?: TableOfContents;
  full?: boolean;
  children: ReactNode;
}

export function DocsPage({ toc = [], full, ...props }: DocsPageProps) {
  return (
    <AnchorProvider toc={toc}>
      <div className="flex w-full min-w-0">
        <main className="flex flex-1 flex-col">
          <article
            className={cn(
              "flex flex-1 flex-col w-full gap-6 px-4 py-8 md:px-6 md:mx-auto",
              full ? "max-w-[1120px]" : "max-w-[860px]"
            )}
          >
            {props.children}
            <Footer />
          </article>
        </main>
        {toc.length > 0 && !full && (
          <div className="sticky top-(--fd-nav-height) w-[225px] shrink-0 h-[calc(100dvh-var(--fd-nav-height))] p-4 overflow-auto max-xl:hidden">
            <p className="text-sm text-fd-muted-foreground mb-2">
              On this page
            </p>
            <div className="flex flex-col">
              {toc.map((item) => (
                <TocItem key={item.url} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AnchorProvider>
  );
}

export function DocsBody(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("prose", props.className)}>
      {props.children}
    </div>
  );
}

export function DocsDescription(props: ComponentProps<"p">) {
  // don't render if no description provided
  if (props.children === undefined) return null;

  return (
    <p
      {...props}
      className={cn("mb-8 text-lg text-fd-muted-foreground", props.className)}
    >
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
  const isActive = useActiveAnchors().includes(item.url.slice(1));

  return (
    <a
      href={item.url}
      className={cn(
        "text-sm text-fd-foreground/80 py-1",
        isActive && "text-fd-primary"
      )}
      style={{
        paddingLeft: Math.max(0, item.depth - 2) * 16,
      }}
    >
      {item.title}
    </a>
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
    <div className="flex flex-row justify-between gap-2 items-center font-medium">
      {previous ? <Link href={previous.url}>{previous.name}</Link> : null}
      {next ? <Link href={next.url}>{next.name}</Link> : null}
    </div>
  );
}
