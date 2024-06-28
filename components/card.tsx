import Link, { type LinkProps } from "fumadocs-core/link";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

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
        "not-prose block rounded-lg p-px border bg-card text-md text-card-foreground shadow-md transition-colors relative overflow-hidden hover:bg-accent/80",
        "hover:before:absolute hover:before:inset-0 hover:before:content-['']",
        "hover:before:rounded-[inherit] hover:before:bg-gradient-to-br hover:before:from-transparent hover:before:via-transparent hover:before:to-orange-500",
        "hover:before:transition-opacity hover:before:duration-700 hover:before:opacity-0 hover:hover:before:opacity-100",
        props.className
      )}
    >
      <div className="relative z-10 bg-card p-4 rounded-md hover:bg-accent">
        {icon ? (
          <div className="mb-2 w-fit rounded-md border bg-muted p-2 text-muted-foreground [&_svg]:size-4">
            {icon}
          </div>
        ) : null}
        <h3 className="mb-1 font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
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
        "not-prose block rounded-lg border bg-card p-4 text-md text-card-foreground shadow-md transition-colors hover:bg-accent/80",
        props.className
      )}
    >
      {icon ? (
        <div className="w-full flex justify-between">
          <div className="mb-2 w-fit rounded-md border bg-muted p-2 text-muted-foreground [&_svg]:size-4">
            {icon}
          </div>
          <Badge
            variant="outline"
            className="uppercase rounded-md transition-colors h-fit bg-muted text-icon"
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
        "not-prose block text-sm text-card-foreground transition-colors",
        props.className
      )}
    >
      <div className="flex space-x-4 hover:bg-accent/80 p-4 rounded-lg">
        <div className="h-fit w-fit rounded-md border bg-muted p-2 text-muted-foreground [&_svg]:size-4">
          {icon}
        </div>
        <div className="flex flex-col w-full">
          <h3 className="mb-1 font-medium">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
