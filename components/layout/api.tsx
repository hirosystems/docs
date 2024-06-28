import React from "react";

import { cn } from "@/utils/cn";

import { API as FumaAPI } from "fumadocs-ui/components/api";

const API: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <FumaAPI className={cn("api gap-x-10", className)}>{children}</FumaAPI>
  );
};

export { API };
