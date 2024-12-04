import React from "react";

import { APIExample as FumaAPIExample } from "fumadocs-openapi/ui";

const APIExample: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <FumaAPIExample className="flex-1">{children}</FumaAPIExample>;
};

export { APIExample };
