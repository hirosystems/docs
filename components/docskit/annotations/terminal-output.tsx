"use client";
import type { AnnotationHandler } from "codehike/code";
import React from "react";

export const OutputBlock: AnnotationHandler["Block"] = ({
  children,
  annotation,
  ...props
}) => {
  const hideOutput = (props as any).hideOutput;
  const [hidden, setHidden] = React.useState(hideOutput ?? false);
  return hidden ? (
    <div className="px-1">
      <button
        aria-label="Show command output"
        className="opacity-70 cursor-pointer hover:opacity-90 select-none transition-opacity"
        onClick={() => setHidden(false)}
      >
        {"[show output]"}
      </button>
    </div>
  ) : (
    <div className="px-1 pt-1 pb-2">{children}</div>
  );
};
