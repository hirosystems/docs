import { NextResponse } from 'next/server';

const ALLOWED_METHODS = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
const ALLOWED_HOSTNAMES = new Set(['api.hiro.so', 'api.mainnet.hiro.so', 'api.testnet.hiro.so']);
const BLOCKED_REQUEST_HEADERS = new Set(['host', 'cookie', 'connection', 'content-length']);
const STRIPPED_RESPONSE_HEADERS = new Set(['set-cookie', 'server', 'via', 'www-authenticate']);

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { url, method = 'GET', headers = {}, body } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'A target URL is required.' }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: 'URL must be absolute.' }, { status: 400 });
    }

    if (parsedUrl.protocol !== 'https:' || !ALLOWED_HOSTNAMES.has(parsedUrl.hostname)) {
      return NextResponse.json(
        { error: 'This proxy only allows Hiro API hosts over HTTPS.' },
        { status: 403 },
      );
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
        if (typeof value === 'string' && !BLOCKED_REQUEST_HEADERS.has(key.toLowerCase())) {
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

    const upstreamResponse = await fetch(parsedUrl, requestInit);
    const contentType = upstreamResponse.headers.get('content-type') ?? '';
    let data: unknown;

    if (contentType.includes('application/json')) {
      data = await upstreamResponse.json();
    } else {
      data = await upstreamResponse.text();
    }

    const sanitizedHeaders = Object.fromEntries(
      Array.from(upstreamResponse.headers.entries()).filter(
        ([key]) => !STRIPPED_RESPONSE_HEADERS.has(key.toLowerCase()),
      ),
    );

    return NextResponse.json({
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: sanitizedHeaders,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Proxy request failed.' },
      { status: 500 },
    );
  }
}
