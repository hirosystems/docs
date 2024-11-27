import React from "react";

import { Property as FumaProperty } from "fumadocs-openapi/ui";

const Property: React.FC<{
  children?: React.ReactNode;
  required: boolean;
  deprecated?: boolean;
  name: string;
  type: string;
}> = (props) => {
  return (
    <FumaProperty {...props} deprecated={props.deprecated ?? false}>
      {props.children}
    </FumaProperty>
  );
};

export { Property };
