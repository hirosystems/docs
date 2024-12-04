import React from "react";

import { Root as FumaRoot } from "fumadocs-openapi/ui";

const Root: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <FumaRoot className="gap-0">{children}</FumaRoot>;
};

export { Root };
