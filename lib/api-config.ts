// API Configuration for different documentation sections
export const apiConfig = {
  // Stacks Blockchain API endpoints
  stacksBlockchain: {
    baseUrl: 'https://api.hiro.so',
    clarityConversion: true,
    enablePlayground: true,
    playgroundOptions: {
      proxyUrl: '/api/proxy',
    },
  },

  // Chainhook API endpoints (use spec-provided servers)
  chainhook: {
    clarityConversion: false,
    enablePlayground: true,
    credentialId: 'chainhook',
    credentialPublicOperations: [{ method: 'GET', path: '/' }],
    playgroundOptions: {
      proxyUrl: '/api/proxy',
    },
  },

  // Platform API endpoints
  platform: {
    baseUrl: 'https://platform.hiro.so',
    clarityConversion: false,
    enablePlayground: true,
    playgroundOptions: {
      proxyUrl: '/api/proxy',
    },
  },

  // RPC Node endpoints (override localhost)
  rpcNode: {
    baseUrl: 'https://api.hiro.so',
    clarityConversion: true,
    enablePlayground: true,
    playgroundOptions: {
      proxyUrl: '/api/proxy',
    },
  },

  // Token Metadata API
  tokenMetadata: {
    baseUrl: 'https://api.hiro.so',
    clarityConversion: false,
    enablePlayground: true,
    playgroundOptions: {
      proxyUrl: '/api/proxy',
    },
  },
};

// Helper to get config based on document path
export function getAPIConfig(documentPath: string) {
  const normalizedPath = documentPath.toLowerCase();

  const cloneConfig = <T extends keyof typeof apiConfig>(key: T) => {
    const config = apiConfig[key];
    return {
      ...config,
      playgroundOptions: config.playgroundOptions ? { ...config.playgroundOptions } : undefined,
    };
  };

  if (normalizedPath.includes('stacks-node-rpc-api.json')) {
    return cloneConfig('rpcNode');
  }

  if (normalizedPath.includes('platform-api.json') || normalizedPath.includes('/apis/platform/')) {
    return cloneConfig('platform');
  }

  if (normalizedPath.includes('token-metadata')) {
    return cloneConfig('tokenMetadata');
  }

  if (normalizedPath.includes('stacks-blockchain-api.json')) {
    return cloneConfig('stacksBlockchain');
  }

  if (normalizedPath.includes('chainhook-api.json')) {
    return cloneConfig('chainhook');
  }

  return undefined;
}
