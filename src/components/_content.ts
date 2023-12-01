export default {
  hero: {
    title: 'Get started',
    image: {
      src: '/img/landing/hero.png',
      alt: 'web3 illustration image',
    },
    text: 'Explore API references, feature guides, and tutorials to integrate Stacks and Ordinals into your application. Start here:',
    links: [
      {
        text: 'Stacks Blockchain API Client',
        href: 'https://hirosystems.github.io/stacks-blockchain-api/client/',
      },
      {
        text: 'Stacks.js starters',
        href: 'https://docs.hiro.so/stacksjs-starters',
      },
      {
        text: 'Sign to Hiro Platform',
        href: 'https://platform.hiro.so',
      },
    ],
  },
  banner: {
    type: 'info',
    from: '2023-11-20',
    to: '2023-12-31',
    text: ["We've made changes to our rate limits for Hiro APIs"],
    cta: 'Learn more',
    ctaLink: 'https://www.hiro.so/blog/updated-rate-limits-for-hiro-apis',
  },
  popularSections: {
    title: 'Popular sections',
    sections: [
      {
        title: 'Stacks API',
        text: 'Stacks blockchain API allows you to query the Stacks blockchain and interact with smart contracts.',
        href: '/stacks-blockchain-api',
        image: {
          src: '/img/landing/api.png',
          alt: 'web3 APIs illustration image',
        },
      },
      {
        title: 'Ordinals API',
        text: 'Ordinals API is a REST-based service that indexes Bitcoin inscriptions based on Ordinal theory. The API supports Auto-scaling and Etag caching.',
        href: '/ordinals-api',
        image: {
          src: '/img/landing/ordinals-api.png',
          alt: 'Ordinals API',
        },
      },
      {
        title: 'Stacks.js',
        text: 'Stacks.js is an SDK with a collection of JavaScript libraries to interact with and transact on the Stacks blockchain.',
        href: '/stacks.js',
        image: {
          src: '/img/landing/stacksjs.png',
          alt: 'Abstract blockchain illustration image',
        },
      },
    ],
  },
  sections: [
    {
      title: 'Hiro Platform',
      image: {
        src: '/img/landing/stacks-logo.svg',
        alt: 'Stacks logo',
      },
      description:
        'The Hiro Platform is a cloud-based development environment that enables you to create, build and deploy Clarity smart contracts.',
      subSections: [
        {
          title: 'Getting started',
          link: '/platform/getting-started',
          description: 'Get started using the Hiro Platform.',
        },
        {
          title: 'Guides',
          link: '/platform/guides/create-project',
          description: 'Start creating your first project.',
        },
        {
          title: 'FAQ',
          link: '/platform/faq',
          description: 'Explore our troubleshooting guide to unblock yourself.',
        },
      ],
    },
    {
      title: 'Clarinet',
      image: {
        src: '/img/landing/clarity-logo.svg',
        alt: 'Clarity logo',
      },
      description:
        'Clarinet is a command line tool for Clarity smart contract development that provides a CLI package with a clarity runtime, a console, and a testing harness.',
      subSections: [
        {
          title: 'Getting started',
          link: '/clarinet/getting-started',
          description: 'Get started to install and build with Clarinet.',
        },
        {
          title: 'Feature guides',
          link: '/clarinet/guides/analyze-with-check-checker',
          description: 'Explore the features of Clarinet.',
        },
        {
          title: 'Troubleshooting',
          link: '/clarinet/troubleshooting',
          description: 'Explore our troubleshooting guide to unblock yourself.',
        },
      ],
    },
    {
      title: 'Chainhook',
      image: {
        src: '/img/landing/chainhooks-icon.svg',
        alt: 'Chainhook logo',
      },
      description:
        'Chainhook helps you get reliable blockchain data, regardless of forks and reorgs, and enables you to create triggers that respond to on-chain events in real time, using IFTTT (if_this, then_that) logic.',
      subSections: [
        {
          title: 'Getting started',
          link: '/chainhook/getting-started',
          description: 'Get started to install Chainhook from the source.',
        },
        {
          title: 'How-to guides',
          link: '/chainhook/guides/chainhooks-with-bitcoin',
          description: 'Explore the how-to guides of Chainhook.',
        },
        {
          title: 'FAQ',
          link: '/chainhook/faq',
          description: 'Explore our frequently asked questions to address common queries.',
        },
      ],
    },
  ],
};
