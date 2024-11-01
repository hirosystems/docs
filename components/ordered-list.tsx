import React, { ReactNode } from "react";

interface OrderedListProps {
  children?: ReactNode;
  items?: string[];
}

function OrderedList({ children, items }: OrderedListProps) {
  // If items prop is provided, use it directly
  if (items) {
    return (
      <ol className="list-none p-0 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-baseline gap-4">
            <span className="flex-shrink-0 w-7 h-7 bg-secondary rounded flex items-center justify-center text-gray-600 font-mono">
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
            <span className="flex-shrink-0 w-7 h-7 bg-secondary rounded flex items-center justify-center text-gray-600 font-mono">
              {index + 1}
            </span>
            <span className="mt-1">{child.props.children}</span>
          </li>
        );
      })}
    </ol>
  );
}

export { OrderedList };
