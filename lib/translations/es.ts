import type { Translations } from './types';

export const es: Translations = {
  navigation: {
    signIn: 'Iniciar sesión',
    menus: {
      tools: 'Herramientas',
      apis: 'APIs',
      libraries: 'Bibliotecas y SDKs',
      resources: 'Recursos',
    },
    search: 'Buscar',
    searchAriaLabel: 'Buscar',
    llmShare: {
      copyMarkdown: 'Copiar markdown',
      viewAsMarkdown: 'Ver como Markdown',
      openIn: 'Abrir en',
      askQuestions: 'Haz preguntas sobre esta página',
    },
    toc: {
      contents: 'Contenidos',
    },
    feedback: {
      question: '¿Cómo es esta guía?',
      good: 'Buena',
      bad: 'Mala',
      thankYou: '¡Gracias por tus comentarios!',
      viewHere: 'Ver aquí',
      placeholder: 'Deja tus comentarios...',
      submit: 'Enviar',
      submitting: 'Enviando...',
    },
  },
  breadcrumb: {
    // Main sections
    tools: 'Herramientas',
    apis: 'APIs',
    reference: 'Referencia',
    resources: 'Recursos',

    // Common terms
    api: 'API',
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

    // Tools
    chainhook: 'Chainhooks',

    // Specific pages/sections
    guides: 'Guías',
    archive: 'Archivo',
  },
  tools: {
    chainhook: {
      title: 'Chainhooks',
      description: 'Monitorear y analizar la actividad de contratos inteligentes Clarity.',
    },
    contractMonitoring: {
      title: 'Monitoreo de Contratos',
      description: 'Monitorear y analizar la actividad de contratos inteligentes Clarity.',
    },
    bitcoinIndexer: {
      title: 'Indexador de Bitcoin',
      description: 'Indexador para datos de la blockchain de Bitcoin.',
    },
  },
  apis: {
    apiKeys: {
      title: 'Claves de API',
      description: 'Claves de API para acceder a las APIs de Hiro.',
    },
    rateLimits: {
      title: 'Límites de tasa',
      description: 'Límites de tasa para acceder a las APIs de Hiro.',
    },
    stacksApi: {
      title: 'API de Stacks',
      description: 'API RESTful para acceder a datos y funcionalidad de la blockchain Stacks.',
    },
    stacksNodeRpcApi: {
      title: 'API de Nodo RPC de Stacks',
      description:
        'Métodos de nodo blockchain sin procesar: enviar txs, llamar contratos de solo lectura, consultar mempool/estado.',
    },
    tokenMetadata: {
      title: 'API de Metadatos de Tokens',
      description: 'API para obtener metadatos de tokens NFT y fungibles.',
    },
    chainhook: {
      title: 'API de Chainhooks',
      description: 'API RESTful para acceder a Chainhooks.',
    },
    platform: {
      title: 'API de Plataforma',
      description: 'API para acceder a datos y funcionalidad de la Plataforma Hiro.',
    },
    ordinals: {
      title: 'API de Ordinales',
      description: 'API para datos de Ordinales de Bitcoin e inscripciones.',
    },
    runes: {
      title: 'API de Runas',
      description: 'API para datos de Runas de Bitcoin.',
    },
    signerMetrics: {
      title: 'API de Métricas de Firmante',
      description: 'API para acceder a datos y funcionalidad de métricas de Firmante.',
    },
  },
  resources: {
    guides: {
      title: 'Guías',
      description: 'Guías para construir en Stacks.',
    },
    archive: {
      title: 'Archivo de Hiro',
      description: 'Archivo de datos de blockchain.',
    },
  },
};
