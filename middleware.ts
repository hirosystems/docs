import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: ['/(.*).md', '/docs/(.*).md'],
};
