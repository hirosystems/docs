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

  // Get the current locale from cookie or detect from path
  const localeCookie = request.cookies.get('locale')?.value;
  const pathSegments = pathname.split('/').filter(Boolean);
  const pathLocale = i18n.languages.includes(pathSegments[0]) ? pathSegments[0] : null;

  // Determine which locale to use (priority: path > cookie > default)
  const currentLocale = pathLocale || localeCookie || i18n.defaultLanguage;

  // If the path doesn't have a locale and we have a preferred locale, redirect to it
  if (
    !pathLocale &&
    pathname !== '/' &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api/') // Changed from '/api' to '/api/' to allow /apis
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Apply i18n middleware for all other requests
  return i18nMiddleware(request);
}

export const config = {
  matcher: [
    // Match .md files
    '/(.*).md',
    '/docs/(.*).md',
    // Match all paths except Next.js internals, API routes, and static files
    '/((?!_next|api/).*)', // This excludes /api/ but includes /apis/
  ],
};
