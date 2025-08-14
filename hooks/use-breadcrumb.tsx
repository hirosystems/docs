import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { i18n } from '@/lib/i18n';
import { useTranslations } from './use-translations';

interface BreadcrumbItem {
  name: ReactNode;
  url?: string;
}

/**
 * Format breadcrumb names for display using translations
 */
function formatBreadcrumbName(name: string, translations: any): string {
  const lowerName = name.toLowerCase();
  
  // Check if we have a direct translation for this term
  if (translations.breadcrumb[lowerName]) {
    return translations.breadcrumb[lowerName];
  }

  // Handle hyphenated names
  if (name.includes('-')) {
    return name
      .split('-')
      .map((word) => formatBreadcrumbName(word, translations))
      .join(' ');
  }

  // Default to capitalizing first letter
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Custom breadcrumb hook that generates breadcrumbs from URL path
 */
export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname();
  const translations = useTranslations();

  const segments = pathname.split('/').filter(Boolean);
  
  // Remove locale prefix if it exists
  const firstSegment = segments[0];
  if (firstSegment && i18n.languages.includes(firstSegment)) {
    segments.shift();
  }

  const items: BreadcrumbItem[] = [];
  let currentPath = '';
  let skipNext = false;

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // FIXME: Check if we're in an API section and this is a non-navigable segment
    const isApiSection = segments[0] === 'apis';
    const isReferenceSegment = segment === 'reference';

    if (isApiSection && isReferenceSegment) {
      skipNext = true;
      return;
    }

    if (skipNext) {
      skipNext = false;
      return;
    }

    const name = formatBreadcrumbName(segment, translations);

    // For the last segment, don't include URL (current page)
    if (index === segments.length - 1) {
      items.push({ name });
    } else {
      items.push({ name, url: currentPath });
    }
  });

  return items;
}
