import React from "react";
import { cn } from "@/lib/utils";

const InlineCode = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <code
      className={cn(
        "bg-muted p-1 rounded-md text-xl font-normal border",
        className
      )}
    >
      {children}
    </code>
  );
};

export { InlineCode };
