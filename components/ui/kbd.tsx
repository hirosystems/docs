import * as React from 'react';

import { cn } from '@/lib/utils';

const Kbd = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-5 w-min min-w-5 items-center justify-center rounded-sm bg-neutral-150 dark:bg-neutral-600 text-center text-xs font-normal tracking-tight text-neutral-350 dark:text-neutral-250 shadow-sm',
          className,
        )}
        {...props}
      />
    );
  },
);
Kbd.displayName = 'Kbd';

export { Kbd };
