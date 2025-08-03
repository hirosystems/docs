'use client';

import Link from 'next/link';
import React from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Hide sidebar for errors (including 404s)
    const aside = document.querySelector('aside');
    if (aside) {
      aside.style.display = 'none';
    }

    return () => {
      const asideCleanup = document.querySelector('aside');
      if (asideCleanup) {
        asideCleanup.style.display = '';
      }
    };
  }, []);

  // Check if this is likely a 404 error
  const is404 = error.message?.includes('404') || error.message?.includes('not found');

  return (
    <div className="w-full flex flex-col items-center justify-center text-center min-h-[50vh]">
      <h1 className="text-3xl font-regular mb-4">
        {is404 ? 'Page not found' : 'Something went wrong'}
      </h1>
      <p className="text-muted-foreground max-w-md mb-6">
        {is404
          ? "The documentation you are looking for doesn't exist or has been moved."
          : 'An error occurred while loading this page.'}
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex h-9 items-center rounded-md bg-brand-orange px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-brand-orange/90"
        >
          Back to homepage
        </Link>
        {!is404 && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center rounded-md border border-neutral-200 dark:border-neutral-800 px-4 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
