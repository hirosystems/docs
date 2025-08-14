'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { i18n } from '@/lib/i18n';
import { translations, type Translations } from '@/lib/translations';

/**
 * Hook to get translations for the current locale
 * Detects locale from the URL path and returns appropriate translations
 */
export function useTranslations(): Translations {
  const pathname = usePathname();

  const currentLocale = useMemo(() => {
    // Get current language from cookie or detect from path
    const getCookieLocale = () => {
      if (typeof document === 'undefined') return null;
      const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
      return match ? match[1] : null;
    };

    const cookieLocale = getCookieLocale();

    // Check if path has locale prefix
    const segments = pathname.split('/').filter(Boolean);
    const pathLocale = i18n.languages.includes(segments[0]) ? segments[0] : null;

    // Use path locale first, then cookie locale, then default
    return pathLocale || cookieLocale || i18n.defaultLanguage;
  }, [pathname]);

  return translations[currentLocale] || translations[i18n.defaultLanguage];
}