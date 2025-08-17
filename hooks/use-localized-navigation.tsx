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

  return useMemo(() => [
    // Tools menu
    {
      type: 'menu' as const,
      text: t.navigation.menus.tools,
      items: [
        {
          text: t.tools.clarinet.title,
          description: t.tools.clarinet.description,
          url: '/tools/clarinet',
        },
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
          text: t.tools.clarityVscode.title,
          description: t.tools.clarityVscode.description,
          url: '/tools/clarinet/vscode-extension',
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
    {
      type: 'menu' as const,
      text: t.navigation.menus.libraries,
      items: [
        {
          text: t.libraries.stacksJs.title,
          description: t.libraries.stacksJs.description,
          url: '/reference/stacks.js',
        },
        {
          text: t.libraries.stacksConnect.title,
          description: t.libraries.stacksConnect.description,
          url: '/reference/stacks.js/connect-wallet',
        },
        {
          text: t.libraries.clarinetSdk.title,
          description: t.libraries.clarinetSdk.description,
          url: '/tools/clarinet/sdk-introduction',
        },
        {
          text: t.libraries.clarinetBrowserSdk.title,
          description: t.libraries.clarinetBrowserSdk.description,
          url: '/tools/clarinet/browser-sdk-reference',
        },
      ],
    },
    // Resources menu
    {
      type: 'menu' as const,
      text: t.navigation.menus.resources,
      items: [
        {
          text: t.resources.clarityReference.title,
          description: t.resources.clarityReference.description,
          url: '/resources/clarity',
        },
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
  ], [t]);
}