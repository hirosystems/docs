import { createI18nMiddleware } from 'fumadocs-core/i18n';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { i18n } from '@/lib/i18n';

// Create the i18n middleware
const i18nMiddleware = createI18nMiddleware(i18n);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle .md files for llms.txt
  if (pathname.endsWith('.md')) {
    const pathWithoutMd = pathname.slice(0, -3);

    if (pathWithoutMd.match(/^\/apis\/[^/]+\/reference\//)) {
      // Rewrite to our openapi-markdown API route
      const apiPath = `/api/openapi-markdown${pathWithoutMd}`;
      return NextResponse.rewrite(new URL(apiPath, request.url));
    }

    if (pathWithoutMd === '/index') {
      return NextResponse.rewrite(new URL('/raw/index.mdx', request.url));
    }

    if (pathWithoutMd.startsWith('/docs/') || pathWithoutMd === '/docs') {
      const docPath = pathWithoutMd.startsWith('/docs/') ? pathWithoutMd.slice(6) : '';
      const rawPath = `/raw/${docPath || 'index'}.mdx`;
      return NextResponse.rewrite(new URL(rawPath, request.url));
    }

    const rawPath = `/raw${pathWithoutMd}.mdx`;
    return NextResponse.rewrite(new URL(rawPath, request.url));
  }

  // Apply i18n middleware for all other requests
  return i18nMiddleware(request);
}

export const config = {
  // Combined matcher for both .md files and i18n routes
  matcher: [
    // Match .md files
    '/(.*).md',
    '/docs/(.*).md',
    // Match all paths except Next.js internals and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
