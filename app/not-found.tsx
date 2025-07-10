"use client";

import Link from "next/link";

// Force dynamic rendering to prevent SSR issues
export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-3xl font-regular mb-4">Page not found</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex h-9 items-center rounded-md bg-brand-orange px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-brand-orange/90"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}