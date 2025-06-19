import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle .md extension
  if (pathname.endsWith(".md")) {
    // Remove .md extension
    const pathWithoutMd = pathname.slice(0, -3);
    
    // Handle root index case
    if (pathWithoutMd === "/index") {
      return NextResponse.rewrite(new URL("/raw/index.mdx", request.url));
    }
    
    // For docs paths, convert to raw mdx path
    if (pathWithoutMd.startsWith("/docs/") || pathWithoutMd === "/docs") {
      // Remove /docs prefix and add /raw prefix
      const docPath = pathWithoutMd.startsWith("/docs/") 
        ? pathWithoutMd.slice(6) 
        : "";
      const rawPath = `/raw/${docPath || "index"}.mdx`;
      return NextResponse.rewrite(new URL(rawPath, request.url));
    }
    
    // For non-docs paths, just add /raw prefix
    const rawPath = `/raw${pathWithoutMd}.mdx`;
    return NextResponse.rewrite(new URL(rawPath, request.url));
  }

  // Handle /llms.txt paths - no rewriting needed!
  // Next.js will automatically serve static files from /public
  // So /llms.txt will serve /public/llms.txt
  // And /tools/llms.txt will serve /public/tools/llms.txt
  
  // We don't need to handle llms.txt in middleware at all
  // since they're static files in the public directory

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths that end with .md
    "/(.*).md",
    // Match docs paths with .md
    "/docs/(.*).md",
  ],
};