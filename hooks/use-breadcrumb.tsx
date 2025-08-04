import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface BreadcrumbItem {
  name: ReactNode;
  url?: string;
}

/**
 * Format breadcrumb names for display
 */
function formatBreadcrumbName(name: string): string {
  const specialCases: Record<string, string> = {
    api: 'API',
    apis: 'APIs',
    cli: 'CLI',
    rpc: 'RPC',
    http: 'HTTP',
    sdk: 'SDK',
    sip: 'SIP',
    bns: 'BNS',
    stx: 'STX',
    nft: 'NFT',
    btc: 'BTC',
    auth: 'Auth',
  };

  const lowerName = name.toLowerCase();
  if (specialCases[lowerName]) {
    return specialCases[lowerName];
  }

  if (name.includes('-')) {
    return name
      .split('-')
      .map((word) => formatBreadcrumbName(word))
      .join(' ');
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Custom breadcrumb hook that generates breadcrumbs from URL path
 */
export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

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

    const name = formatBreadcrumbName(segment);

    // For the last segment, don't include URL (current page)
    if (index === segments.length - 1) {
      items.push({ name });
    } else {
      items.push({ name, url: currentPath });
    }
  });

  return items;
}
