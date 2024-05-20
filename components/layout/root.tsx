import React from "react";

import { Root as FumaRoot } from "fumadocs-ui/components/api";

const Root: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <FumaRoot>{children}</FumaRoot>;
};

export { Root };
