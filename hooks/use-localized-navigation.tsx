'use client';

import { useMemo } from 'react';
import type { BaseLayoutProps } from '@/components/layouts/shared';
import { useTranslations } from './use-translations';

/**
 * Hook to get localized navigation configuration
 * Returns navigation items with translations for the current locale
 */
export function useLocalizedNavigation(): BaseLayoutProps['links'] {
  const t = useTranslations();

  return useMemo(
    () => [
      // Tools menu
      {
        type: 'menu' as const,
        text: t.navigation.menus.tools,
        items: [
          {
            text: t.tools.chainhook.title,
            description: t.tools.chainhook.description,
            url: '/tools/chainhook',
          },
          {
            text: t.tools.contractMonitoring.title,
            description: t.tools.contractMonitoring.description,
            url: '/tools/contract-monitoring',
          },
          {
            text: t.tools.bitcoinIndexer.title,
            description: t.tools.bitcoinIndexer.description,
            url: '/tools/bitcoin-indexer',
            isNew: true,
          },
        ],
      },
      // APIs menu
      {
        type: 'menu' as const,
        text: t.navigation.menus.apis,
        items: [
          {
            text: t.apis.apiKeys.title,
            description: t.apis.apiKeys.description,
            url: '/resources/guides/api-keys',
          },
          {
            text: t.apis.rateLimits.title,
            description: t.apis.rateLimits.description,
            url: '/resources/guides/rate-limits',
          },
          {
            text: t.apis.stacksApi.title,
            description: t.apis.stacksApi.description,
            url: '/apis/stacks-blockchain-api',
          },
          {
            text: t.apis.stacksNodeRpcApi.title,
            description: t.apis.stacksNodeRpcApi.description,
            url: '/apis/stacks-node-rpc-api',
          },
          {
            text: t.apis.tokenMetadata.title,
            description: t.apis.tokenMetadata.description,
            url: '/apis/token-metadata-api',
          },
          {
            text: t.apis.platform.title,
            description: t.apis.platform.description,
            url: '/apis/platform-api',
          },
          {
            text: t.apis.ordinals.title,
            description: t.apis.ordinals.description,
            url: '/apis/ordinals-api',
          },
          {
            text: t.apis.runes.title,
            description: t.apis.runes.description,
            url: '/apis/runes-api',
          },
          {
            text: t.apis.signerMetrics.title,
            description: t.apis.signerMetrics.description,
            url: '/apis/signer-metrics-api',
          },
        ],
      },
      // Libraries & SDKs menu
      // Resources menu
      {
        type: 'menu' as const,
        text: t.navigation.menus.resources,
        items: [
          {
            text: t.resources.guides.title,
            description: t.resources.guides.description,
            url: '/resources/guides',
          },
          {
            text: t.resources.snippets.title,
            description: t.resources.snippets.description,
            url: '/resources/snippets',
          },
          {
            text: t.resources.archive.title,
            description: t.resources.archive.description,
            url: '/resources/archive',
          },
        ],
      },
    ],
    [t],
  );
}
