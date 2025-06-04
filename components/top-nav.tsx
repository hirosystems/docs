"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { DocsLogo } from "@/components/ui/icon";
import { modes, type Mode } from "@/lib/modes";
import { useSearch } from "@/lib/hooks/use-search";
import { SearchIcon } from "lucide-react";
import { useKeyboardShortcuts } from "@/lib/hooks/use-keyboard-shortcuts";
import { Kbd } from "@/components/ui/kbd";

interface TopNavProps {
  className?: string;
}

const itemVariants = cva(
  "rounded-md px-2 py-1 transition-colors hover:text-accent-foreground",
  {
    variants: {
      active: {
        true: "text-accent-foreground pointer-events-none",
      },
      mode: {
        bitcoin: "bg-hiro",
        stacks: "bg-background",
      },
    },
    compoundVariants: [
      {
        active: true,
        mode: "bitcoin",
        className: "bg-orange-500 dark:bg-orange-700 text-primary",
      },
      {
        active: true,
        mode: "stacks",
        className: "bg-inverted text-background",
      },
    ],
  }
);

export function TopNav({ className }: TopNavProps) {
  const pathname = usePathname();
  const currentMode = pathname.split("/")[1]; // Gets 'stacks' or 'bitcoin' from the path
  const [isScrolled, setIsScrolled] = useState(false);
  const { setOpen } = useSearch();
  const { registerShortcut } = useKeyboardShortcuts();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    // Register 'p' shortcut for platform navigation
    const platformShortcut = registerShortcut({
      key: "p",
      callback: () => {
        window.open(
          "https://platform.hiro.so",
          "_blank",
          "noopener,noreferrer"
        );
      },
      preventDefault: true,
    });

    // Register 't' shortcut for calendar scheduling
    const calendarShortcut = registerShortcut({
      key: "t",
      callback: () => {
        window.open(
          "https://cal.com/waits/15min",
          "_blank",
          "noopener,noreferrer"
        );
      },
      preventDefault: true,
    });

    // Clean up both shortcuts
    return () => {
      platformShortcut();
      calendarShortcut();
    };
  }, [registerShortcut]);

  const navItems = [
    { name: "Guides", href: "/guides" },
    { name: "Cookbook", href: "/cookbook" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 transition-all duration-200",
        "bg-background/50 backdrop-blur-md",
        isScrolled ? "border-b border-border" : "border-b border-transparent",
        className
      )}
    >
      <div className="flex h-14 p-4 items-center">
        <div className="space-x-6 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <DocsLogo className="hidden sm:block" />
          </Link>
          <div className="rounded-md border bg-background p-1 text-sm text-muted-foreground max-md:absolute max-md:left-[50%] max-md:translate-x-[-50%]">
            {modes.map((m) => (
              <Link
                key={m.param}
                href={`/${m.param}`}
                className={cn(
                  itemVariants({
                    active: currentMode === m.param,
                    mode:
                      currentMode === m.param
                        ? (m.param as "bitcoin" | "stacks")
                        : undefined,
                  })
                )}
              >
                <div className="inline-flex items-center gap-2">
                  {m.icon && <m.icon className="shrink-0 size-3" />}
                  {m.name}
                </div>
              </Link>
            ))}
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-base transition-colors hover:underline hover:underline-offset-4 decoration-neutral-150 dark:decoration-neutral-500 hover:decoration-2",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-primary underline underline-offset-4 decoration-2"
                    : "text-primary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-3">
          <div
            className="w-full max-w-[221px] h-9 bg-neutral-100 dark:bg-neutral-950 rounded-md flex items-center px-2 cursor-pointer group"
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center flex-1 gap-2">
              <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                Search
              </span>
            </div>
            <div className="flex items-center gap-1 group">
              <Kbd className="flex items-center justify-center rounded text-md bg-card text-muted-foreground group-hover:text-primary transition-colors">
                ⌘
              </Kbd>
              <Kbd className="flex items-center justify-center rounded text-sm bg-card text-muted-foreground group-hover:text-primary transition-colors">
                K
              </Kbd>
            </div>
          </div>
          <Button className="bg-orange-500 text-white hover:bg-orange-600 flex items-center gap-2 px-2.5 py-1.5 transition-colors duration-200">
            Hiro Platform
            <Kbd className="flex items-center justify-center rounded text-sm border border-orange-400 bg-orange-400 text-white">
              P
            </Kbd>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
