import { createI18nMiddleware } from 'fumadocs-core/i18n';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { i18n } from '@/lib/i18n';

const fumadocsMiddleware = createI18nMiddleware(i18n);

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // FIXME: Check for double locale prefix (Vercel-specific issue)
  if (pathname.match(/^\/[a-z]{2}\/[a-z]{2}\//)) {
    console.log('Double locale detected, skipping middleware for:', pathname);
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = i18n.languages.includes(segments[0]) ? segments[0] : null;

  // Get the referer to detect if user is coming from a localized page
  const referer = request.headers.get('referer');

  if (referer && !currentLocale) {
    try {
      const refererUrl = new URL(referer);
      const refererSegments = refererUrl.pathname.split('/').filter(Boolean);
      const refererLocale = i18n.languages.includes(refererSegments[0]) ? refererSegments[0] : null;

      // If coming from a non-default locale page to a non-prefixed URL
      if (refererLocale && refererLocale !== i18n.defaultLanguage) {
        if (pathname.match(/^\/(tools|apis|resources|reference)\//)) {
          return NextResponse.redirect(new URL(`/${refererLocale}${pathname}`, request.url));
        }
      }
    } catch {
      // Ignore invalid referer URLs
    }
  }

  const result = fumadocsMiddleware(request, event);
  return result;
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
