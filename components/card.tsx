import Link, { type LinkProps } from "fumadocs-core/link";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

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
  title: string;
  description: string;
  image?: string;
} & Omit<LinkProps, "title">;

export function FeatureCard({
  title,
  description,
  image,
  ...props
}: FeatureCardProps): React.ReactElement {
  return (
    <Link
      {...props}
      className={cn(
        "not-prose flex flex-col justify-center rounded-lg border bg-background text-md transition-all duration-100 ease-linear hover:bg-accent/80 pr-0 pl-12 py-0",
        props.className
      )}
    >
      <div className="flex justify-between">
        <img src={image} alt="arrow-right" />
      </div>
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
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
