import React from "react";

import { APIExample as FumaAPIExample } from "fumadocs-ui/components/api";

const APIExample: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <FumaAPIExample className="api-example">{children}</FumaAPIExample>;
};

export { APIExample };
