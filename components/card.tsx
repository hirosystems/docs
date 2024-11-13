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
} & Omit<LinkProps, "title">;

export function Card({
  icon,
  title,
  description,
  ...props
}: CardProps): React.ReactElement {
  return (
    <Link
      {...props}
      className={cn(
        "not-prose relative block rounded-lg p-[1px] transition-all duration-300",
        "bg-gradient-to-r from-border from-0% to-border to-100%", // Default single-color gradient (acts as border)
        "hover:from-border hover:from-25% hover:to-gradient hover:to-100%", // Hover gradient
        "hover:shadow-[0_6px_17px_rgba(181,172,161,0.3)] dark:hover:shadow-[0_6px_21px_rgba(0,0.0,0.8)]",
        props.className
      )}
    >
      <div
        className={cn(
          "space-y-3 group relative z-10 bg-card p-5 rounded-[7px] hover:bg-accent",
          props.innerClassName
        )}
      >
        {icon ? (
          <div className="w-fit rounded-md border group-hover:bg-border p-2 text-muted-foreground [&_svg]:size-4">
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
        "not-prose flex flex-col justify-center rounded-lg border bg-background text-md transition-colors hover:bg-accent/80 pr-0 pl-12 py-0",
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
        "not-prose block rounded-lg border bg-card p-4 text-md transition-colors hover:bg-accent/80",
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
        "not-prose block transition-colors space-y-3",
        props.className
      )}
    >
      <div className="group flex space-x-4 px-3 py-4 rounded-lg hover:bg-accent">
        {icon && (
          <div className="h-fit w-fit rounded-md border bg-card group-hover:bg-background group-hover:text-primary transition-colors duration-500 ease-in-out p-2 text-muted-foreground [&_svg]:size-4">
            {icon}
          </div>
        )}
        <div className="flex flex-col w-full">
          <h3 className="mb-1 font-inter font-medium text-md text-[#141312] dark:text-[#f6f5f3]">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
