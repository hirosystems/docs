import React from "react";

import { cn } from "@/lib/utils";

const Info: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("min-w-0 flex-1 prose-no-margin", className)}>
      {children}
    </div>
  );
};

export { Info };
