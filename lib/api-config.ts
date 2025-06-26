// API Configuration for different documentation sections
export const apiConfig = {
  // Stacks Blockchain API endpoints
  stacksBlockchain: {
    baseUrl: 'https://api.hiro.so',
    clarityConversion: true,
    enablePlayground: true,
    playgroundOptions: {
      proxyUrl: '/api/proxy',
    }
  },
  
  // Platform API endpoints
  platform: {
    baseUrl: 'https://platform.hiro.so',
    clarityConversion: false,
    enablePlayground: true,
    playgroundOptions: {
      proxyUrl: '/api/proxy',
    }
  },
  
  // RPC Node endpoints (override localhost)
  rpcNode: {
    baseUrl: 'https://api.hiro.so',
    clarityConversion: true,
    enablePlayground: true,
    playgroundOptions: {
      proxyUrl: '/api/proxy',
    }
  },
  
  // Token Metadata API
  tokenMetadata: {
    baseUrl: 'https://api.hiro.so',
    clarityConversion: false,
    enablePlayground: true,
    playgroundOptions: {
      proxyUrl: '/api/proxy',
    }
  }
};

// Helper to get config based on document path
export function getAPIConfig(documentPath: string) {
  // RPC node endpoints
  if (documentPath.includes('stacks-node-rpc-api.json')) {
    return apiConfig.rpcNode;
  }
  
  // Platform APIs
  if (documentPath.includes('/apis/platform/')) {
    return apiConfig.platform;
  }
  
  // Token metadata
  if (documentPath.includes('token-metadata')) {
    return apiConfig.tokenMetadata;
  }
  
  // Default to Stacks Blockchain API
  return apiConfig.stacksBlockchain;
}