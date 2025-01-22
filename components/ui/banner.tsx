"use client";

import { type HTMLAttributes, useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { isWithinInterval, parseISO } from "date-fns";

export const buttonVariants = cva(
  "bg-[#ffddcc] hover:bg-[#ffeee5] inline-flex items-center justify-center rounded-md p-2 text-sm text-primary font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      color: {
        outline: "border hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "gap-1 p-0.5 text-xs",
        icon: "p-1.5 [&_svg]:size-5",
      },
    },
  }
);

export function Banner({
  id,
  cta = "Call to Action",
  url = "/",
  startDate,
  endDate,
  children,
  mobileText,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  cta?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  mobileText?: string;
}): React.ReactElement | null {
  const [open, setOpen] = useState(true);
  const [isWithinDateRange, setIsWithinDateRange] = useState(false);

  useEffect(() => {
    const now = new Date();
    if (startDate && endDate) {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      setIsWithinDateRange(isWithinInterval(now, { start, end }));
    } else {
      setIsWithinDateRange(true);
    }

    if (id) setOpen(localStorage.getItem(`nd-banner-${id}`) !== "true");
  }, [id, startDate, endDate]);

  useEffect(() => {
    if (id) setOpen(localStorage.getItem(`nd-banner-${id}`) !== "true");
  }, [id]);

  const onClick = useCallback(() => {
    setOpen(false);
    if (id) localStorage.setItem(`nd-banner-${id}`, "true");
  }, [id]);

  if (!isWithinDateRange) return null;

  return (
    <div
      id={id}
      {...props}
      className={cn(
        "relative flex h-12 flex-row items-center justify-center bg-[#ff7733] px-4 text-center text-sm text-[#141312] font-medium font-aeonikFono",
        !open && "hidden",
        props.className
      )}
      suppressHydrationWarning
    >
      {id ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `const ndBannerItem = localStorage.getItem('nd-banner-${id}');
   if (ndBannerItem === 'true') {
     document.getElementById('${id}').style.display = 'none';
   }`,
          }}
        />
      ) : null}
      <div className="flex items-center justify-center space-x-4">
        <div>
          {mobileText ? (
            <>
              <span className="sm:hidden">{mobileText}</span>
              <span className="hidden sm:inline">{children}</span>
            </>
          ) : (
            children
          )}
        </div>
        {cta && (
          <Button
            size="sm"
            asChild
            className="bg-[hsl(var(--dark))] text-[#ff7733] font-aeonikFono hover:bg-[hsl(var(--dark))] hover:text-[#ffeee5]"
          >
            {url.startsWith("/") ? (
              <Link href={url}>{cta}</Link>
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {cta}
              </a>
            )}
          </Button>
        )}
      </div>
      {id ? (
        <button
          type="button"
          aria-label="Close Banner"
          onClick={onClick}
          className={cn(
            buttonVariants({
              className:
                "absolute end-2 top-1/2 -translate-y-1/2 text-muted-foreground",
              size: "icon",
            })
          )}
        >
          <X className="text-[#141312]" />
        </button>
      ) : null}
    </div>
  );
}
