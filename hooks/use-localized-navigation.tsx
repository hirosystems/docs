'use client';

import { useMemo } from 'react';
import { baseOptions } from '@/app/layout.config';
import type { BaseLayoutProps } from '@/components/layouts/shared';
import { useTranslations } from './use-translations';

/**
 * Hook to get localized navigation configuration
 * Returns navigation items with translations for the current locale
 */
export function useLocalizedNavigation(): BaseLayoutProps['links'] {
  const t = useTranslations();

  return useMemo(() => {
    if (!baseOptions.links) return [];

    const menuTitleMap = new Map<string, string>([
      ['Tools', t.navigation.menus.tools],
      ['APIs', t.navigation.menus.apis],
      ['Libraries & SDKs', t.navigation.menus.libraries],
      ['Resources', t.navigation.menus.resources],
    ]);

    const itemTranslations = new Map<
      string,
      {
        title: string;
        description: string;
      }
    >([
      ['/tools/chainhook', t.tools.chainhook],
      ['/tools/contract-monitoring', t.tools.contractMonitoring],
      ['/tools/bitcoin-indexer', t.tools.bitcoinIndexer],
      ['/resources/guides/api-keys', t.apis.apiKeys],
      ['/resources/guides/rate-limits', t.apis.rateLimits],
      ['/apis/stacks-blockchain-api', t.apis.stacksApi],
      ['/apis/stacks-node-rpc-api', t.apis.stacksNodeRpcApi],
      ['/apis/token-metadata-api', t.apis.tokenMetadata],
      ['/apis/chainhook-api', t.apis.chainhook],
      ['/apis/platform-api', t.apis.platform],
      ['/apis/ordinals-api', t.apis.ordinals],
      ['/apis/runes-api', t.apis.runes],
      ['/apis/signer-metrics-api', t.apis.signerMetrics],
      ['/resources/guides', t.resources.guides],
      ['/resources/archive', t.resources.archive],
    ]);

    return baseOptions.links.map((link) => {
      if (link.type !== 'menu') return link;

      const localizedText =
        typeof link.text === 'string' ? (menuTitleMap.get(link.text) ?? link.text) : link.text;

      const localizedItems = link.items?.map((item) => {
        if (!('url' in item) || !item.url) return item;

        const localized = itemTranslations.get(item.url);
        if (!localized) return item;

        return {
          ...item,
          text: localized.title,
          description: localized.description,
        };
      });

      return {
        ...link,
        text: localizedText,
        items: localizedItems,
      };
    });
  }, [t]);
}
