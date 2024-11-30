import React from "react";

import { API as FumaAPI } from "fumadocs-openapi/ui";
import { cn } from "@/lib/utils";

const API: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <FumaAPI className={cn("mb-14 gap-x-12", className)}>{children}</FumaAPI>
  );
};

export { API };
