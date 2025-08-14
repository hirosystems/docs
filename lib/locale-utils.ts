import { i18n } from '@/lib/i18n';

/**
 * Extract locale from a URL path
 * @param pathname - The URL pathname to parse
 * @returns The detected locale or default locale
 */
export function getLocaleFromPath(pathname: string): string {
  // Check if path has locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const pathLocale = i18n.languages.includes(segments[0]) ? segments[0] : null;
  
  return pathLocale || i18n.defaultLanguage;
}

/**
 * Extract locale from request headers (referer)
 * Used in API routes where we can't use React hooks
 * @param request - The incoming request
 * @returns The detected locale or default locale
 */
export function getLocaleFromRequest(request: Request): string {
  // Try to get locale from referer header
  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return getLocaleFromPath(refererUrl.pathname);
    } catch {
      // Invalid referer URL, fall back to default
    }
  }
  
  // Could also check Accept-Language header as fallback
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0];
    if (preferredLang && i18n.languages.includes(preferredLang)) {
      return preferredLang;
    }
  }
  
  return i18n.defaultLanguage;
}