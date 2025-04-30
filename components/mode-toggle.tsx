"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button size="icon" className="bg-transparent border-[#333]">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      size="icon"
      className="bg-transparent text-muted-foreground hover:bg-transparent hover:text-primary"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Moon className="h-3 w-3" />
      ) : (
        <Sun className="h-3 w-3" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
