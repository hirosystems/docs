import { NextResponse } from 'next/server';

const ALLOWED_METHODS = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { url, method = 'GET', headers = {}, body } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'A target URL is required.' }, { status: 400 });
    }

    const upperMethod = String(method).toUpperCase();
    if (!ALLOWED_METHODS.has(upperMethod)) {
      return NextResponse.json(
        { error: `Method ${upperMethod} is not supported by the proxy.` },
        { status: 405 },
      );
    }

    const upstreamHeaders = new Headers();
    if (headers && typeof headers === 'object') {
      for (const [key, value] of Object.entries(headers)) {
        if (typeof value === 'string') {
          upstreamHeaders.set(key, value);
        }
      }
    }

    const requestInit: RequestInit = {
      method: upperMethod,
      headers: upstreamHeaders,
    };

    if (body !== undefined && body !== null && upperMethod !== 'GET' && upperMethod !== 'HEAD') {
      requestInit.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const upstreamResponse = await fetch(url, requestInit);
    const contentType = upstreamResponse.headers.get('content-type') ?? '';
    let data: unknown;

    if (contentType.includes('application/json')) {
      data = await upstreamResponse.json();
    } else {
      data = await upstreamResponse.text();
    }

    return NextResponse.json({
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: Object.fromEntries(upstreamResponse.headers),
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Proxy request failed.' },
      { status: 500 },
    );
  }
}
