import React, { type ReactNode } from 'react';

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
          <li key={index} className="flex items-baseline gap-4 pl-0">
            <span className="flex-shrink-0 w-7 h-7 bg-neutral-150 dark:bg-neutral-700 border rounded flex items-center justify-center text-primary font-mono">
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
    (child) => React.isValidElement(child) && typeof child.type === 'string' && child.type === 'li',
  );

  return (
    <ol className="list-none p-0 space-y-4">
      {validChildren.map((child, index) => {
        if (!React.isValidElement(child)) return null;

        const element = child as React.ReactElement<{ children?: ReactNode }>;

        return (
          <li key={index} className="flex items-baseline gap-4 pl-0">
            <span className="flex-shrink-0 w-7 h-7 bg-neutral-150 dark:bg-neutral-700 border rounded flex items-center justify-center text-primary font-mono">
              {index + 1}
            </span>
            <span className="mt-1">{element.props.children}</span>
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
      <ol className="list-none p-0 space-y-4 [&_a]:underline [&_a]:underline-offset-1 [&_a]:decoration-border [&_a]:decoration-1 [&a_]:underline-t [&_a:hover]:decoration-primary [&_a]:transition-colors">
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
    (child) => React.isValidElement(child) && typeof child.type === 'string' && child.type === 'li',
  );

  // Helper function to recursively check for checkboxes in React elements
  const hasCheckboxInElement = (element: any): boolean => {
    if (!element) return false;

    if (React.isValidElement(element)) {
      // Check if this element is an input with type checkbox
      if ((element.props as any)?.type === 'checkbox') {
        return true;
      }

      // Recursively check children
      if ((element.props as any)?.children) {
        const children = React.Children.toArray((element.props as any).children);
        return children.some(hasCheckboxInElement);
      }
    }

    return false;
  };

  // Helper function to extract text content from React elements
  const getTextContent = (element: any): string => {
    if (typeof element === 'string') return element;
    if (typeof element === 'number') return element.toString();
    if (!element) return '';

    // Handle arrays directly
    if (Array.isArray(element)) {
      return element.map(getTextContent).join('');
    }

    if (React.isValidElement(element)) {
      if ((element.props as any)?.children) {
        const children = (element.props as any).children;
        // Handle both arrays and single children
        if (Array.isArray(children)) {
          return children.map(getTextContent).join('');
        } else {
          return getTextContent(children);
        }
      }
    }

    return '';
  };

  // Check if any child contains a checkbox
  const hasCheckboxes = validChildren.some((child) => {
    if (!React.isValidElement(child)) return false;
    return hasCheckboxInElement(child);
  });

  // Check if any child starts with special characters (like ✓, ✗, ★, etc.)
  const hasSpecialPrefixes = validChildren.some((child) => {
    if (!React.isValidElement(child)) return false;
    const element = child as React.ReactElement<{ children?: ReactNode }>;
    const childText = getTextContent(element.props.children);
    // Only look for specific special characters, not a broad range
    return childText.includes('✓') || childText.includes('✗');
  });

  const shouldRemoveDashes = hasCheckboxes || hasSpecialPrefixes;

  return (
    <ul
      className={`relative my-4 ${shouldRemoveDashes ? 'pl-0' : 'pl-6'}  [&_a]:underline
       [&_a]:underline-offset-4
       [&_a]:decoration-border
       [&_a]:decoration-2
       [&_a]:transition-colors
       [&_a:hover]:decoration-primary`}
    >
      {validChildren.map((child, index) => {
        if (!React.isValidElement(child)) return null;

        // Cast child to access props
        const element = child as React.ReactElement<{ children?: ReactNode }>;

        return (
          <li
            key={index}
            className={`relative pl-0 text-muted-foreground list-none ${
              shouldRemoveDashes
                ? ''
                : "before:content-[''] before:absolute before:left-[-1.5rem] before:top-[0.875rem] before:w-[0.75rem] before:h-[1px] before:border-t before:border-border"
            }`}
          >
            <span
              className={
                hasSpecialPrefixes
                  ? 'first-letter:text-orange-500 first-letter:dark:text-brand-orange'
                  : ''
              }
            >
              {element.props.children}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export { OrderedList, UnorderedList };
