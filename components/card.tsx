import Link, { type LinkProps } from "fumadocs-core/link";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { InteractiveBadge } from "@/app/(home)/components/interactive-badge";
import { ChevronRight } from "lucide-react";
import { CopyButton } from "@/components/docskit/copy-button";

export function Cards(
  props: HTMLAttributes<HTMLDivElement>
): React.ReactElement {
  return (
    <div
      {...props}
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", props.className)}
    >
      {props.children}
    </div>
  );
}

export type CardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  innerClassName?: string;
  variant?: "default" | "secondary";
} & Omit<LinkProps, "title">;

export function Card({
  icon,
  title,
  description,
  variant = "default",
  ...props
}: CardProps): React.ReactElement {
  return (
    <Link
      {...props}
      className={cn(
        "not-prose relative block rounded-lg p-[1.5px] transition-all duration-500 ease-linear",
        // Default border (non-hover state)
        "bg-border",
        // Variant-specific hover gradients with bottom-right direction
        variant === "default" &&
          "hover:bg-gradient-to-br hover:from-border hover:to-muted-foreground",
        variant === "secondary" &&
          "hover:bg-gradient-to-br hover:from-border hover:to-muted-foreground",
        // Hover shadow
        "hover:shadow-[0_6px_17px_muted-foreground]",
        props.className
      )}
    >
      <div
        className={cn(
          "space-y-3 group relative z-10 bg-card p-5 rounded-[calc(0.5rem-1.5px)] h-full transition-all duration-500 ease-linear",
          props.innerClassName
        )}
      >
        {icon ? (
          <div className="w-fit rounded-md border group-hover:bg-border p-2 text-muted-foreground transition-all duration-100 ease-linear [&_svg]:size-4">
            {icon}
          </div>
        ) : null}
        <div className="space-y-1">
          <h3 className="text-lg">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export type FeatureCardProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badges: Array<{
    label: string;
    href: string;
  }>;
  variant?: "default" | "secondary";
};

export function FeatureCard({
  href,
  icon,
  title,
  description,
  badges,
  variant = "default",
}: FeatureCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        "relative rounded-[0.6rem] p-[1.5px] overflow-hidden transition-colors",
        variant === "default" &&
          "bg-gradient-to-br from-border via-border to-neutral-300 dark:to-neutral-200",
        variant === "secondary" &&
          "bg-gradient-to-br from-border via-border to-orange-500 dark:to-orange-700"
      )}
    >
      <Link
        href={href}
        className="not-prose block rounded-lg bg-[#ebe9e5] dark:bg-neutral-600 p-8 text-md text-neutral-500 dark:text-neutral-300 h-full"
      >
        <div className="mb-6">
          <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4 [&_svg]:size-12">
            {icon}
          </div>
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {badges?.map((badge) => (
            <InteractiveBadge
              key={badge.label}
              href={badge.href}
              label={badge.label}
            />
          ))}
        </div>
      </Link>
    </div>
  );
}

export type SecondaryCardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  tag?: string;
} & Omit<LinkProps, "title">;

export function SecondaryCard({
  icon,
  title,
  description,
  tag,
  ...props
}: SecondaryCardProps): React.ReactElement {
  const isBitcoinTag =
    tag &&
    (tag.toLowerCase() === "bitcoin" || tag.toLowerCase() === "bitcoin l1");

  return (
    <Link
      {...props}
      className={cn(
        "not-prose block rounded-lg border bg-card p-4 text-md transition-all duration-100 ease-linear hover:bg-accent/80",
        props.className
      )}
    >
      {icon ? (
        <div className="group w-full flex justify-between">
          <div className="mb-2 w-fit rounded-md border bg-card p-2 text-muted-foreground [&_svg]:size-4">
            {icon}
          </div>
          {tag && (
            <Badge
              variant="outline"
              className={cn(
                "uppercase rounded-md transition-colors h-fit",
                isBitcoinTag
                  ? "bg-orange-500 dark:bg-orange-brand text-neutral-900 border-none"
                  : "text-card-foreground bg-accent border border-border shadow-md"
              )}
            >
              {tag}
            </Badge>
          )}
        </div>
      ) : null}
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  );
}

export type IndexCardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  tag?: string;
} & Omit<LinkProps, "title">;

