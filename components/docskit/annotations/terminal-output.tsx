'use client';
import type { AnnotationHandler } from 'codehike/code';
import React from 'react';

interface OutputBlockProps {
  children: React.ReactNode;
  hideOutput?: boolean;
}

export const OutputBlock: AnnotationHandler['Block'] = ({
  children,
  hideOutput = false,
}: OutputBlockProps) => {
  const [hidden, setHidden] = React.useState(hideOutput);

  // If hideOutput is false, just render the output directly
  if (!hideOutput) {
    return <div className="px-1 pt-1 pb-0">{children}</div>;
  }

  // Otherwise, render the collapsible output
  return hidden ? (
    <div className="px-1">
      <button
        type="button"
        aria-label="Show command output"
        className="opacity-70 cursor-pointer hover:opacity-90 select-none transition-opacity"
        onClick={() => setHidden(false)}
      >
        {'[show output]'}
      </button>
    </div>
  ) : (
    <div className="px-1 pt-1 pb-0">{children}</div>
  );
};
