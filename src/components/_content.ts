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
  topBanner: {
    type: 'info',
    from: '2024-04-22',
    to: '2024-05-22',
    text: ['The Nakamoto upgrade is now live on Mainnet'],
    cta: 'View changes to Hiro Products here',
    ctaLink: '/nakamoto',
    relativeUrl: true,
  },
  banner: {
    type: 'info',
    from: '2024-03-21',
    to: '2024-05-22',
    text: ['The Nakamoto upgrade is now live on Mainnet! See a list of Hiro product changes here.'],
    cta: 'View Changes',
    ctaLink: '/nakamoto',
    relativeUrl: true,
  },
  popularSections: {
    title: 'Popular sections',
    sections: [
      {
        title: 'Stacks API',
        text: 'Query the Stacks blockchain, interact with smart contracts, and broadcast transactions.',
        href: '/stacks-blockchain-api',
        image: {
          src: '/img/landing/api.png',
          alt: 'web3 APIs illustration image',
        },
      },
      {
        title: 'Ordinals API',
        text: 'Get fast, reliable data for Bitcoin Ordinals and BRC-20 tokens via an easy-to-use REST interface.',
        href: '/ordinals-api',
        image: {
          src: '/img/landing/ordinals-api.png',
          alt: 'Ordinals API',
        },
      },
      {
        title: 'Stacks.js',
        text: 'A collection of JavaScript libraries to build web applications on Stacks.',
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
        'The Hiro Platform is a cloud-based development environment to kickstart your app development on Stacks.',
      subSections: [
        {
          title: 'Get Started',
          link: '/platform',
          description: 'Start building in a streamlined, hosted environment.',
        },
        {
          title: 'Create a New Project',
          link: '/platform/guides/create-project',
          description: 'Choose from a set of starter templates or import your GitHub repo.',
        },
        {
          title: 'Develop Smart Contracts',
          link: '/platform/guides/build-contract',
          description: 'Start coding immediately with zero installations.',
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
        'Clarinet is a local development environment that offers everything you need to create, test, and deploy smart contracts on Stacks.',
      subSections: [
        {
          title: 'Get Started',
          link: '/clarinet',
          description: 'Install Clarinet and build on your local device.',
        },
        {
          title: 'Create a New Contract',
          link: '/clarinet/guides/how-to-add-contract',
          description: 'Add new contracts to your project and have them automatically configured in your project file.',
        },
        {
          title: 'Write Unit Tests',
          link: '/clarinet/guides/test-contract-with-clarinet-sdk',
          description: 'Write unit tests with the Clarinet SDK to verify contract functionality.',
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
        'Chainhook enables you to build custom event streams for Bitcoin layers and trigger actions based on those events.',
      subSections: [
        {
          title: 'Get Started',
          link: '/chainhook',
          description: 'Discover the power of Chainhook.',
        },
        {
          title: 'Create a Bitcoin Chainhook',
          link: '/chainhook/guides/chainhooks-with-bitcoin',
          description: 'Build a chainhook that reacts to events on the Bitcoin blockchain.',
        },
        {
          title: 'Create a Stacks Chainhook',
          link: '/chainhook/guides/chainhooks-with-stacks',
          description: 'Build a chainhook that reacts to events on the Stacks blockchain.',
        },
      ],
    },
  ],
};
