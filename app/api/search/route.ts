import { createFromSource } from 'fumadocs-core/search/server';
import { getLocaleFromRequest } from '@/lib/locale-utils';
import { source } from '@/lib/source';

// Cache the search API responses at runtime for optimal performance
export const revalidate = false;

const { GET: originalGET } = createFromSource(source);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  // Detect current locale from request
  const currentLocale = getLocaleFromRequest(request);

  // Get original search results
  const response = await originalGET(request);
  const data = await response.json();

  if (Array.isArray(data)) {
    // Filter results to only include pages matching the current locale
    const filteredResults = data.filter((result: any) => {
      const url = result.url || '';
      const isMatchingLocale =
        url.startsWith(`/${currentLocale}/`) || url.includes(`/${currentLocale}/`);
      return isMatchingLocale;
    });

    return new Response(JSON.stringify(filteredResults), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return response;
}
