"use client";

import { cva } from "class-variance-authority";
import { Moon, Sun, Airplay } from "lucide-react";
import { useTheme } from "next-themes";
import { type HTMLAttributes, useLayoutEffect, useState } from "react";
import { cn } from "../../lib/utils";

const itemVariants = cva("rounded p-1.5 text-fd-muted-foreground", {
  variants: {
    active: {
      true: "bg-white dark:dark:bg-neutral-950 text-primary",
      false: "text-muted-foreground cursor-pointer",
    },
  },
});

const full = [["light", Sun] as const, ["dark", Moon] as const];

export function ThemeToggle({
  className,
  mode = "light-dark",
  ...props
}: HTMLAttributes<HTMLElement> & {
  mode?: "light-dark";
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const container = cn(
    "bg-neutral-150 dark:bg-neutral-700 inline-flex items-center rounded p-1",
    className
  );

  const value = mounted ? resolvedTheme : null;

  return (
    <div className={container} data-theme-toggle="" {...props}>
      {full.map(([key, Icon]) => (
        <button
          key={key}
          aria-label={key}
          className={cn(itemVariants({ active: value === key }))}
          onClick={() => setTheme(key)}
        >
          <Icon className="size-4" fill="transparent" />
        </button>
      ))}
    </div>
  );
}
