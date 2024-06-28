import React from "react";

const InlineCode = ({ children }: { children: React.ReactNode }) => {
  return (
    <code className="bg-muted p-1 rounded-md text-xl font-normal border">
      {children}
    </code>
  );
};

export { InlineCode };
