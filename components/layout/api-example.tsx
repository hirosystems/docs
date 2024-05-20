import React from "react";

import { APIExample as FumaAPIExample } from "fumadocs-ui/components/api";

const APIExample: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <FumaAPIExample className="api-example xl:w-[47.5%]">
      {children}
    </FumaAPIExample>
  );
};

export { APIExample };