export function IndexCard({
  icon,
  title,
  description,
  tag,
  ...props
}: IndexCardProps): React.ReactElement {
  const isBitcoinTag =
    tag &&
    (tag.toLowerCase() === "bitcoin" || tag.toLowerCase() === "bitcoin l1");

  return (
    <Link
      {...props}
      className={cn(
        "not-prose group relative block rounded-lg p-6 transition-all duration-200 ease-in-out hover:bg-card",
        props.className
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 w-fit rounded-md bg-neutral-150 dark:bg-neutral-700 group-hover:bg-white dark:group-hover:bg-neutral-950 p-2.5 text-muted-foreground transition-colors duration-200 [&_svg]:size-5">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-card-foreground mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        {tag && (
          <Badge
            variant="outline"
            className={cn(
              "uppercase rounded-md transition-colors h-fit",
              isBitcoinTag
                ? "bg-orange-500 dark:bg-brand-orange text-neutral-900 border-none"
                : "text-card-foreground bg-accent border border-border shadow-md"
            )}
          >
            {tag}
          </Badge>
        )}
      </div>
    </Link>
  );
}

export type SmallCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
} & Omit<LinkProps, "title">;

export function SmallCard({
  icon,
  title,
  description,
  ...props
}: CardProps): React.ReactElement {
  return (
    <Link
      {...props}
      className={cn(
        "not-prose block transition-all duration-100 ease-linear space-y-3",
        props.className
      )}
    >
      <div className="group flex space-x-4 px-3 py-4 rounded-lg hover:bg-card transition-all duration-100 ease-linear">
        {icon && (
          <div className="h-fit w-fit rounded-md border bg-card group-hover:bg-background group-hover:text-primary transition-all duration-100 ease-linear p-2 text-muted-foreground [&_svg]:size-4">
            {icon}
          </div>
        )}
        <div className="flex flex-col w-full">
          <h3 className="mb-1 font-inter font-medium text-md text-primary dark:text-[#f6f5f3]">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export interface ToolCardProps {
  icon?: ReactNode;
  title: string;
  href?: string;
  className?: string;
}

export function ToolCard({
  icon,
  title,
  href,
  className,
}: ToolCardProps): React.ReactElement {
  const content = (
    <div className="relative group">
      <div className="peer relative flex flex-col gap-12">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="relative flex items-center justify-center shrink-0 h-8 w-8 rounded-lg group cursor-pointer overflow-hidden border hover:border-strong bg-surface-100 transition [&_svg]:size-3.5">
              {icon}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h5 className="text-base text-foreground m-0">{title}</h5>
              <div className="transition-all ease-out -ml-1 opacity-0 text-foreground-muted group-hover:opacity-100 group-hover:ml-0">
                <ChevronRight className="size-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute transition-all ease-in -z-10 -inset-3 rounded-2xl bg-surface-100 opacity-0 peer-hover:opacity-100" />
    </div>
  );

  if (href) {
    return (
      <a href={href} className={cn("col-span-6 md:col-span-4", className)}>
        {content}
      </a>
    );
  }

  return (
    <div className={cn("col-span-6 md:col-span-4", className)}>{content}</div>
  );
}

export type NextCardProps = {
  title: string;
  description: string;
} & Omit<LinkProps, "title">;

export function NextCard({
  title,
  description,
  ...props
}: NextCardProps): React.ReactElement {
  return (
    <Link
      {...props}
      className={cn(
        "group not-prose block rounded-lg border border-border bg-neutral-100/50 dark:bg-neutral-800/20 p-6 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/40",
        props.className
      )}
    >
      <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
        {title}
        <span className="text-muted-foreground group-hover:text-primary transition-all duration-200">
          →
        </span>
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Link>
  );
}

export type SnippetCardProps = {
  title: string;
  badges?: string[];
  children: ReactNode;
} & Omit<LinkProps, "title">;

export function SnippetCard({
  title,
  badges = [],
  children,
  ...props
}: SnippetCardProps): React.ReactElement {
  return (
    <div className="relative w-full max-h-[300px] rounded-lg border bg-[#EBE9E6] dark:bg-[#2a2726] overflow-hidden transition-all duration-200">
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-regular text-primary !m-0">{title}</h3>
          </div>
        </div>
      </div>
      <Link href={props.href} className="group relative block !no-underline">
        <div className="max-h-[200px] overflow-hidden border-t border-border bg-[hsl(var(--code))] relative z-0 !m-0 [&>div:first-child]:!m-0">
          {children}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[hsl(var(--code))] to-transparent" />
        </div>
      </Link>
    </div>
  );
}
