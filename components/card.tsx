import Link, { type LinkProps } from "fumadocs-core/link";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { InteractiveBadge } from "@/app/(home)/components/interactive-badge";
import { ChevronRight } from "lucide-react";

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
        "relative rounded-[0.6rem] p-[1.5px] overflow-hidden transition-colors hover:shadow-[0_6px_20px_rgba(89,86,80,0.2)] dark:hover:shadow-[0_6px_40px_#383432]",
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
  tag: string;
} & Omit<LinkProps, "title">;

export function SecondaryCard({
  icon,
  title,
  description,
  tag,
  ...props
}: SecondaryCardProps): React.ReactElement {
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
          <Badge
            variant="outline"
            className="uppercase rounded-md transition-colors h-fit text-card-foreground bg-accent border border-border shadow-md"
          >
            {tag}
          </Badge>
        </div>
      ) : null}
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
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
      <div className="group flex space-x-4 px-3 py-4 rounded-lg hover:bg-accent transition-all duration-100 ease-linear">
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
      <div className="absolute transition-all ease-in -z-10 -inset-3 rounded-2xl bg-surface-100 opacity-0 peer-hover:opacity-100"></div>
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
