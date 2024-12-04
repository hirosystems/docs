import React, { ReactNode } from "react";

interface ListProps {
  children?: ReactNode;
  items?: string[];
}

function OrderedList({ children, items }: ListProps) {
  // If items prop is provided, use it directly
  if (items) {
    return (
      <ol className="list-none p-0 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-baseline gap-4">
            <span className="flex-shrink-0 w-7 h-7 bg-secondary rounded flex items-center justify-center text-primary font-mono">
              {index + 1}
            </span>
            <span className="mt-1">{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  // For MDX usage, filter and process children
  const validChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === "li"
  );

  return (
    <ol className="list-none p-0 space-y-4">
      {validChildren.map((child, index) => {
        if (!React.isValidElement(child)) return null;

        return (
          <li key={index} className="flex items-baseline gap-4">
            <span className="flex-shrink-0 w-7 h-7 bg-secondary rounded flex items-center justify-center text-primary font-mono">
              {index + 1}
            </span>
            <span className="mt-1">{child.props.children}</span>
          </li>
        );
      })}
    </ol>
  );
}

function UnorderedList({ children, items }: ListProps) {
  // If items prop is provided, use it directly
  if (items) {
    return (
      <ol className="list-none p-0 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-baseline gap-4">
            <span className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-primary font-mono">
              {index + 1}
            </span>
            <span className="mt-1">{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  // For MDX usage, filter and process children
  const validChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === "li"
  );

  return (
    <ul className="relative pl-6 my-4">
      {validChildren.map((child, index) => {
        if (!React.isValidElement(child)) return null;

        return (
          <li
            key={index}
            className="relative pl-0 text-muted-foreground before:content-[''] before:absolute before:left-[-1.5rem] before:top-[0.875rem] before:w-[0.75rem] before:h-[1px] before:border-t before:border-border list-none"
          >
            {child.props.children}
          </li>
        );
      })}
    </ul>
  );
}

export { OrderedList, UnorderedList };
