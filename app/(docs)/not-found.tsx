import Link from "next/link";

export default function DocsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl font-semibold mb-4">Page not found</h1>
      <p className="text-muted-foreground max-w-md mb-6">
        The documentation you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link
        href="/"
        className="inline-flex h-9 items-center rounded-md bg-brand-orange px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-brand-orange/90"
      >
        Back to homepage
      </Link>
    </div>
  );
}
