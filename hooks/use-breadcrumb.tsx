import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface BreadcrumbItem {
  name: ReactNode;
  url?: string;
}

/**
 * Format breadcrumb names for display
 */
function formatBreadcrumbName(name: string): string {
  // Special cases for known terms
  const specialCases: Record<string, string> = {
    "api": "API",
    "apis": "APIs",
    "cli": "CLI",
    "rpc": "RPC",
    "http": "HTTP",
    "sdk": "SDK",
    "sip": "SIP",
    "bns": "BNS",
    "stx": "STX",
    "nft": "NFT",
    "btc": "BTC",
    "auth": "Auth",
  };

  // Check if it's a special case (case-insensitive)
  const lowerName = name.toLowerCase();
  if (specialCases[lowerName]) {
    return specialCases[lowerName];
  }

  // For multi-word paths separated by hyphens, convert to title case
  if (name.includes("-")) {
    return name
      .split("-")
      .map(word => formatBreadcrumbName(word))
      .join(" ");
  }

  // Default: capitalize first letter
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Custom breadcrumb hook that generates breadcrumbs from URL path
 */
export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname();

  // Split the pathname into segments
  const segments = pathname.split('/').filter(Boolean);
  
  // Build breadcrumb items from URL segments
  const items: BreadcrumbItem[] = [];
  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Format the segment name
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