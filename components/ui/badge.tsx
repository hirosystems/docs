import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold font-aeonikFono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-data-[state=active]:bg-inverted group-data-[state=active]:text-background",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#cfc9c2] dark:bg-[#383432] text-primary group-data-[state=inactive]:hover:bg-[#aea498] dark:group-data-[state=inactive]:hover:bg-[#595650] dark:group-data-[state=inactive]:hover:text-[#dcd1d6]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-neutral-500",
        hiro: "border-orange-500 bg-orange-500 dark:border-orange-900/50 dark:bg-orange-900/25 text-white hover:bg-orange-600 dark:hover:bg-orange-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
