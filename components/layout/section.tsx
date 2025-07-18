import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLayout = "grid" | "flex" | "stack";
type SectionVariant = "bordered" | "clean" | "hero";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  layout?: SectionLayout;
  variant?: SectionVariant;
  columns?: number;
  gap?: number;
  padding?: "none" | "normal" | "large";
}

export function Section({
  layout = "grid",
  variant = "clean",
  columns = 12,
  gap = 6,
  padding = "normal",
  className,
  children,
  ...props
}: SectionProps): React.ReactElement {
  const layoutClasses = {
    grid: "flex flex-col lg:grid lg:grid-cols-12 items-start w-full",
    flex: "flex flex-col w-full",
    stack: "space-y-6 w-full",
  };

  const variantClasses = {
    bordered: "border-b",
    clean: "",
    hero: "border-b bg-muted/30",
  };

  const paddingClasses = {
    none: "",
    normal: "py-12",
    large: "py-16",
  };

  return (
    <div
      {...props}
      className={cn(
        layoutClasses[layout],
        variantClasses[variant],
        paddingClasses[padding],
        "gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  span?: number;
  icon?: ReactNode;
  title: string;
  description?: string;
  color?: "purple" | "blue" | "orange" | "green" | "gray";
}

export function SectionHeader({
  span = 4,
  icon,
  title,
  description,
  color = "purple",
  className,
  ...props
}: SectionHeaderProps): React.ReactElement {
  const colorClasses = {
    purple:
      "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
    blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    orange:
      "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
    green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    gray: "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400",
  };

  return (
    <div
      {...props}
      className={cn("lg:col-span-4 flex flex-col gap-1", className)}
    >
      <div className="md:max-w-xs 2xl:max-w-none">
        <div className="flex items-center gap-3 mb-3">
          {icon && (
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                colorClasses[color]
              )}
            >
              {icon}
            </div>
          )}
          <h3 className="text-xl font-semibold text-primary mt-0">{title}</h3>
        </div>
        {description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export interface SectionContentProps extends HTMLAttributes<HTMLDivElement> {
  span?: number;
  gridColumns?: number;
}

export function SectionContent({
  span = 8,
  gridColumns = 12,
  className,
  children,
  ...props
}: SectionContentProps): React.ReactElement {
  return (
    <div
      {...props}
      className={cn(
        "lg:col-span-8 w-full",
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "not-prose",
        className
      )}
    >
      {children}
    </div>
  );
}
